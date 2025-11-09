const express = require('express');
const router = express.Router();
const NotificationSchedule = require('../models/NotificationSchedule');
const NotificationHistory = require('../models/NotificationHistory');
const UserStreak = require('../models/UserStreak');
const Kural = require('../models/Kural');
const Adhigaram = require('../models/Adhigaram');
const { protect } = require('../middleware/auth');
const { triggerNotificationNow } = require('../utils/notificationScheduler');

/**
 * GET /api/notifications/schedule
 * Get user's notification schedule
 */
router.get('/schedule', protect, async (req, res) => {
  try {
    let schedule = await NotificationSchedule.findOne({ userId: req.user.id });

    if (!schedule) {
      // Create default schedule
      schedule = await NotificationSchedule.create({
        userId: req.user.id,
        enabled: false,
        frequency: 'daily',
        times: [{ hour: 9, minute: 0 }],
        learningMode: 'balanced'
      });
    }

    res.json({
      success: true,
      data: { schedule }
    });

  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notification schedule',
      error: error.message
    });
  }
});

/**
 * PUT /api/notifications/schedule
 * Update notification schedule
 */
router.put('/schedule', protect, async (req, res) => {
  try {
    const {
      enabled,
      frequency,
      times,
      daysOfWeek,
      priorityPaals,
      priorityAdhigarams,
      learningMode,
      timezone
    } = req.body;

    let schedule = await NotificationSchedule.findOne({ userId: req.user.id });

    if (!schedule) {
      schedule = new NotificationSchedule({ userId: req.user.id });
    }

    // Update fields
    if (enabled !== undefined) schedule.enabled = enabled;
    if (frequency) schedule.frequency = frequency;
    if (times) schedule.times = times;
    if (daysOfWeek) schedule.daysOfWeek = daysOfWeek;
    if (priorityPaals) schedule.priorityPaals = priorityPaals;
    if (priorityAdhigarams) schedule.priorityAdhigarams = priorityAdhigarams;
    if (learningMode) schedule.learningMode = learningMode;
    if (timezone) schedule.timezone = timezone;

    await schedule.save();

    res.json({
      success: true,
      message: 'Notification schedule updated',
      data: { schedule }
    });

  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification schedule',
      error: error.message
    });
  }
});

/**
 * POST /api/notifications/test
 * Send a test notification immediately
 */
router.post('/test', protect, async (req, res) => {
  try {
    const result = await triggerNotificationNow(req.user.id);

    if (result.success) {
      const kural = await Kural.findOne({ number: result.kuralNumber });
      const adhigaram = await Adhigaram.findOne({ number: kural.adhigaramNumber });

      res.json({
        success: true,
        message: 'Test notification sent',
        data: {
          kural_number: kural.number,
          tamil_text: kural.tamilText,
          english_translation: kural.translation,
          adhigaram: adhigaram ? {
            tamil_name: adhigaram.nameTamil,
            english_name: adhigaram.nameEnglish
          } : null
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test notification',
        error: result.error
      });
    }

  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test notification',
      error: error.message
    });
  }
});

/**
 * GET /api/notifications/history
 * Get notification history
 */
router.get('/history', protect, async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const skip = (page - 1) * limit;

    const history = await NotificationHistory.find({ userId: req.user.id })
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await NotificationHistory.countDocuments({ userId: req.user.id });

    // Enhance with Kural details
    const enhancedHistory = await Promise.all(history.map(async (item) => {
      const kural = await Kural.findOne({ number: item.kuralNumber });
      const adhigaram = await Adhigaram.findOne({ number: kural?.adhigaramNumber });

      return {
        id: item._id,
        kural_number: item.kuralNumber,
        sent_at: item.sentAt,
        opened: item.opened,
        opened_at: item.openedAt,
        action: item.action,
        action_at: item.actionAt,
        kural: kural ? {
          tamil_text: kural.tamilText,
          english_translation: kural.translation,
          adhigaram: adhigaram ? {
            tamil_name: adhigaram.nameTamil,
            english_name: adhigaram.nameEnglish
          } : null
        } : null
      };
    }));

    res.json({
      success: true,
      data: {
        history: enhancedHistory,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get notification history',
      error: error.message
    });
  }
});

/**
 * PUT /api/notifications/history/:id
 * Update notification history (mark as opened, set action)
 */
router.put('/history/:id', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { opened, action } = req.body;

    const history = await NotificationHistory.findOne({
      _id: id,
      userId: req.user.id
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: 'Notification history not found'
      });
    }

    if (opened !== undefined) {
      history.opened = opened;
      if (opened && !history.openedAt) {
        history.openedAt = new Date();
      }
    }

    if (action) {
      history.action = action;
      history.actionAt = new Date();
    }

    await history.save();

    res.json({
      success: true,
      message: 'Notification history updated',
      data: { history }
    });

  } catch (error) {
    console.error('Update history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update notification history',
      error: error.message
    });
  }
});

/**
 * GET /api/notifications/streak
 * Get user's streak information
 */
router.get('/streak', protect, async (req, res) => {
  try {
    let streak = await UserStreak.findOne({ userId: req.user.id });

    if (!streak) {
      streak = await UserStreak.create({
        userId: req.user.id,
        currentStreak: 0,
        longestStreak: 0,
        totalDaysActive: 0
      });
    }

    res.json({
      success: true,
      data: { streak }
    });

  } catch (error) {
    console.error('Get streak error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get streak information',
      error: error.message
    });
  }
});

/**
 * GET /api/notifications/achievements
 * Get user's achievements
 */
router.get('/achievements', protect, async (req, res) => {
  try {
    const streak = await UserStreak.findOne({ userId: req.user.id });

    const achievements = streak?.achievements || [];

    // Add achievement metadata
    const enhancedAchievements = achievements.map(ach => ({
      type: ach.type,
      earned_at: ach.earnedAt,
      metadata: ach.metadata,
      title: getAchievementTitle(ach.type),
      description: getAchievementDescription(ach.type),
      icon: getAchievementIcon(ach.type)
    }));

    res.json({
      success: true,
      data: { achievements: enhancedAchievements }
    });

  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get achievements',
      error: error.message
    });
  }
});

// Helper functions for achievements
function getAchievementTitle(type) {
  const titles = {
    'streak_7': '7 Day Streak',
    'streak_30': '30 Day Streak',
    'streak_100': '100 Day Streak',
    'paal_complete': 'Paal Master',
    'adhigaram_complete': 'Adhigaram Complete',
    'all_complete': 'Thirukkural Master'
  };
  return titles[type] || type;
}

function getAchievementDescription(type) {
  const descriptions = {
    'streak_7': 'Completed Kurals for 7 consecutive days',
    'streak_30': 'Completed Kurals for 30 consecutive days',
    'streak_100': 'Completed Kurals for 100 consecutive days',
    'paal_complete': 'Completed all Kurals in a Paal',
    'adhigaram_complete': 'Completed all Kurals in an Adhigaram',
    'all_complete': 'Completed all 1330 Kurals'
  };
  return descriptions[type] || '';
}

function getAchievementIcon(type) {
  const icons = {
    'streak_7': '🔥',
    'streak_30': '🌟',
    'streak_100': '👑',
    'paal_complete': '📚',
    'adhigaram_complete': '✅',
    'all_complete': '🏆'
  };
  return icons[type] || '🎖️';
}

module.exports = router;
