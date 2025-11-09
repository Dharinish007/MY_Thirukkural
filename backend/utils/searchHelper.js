const Kural = require('../models/Kural');
const Adhigaram = require('../models/Adhigaram');
const { calculateSimilarity } = require('./phoneticMapper');

/**
 * Parse Kural number or range from query
 * @param {string} query - Search query
 * @returns {object|null} - Range object or null
 */
function parseKuralRange(query) {
  // Single number: "123"
  const singleMatch = query.match(/^\d+$/);
  if (singleMatch) {
    const num = parseInt(query);
    if (num >= 1 && num <= 1330) {
      return { start: num, end: num };
    }
  }
  
  // Range: "1-10" or "1 to 10"
  const rangeMatch = query.match(/(\d+)\s*[-to]+\s*(\d+)/i);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1]);
    const end = parseInt(rangeMatch[2]);
    if (start >= 1 && end <= 1330 && start <= end) {
      return { start, end };
    }
  }
  
  return null;
}

/**
 * Build search query from filters
 * @param {object} filters - Filter object
 * @returns {object} - MongoDB query object
 */
function buildSearchQuery(filters) {
  const query = {};
  
  if (filters.paal) {
    query.paal = filters.paal;
  }
  
  if (filters.adhigaramNumber) {
    query.adhigaramNumber = filters.adhigaramNumber;
  }
  
  if (filters.difficulty) {
    query.difficultyLevel = filters.difficulty;
  }
  
  if (filters.themes && filters.themes.length > 0) {
    query.themes = { $in: filters.themes };
  }
  
  return query;
}

/**
 * Build progress filter (completed/incomplete)
 * @param {object} filters - Filter object
 * @param {array} completedNumbers - Array of completed Kural numbers
 * @param {array} wishlist - Array of wishlisted Kural numbers
 * @returns {object} - MongoDB query object
 */
function buildProgressFilter(filters, completedNumbers, wishlist) {
  const query = {};
  
  if (filters.completed === true) {
    query.number = { $in: completedNumbers };
  } else if (filters.completed === false) {
    query.number = { $nin: completedNumbers };
  }
  
  if (filters.wishlisted === true) {
    query.number = { ...query.number, $in: wishlist };
  }
  
  return query;
}

/**
 * Sort search results
 * @param {array} results - Array of Kural documents
 * @param {string} sortBy - Sort criteria
 * @param {string} query - Original search query
 * @param {object} userPreferences - User preferences
 * @returns {array} - Sorted results
 */
function sortResults(results, sortBy, query, userPreferences = {}) {
  switch (sortBy) {
    case 'relevance':
      // Sort by similarity to query
      if (query) {
        return results.sort((a, b) => {
          const scoreA = calculateSimilarity(query, a.tamilText + ' ' + a.translation);
          const scoreB = calculateSimilarity(query, b.tamilText + ' ' + b.translation);
          return scoreB - scoreA;
        });
      }
      return results;
      
    case 'number':
      return results.sort((a, b) => a.number - b.number);
      
    case 'number_desc':
      return results.sort((a, b) => b.number - a.number);
      
    case 'popular':
      return results.sort((a, b) => {
        const scoreA = (a.viewCount || 0) + (a.likeCount || 0) * 2;
        const scoreB = (b.viewCount || 0) + (b.likeCount || 0) * 2;
        return scoreB - scoreA;
      });
      
    case 'recent':
      return results.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      
    default:
      return results;
  }
}

/**
 * Highlight matched keywords in text
 * @param {string} text - Original text
 * @param {string} query - Search query
 * @returns {string} - Text with highlights
 */
function highlightMatches(text, query) {
  if (!query) return text;
  
  const words = query.toLowerCase().split(' ');
  let highlighted = text;
  
  words.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlighted = highlighted.replace(regex, '<mark>$1</mark>');
  });
  
  return highlighted;
}

/**
 * Get autocomplete suggestions
 * @param {string} query - Partial query
 * @param {number} limit - Max suggestions
 * @returns {array} - Array of suggestions
 */
async function getAutocompleteSuggestions(query, limit = 5) {
  const suggestions = [];
  
  // Check if it's a number
  if (/^\d+$/.test(query)) {
    const num = parseInt(query);
    const kurals = await Kural.find({
      number: { $gte: num, $lt: num + 10 }
    }).limit(limit).select('number tamilText');
    
    kurals.forEach(k => {
      suggestions.push({
        type: 'kural',
        text: `Kural ${k.number}`,
        value: k.number,
        preview: k.tamilText.substring(0, 50)
      });
    });
  } else {
    // Text search
    const kurals = await Kural.find({
      $or: [
        { tamilText: { $regex: query, $options: 'i' } },
        { translation: { $regex: query, $options: 'i' } },
        { phoneticText: { $regex: query, $options: 'i' } }
      ]
    }).limit(limit).select('number tamilText translation');
    
    kurals.forEach(k => {
      suggestions.push({
        type: 'kural',
        text: `Kural ${k.number}`,
        value: k.number,
        preview: k.tamilText.substring(0, 50)
      });
    });
    
    // Adhigaram suggestions
    const adhigarams = await Adhigaram.find({
      $or: [
        { nameTamil: { $regex: query, $options: 'i' } },
        { nameEnglish: { $regex: query, $options: 'i' } }
      ]
    }).limit(3).select('number nameTamil nameEnglish');
    
    adhigarams.forEach(a => {
      suggestions.push({
        type: 'adhigaram',
        text: a.nameEnglish,
        value: a.number,
        preview: a.nameTamil
      });
    });
  }
  
  return suggestions.slice(0, limit);
}

module.exports = {
  parseKuralRange,
  buildSearchQuery,
  buildProgressFilter,
  sortResults,
  highlightMatches,
  getAutocompleteSuggestions
};
