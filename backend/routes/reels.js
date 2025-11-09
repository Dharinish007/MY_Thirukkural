const express = require('express');
const router = express.Router();
const Kural = require('../models/Kural');
const Adhigaram = require('../models/Adhigaram');
const ReelsSession = require('../models/ReelsSession');
const Playlist = require('../models/Playlist');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { getRecommendedKurals } = require('../utils/recommendationEngine');
const { v4: uuidv4 } = require('uuid');

/**
 * POST /api/reels/session
 * Create unlimited Reels session
 */
router.post('/session', protect, async (req, res) => {
  try {
    const { sourceType = 'discovery', playlistId, count = 50 } = req.body;

    const sessionId = uuidv4();

    let session = await ReelsSession.create({
      userId: req.user.id,
      sessionId,
      sourceType,
      playlistId: playlistId || null,
      kuralsViewed: [],
      totalDuration: 0,
      completionRate: 0,
      startedAt: new Date(),
      endedAt: null
    });

    // Get initial batch of Kurals
    let kuralNumbers = [];

    switch (sourceType) {
      case 'playlist': {
        if (!playlistId) {
          return res.status(400).json({
            success: false,
            message: 'Playlist ID required for playlist source'
          });
        }
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) {
          return res.status(404).json({
            success: false,
            message: 'Playlist not found'
          });
        }
        kuralNumbers = Array.isArray(playlist.kurals) ? playlist.kurals.slice(0, count) : [];
        break;
      }

      case 'sequential': {
        const user = await User.findById(req.user.id);
        const completed = Array.isArray(user?.completedKurals) ? user.completedKurals : [];
        const lastCompleted = completed.length > 0
          ? Math.max(...completed.map(k => Number(k.kuralNumber)))
          : 0;

        const sequentialKurals = await Kural.find({
          number: { $gt: lastCompleted }
        })
          .sort({ number: 1 })
          .limit(Number(count));

        kuralNumbers = sequentialKurals.map(k => k.number);
        break;
      }

      case 'random': {
        // Get random sample from all kurals
        const allKurals = await Kural.find().select('number').lean();
        const shuffled = allKurals.sort(() => 0.5 - Math.random());
        kuralNumbers = shuffled.slice(0, Math.min(count, allKurals.length)).map(k => k.number);
        break;
      }

      case 'discovery':
      default: {
        const rec = await getRecommendedKurals(req.user.id, {
          count: Number(count),
          mode: 'balanced',
          excludeCompleted: true
        });
        kuralNumbers = Array.isArray(rec) ? rec : [];
        break;
      }
    }

    // Seed session
    session.kuralsViewed = (kuralNumbers || []).map(n => ({
      kuralNumber: Number(n),
      viewedAt: null,
      duration: 0,
      completed: false,
      wishlisted: false,
      shared: false,
      liked: false
    }));
    await session.save();

    return res.json({
      success: true,
      data: {
        session_id: sessionId,
        kural_numbers: kuralNumbers,
        source_type: sourceType
      }
    });

  } catch (error) {
    console.error('Create session error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Reels session',
      error: error.message
    });
  }
});

/**
 * GET /api/reels/:sessionId
 * Get Reels with pagination - supports unlimited loading
 */
