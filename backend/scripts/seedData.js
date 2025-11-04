// This file contains the data structure for Adhigarams and sample Kurals
// You'll need to complete this with all 1330 Kurals

const adhigarams = [
  // ARATHUPAL (Virtue) - Chapters 1-38
  { number: 1, nameTamil: "கடவுள் வாழ்த்து", nameEnglish: "Praise of God", paal: "Arathupal" },
  { number: 2, nameTamil: "வான்சிறப்பு", nameEnglish: "Excellence of Rain", paal: "Arathupal" },
  { number: 3, nameTamil: "நீத்தார் பெருமை", nameEnglish: "Greatness of Ascetics", paal: "Arathupal" },
  { number: 4, nameTamil: "அறன்வலியுறுத்தல்", nameEnglish: "Assertion of Virtue", paal: "Arathupal" },
  { number: 5, nameTamil: "இல்வாழ்க்கை", nameEnglish: "Domestic Life", paal: "Arathupal" },
  { number: 6, nameTamil: "வாழ்க்கைத் துணைநலம்", nameEnglish: "Excellence of Spouse", paal: "Arathupal" },
  { number: 7, nameTamil: "மக்கட்பேறு", nameEnglish: "Blessing of Children", paal: "Arathupal" },
  { number: 8, nameTamil: "அன்புடைமை", nameEnglish: "Possession of Love", paal: "Arathupal" },
  { number: 9, nameTamil: "விருந்தோம்பல்", nameEnglish: "Hospitality", paal: "Arathupal" },
  { number: 10, nameTamil: "இனியவைகூறல்", nameEnglish: "Sweet Speech", paal: "Arathupal" },
  // Add remaining Adhigarams 11-133 here...
];

const kurals = [
  // Sample Kurals - Add all 1330
  {
    number: 1,
    adhigaramNumber: 1,
    tamilText: "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு",
    purul: "எழுத்துக்கள் எல்லாம் அகரத்தை அடிப்படையாகக் கொண்டிருப்பது போல, உலகம் கடவுளை அடிப்படையாகக் கொண்டிருக்கிறது.",
    paal: "Arathupal"
  },
  // Add remaining Kurals 2-1330 here...
];

module.exports = { adhigarams, kurals };
