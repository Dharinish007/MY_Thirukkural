const express = require('express');
const router = express.Router();
const Adhigaram = require('../models/Adhigaram');
const Kural = require('../models/Kural');

// @route   GET /api/adhigarams
// @desc    Get all Adhigarams (names only, NO Kurals) - FAST!
// @access  Public
router.get('/adhigarams', async (req, res) => {
  try {
    const adhigarams = await Adhigaram.find().sort({ number: 1 });
    res.json(adhigarams);
  } catch (error) {
    console.error('Error fetching adhigarams:', error);
    res.status(500).json({ message: 'Server error fetching adhigarams' });
  }
});

// @route   GET /api/adhigarams/:number/kurals
// @desc    Get ONLY 10 Kurals for specific Adhigaram - LAZY LOADING!
// @access  Public
router.get('/adhigarams/:number/kurals', async (req, res) => {
  try {
    const adhigaramNumber = parseInt(req.params.number);
    
    if (isNaN(adhigaramNumber) || adhigaramNumber < 1 || adhigaramNumber > 133) {
      return res.status(400).json({ message: 'Invalid Adhigaram number' });
    }

    const kurals = await Kural.find({ adhigaramNumber }).sort({ number: 1 });
    res.json(kurals);
  } catch (error) {
    console.error('Error fetching kurals:', error);
    res.status(500).json({ message: 'Server error fetching kurals' });
  }
});

// @route   GET /api/kurals/:number
// @desc    Get single Kural detail
// @access  Public
router.get('/kurals/:number', async (req, res) => {
  try {
    const kuralNumber = parseInt(req.params.number);
    
    if (isNaN(kuralNumber) || kuralNumber < 1 || kuralNumber > 1330) {
      return res.status(400).json({ message: 'Invalid Kural number' });
    }

    const kural = await Kural.findOne({ number: kuralNumber });
    
    if (!kural) {
      return res.status(404).json({ message: 'Kural not found' });
    }

    res.json(kural);
  } catch (error) {
    console.error('Error fetching kural:', error);
    res.status(500).json({ message: 'Server error fetching kural' });
  }
});

module.exports = router;