router.get('/:sessionId', protect, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(parseInt(req.query.limit, 10) || 50, 100));

    const session = await ReelsSession.findOne({
      sessionId,
      userId: req.user.id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    if (!Array.isArray(session.kuralsViewed)) session.kuralsViewed = [];

    const skip = (page - 1) * limit;
    
    // If requesting beyond seeded kurals, generate more
    if (skip >= session.kuralsViewed.length && session.sourceType) {
      const additionalCount = 50;
      let newKuralNumbers = [];

      switch (session.sourceType) {
        case 'sequential': {
          const lastKural = session.kuralsViewed.length > 0 
            ? Math.max(...session.kuralsViewed.map(kv => Number(kv.kuralNumber)))
            : 0;
          
          const moreKurals = await Kural.find({
            number: { $gt: lastKural }
          })
            .sort({ number: 1 })
            .limit(additionalCount);
          
          newKuralNumbers = moreKurals.map(k => k.number);
          break;
        }

        case 'random': {
          const existing = new Set(session.kuralsViewed.map(kv => kv.kuralNumber));
          const allKurals = await Kural.find({ 
            number: { $nin: Array.from(existing) } 
          }).select('number').lean();
          
          const shuffled = allKurals.sort(() => 0.5 - Math.random());
          newKuralNumbers = shuffled.slice(0, Math.min(additionalCount, allKurals.length)).map(k => k.number);
          break;
        }

        case 'discovery': {
          const rec = await getRecommendedKurals(req.user.id, {
            count: additionalCount,
            mode: 'balanced',
            excludeCompleted: true
          });
          newKuralNumbers = Array.isArray(rec) ? rec : [];
          break;
        }
      }

      // Add new kurals to session
      if (newKuralNumbers.length > 0) {
        const newEntries = newKuralNumbers.map(n => ({
          kuralNumber: Number(n),
          viewedAt: null,
          duration: 0,
          completed: false,
          wishlisted: false,
          shared: false,
          liked: false
        }));
        session.kuralsViewed.push(...newEntries);
        await session.save();
      }
    }

    const slice = session.kuralsViewed.slice(skip, skip + limit);
    const kuralNumbers = slice.map(kv => Number(kv.kuralNumber));

    if (kuralNumbers.length === 0) {
      return res.json({
        success: true,
        data: {
          kurals: [],
          session_id: sessionId,
          has_more: false
        }
      });
    }

    // Fetch kurals
    const kurals = await Kural.find({ number: { $in: kuralNumbers } });
    const mapByNumber = new Map(kurals.map(k => [k.number, k]));

    // Fetch adhigarams
    const adhigaramNumbers = [...new Set(
      kurals.map(k => k.adhigaramNumber).filter(n => n != null)
    )];

    const adhigarams = await Adhigaram.find({ number: { $in: adhigaramNumbers } });
    const adhigaramByNumber = new Map(adhigarams.map(a => [a.number, a]));

    // Get user interaction state
    const user = await User.findById(req.user.id);
    const completedSet = new Set(
      (user?.completedKurals || []).map(k => Number(k.kuralNumber))
    );
    const wishlistSet = new Set(
      (user?.wishlist || []).map(k => Number(k.kuralNumber))
    );

    const enhancedKurals = kuralNumbers
      .map(num => mapByNumber.get(num))
      .filter(Boolean)
      .map(kural => {
        const adhigaram = adhigaramByNumber.get(kural.adhigaramNumber);

        const paalName = kural.paal;
        const paalEnglish =
          paalName === 'Arathupal' ? 'Virtue' :
          paalName === 'Porutpal'  ? 'Wealth' :
          paalName === 'Kamathupal' ? 'Love' : String(paalName || '');

        const paalColor =
          paalName === 'Arathupal' ? '#10B981' :
          paalName === 'Porutpal'  ? '#F59E0B' :
          paalName === 'Kamathupal' ? '#EC4899' : '#3B82F6';

        return {
          kural_number: kural.number,
          tamil_text: kural.tamilText,
          tamil_meaning: kural.mv || kural.sp || kural.mk,
          english_translation: kural.translation,
          explanation: kural.explanation,
          adhigaram: adhigaram ? {
            number: adhigaram.number,
            tamil_name: adhigaram.nameTamil,
            english_name: adhigaram.nameEnglish
          } : null,
          paal: {
            name_tamil: paalName,
            name_english: paalEnglish,
            color: paalColor
          },
          audio_url: kural.audioUrl,
          themes: kural.themes || [],
          user_interaction: {
            is_completed: completedSet.has(kural.number),
            is_wishlisted: wishlistSet.has(kural.number)
          }
        };
      });

    const hasMore = (skip + limit) < session.kuralsViewed.length || 
                    (session.sourceType !== 'playlist' && kurals.length === limit);

    return res.json({
      success: true,
      data: {
        kurals: enhancedKurals,
        session_id: sessionId,
        has_more: hasMore,
        page,
        total_loaded: session.kuralsViewed.length
      }
    });

  } catch (error) {
    console.error('Get reels error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get Reels',
      error: error.message
    });
  }
});

/**
 * POST /api/reels/:sessionId/interaction
 * Log interaction - like adds to wishlist, done marks as completed
 */
