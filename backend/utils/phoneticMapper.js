/**
 * Phonetic Mapper for Tamil-English transliteration search
 * Supports common Tamil phonetic patterns in English
 */

const tamilPhoneticMap = {
  // Vowels
  'a': ['அ', 'ஆ'],
  'aa': ['ஆ'],
  'i': ['இ', 'ஈ'],
  'ee': ['ஈ'],
  'u': ['உ', 'ஊ'],
  'oo': ['ஊ'],
  'e': ['எ', 'ஏ'],
  'ae': ['ஏ'],
  'ai': ['ஐ'],
  'o': ['ஒ', 'ஓ'],
  'au': ['ஔ'],
  
  // Consonants
  'k': ['க', 'ங'],
  'ka': ['க'],
  'nga': ['ங'],
  'ch': ['ச'],
  'cha': ['ச'],
  'ja': ['ஜ'],
  'nya': ['ஞ'],
  't': ['ட', 'த'],
  'ta': ['த'],
  'da': ['ட'],
  'na': ['ந', 'ண'],
  'pa': ['ப'],
  'ma': ['ம'],
  'ya': ['ய'],
  'ra': ['ர'],
  'la': ['ல'],
  'va': ['வ'],
  'zha': ['ழ'],
  'la': ['ள'],
  'ra': ['ற'],
  'na': ['ன'],
  
  // Common words
  'aram': ['அறம்'],
  'porul': ['பொருள்'],
  'inbam': ['இன்பம்'],
  'kural': ['குறள்'],
  'thirukkural': ['திருக்குறள்']
};

/**
 * Normalize query for phonetic search
 * @param {string} query - Search query
 * @returns {object} - Normalized Tamil and English patterns
 */
function normalizeQuery(query) {
  const normalized = {
    original: query,
    tamil: query,
    english: query.toLowerCase().trim(),
    patterns: []
  };
  
  // Generate phonetic patterns
  const lowerQuery = query.toLowerCase();
  
  // Check for direct phonetic matches
  Object.keys(tamilPhoneticMap).forEach(key => {
    if (lowerQuery.includes(key)) {
      const tamilChars = tamilPhoneticMap[key];
      tamilChars.forEach(char => {
        normalized.patterns.push(char);
      });
    }
  });
  
  return normalized;
}

/**
 * Generate phonetic text from Tamil text
 * @param {string} tamilText - Tamil text
 * @returns {string} - Phonetic representation
 */
function generatePhoneticText(tamilText) {
  // This is a simplified version
  // In production, use a proper Tamil transliteration library
  const phoneticMap = {
    'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ee', 'உ': 'u', 'ஊ': 'oo',
    'எ': 'e', 'ஏ': 'ae', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'o', 'ஔ': 'au',
    'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nya', 'ட': 'da', 'ண': 'na',
    'த': 'tha', 'ந': 'na', 'ப': 'pa', 'ம': 'ma', 'ய': 'ya', 'ர': 'ra',
    'ல': 'la', 'வ': 'va', 'ழ': 'zha', 'ள': 'la', 'ற': 'ra', 'ன': 'na'
  };
  
  let phonetic = '';
  for (let char of tamilText) {
    phonetic += phoneticMap[char] || char;
  }
  
  return phonetic.toLowerCase();
}

/**
 * Calculate similarity score between query and text
 * @param {string} query - Search query
 * @param {string} text - Text to compare
 * @returns {number} - Similarity score (0-1)
 */
function calculateSimilarity(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  
  // Exact match
  if (t.includes(q)) return 1.0;
  
  // Partial match
  const words = q.split(' ');
  let matchCount = 0;
  words.forEach(word => {
    if (t.includes(word)) matchCount++;
  });
  
  return matchCount / words.length;
}

module.exports = {
  normalizeQuery,
  generatePhoneticText,
  calculateSimilarity
};
