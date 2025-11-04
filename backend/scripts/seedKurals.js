const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Adhigaram = require('../models/Adhigaram');
const Kural = require('../models/Kural');
const { adhigarams, kurals } = require('./seedData');

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
