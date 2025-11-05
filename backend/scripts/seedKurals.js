const mongoose = require('mongoose'); 
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Adhigaram = require('../models/Adhigaram');
const Kural = require('../models/Kural');
const { adhigarams, kural: kuralsJSON } = require('./thirukkural.json'); // note: JSON key is 'kural'

/**
 * Optional mapping functions if you want correct values per kural
 */
const determinePaal = (number) => {
  if (number <= 380) return "Arathupal";
  else if (number <= 1080) return "Porutpal";
  else return "Kamathupal";
};

const determinePurul = (number) => {
  if (number <= 380) return "அறம்";
  else if (number <= 1080) return "பொருள்";
  else return "இன்பம்";
};

const determineAdhigaramNumber = (number) => {
  // Example mapping, replace with actual if available
  return Math.ceil(number / 10); // simple grouping, adjust as needed
};

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Adhigaram.deleteMany({});
    await Kural.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert Adhigarams
    console.log('📚 Inserting Adhigarams...');
    await Adhigaram.insertMany(adhigarams);
    console.log(`✅ ${adhigarams.length} Adhigarams inserted`);

    // Transform Kurals JSON to match schema
    const kurals = kuralsJSON.map(k => ({
      number: k.Number,
      adhigaramNumber: determineAdhigaramNumber(k.Number),
      tamilText: `${k.Line1} ${k.Line2}`,
      line1: k.Line1,
      line2: k.Line2,
      translation: k.Translation,
      explanation: k.explanation,
      couplet: k.couplet,
      transliteration1: k.transliteration1,
      transliteration2: k.transliteration2,
      paal: determinePaal(k.Number),
      mv: k.mv,
      sp: k.sp,
      mk: k.mk,  
    }));

    // Insert Kurals
    console.log('📖 Inserting Kurals...');
    await Kural.insertMany(kurals);
    console.log(`✅ ${kurals.length} Kurals inserted`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
