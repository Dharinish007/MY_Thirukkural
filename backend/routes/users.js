const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');
const Kural = require('../models/Kural');

// @route   GET /api/users/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error fetching user' });
  }
});

// @route   POST /api/users/complete/:kuralNumber
// @desc    Mark Kural as complete
// @access  Private
router.post('/complete/:kuralNumber', protect, async (req, res) => {
  try {
    const kuralNumber = parseInt(req.params.kuralNumber);
    
    if (isNaN(kuralNumber) || kuralNumber < 1 || kuralNumber > 1330) {
      return res.status(400).json({ message: 'Invalid Kural number' });
    }

    // Check if Kural exists
    const kural = await Kural.findOne({ number: kuralNumber });
    if (!kural) {
      return res.status(404).json({ message: 'Kural not found' });
    }

    const user = await User.findById(req.user._id);

    // Check if already completed
    const alreadyCompleted = user.completedKurals.some(
      k => k.kuralNumber === kuralNumber
    );

    if (alreadyCompleted) {
      return res.status(400).json({ message: 'Kural already marked as complete' });
    }

    // Add to completed
    user.completedKurals.push({
      kuralNumber,
      completedAt: new Date()
    });

    await user.save();

    res.json({ message: 'Kural marked as complete', completedKurals: user.completedKurals });
  } catch (error) {
    console.error('Error marking complete:', error);
    res.status(500).json({ message: 'Server error marking complete' });
  }
});

// @route   DELETE /api/users/complete/:kuralNumber
// @desc    Unmark Kural as complete
// @access  Private
router.delete('/complete/:kuralNumber', protect, async (req, res) => {
  try {
    const kuralNumber = parseInt(req.params.kuralNumber);
    
    if (isNaN(kuralNumber) || kuralNumber < 1 || kuralNumber > 1330) {
      return res.status(400).json({ message: 'Invalid Kural number' });
    }

    const user = await User.findById(req.user._id);

    // Remove from completed
    user.completedKurals = user.completedKurals.filter(
      k => k.kuralNumber !== kuralNumber
    );

    await user.save();

    res.json({ message: 'Kural unmarked as complete', completedKurals: user.completedKurals });
  } catch (error) {
    console.error('Error unmarking complete:', error);
    res.status(500).json({ message: 'Server error unmarking complete' });
  }
});

// @route   GET /api/users/completed
// @desc    Get all completed Kurals with full details
// @access  Private
router.get('/completed', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get Kural details for all completed Kurals
    const kuralNumbers = user.completedKurals.map(k => k.kuralNumber);
    const kurals = await Kural.find({ number: { $in: kuralNumbers } });

    // Merge completion date with Kural details
    const completedWithDetails = user.completedKurals.map(completed => {
      const kural = kurals.find(k => k.number === completed.kuralNumber);
      return {
        ...kural.toObject(),
        completedAt: completed.completedAt
      };
    });

    // Sort by completion date (newest first)
    completedWithDetails.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    res.json(completedWithDetails);
  } catch (error) {
    console.error('Error fetching completed:', error);
    res.status(500).json({ message: 'Server error fetching completed kurals' });
  }
});

// @route   POST /api/users/wishlist/:kuralNumber
// @desc    Add Kural to wishlist
// @access  Private
router.post('/wishlist/:kuralNumber', protect, async (req, res) => {
  try {
    const kuralNumber = parseInt(req.params.kuralNumber);
    
    if (isNaN(kuralNumber) || kuralNumber < 1 || kuralNumber > 1330) {
      return res.status(400).json({ message: 'Invalid Kural number' });
    }

    // Check if Kural exists
    const kural = await Kural.findOne({ number: kuralNumber });
    if (!kural) {
      return res.status(404).json({ message: 'Kural not found' });
    }

    const user = await User.findById(req.user._id);

    // Check if already in wishlist
    if (user.wishlist.includes(kuralNumber)) {
      return res.status(400).json({ message: 'Kural already in wishlist' });
    }

    // Add to wishlist
    user.wishlist.push(kuralNumber);
    await user.save();

    res.json({ message: 'Kural added to wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Server error adding to wishlist' });
  }
});

// @route   DELETE /api/users/wishlist/:kuralNumber
// @desc    Remove Kural from wishlist
// @access  Private
router.delete('/wishlist/:kuralNumber', protect, async (req, res) => {
  try {
    const kuralNumber = parseInt(req.params.kuralNumber);
    
    if (isNaN(kuralNumber) || kuralNumber < 1 || kuralNumber > 1330) {
      return res.status(400).json({ message: 'Invalid Kural number' });
    }

    const user = await User.findById(req.user._id);

    // Remove from wishlist
    user.wishlist = user.wishlist.filter(num => num !== kuralNumber);
    await user.save();

    res.json({ message: 'Kural removed from wishlist', wishlist: user.wishlist });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Server error removing from wishlist' });
  }
});

// @route   GET /api/users/wishlist
// @desc    Get all wishlist Kurals with full details
// @access  Private
router.get('/wishlist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get Kural details for all wishlist items
    const kurals = await Kural.find({ number: { $in: user.wishlist } }).sort({ number: 1 });

    res.json(kurals);
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    res.status(500).json({ message: 'Server error fetching wishlist' });
  }
});

// @route   GET /api/users/stats
// @desc    Get user progress statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const totalCompleted = user.completedKurals.length;
    const wishlistCount = user.wishlist.length;
    const progressPercent = ((totalCompleted / 1330) * 100).toFixed(2);

    // Get completed Kurals by paal
    const completedNumbers = user.completedKurals.map(k => k.kuralNumber);
    const completedKurals = await Kural.find({ number: { $in: completedNumbers } });

    const arathupalCompleted = completedKurals.filter(k => k.paal === 'Arathupal').length;
    const porutpalCompleted = completedKurals.filter(k => k.paal === 'Porutpal').length;
    const kamathupalCompleted = completedKurals.filter(k => k.paal === 'Kamathupal').length;

    res.json({
      totalCompleted,
      wishlistCount,
      progressPercent: parseFloat(progressPercent),
      byPaal: {
        arathupal: { completed: arathupalCompleted, total: 380 },
        porutpal: { completed: porutpalCompleted, total: 700 },
        kamathupal: { completed: kamathupalCompleted, total: 250 }
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});

module.exports = router;