router.post('/:sessionId/interaction', protect, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { kuralNumber, duration, completed, wishlisted, shared, liked } = req.body;

    const session = await ReelsSession.findOne({
      sessionId,
      userId: req.user.id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    if (!Array.isArray(session.kuralsViewed)) session.kuralsViewed = [];

    const num = Number(kuralNumber);
    const existingIndex = session.kuralsViewed.findIndex(kv => Number(kv.kuralNumber) === num);

    const interaction = {
      kuralNumber: num,
      viewedAt: new Date(),
      duration: Math.max(0, Number(duration) || 0),
      completed: Boolean(completed),
      wishlisted: Boolean(wishlisted || liked), // Like adds to wishlist
      shared: Boolean(shared),
      liked: Boolean(liked)
    };

    if (existingIndex >= 0) {
      session.kuralsViewed[existingIndex] = {
        ...session.kuralsViewed[existingIndex],
        ...interaction
      };
    } else {
      session.kuralsViewed.push(interaction);
    }

    // Update session stats
    session.totalDuration = (Number(session.totalDuration) || 0) + (Number(duration) || 0);
    const completedCount = session.kuralsViewed.filter(kv => kv.completed).length;
    const viewedCount = session.kuralsViewed.filter(kv => kv.viewedAt).length;
    session.completionRate = viewedCount > 0 ? (completedCount / viewedCount) * 100 : 0;

    await session.save();

    // Update Kural stats
    if (!Number.isNaN(num)) {
      await Kural.findOneAndUpdate(
        { number: num }, 
        { $inc: { viewCount: 1 } }, 
        { upsert: false }
      );
    }

    // Handle Like - Add to wishlist
    if (liked) {
      const user = await User.findById(req.user.id);
      if (user) {
        if (!Array.isArray(user.wishlist)) user.wishlist = [];
        const exists = user.wishlist.some(item => Number(item.kuralNumber) === num);
        if (!exists) {
          user.wishlist.push({
            kuralNumber: num,
            addedAt: new Date()
          });
          await user.save();
        }
      }
    }

    // Handle Done - Mark as completed
    if (completed) {
      const user = await User.findById(req.user.id);
      if (user) {
        if (!Array.isArray(user.completedKurals)) user.completedKurals = [];
        const exists = user.completedKurals.some(item => Number(item.kuralNumber) === num);
        if (!exists) {
          user.completedKurals.push({
            kuralNumber: num,
            completedAt: new Date()
          });
          await user.save();
        }
      }
    }

    return res.json({
      success: true,
      message: 'Interaction logged',
      data: {
        session_stats: {
          total_viewed: viewedCount,
          total_completed: completedCount,
          completion_rate: session.completionRate,
          total_duration: session.totalDuration
        }
      }
    });

  } catch (error) {
    console.error('Log interaction error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to log interaction',
      error: error.message
    });
  }
});

/**
 * PUT /api/reels/:sessionId/end
 * End session
 */
router.put('/:sessionId/end', protect, async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await ReelsSession.findOne({
      sessionId,
      userId: req.user.id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    if (!session.startedAt) session.startedAt = new Date();
    session.endedAt = new Date();
    await session.save();

    return res.json({
      success: true,
      message: 'Session ended',
      data: {
        session_stats: {
          duration: Math.max(0, Math.floor((session.endedAt - session.startedAt) / 1000)),
          kurals_viewed: Array.isArray(session.kuralsViewed) ? session.kuralsViewed.length : 0,
          completion_rate: session.completionRate || 0
        }
      }
    });

  } catch (error) {
    console.error('End session error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to end session',
      error: error.message
    });
  }
});

/**
 * GET /api/reels/stats/user
 * Get user stats
 */
router.get('/stats/user', protect, async (req, res) => {
  try {
    const sessions = await ReelsSession.find({ userId: req.user.id });

    const stats = {
      total_sessions: sessions.length,
      total_kurals_viewed: 0,
      total_duration: 0,
      average_completion_rate: 0,
      favorite_source: 'discovery'
    };

    let totalCompletionRate = 0;
    const sourceCounts = {};

    sessions.forEach(session => {
      const viewed = Array.isArray(session.kuralsViewed) 
        ? session.kuralsViewed.filter(kv => kv.viewedAt).length 
        : 0;
      stats.total_kurals_viewed += viewed;
      stats.total_duration += Number(session.totalDuration) || 0;
      totalCompletionRate += Number(session.completionRate) || 0;

      const s = session.sourceType || 'discovery';
      sourceCounts[s] = (sourceCounts[s] || 0) + 1;
    });

    if (sessions.length > 0) {
      stats.average_completion_rate = totalCompletionRate / sessions.length;

      let maxCount = 0;
      Object.keys(sourceCounts).forEach(source => {
        if (sourceCounts[source] > maxCount) {
          maxCount = sourceCounts[source];
          stats.favorite_source = source;
        }
      });
    }

    return res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get Reels statistics',
      error: error.message
    });
  }
});

module.exports = router;