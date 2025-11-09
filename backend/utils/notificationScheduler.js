const cron = require('node-cron');
const NotificationSchedule = require('../models/NotificationSchedule');
const NotificationHistory = require('../models/NotificationHistory');
const UserStreak = require('../models/UserStreak');
const { getNextNotificationKural } = require('./recommendationEngine');

/**
 * Initialize notification scheduler
 * Runs every hour to check for scheduled notifications
 */
function initializeScheduler() {
  // Run every hour
  cron.schedule('0 * * * *', async () => {
    console.log('🔔 Checking for scheduled notifications...');
    await processScheduledNotifications();
  });
  
  console.log('✅ Notification scheduler initialized');
}

/**
 * Process all scheduled notifications
 */
async function processScheduledNotifications() {
  try {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Find all enabled schedules
    const schedules = await NotificationSchedule.find({ enabled: true });
    
    for (const schedule of schedules) {
      const shouldSend = checkIfShouldSend(schedule, currentHour, currentMinute, currentDay, now);
      
      if (shouldSend) {
        await sendNotification(schedule);
      }
    }
  } catch (error) {
    console.error('Error processing notifications:', error);
  }
}

/**
 * Check if notification should be sent based on schedule
 */
function checkIfShouldSend(schedule, currentHour, currentMinute, currentDay, now) {
  // Check if already sent today
  if (schedule.lastNotificationSent) {
    const lastSent = new Date(schedule.lastNotificationSent);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);
    
    if (lastSent >= today && schedule.frequency === 'daily') {
      return false; // Already sent today
    }
  }
  
  // Check frequency
  switch (schedule.frequency) {
    case 'daily':
      // Check if current time matches any scheduled time
      return schedule.times.some(time => 
        time.hour === currentHour && Math.abs(time.minute - currentMinute) < 5
      );
      
    case 'weekly':
      // Check day of week and time
      if (!schedule.daysOfWeek.includes(currentDay)) {
        return false;
      }
      return schedule.times.some(time => 
        time.hour === currentHour && Math.abs(time.minute - currentMinute) < 5
      );
      
    case 'monthly':
      // Send on first day of month
      if (now.getDate() !== 1) {
        return false;
      }
      return schedule.times.some(time => 
        time.hour === currentHour && Math.abs(time.minute - currentMinute) < 5
      );
      
    case 'custom':
      // Custom logic can be added here
      return schedule.times.some(time => 
        time.hour === currentHour && Math.abs(time.minute - currentMinute) < 5
      );
      
    default:
      return false;
  }
}

/**
 * Send notification to user
 */
async function sendNotification(schedule) {
  try {
    // Get next Kural based on priority and learning mode
    const kuralNumber = await getNextNotificationKural(schedule.userId, schedule);
    
    if (!kuralNumber) {
      console.log(`No Kural found for user ${schedule.userId}`);
      return;
    }
    
    // Create notification history entry
    await NotificationHistory.create({
      userId: schedule.userId,
      kuralNumber,
      sentAt: new Date()
    });
    
    // Update schedule
    schedule.lastNotificationSent = new Date();
    schedule.notificationCount += 1;
    await schedule.save();
    
    // Update user streak
    await updateUserStreak(schedule.userId);
    
    // TODO: Send actual push notification via FCM or other service
    // This would integrate with Firebase Cloud Messaging or similar
    console.log(`📱 Notification sent to user ${schedule.userId}: Kural ${kuralNumber}`);
    
    return {
      success: true,
      kuralNumber
    };
  } catch (error) {
    console.error('Error sending notification:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Update user streak based on activity
 */
async function updateUserStreak(userId) {
  try {
    let streak = await UserStreak.findOne({ userId });
    
    if (!streak) {
      streak = new UserStreak({
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: new Date(),
        streakStartDate: new Date(),
        totalDaysActive: 1
      });
    } else {
      const now = new Date();
      const lastActivity = new Date(streak.lastActivityDate);
      
      // Check if last activity was yesterday
      const daysDiff = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 1) {
        // Continue streak
        streak.currentStreak += 1;
        streak.totalDaysActive += 1;
        
        if (streak.currentStreak > streak.longestStreak) {
          streak.longestStreak = streak.currentStreak;
        }
        
        // Check for achievements
        if (streak.currentStreak === 7) {
          streak.achievements.push({
            type: 'streak_7',
            earnedAt: new Date()
          });
        } else if (streak.currentStreak === 30) {
          streak.achievements.push({
            type: 'streak_30',
            earnedAt: new Date()
          });
        } else if (streak.currentStreak === 100) {
          streak.achievements.push({
            type: 'streak_100',
            earnedAt: new Date()
          });
        }
      } else if (daysDiff > 1) {
        // Streak broken
        streak.currentStreak = 1;
        streak.streakStartDate = now;
        streak.totalDaysActive += 1;
      }
      // If daysDiff === 0, same day, don't update streak
      
      streak.lastActivityDate = now;
    }
    
    await streak.save();
  } catch (error) {
    console.error('Error updating user streak:', error);
  }
}

/**
 * Manually trigger notification for testing
 */
async function triggerNotificationNow(userId) {
  const schedule = await NotificationSchedule.findOne({ userId });
  
  if (!schedule) {
    throw new Error('No notification schedule found for user');
  }
  
  return await sendNotification(schedule);
}

module.exports = {
  initializeScheduler,
  processScheduledNotifications,
  triggerNotificationNow,
  updateUserStreak
};
