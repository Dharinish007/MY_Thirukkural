const Kural = require('../models/Kural');
const User = require('../models/User');
const ReelsSession = require('../models/ReelsSession');

/**
 * Get recommended Kurals for user based on learning patterns
 * @param {string} userId - User ID
 * @param {object} options - Recommendation options
 * @returns {array} - Array of recommended Kural numbers
 */
async function getRecommendedKurals(userId, options = {}) {
  const {
    count = 20,
    mode = 'balanced',
    priorityPaals = [],
    priorityAdhigarams = [],
    excludeCompleted = true
  } = options;
  
  const user = await User.findById(userId);
  if (!user) return [];
  
  const completedNumbers = user.completedKurals.map(k => k.kuralNumber);
  
  let query = {};
  
  // Exclude completed if requested
  if (excludeCompleted && completedNumbers.length > 0) {
    query.number = { $nin: completedNumbers };
  }
  
  // Apply priority filters
  if (priorityPaals.length > 0) {
    query.paal = { $in: priorityPaals };
  }
  
  if (priorityAdhigarams.length > 0) {
    query.adhigaramNumber = { $in: priorityAdhigarams };
  }
  
  let kurals = [];
  
  switch (mode) {
    case 'sequential':
      // Get next sequential Kurals
      const lastCompleted = completedNumbers.length > 0 
        ? Math.max(...completedNumbers) 
        : 0;
      kurals = await Kural.find({
        number: { $gt: lastCompleted }
      }).sort({ number: 1 }).limit(count);
      break;
      
    case 'random':
      // Get random Kurals
      const totalCount = await Kural.countDocuments(query);
      const randomSkip = Math.floor(Math.random() * Math.max(1, totalCount - count));
      kurals = await Kural.find(query).skip(randomSkip).limit(count);
      break;
      
    case 'thematic':
      // Get Kurals from same themes user has shown interest in
      const recentSessions = await ReelsSession.find({ userId })
        .sort({ startedAt: -1 })
        .limit(5);
      
      const viewedKurals = [];
      recentSessions.forEach(session => {
        session.kuralsViewed.forEach(kv => {
          if (kv.duration > 5) { // Viewed for more than 5 seconds
            viewedKurals.push(kv.kuralNumber);
          }
        });
      });
      
      if (viewedKurals.length > 0) {
        const interestKurals = await Kural.find({
          number: { $in: viewedKurals }
        }).select('themes adhigaramNumber');
        
        const themes = new Set();
        const adhigarams = new Set();
        
        interestKurals.forEach(k => {
          if (k.themes) k.themes.forEach(t => themes.add(t));
          adhigarams.add(k.adhigaramNumber);
        });
        
        query.$or = [
          { themes: { $in: Array.from(themes) } },
          { adhigaramNumber: { $in: Array.from(adhigarams) } }
        ];
      }
      
      kurals = await Kural.find(query).limit(count);
      break;
      
    case 'balanced':
    default:
      // Balanced approach: mix of priority, sequential, and random
      const priorityCount = Math.floor(count * 0.4);
      const sequentialCount = Math.floor(count * 0.3);
      const randomCount = count - priorityCount - sequentialCount;
      
      // Priority Kurals
      if (priorityPaals.length > 0 || priorityAdhigarams.length > 0) {
        const priorityKurals = await Kural.find(query).limit(priorityCount);
        kurals.push(...priorityKurals);
      }
      
      // Sequential Kurals
      const lastNum = completedNumbers.length > 0 
        ? Math.max(...completedNumbers) 
        : 0;
      const seqKurals = await Kural.find({
        number: { $gt: lastNum, $nin: completedNumbers }
      }).sort({ number: 1 }).limit(sequentialCount);
      kurals.push(...seqKurals);
      
      // Random Kurals
      const remaining = count - kurals.length;
      if (remaining > 0) {
        const totalCount = await Kural.countDocuments({
          number: { $nin: [...completedNumbers, ...kurals.map(k => k.number)] }
        });
        const randomSkip = Math.floor(Math.random() * Math.max(1, totalCount - remaining));
        const randKurals = await Kural.find({
          number: { $nin: [...completedNumbers, ...kurals.map(k => k.number)] }
        }).skip(randomSkip).limit(remaining);
        kurals.push(...randKurals);
      }
      break;
  }
  
  return kurals.map(k => k.number);
}

/**
 * Get next notification Kural based on priority and learning mode
 * @param {string} userId - User ID
 * @param {object} schedule - Notification schedule
 * @returns {number|null} - Kural number or null
 */
async function getNextNotificationKural(userId, schedule) {
  const user = await User.findById(userId);
  if (!user) return null;
  
  const completedNumbers = user.completedKurals.map(k => k.kuralNumber);
  
  let query = {
    number: { $nin: completedNumbers }
  };
  
  // Apply priority Paals
  if (schedule.priorityPaals && schedule.priorityPaals.length > 0) {
    query.paal = { $in: schedule.priorityPaals };
  }
  
  // Apply priority Adhigarams
  if (schedule.priorityAdhigarams && schedule.priorityAdhigarams.length > 0) {
    query.adhigaramNumber = { $in: schedule.priorityAdhigarams };
  }
  
  // Check if all priority Kurals are completed
  const priorityCount = await Kural.countDocuments(query);
  if (priorityCount === 0) {
    // Fallback to any incomplete Kural
    query = { number: { $nin: completedNumbers } };
  }
  
  let kural;
  
  switch (schedule.learningMode) {
    case 'sequential':
      const lastCompleted = completedNumbers.length > 0 
        ? Math.max(...completedNumbers) 
        : 0;
      kural = await Kural.findOne({
        number: { $gt: lastCompleted }
      }).sort({ number: 1 });
      break;
      
    case 'random':
      const count = await Kural.countDocuments(query);
      const randomSkip = Math.floor(Math.random() * count);
      kural = await Kural.findOne(query).skip(randomSkip);
      break;
      
    case 'thematic':
      // Get Kural from themes user hasn't explored much
      const allThemes = ['wisdom', 'virtue', 'wealth', 'love', 'friendship', 'knowledge'];
      const completedKurals = await Kural.find({
        number: { $in: completedNumbers }
      }).select('themes');
      
      const exploredThemes = new Set();
      completedKurals.forEach(k => {
        if (k.themes) k.themes.forEach(t => exploredThemes.add(t));
      });
      
      const unexploredThemes = allThemes.filter(t => !exploredThemes.has(t));
      
      if (unexploredThemes.length > 0) {
        query.themes = { $in: unexploredThemes };
      }
      
      kural = await Kural.findOne(query);
      break;
      
    case 'balanced':
    default:
      // Balanced: prioritize incomplete from priority areas
      kural = await Kural.findOne(query).sort({ number: 1 });
      break;
  }
  
  return kural ? kural.number : null;
}

module.exports = {
  getRecommendedKurals,
  getNextNotificationKural
};
