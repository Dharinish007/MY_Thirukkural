const express = require('express');
const router = express.Router();
const Kural = require('../models/Kural');
const Adhigaram = require('../models/Adhigaram');
const SearchHistory = require('../models/SearchHistory');
const {
  parseKuralRange,
  buildSearchQuery,
  buildProgressFilter,
  sortResults,
  highlightMatches,
  getAutocompleteSuggestions
} = require('../utils/searchHelper');
const { normalizeQuery } = require('../utils/phoneticMapper');

/**
 * POST /api/search
 * Advanced search with filters
 */
router.post('/', async (req, res) => {
  try {
    const { query, filters = {}, sort = 'relevance', page = 1, limit = 10 } = req.body;

    const startTime = Date.now();
    let searchQuery = {};

    // Build base query from filters
    const filterQuery = buildSearchQuery(filters);
    Object.assign(searchQuery, filterQuery);

    // Add text search if query provided
    if (query && query.trim().length > 0) {
      const normalized = normalizeQuery(query);
      const range = parseKuralRange(query);

      if (range) {
        searchQuery.number = { $gte: range.start, $lte: range.end };
      } else {
        searchQuery.$or = [
          { tamilText: { $regex: normalized.tamil, $options: 'i' } },
          { translation: { $regex: normalized.english, $options: 'i' } },
          { explanation: { $regex: normalized.english, $options: 'i' } },
          { phoneticText: { $regex: normalized.english, $options: 'i' } }
        ];
      }
    }

    // Load optional user data (if logged in)
    let completedNumbers = [];
    let wishlist = [];
    let user = null;
    try {
      if (req.user && req.user.id) {
        const User = require('../models/User');
        user = await User.findById(req.user.id);
        completedNumbers = user?.completedKurals?.map(k => k.kuralNumber) || [];
        wishlist = user?.wishlist || [];
      }
    } catch (_) {
      // Ignore if guest
    }

    // Apply progress filter only if user data exists
    const progressFilter = buildProgressFilter(filters, completedNumbers, wishlist);
    if (progressFilter.number) {
      if (searchQuery.number) {
        searchQuery.number = { ...searchQuery.number, ...progressFilter.number };
      } else {
        searchQuery.number = progressFilter.number;
      }
    }

    // Execute search
    let results = await Kural.find(searchQuery);

    // Sort results
    const userPreferences = {};
    results = sortResults(results, sort, query, userPreferences);

    // Pagination
    const total = results.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = results.slice(startIndex, endIndex);

    // Enhance results
    const enhancedResults = await Promise.all(paginatedResults.map(async (kural) => {
      const isCompleted = completedNumbers.includes(kural.number);
      const isBookmarked = wishlist.includes(kural.number);
      const completedKural = user?.completedKurals?.find(k => k.kuralNumber === kural.number);

      const adhigaram = await Adhigaram.findOne({ number: kural.adhigaramNumber });

      return {
        kural_number: kural.number,
        tamil_text: kural.tamilText,
        english_translation: kural.translation,
        adhigaram: adhigaram ? {
          number: adhigaram.number,
          tamil_name: adhigaram.nameTamil,
          english_name: adhigaram.nameEnglish
        } : null,
        paal: {
          name_tamil: kural.paal,
          name_english: kural.paal === 'Arathupal' ? 'Virtue' :
                        kural.paal === 'Porutpal' ? 'Wealth' : 'Love',
          color: kural.paal === 'Arathupal' ? '#4CAF50' :
                 kural.paal === 'Porutpal' ? '#FFC107' : '#E91E63'
        },
        user_progress: {
          status: isCompleted ? 'completed' : 'not_started',
          completed_at: completedKural?.completedAt || null,
          bookmarked: isBookmarked
        },
        match_highlights: query ? [highlightMatches(kural.tamilText, query)] : [],
        audio_url: kural.audioUrl || null
      };
    }));

    const took_ms = Date.now() - startTime;

    // Save search history only for logged-in users
    if (query && query.trim().length > 0 && req.user && req.user.id) {
      await SearchHistory.create({
        userId: req.user.id,
        query,
        filters,
        resultCount: total
      });
    }

    res.json({
      success: true,
      data: {
        results: enhancedResults,
        total,
        page,
        pages: Math.ceil(total / limit),
        took_ms
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

/**
 * GET /api/search/autocomplete
 */
router.get('/autocomplete', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) {
      return res.json({ success: true, data: { suggestions: [] } });
    }

    const suggestions = await getAutocompleteSuggestions(q, 8);
    res.json({ success: true, data: { suggestions } });
  } catch (error) {
    console.error('Autocomplete error:', error);
    res.status(500).json({ success: false, message: 'Autocomplete failed', error: error.message });
  }
});

/**
 * GET /api/search/random
 * Public - Get a random Kural
 */
router.get('/random', async (req, res) => {
  try {
    const randomKural = await Kural.aggregate([{ $sample: { size: 1 } }]);
    if (!randomKural || randomKural.length === 0) {
      return res.status(404).json({ success: false, message: 'No Kural found' });
    }

    const adhigaram = await Adhigaram.findOne({ number: randomKural[0].adhigaramNumber });

    res.json({
      success: true,
      data: {
        kural_number: randomKural[0].number,
        tamil_text: randomKural[0].tamilText,
        english_translation: randomKural[0].translation,
        explanation: randomKural[0].explanation,
        adhigaram: adhigaram ? {
          number: adhigaram.number,
          tamil_name: adhigaram.nameTamil,
          english_name: adhigaram.nameEnglish
        } : null,
        paal: randomKural[0].paal,
        audio_url: randomKural[0].audioUrl
      }
    });
  } catch (error) {
    console.error('Random Kural error:', error);
    res.status(500).json({ success: false, message: 'Failed to get random Kural', error: error.message });
  }
});

module.exports = router;
