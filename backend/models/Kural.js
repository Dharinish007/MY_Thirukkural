
const mongoose = require("mongoose");

const kuralSchema = new mongoose.Schema({
  number: { type: Number, required: true },                // map from JSON Number
  adhigaramNumber: { type: Number, required: true },       // default or mapping function
  tamilText: { type: String, required: true },            // Line1 + Line2
  paal: { type: String, required: true, default: "அறத்துப்பால்" }, // default or mapping
    mv: { type: String, required: true },
    sp: { type: String, required: true },
    mk: { type: String, required: true }, // default or mapping
  line1: String,
  line2: String,
  translation: String,
  explanation: String,
  couplet: String,
  transliteration1: String,
  transliteration2: String
});

module.exports = mongoose.model("Kural", kuralSchema);
