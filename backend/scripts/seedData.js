// This file contains the data structure for Adhigarams and sample Kurals
// You'll need to complete this with all 1330 Kurals

const adhigarams = [
  // Arathupal (Virtue) - Chapters 1-38
  { number: 1, nameTamil: "கடவுள் வாழ்த்து", nameEnglish: "Praise of God", paal: "Arathupal" },
  { number: 2, nameTamil: "வான்சிறப்பு", nameEnglish: "Excellence of Rain", paal: "Arathupal" },
  { number: 3, nameTamil: "நீத்தார் பெருமை", nameEnglish: "Greatness of Ascetics", paal: "Arathupal" },
  { number: 4, nameTamil: "அறன்வலியுறுத்தல்", nameEnglish: "Assertion of Virtue", paal: "Arathupal" },
  { number: 5, nameTamil: "இல்வாழ்க்கை", nameEnglish: "Domestic Life", paal: "Arathupal" },
  { number: 6, nameTamil: "வாழ்க்கைத் துணைநலம்", nameEnglish: "Excellence of Spouse", paal: "Arathupal" },
  { number: 7, nameTamil: "மக்கட்பேறு", nameEnglish: "Blessing of Children", paal: "Arathupal" },
  { number: 8, nameTamil: "அன்புடைமை", nameEnglish: "Possession of Love", paal: "Arathupal" },
  { number: 9, nameTamil: "விருந்தோம்பல்", nameEnglish: "Hospitality", paal: "Arathupal" },
  { number: 10, nameTamil: "இனியவைகூறல்", nameEnglish: "Speaking Pleasant Words", paal: "Arathupal" },
  { number: 11, nameTamil: "செய்ந்நன்றியறிதல்", nameEnglish: "Gratitude", paal: "Arathupal" },
  { number: 12, nameTamil: "நடுவு நிலைமை", nameEnglish: "Impartiality", paal: "Arathupal" },
  { number: 13, nameTamil: "அடக்கமுடைமை", nameEnglish: "Self-Control", paal: "Arathupal" },
  { number: 14, nameTamil: "ஒழுக்கமுடைமை", nameEnglish: "Good Conduct", paal: "Arathupal" },
  { number: 15, nameTamil: "பிறனில் விழையாமை", nameEnglish: "Not Coveting Another's Wife", paal: "Arathupal" },
  { number: 16, nameTamil: "பொறையுடைமை", nameEnglish: "Forbearance", paal: "Arathupal" },
  { number: 17, nameTamil: "அழுக்காறாமை", nameEnglish: "Not Envying", paal: "Arathupal" },
  { number: 18, nameTamil: "வெஃகாமை", nameEnglish: "Not Coveting", paal: "Arathupal" },
  { number: 19, nameTamil: "புறங்கூறாமை", nameEnglish: "Not Backbiting", paal: "Arathupal" },
  { number: 20, nameTamil: "பயனில சொல்லாமை", nameEnglish: "Not Speaking Profitless Words", paal: "Arathupal" },
  { number: 21, nameTamil: "தீவினையச்சம்", nameEnglish: "Dread of Evil Deeds", paal: "Arathupal" },
  { number: 22, nameTamil: "ஒப்புரவறிதல்", nameEnglish: "Duty to Society", paal: "Arathupal" },
  { number: 23, nameTamil: "ஈகை", nameEnglish: "Giving", paal: "Arathupal" },
  { number: 24, nameTamil: "புகழ்", nameEnglish: "Fame", paal: "Arathupal" },
  { number: 25, nameTamil: "அருளுடைமை", nameEnglish: "Compassion", paal: "Arathupal" },
  { number: 26, nameTamil: "புலான்மறுத்தல்", nameEnglish: "Abstinence from Meat", paal: "Arathupal" },
  { number: 27, nameTamil: "தவம்", nameEnglish: "Penance", paal: "Arathupal" },
  { number: 28, nameTamil: "கூடா ஒழுக்கம்", nameEnglish: "Inconsistent Conduct", paal: "Arathupal" },
  { number: 29, nameTamil: "கள்ளாமை", nameEnglish: "Not Stealing", paal: "Arathupal" },
  { number: 30, nameTamil: "வாய்மை", nameEnglish: "Truthfulness", paal: "Arathupal" },
  { number: 31, nameTamil: "வெகுளாமை", nameEnglish: "Not Being Angry", paal: "Arathupal" },
  { number: 32, nameTamil: "இன்னா செய்யாமை", nameEnglish: "Not Causing Harm", paal: "Arathupal" },
  { number: 33, nameTamil: "கொல்லாமை", nameEnglish: "Not Killing", paal: "Arathupal" },
  { number: 34, nameTamil: "நிலையாமை", nameEnglish: "Impermanence", paal: "Arathupal" },
  { number: 35, nameTamil: "துறவு", nameEnglish: "Renunciation", paal: "Arathupal" },
  { number: 36, nameTamil: "மெய்யுணர்தல்", nameEnglish: "Knowledge of Truth", paal: "Arathupal" },
  { number: 37, nameTamil: "அவாவறுத்தல்", nameEnglish: "Eradication of Desire", paal: "Arathupal" },
  { number: 38, nameTamil: "ஊழ்", nameEnglish: "Fate", paal: "Arathupal" },

  // Porutpal (Wealth/Polity) - Chapters 39-108
  { number: 39, nameTamil: "இறைமாட்சி", nameEnglish: "The Greatness of a King", paal: "Porutpal" },
  { number: 40, nameTamil: "கல்வி", nameEnglish: "Learning", paal: "Porutpal" },
  { number: 41, nameTamil: "கல்லாமை", nameEnglish: "Ignorance", paal: "Porutpal" },
  { number: 42, nameTamil: "கேள்வி", nameEnglish: "Listening", paal: "Porutpal" },
  { number: 43, nameTamil: "அறிவுடைமை", nameEnglish: "Knowledge", paal: "Porutpal" },
  { number: 44, nameTamil: "குற்றங்கடிதல்", nameEnglish: "Guarding Against Faults", paal: "Porutpal" },
  { number: 45, nameTamil: "பெரியாரைத் துணைக்கோடல்", nameEnglish: "Seeking the Aid of Great Men", paal: "Porutpal" },
  { number: 46, nameTamil: "சிற்றினஞ்சேராமை", nameEnglish: "Avoiding Mean Company", paal: "Porutpal" },
  { number: 47, nameTamil: "தெரிந்து செயல்வகை", nameEnglish: "Acting After Due Consideration", paal: "Porutpal" },
  { number: 48, nameTamil: "வலியறிதல்", nameEnglish: "Knowing Strength", paal: "Porutpal" },
  { number: 49, nameTamil: "காலமறிதல்", nameEnglish: "Knowing the Time", paal: "Porutpal" },
  { number: 50, nameTamil: "இடனறிதல்", nameEnglish: "Knowing the Place", paal: "Porutpal" },
  { number: 51, nameTamil: "தெரிந்துதெளிதல்", nameEnglish: "Selection and Confidence", paal: "Porutpal" },
  { number: 52, nameTamil: "தெரிந்துவினையாடல்", nameEnglish: "Acting After Deliberation", paal: "Porutpal" },
  { number: 53, nameTamil: "சுற்றந்தழால்", nameEnglish: "Cherishing Kinsmen", paal: "Porutpal" },
  { number: 54, nameTamil: "பொச்சாவாமை", nameEnglish: "Not Being Negligent", paal: "Porutpal" },
  { number: 55, nameTamil: "செங்கோன்மை", nameEnglish: "Ruling with Justice", paal: "Porutpal" },
  { number: 56, nameTamil: "கொடுங்கோன்மை", nameEnglish: "Cruel Governance", paal: "Porutpal" },
  { number: 57, nameTamil: "வெருவந்த செய்யாமை", nameEnglish: "Not Fearing", paal: "Porutpal" },
  { number: 58, nameTamil: "கண்ணோட்டம்", nameEnglish: "Benignity", paal: "Porutpal" },
  { number: 59, nameTamil: "ஒற்றாடல்", nameEnglish: "Espionage", paal: "Porutpal" },
  { number: 60, nameTamil: "ஊக்கமுடைமை", nameEnglish: "Energy", paal: "Porutpal" },
  { number: 61, nameTamil: "மடியின்மை", nameEnglish: "Lack of Laziness", paal: "Porutpal" },
  { number: 62, nameTamil: "ஆள்வினையுடைமை", nameEnglish: "Manly Effort", paal: "Porutpal" },
  { number: 63, nameTamil: "இடுக்கணழியாமை", nameEnglish: "Not Desponding in Trouble", paal: "Porutpal" },
  { number: 64, nameTamil: "அமைச்சு", nameEnglish: "The Office of Minister", paal: "Porutpal" },
  { number: 65, nameTamil: "சொல்வன்மை", nameEnglish: "Power of Speech", paal: "Porutpal" },
  { number: 66, nameTamil: "வினைத்தூய்மை", nameEnglish: "Purity in Action", paal: "Porutpal" },
  { number: 67, nameTamil: "வினைத்திட்பம்", nameEnglish: "Firmness in Action", paal: "Porutpal" },
  { number: 68, nameTamil: "வினைசெயல்வகை", nameEnglish: "Modes of Action", paal: "Porutpal" },
  { number: 69, nameTamil: "தூது", nameEnglish: "Embassy", paal: "Porutpal" },
  { number: 70, nameTamil: "மன்னரைச் சேர்ந்தொழுகல்", nameEnglish: "Conduct in the Presence of King", paal: "Porutpal" },
  { number: 71, nameTamil: "குறிப்பறிதல்", nameEnglish: "Reading the Mind", paal: "Porutpal" },
  { number: 72, nameTamil: "அவையறிதல்", nameEnglish: "Understanding the Council", paal: "Porutpal" },
  { number: 73, nameTamil: "அவையஞ்சாமை", nameEnglish: "Not Fearing the Council", paal: "Porutpal" },
  { number: 74, nameTamil: "நாடு", nameEnglish: "The Land", paal: "Porutpal" },
  { number: 75, nameTamil: "அரண்", nameEnglish: "The Fortress", paal: "Porutpal" },
  { number: 76, nameTamil: "பொருள்செயல்வகை", nameEnglish: "Means of Accumulating Wealth", paal: "Porutpal" },
  { number: 77, nameTamil: "படைமாட்சி", nameEnglish: "The Excellence of Army", paal: "Porutpal" },
  { number: 78, nameTamil: "படைச்செருக்கு", nameEnglish: "Military Strength", paal: "Porutpal" },
  { number: 79, nameTamil: "நட்பு", nameEnglish: "Friendship", paal: "Porutpal" },
  { number: 80, nameTamil: "நட்பாராய்தல்", nameEnglish: "Investigation of Friends", paal: "Porutpal" },
  { number: 81, nameTamil: "பழைமை", nameEnglish: "Old Friendship", paal: "Porutpal" },
  { number: 82, nameTamil: "தீநட்பு", nameEnglish: "Evil Friendship", paal: "Porutpal" },
  { number: 83, nameTamil: "கூடாநட்பு", nameEnglish: "Unreal Friendship", paal: "Porutpal" },
  { number: 84, nameTamil: "பேதைமை", nameEnglish: "Folly", paal: "Porutpal" },
  { number: 85, nameTamil: "புல்லறிவாண்மை", nameEnglish: "Ignorance", paal: "Porutpal" },
  { number: 86, nameTamil: "இகல்", nameEnglish: "Enmity", paal: "Porutpal" },
  { number: 87, nameTamil: "பகைமாட்சி", nameEnglish: "Greatness of Enemy", paal: "Porutpal" },
  { number: 88, nameTamil: "பகைத்திறந்தெரிதல்", nameEnglish: "Knowing the Quality of Enmity", paal: "Porutpal" },
  { number: 89, nameTamil: "உட்பகை", nameEnglish: "Internal Enmity", paal: "Porutpal" },
  { number: 90, nameTamil: "பெரியாரைப் பிழையாமை", nameEnglish: "Not Offending the Great", paal: "Porutpal" },
  { number: 91, nameTamil: "பெண்வழிச்சேறல்", nameEnglish: "Being Led by Women", paal: "Porutpal" },
  { number: 92, nameTamil: "வரைவின்மகளிர்", nameEnglish: "Wanton Women", paal: "Porutpal" },
  { number: 93, nameTamil: "கள்ளுண்ணாமை", nameEnglish: "Not Drinking Liquor", paal: "Porutpal" },
  { number: 94, nameTamil: "சூது", nameEnglish: "Gambling", paal: "Porutpal" },
  { number: 95, nameTamil: "மருந்து", nameEnglish: "Medicine", paal: "Porutpal" },
  { number: 96, nameTamil: "குடிமை", nameEnglish: "Nobility", paal: "Porutpal" },
  { number: 97, nameTamil: "மானம்", nameEnglish: "Honor", paal: "Porutpal" },
  { number: 98, nameTamil: "பெருமை", nameEnglish: "Greatness", paal: "Porutpal" },
  { number: 99, nameTamil: "சான்றாண்மை", nameEnglish: "Perfectness", paal: "Porutpal" },
  { number: 100, nameTamil: "பண்புடைமை", nameEnglish: "Courtesy", paal: "Porutpal" },
  { number: 101, nameTamil: "நன்றியில்செல்வம்", nameEnglish: "Wealth Without Gratitude", paal: "Porutpal" },
  { number: 102, nameTamil: "நாணுடைமை", nameEnglish: "Sense of Shame", paal: "Porutpal" },
  { number: 103, nameTamil: "குடிசெயல்வகை", nameEnglish: "Maintaining Family Tradition", paal: "Porutpal" },
  { number: 104, nameTamil: "உழவு", nameEnglish: "Agriculture", paal: "Porutpal" },
  { number: 105, nameTamil: "நல்குரவு", nameEnglish: "Poverty", paal: "Porutpal" },
  { number: 106, nameTamil: "இரவு", nameEnglish: "Begging", paal: "Porutpal" },
  { number: 107, nameTamil: "இரவச்சம்", nameEnglish: "Dread of Begging", paal: "Porutpal" },
  { number: 108, nameTamil: "கயமை", nameEnglish: "Baseness", paal: "Porutpal" },

  // Kamathupal (Love) - Chapters 109-133
  { number: 109, nameTamil: "தகையணங்குறுத்தல்", nameEnglish: "Praising Her Beauty", paal: "Kamathupal" },
  { number: 110, nameTamil: "குறிப்பறிவுறுத்தல்", nameEnglish: "Recognizing the Signs", paal: "Kamathupal" },
  { number: 111, nameTamil: "புணர்ச்சிவிதும்பல்", nameEnglish: "Rejoicing in Union", paal: "Kamathupal" },
  { number: 112, nameTamil: "நலம்புனைந்துரைத்தல்", nameEnglish: "Praise of Her Beauty", paal: "Kamathupal" },
  { number: 113, nameTamil: "காதற்சிறப்புரைத்தல்", nameEnglish: "Describing the Excellence of Love", paal: "Kamathupal" },
  { number: 114, nameTamil: "நாணுத்துறவுரைத்தல்", nameEnglish: "Abandoning Shyness", paal: "Kamathupal" },
  { number: 115, nameTamil: "அலரறிவுறுத்தல்", nameEnglish: "Awareness of Rumor", paal: "Kamathupal" },
  { number: 116, nameTamil: "பிரிவாற்றாமை", nameEnglish: "Inability to Bear Separation", paal: "Kamathupal" },
  { number: 117, nameTamil: "படர்மெலிந்திரங்கல்", nameEnglish: "Pining in Pallor", paal: "Kamathupal" },
  { number: 118, nameTamil: "கண்விதுப்பழிதல்", nameEnglish: "Blaming the Eyes", paal: "Kamathupal" },
  { number: 119, nameTamil: "பசப்புறுபருவரல்", nameEnglish: "Pallor of Separation", paal: "Kamathupal" },
  { number: 120, nameTamil: "தனிப்படர்மிகுதி", nameEnglish: "Excessiveness of Solitary Suffering", paal: "Kamathupal" },
  { number: 121, nameTamil: "நினைந்தவர்புலம்பல்", nameEnglish: "Lament of Thought", paal: "Kamathupal" },
  { number: 122, nameTamil: "கனவுநிலையுரைத்தல்", nameEnglish: "Describing the Dream State", paal: "Kamathupal" },
  { number: 123, nameTamil: "பொழுதுகண்டிரங்கல்", nameEnglish: "Lamenting at Different Times", paal: "Kamathupal" },
  { number: 124, nameTamil: "உறுப்புநலனழிதல்", nameEnglish: "Loss of Bodily Beauty", paal: "Kamathupal" },
  { number: 125, nameTamil: "நெஞ்சொடுகிளத்தல்", nameEnglish: "Addressing the Heart", paal: "Kamathupal" },
  { number: 126, nameTamil: "நிறையழிதல்", nameEnglish: "Loss of Modesty", paal: "Kamathupal" },
  { number: 127, nameTamil: "அவர்வயின்விதும்பல்", nameEnglish: "Rejoicing in Him", paal: "Kamathupal" },
  { number: 128, nameTamil: "குறிப்பறிவுறுத்தல்", nameEnglish: "Sending the Messenger", paal: "Kamathupal" },
  { number: 129, nameTamil: "புணர்ச்சிவிதும்பல்", nameEnglish: "Lamenting the Infidelity", paal: "Kamathupal" },
  { number: 130, nameTamil: "நெஞ்சொடுபுலத்தல்", nameEnglish: "Complaining to the Heart", paal: "Kamathupal" },
  { number: 131, nameTamil: "புலவி", nameEnglish: "Feigned Anger", paal: "Kamathupal" },
  { number: 132, nameTamil: "புலவிநுணுக்கம்", nameEnglish: "Subtlety of Feigned Anger", paal: "Kamathupal" },
  { number: 133, nameTamil: "ஊடலுவகை", nameEnglish: "The Pleasure of Sulking", paal: "Kamathupal" },
];

const kurals = [
  {
    number: 1,
    adhigaramNumber: 1,
    tamilText: "அகர முதல எழுத்தெல்லாம் ஆதி\nபகவன் முதற்றே உலகு",
    purul: "எழுத்துக்கள் அனைத்தும் 'அ' என்ற எழுத்தை முதன்மையாகக் கொண்டு தொடங்குகின்றன. அதுபோல், இந்த உலகம் முழுவதும் கடவுளை அடிப்படையாகக் கொண்டு இயங்குகிறது. எழுத்துக்களுக்கு 'அ' எவ்வளவு முக்கியமோ, அதுபோல் உலகத்திற்கு கடவுள் அவ்வளவு முக்கியம்.",
    paal: "Arathupal"
  },
  {
    number: 2,
    adhigaramNumber: 1,
    tamilText: "கற்றதனால் ஆய பயனென்கொல் வாலறிவன்\nநற்றாள் தொழாஅர் எனின்",
    purul: "ஒருவர் எவ்வளவுதான் கல்வி கற்றிருந்தாலும், குற்றமற்ற திருவடிகளை உடைய இறைவனை வணங்காவிட்டால், அந்தக் கல்வியால் என்ன பயன்? உண்மையான அறிவு என்பது இறைவனை அறிந்து வணங்குவதில் தான் உள்ளது.",
    paal: "Arathupal"
  },
  {
    number: 3,
    adhigaramNumber: 1,
    tamilText: "மலர்மிசை ஏகினான் மாணடி சேர்ந்தார்\nநிலமிசை நீடுவாழ் வார்",
    purul: "தாமரை மலரின் மீது வீற்றிருக்கும் இறைவனின் சிறந்த திருவடிகளை அடைந்தவர்கள், இந்த உலகில் நீண்ட காலம் சிறப்புடன் வாழ்வார்கள். இறைவனை அடைவதே நிலையான வாழ்வின் ரகசியம்.",
    paal: "Arathupal"
  },
  {
    number: 4,
    adhigaramNumber: 1,
    tamilText: "வேண்டுதல் வேண்டாமை இலானடி சேர்ந்தார்க்கு\nயாண்டும் இடும்பை இல",
    purul: "இது வேண்டும், இது வேண்டாம் என்ற விருப்பு வெறுப்புகள் இல்லாத இறைவனின் திருவடிகளை அடைந்தவர்களுக்கு, எந்த இடத்திலும், எந்த காலத்திலும் துன்பம் என்பது இருக்காது. இறை அருள் என்பது முழுமையான அமைதியைத் தரும்.",
    paal: "Arathupal"
  },
  {
    number: 5,
    adhigaramNumber: 1,
    tamilText: "இருள்சேர் இருவினையும் சேரா இறைவன்\nபொருள்சேர் புகழ்புரிந்தார் மாட்டு",
    purul: "இருளைப் போன்ற அறியாமையும், நல்வினை தீவினை என்ற இரு வகையான கர்மங்களும் சேராது. யாருக்கு? இறைவனின் உண்மையான பொருளை உணர்ந்து, அவனது புகழை எப்போதும் சொல்லிக்கொண்டிருப்பவர்களுக்கு.",
    paal: "Arathupal"
  },
  {
    number: 6,
    adhigaramNumber: 1,
    tamilText: "பொறிவாயில் ஐந்தவித்தான் பொய்தீர் ஒழுக்க\nநெறிநின்றார் நீடுவாழ் வார்",
    purul: "கண், காது, மூக்கு, நாக்கு, தோல் என்ற ஐந்து புலன்களையும் கட்டுப்படுத்தி, பொய் இல்லாத உண்மையான ஒழுக்கத்தின் நெறியில் உறுதியாக நிற்பவர்கள், இந்த உலகில் நீண்ட காலம் சிறப்பாக வாழ்வார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 7,
    adhigaramNumber: 1,
    tamilText: "தனக்குவமை இல்லாதான் தாள்சேர்ந்தார்க்கு அல்லால்\nமனக்கவலை மாற்றல் அரிது",
    purul: "இந்த உலகில் தனக்கு இணையானவர் யாரும் இல்லாத இறைவனின் திருவடிகளை அடைந்தவர்களைத் தவிர, மற்றவர்களுக்கு மனதில் உள்ள கவலைகளையும் துன்பங்களையும் போக்குவது மிகவும் கடினம்.",
    paal: "Arathupal"
  },
  {
    number: 8,
    adhigaramNumber: 1,
    tamilText: "அறவாழி அந்தணன் தாள்சேர்ந்தார்க்கு அல்லால்\nபிறவாழி நீந்தல் அரிது",
    purul: "அறம் என்ற கடலைப் போன்ற பெரிய குணம் கொண்ட இறைவனின் திருவடிகளை அடைந்தவர்களைத் தவிர, மற்றவர்கள் பிறவி என்ற பெரிய கடலைக் கடப்பது மிகவும் கடினமான காரியம். இறைவன் அருளே பிறவிக் கடலைக் கடக்க உதவும்.",
    paal: "Arathupal"
  },
  {
    number: 9,
    adhigaramNumber: 1,
    tamilText: "கோளில் பொறியில் குணமிலவே எண்குணத்தான்\nதாளை வணங்காத் தலை",
    purul: "கேடு இல்லாதது, புலன் அடக்கம் இல்லாதது, நல்ல குணங்கள் இல்லாதது எது? எண்ணற்ற நல்ல குணங்களை உடைய இறைவனின் திருவடிகளை வணங்காத தலை. இறைவனை வணங்காத வாழ்க்கை வீணானது.",
    paal: "Arathupal"
  },
  {
    number: 10,
    adhigaramNumber: 1,
    tamilText: "குற்றேவல் செய்தொழுகு வான்மேல் நிற்கும்\nபொற்றேவல் செய்தொழுகு வார்க்கு",
    purul: "இறைவனுக்கு அன்பான சேவைகளைச் செய்து, தொண்டு செய்து வாழ்பவர்களுக்கு மேலே, தேவர்கள் கூட அவர்களுக்கு பொன் தட்டில் பணிவிடை செய்வார்கள். இறைத்தொண்டே உயர்ந்த வாழ்க்கை.",
    paal: "Arathupal"
  },
  {
    number: 11,
    adhigaramNumber: 2,
    tamilText: "வான்நின்று உலகம் வழங்கி வருதலால்\nதான்அமிழ்தம் என்றுணரற் பாற்று",
    purul: "வானத்தில் இருந்து மழை பெய்து இந்த உலகத்தை இயங்கச் செய்வதால், மழையானது அமிழ்தம் (தேவர்களின் உணவு) என்று அறியத்தக்கது. மழை இல்லாமல் உலகம் இயங்க முடியாது என்பதால், அது தேவர்களின் அமிழ்தத்தைப் போன்றது.",
    paal: "Arathupal"
  },
  {
    number: 12,
    adhigaramNumber: 2,
    tamilText: "துப்பார்க்குத் துப்பாய துப்பாக்கித் துப்பார்க்குத்\nதுப்பாய தூஉம் மழை",
    purul: "உண்பவர்களுக்கு உணவாக இருப்பதை உற்பத்தி செய்து, உண்பவர்களுக்கு உணவாக இருப்பதைத் தூய்மையாக்குவதும் மழையே. மழை உணவை உற்பத்தி செய்வதோடு மட்டுமல்லாமல், அதை சுத்தமாகவும் வைத்திருக்கிறது.",
    paal: "Arathupal"
  },
  {
    number: 13,
    adhigaramNumber: 2,
    tamilText: "விண்இன்று பொய்ப்பின் விரிநீர் வியனுலகத்து\nஉள்நின்று உடற்றும் பசி",
    purul: "வானம் மழை பொய்த்து விட்டால், பரந்த கடல்களால் சூழப்பட்ட இந்த பெரிய உலகத்தில், உள்ளிருந்து பசி என்பது எல்லாவற்றையும் அழித்துவிடும். மழை இல்லையென்றால் பஞ்சம் ஏற்பட்டு, உலகமே அழியும்.",
    paal: "Arathupal"
  },
  {
    number: 14,
    adhigaramNumber: 2,
    tamilText: "ஏரின் உழாஅர் உழவர் புயல்என்னும்\nவாரி வளங்குன்றிக் கால்",
    purul: "மழை என்று சொல்லப்படும் நீரின் வளம் குறைந்துவிட்டால், உழவர்கள் ஏர் கொண்டு உழுவதில்லை. மழை இல்லாவிட்டால் விவசாயம் நடக்காது என்பதால், விவசாயிகள் வேலை செய்யவே மாட்டார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 15,
    adhigaramNumber: 2,
    tamilText: "கெடுப்பதூஉம் கெட்டார்க்குச் சார்வாய்மற்று ஆங்கே\nஎடுப்பதூஉம் எல்லாம் மழை",
    purul: "அழிப்பதும் மழைதான், அழிந்தவர்களுக்கு ஆதரவாக இருப்பதும் மழைதான், மீண்டும் எழுப்புவதும் மழைதான். மழை பெய்யாவிட்டால் எல்லாம் அழியும், பெய்தால் எல்லாம் மீண்டும் வளரும்.",
    paal: "Arathupal"
  },
  {
    number: 16,
    adhigaramNumber: 2,
    tamilText: "விசும்பின் துளிவீழின் அல்லால்மற்று ஆங்கே\nபசும்புல் தலைகாண்பு அரிது",
    purul: "வானத்தில் இருந்து மழைத்துளி விழுந்தால் தவிர, இல்லையென்றால் பசுமையான புல் முளைப்பதைக் காண்பது கடினம். ஒரு சிறு புல்லுக்கு கூட மழை அவசியம் என்பதை இது உணர்த்துகிறது.",
    paal: "Arathupal"
  },
  {
    number: 17,
    adhigaramNumber: 2,
    tamilText: "ஆரம் துளிக்கும் அமிழ்தம்போல் மற்றுயிர்க்கு\nஊரம் துளிக்கும் மழை",
    purul: "தேவர்களுக்கு அமிழ்தம் ஒவ்வொரு துளியாக நீண்ட ஆயுளைக் கொடுப்பது போல, உலகில் உள்ள உயிர்களுக்கு மழை ஒவ்வொரு துளியாக நீண்ட வாழ்வைக் கொடுக்கிறது. மழை இல்லாமல் உயிர் வாழ்வது கடினம்.",
    paal: "Arathupal"
  },
  {
    number: 18,
    adhigaramNumber: 2,
    tamilText: "உயிரினம் இல்லிவண் ஆயினும் பாயிரண்டு\nஅன்னா தியாதெனின் வேண்டா மழை",
    purul: "இந்த உலகில் உயிரினங்கள் இல்லை என்றாலும், மழை இல்லை என்றால் கடல் மற்றும் நிலம் இரண்டும் என்ன பயன்? அவை எதற்கும் உதவாது. மழையே உலகத்தின் அடிப்படை.",
    paal: "Arathupal"
  },
  {
    number: 19,
    adhigaramNumber: 2,
    tamilText: "நெடுங்கடலும் தன்நீர்மை குன்றும் தடிந்துஎழிலி\nதான்நல்கா தாகி விடின்",
    purul: "மேகங்கள் உயர்ந்து நின்று தன் நீரை (மழையாக) கொடுக்காமல் இருந்துவிட்டால், பெரிய கடல் கூட தன் நீரின் தன்மையை இழந்துவிடும். மழை இல்லாமல் கடல் கூட வற்றிவிடும்.",
    paal: "Arathupal"
  },
  {
    number: 20,
    adhigaramNumber: 2,
    tamilText: "சிறப்பொடு பூசனை செல்லாது வானம்\nவறக்குமேல் வானோர்க்கும் ஈண்டு",
    purul: "வானம் மழை பெய்யாமல் வறண்டுவிட்டால், இந்த உலகில் சிறப்பான பூஜைகள் கூட நடக்காது. தேவர்களுக்கும் பூஜை செய்ய முடியாமல் போகும். மழையின்றி வழிபாடும் நடக்காது.",
    paal: "Arathupal"
  },
  {
    number: 21,
    adhigaramNumber: 3,
    tamilText: "ஒழுக்கத்து நீத்தார் பெருமை விழுப்பத்து\nவேண்டும் பனுவல் துணிவு",
    purul: "உலக இன்பங்களை விட்டு, ஒழுக்கத்தில் நிலைத்திருக்கும் துறவிகளின் பெருமையை அறிய விரும்பினால், மிகச் சிறந்த நூல்களின் முடிவை ஆராய வேண்டும். துறவிகளின் உண்மையான மகத்துவம் மிகப் பெரியது.",
    paal: "Arathupal"
  },
  {
    number: 22,
    adhigaramNumber: 3,
    tamilText: "துறந்தார்க்குத் துவ்வாதவர் இல்லை யிறந்தார்க்கு\nஇல்லை யுயிர் மேல் பசி",
    purul: "எல்லாவற்றையும் துறந்தவர்களுக்கு, இந்த உலகில் சமமானவர்கள் யாரும் இல்லை. இறந்தவர்களுக்கு உடம்பின் மேல் பசி இல்லாதது போல, துறவிகளுக்கு உலக ஆசைகள் மேல் பற்று இல்லை.",
    paal: "Arathupal"
  },
  {
    number: 23,
    adhigaramNumber: 3,
    tamilText: "இருமை வகைதெரிந்து ஈண்டுஅறம் பூண்டார்\nபெருமை பிறங்கிற்று உலகு",
    purul: "இம்மை (இந்த பிறவி) மற்றும் மறுமை (அடுத்த பிறவி) இரண்டின் உண்மையையும் தெரிந்து கொண்டு, இந்த உலகில் அறத்தை மேற்கொண்டவர்களின் பெருமை உலகம் முழுவதும் பிரகாசமாக விளங்குகிறது.",
    paal: "Arathupal"
  },
  {
    number: 24,
    adhigaramNumber: 3,
    tamilText: "உரன்என்னும் தோட்டியான் ஓரைந்தும் காப்பான்\nவரன்என்னும் வைப்பிற்கோர் வித்து",
    purul: "உறுதி என்னும் கருவியால் ஐந்து புலன்களையும் காக்கிறவன், சிறந்த வரம் என்று சொல்லப்படும் முக்தி என்ற களஞ்சியத்திற்கு ஒரு விதை போன்றவன். புலனடக்கமே முக்தியின் தொடக்கம்.",
    paal: "Arathupal"
  },
  {
    number: 25,
    adhigaramNumber: 3,
    tamilText: "ஐந்தவித்தான் ஆற்றல் அகல்விசும்பு ளார்கோமான்\nஇந்திரனே சாலுங் கரி",
    purul: "ஐந்து புலன்களையும் அடக்கியவனின் வலிமைக்கு, பரந்த வானுலகில் உள்ள தேவர்களின் அரசனான இந்திரனே சிறந்த சான்று. இந்திரன் புலனடக்கத்தால் தான் தேவர்களின் தலைவனானான்.",
    paal: "Arathupal"
  },
  {
    number: 26,
    adhigaramNumber: 3,
    tamilText: "செயற்கரிய யாவுள? அவுள் துறக்கம்\nபயற்கரிய யாவுள? அவுள் பற்று",
    purul: "செய்வதற்கு மிகவும் கடினமானது எது? துறவு. பயன் பெறுவதற்கு மிகவும் கடினமானது எது? உலக பொருள்களின் மீதான பற்று. துறவு செய்வதும் கடினம், பற்றை விடுவதும் கடினம்.",
    paal: "Arathupal"
  },
  {
    number: 27,
    adhigaramNumber: 3,
    tamilText: "அறவினை யாதெனின் கொல்லாமை யகோதி\nமறவினை யாதெனின் கொல்",
    purul: "அறச்செயல் என்றால் என்ன? கொல்லாமை என்பது முதன்மையான அறம். மாறுபட்ட அறமற்ற செயல் என்றால் என்ன? கொல்லுதல். உயிர்களைக் காப்பதே மிகப்பெரிய அறம்.",
    paal: "Arathupal"
  },
  {
    number: 28,
    adhigaramNumber: 3,
    tamilText: "பற்றற்ற கண்ணே பிறப்பறுக்கும் மற்றெஃதும்\nவேண்டா வினைக்கு நின்று",
    purul: "பற்றுக்கள் அனைத்தும் அற்றுப் போன உடனேயே, பிறவித் துன்பம் அறுந்துவிடும். பிறவியை அறுக்க வேறு எந்த செயல்களையும் செய்து நிற்க வேண்டியதில்லை. பற்று அற்றதே விடுதலை.",
    paal: "Arathupal"
  },
  {
    number: 29,
    adhigaramNumber: 3,
    tamilText: "வேண்டின்உண் டாகத் துறக்க துறந்தபின்\nஈண்டுஇயற் பால பல",
    purul: "துறக்க வேண்டும் என்று நினைத்தால், உணவு கிடைக்கும் காலத்தில் துறக்க வேண்டும். துறந்த பிறகு, இந்த உலகில் இயற்கையாகவே பல நன்மைகள் கிடைக்கும். சரியான நேரத்தில் துறவு மேற்கொள்வது முக்கியம்.",
    paal: "Arathupal"
  },
  {
    number: 30,
    adhigaramNumber: 3,
    tamilText: "அஞ்சுவது யாவுள? அறிவது யாவுள்? அஞ்சல்\nஅஞ்சுவது யாவுள? கடை",
    purul: "அஞ்ச வேண்டியது என்ன? தீமை. அறிய வேண்டியது என்ன? அறிவு. அஞ்சக்கூடாதது என்ன? துன்பம். இறுதியில் அஞ்ச வேண்டியது என்ன? மரணம். தீமைக்கு அஞ்சி, அறிவை வளர்த்து, துன்பத்திற்கு அஞ்சாமல் வாழ வேண்டும்.",
    paal: "Arathupal"
  },
  {
    number: 31,
    adhigaramNumber: 4,
    tamilText: "அறத்தாற்றின் இல்வாழ்க்கை யாற்றின் புறத்தாற்றின்\nபோஒய்ப் பெறுவ தெவன்",
    purul: "அறநெறியில் இல்வாழ்க்கையை நடத்தினால், வெளியில் சென்று வேறு எதைப் பெற வேண்டும்? இல்லறத்திலேயே அறம் செய்தால், துறவு சென்று தேட வேண்டிய அனைத்தும் கிடைத்துவிடும்.",
    paal: "Arathupal"
  },
  {
    number: 32,
    adhigaramNumber: 4,
    tamilText: "அறத்தான் வருவதே இன்பம்மற் றெல்லாம்\nபுறத்த புகழும் இல",
    purul: "அறத்தின் மூலம் வருவதே உண்மையான இன்பம். மற்ற எல்லா இன்பங்களும் வெளிப்புறமானவை, நிலையற்றவை, உண்மையான புகழையும் தராதவை. அறத்தில் இருந்து வரும் இன்பமே நிலையானது.",
    paal: "Arathupal"
  },
  {
    number: 33,
    adhigaramNumber: 4,
    tamilText: "அழுக்கா றுடையான்கண் ஆக்கம்போன்று இல்லை\nவழுக்கா றுடையான்கண் வன்",
    purul: "பொறாமை கொண்டவனிடம் செல்வம் நிலைத்திருப்பது போல் தோன்றினாலும், குற்றமற்ற நல்லொழுக்கம் உடையவனிடம் உள்ள உறுதியான செல்வம் போல் இருக்காது. நல்லொழுக்கமே நிலையான செல்வத்தைத் தரும்.",
    paal: "Arathupal"
  },
  {
    number: 34,
    adhigaramNumber: 4,
    tamilText: "அன்றறிவாம் ஈன்ற பொழுதே அறிவி ல்லார்\nஎஞ்ஞான்றும் ஈன்ற இடத்து",
    purul: "அறிவுடையவர்கள் தாய் பெற்ற அன்றே தாயின் அன்பை அறிவார்கள். ஆனால் அறிவில்லாதவர்கள் எந்த நாளும் தாய் பெற்ற இடத்தில் (தாயின் அன்பை) அறியமாட்டார்கள். உண்மையான அறிவே அன்பை உணர வைக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 35,
    adhigaramNumber: 4,
    tamilText: "அறம்பொருள் இன்பம் உயிரச்சம் நான்கின்\nதிறந்தாங்கு தெரிந்தான் படும்",
    purul: "அறம், பொருள், இன்பம், வீடுபேறு என்ற நான்கு வகை வாழ்வின் உண்மையான தன்மைகளை முறையாக தெரிந்து கொண்டவன், அதற்கேற்ற பலனை அடைவான். இந்த நான்கையும் சரியாக அறிவதே வெற்றிகரமான வாழ்வு.",
    paal: "Arathupal"
  },
  {
    number: 36,
    adhigaramNumber: 4,
    tamilText: "அறனாகிய தெல்லாந் தரும்பதனாற் றானை\nமறவினை மற்றத் தொழி",
    purul: "அறமாக இருப்பது எல்லாம் நல்ல பலன்களைத் தருவதால், தன்னை தீய செயல்களில் இருந்து விலக்கிக் கொள்ள வேண்டும். அறம் செய்வது நன்மை தரும், தீமை செய்வது துன்பம் தரும்.",
    paal: "Arathupal"
  },
  {
    number: 37,
    adhigaramNumber: 4,
    tamilText: "அன்பி னாற்றாம் அறனல்லது ஒன்றுமில்லை\nவன்பி னாற்றாம் பசும்பொன் வரைத்",
    purul: "அன்பினால் செய்யக்கூடியது அறம் மட்டுமே. வன்மையால் (வலிமையால்) செய்ய முடிவது, பசும்பொன்னின் மலைக்குக் கூட எல்லையுண்டு. அன்பே அறத்தின் அடிப்படை, வலிமைக்கு எல்லை உண்டு.",
    paal: "Arathupal"
  },
  {
    number: 38,
    adhigaramNumber: 4,
    tamilText: "அறத்திற் சிறந்த தில்லை அதனை\nமறத்தின் இறப்பது இல்",
    purul: "அறத்தை விட சிறந்தது வேறு எதுவும் இல்லை. அந்த அறத்தை மறந்துவிடுவதை விட தீமையானதும் இல்லை. அறம் செய்வதே உயர்வு, அதை மறப்பதே இழிவு.",
    paal: "Arathupal"
  },
  {
    number: 39,
    adhigaramNumber: 4,
    tamilText: "ஒல்லும் வகையான் அறவினை ஓவாதே\nசெல்லும்வாய் எல்லாஞ் செயல்",
    purul: "தன்னால் இயன்ற வகையில் அறச்செயல்களை நிறுத்தாமல், செல்லும் வழிகள் எல்லாவற்றிலும் செய்து கொண்டே இருக்க வேண்டும். எப்போதும் அறம் செய்யும் மனப்பான்மை வேண்டும்.",
    paal: "Arathupal"
  },
  {
    number: 40,
    adhigaramNumber: 4,
    tamilText: "மனத்துக்கண் மாசிலன் ஆதல் அனைத்தறன்\nஆகுல நீர பிற",
    purul: "மனதில் மாசு இல்லாதவனாக இருப்பதே அறத்தின் அடிப்படை. மற்ற எல்லா அறச்செயல்களும் இதை அடிப்படையாகக் கொண்டவையே. தூய மனமே அனைத்து அறங்களுக்கும் வேர்.",
    paal: "Arathupal"
  },
  {
    number: 41,
    adhigaramNumber: 5,
    tamilText: "இல்வாழ்வான் என்பான் இயல்புடைய மூவர்க்கும்\nநல்லாற்றின் நின்ற துணை",
    purul: "இல்லறத்தில் வாழ்பவன் என்று சொல்லப்படுபவன், குணநலன் உடைய மூன்று வகையினருக்கும் (துறவிகள், தேவர்கள், முன்னோர்கள்) நல்ல வழியில் நின்று உதவி செய்யும் துணை. இல்லறம் மற்ற அனைவருக்கும் ஆதாரம்.",
    paal: "Arathupal"
  },
  {
    number: 42,
    adhigaramNumber: 5,
    tamilText: "துறந்தார்க்கும் துவ்வாதவர்க்கும் இறந்தார்க்கும்\nஇல்வாழ்வான் என்பான் துணை",
    purul: "துறவிகளுக்கும், சமமானவர்களுக்கும், இறந்து போனவர்களுக்கும் இல்வாழ்க்கை நடத்துபவனே துணையாக இருக்கிறான். இல்லறத்தான் அனைவருக்கும் உதவி செய்கிறான்.",
    paal: "Arathupal"
  },
  {
    number: 43,
    adhigaramNumber: 5,
    tamilText: "தென்புலத்தார் தெய்வம் விருந்தொக்கல் தானென்றாங்கு\nஐம்புலத்தா றோம்பல் தலை",
    purul: "இறந்த முன்னோர்கள், தெய்வம், விருந்தினர், உறவினர், தான் என்ற இந்த ஐந்து வகையினரையும் காப்பாற்றுவதே இல்லறத்தின் முக்கிய கடமை. இவர்களுக்கு உதவுவதே இல்வாழ்க்கையின் நோக்கம்.",
    paal: "Arathupal"
  },
  {
    number: 44,
    adhigaramNumber: 5,
    tamilText: "பழியென்பது பாவஞ் செய்யான் பழிஊழி\nஆற்றான் அரியா தலை",
    purul: "பாவம் என்று சொல்லப்படுவது தீமை செய்யாதிருப்பது. பழியை (நல்லதையும், கெட்டதையும்) பொறுத்துக்கொள்ளாதவன் தலைமை தாங்குவது கடினம். தீமை செய்யாமல் பழியையும் தாங்கும் பக்குவம் வேண்டும்.",
    paal: "Arathupal"
  },
  {
    number: 45,
    adhigaramNumber: 5,
    tamilText: "அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை\nபண்பும் பயனும் அது",
    purul: "அன்பும் அறமும் உடையதாக இல்வாழ்க்கை இருந்தால், அதுவே உண்மையான பண்பாகவும் பயனாகவும் இருக்கிறது. அன்பும் அறமும் இல்லறத்தின் இரு கண்கள்.",
    paal: "Arathupal"
  },
  {
    number: 46,
    adhigaramNumber: 5,
    tamilText: "அறத்தா றிதுவென்ப தனைத்துடையார்க் கியாதொன்றும்\nபுறத்த துண்மை பழி",
    purul: "அறத்தின் நெறியில் வாழ்வதாக சொல்லப்படுவது, அனைத்து குணங்களும் உடையவர்களுக்கு ஒன்றும் வெளிப்புறமான வெற்று பெயருக்காக இருக்கும் பழியல்ல. உள்ளும் புறமும் ஒன்றாக வாழ்வதே அறம்.",
    paal: "Arathupal"
  },
  {
    number: 47,
    adhigaramNumber: 5,
    tamilText: "அறன்ஆற்றி னிறப்பது பொறாஅன் அதனால்\nதரம்தாங்கி நிற்பது உயிர்",
    purul: "அறம் செய்வதால் கிடைக்கும் பலனை ஏற்றுக்கொள்ளாமல் இருக்க முடியாது. அதனால் தான் உயிர், அதன் பாரத்தை தாங்கிக்கொண்டு நிற்கிறது. அறத்தின் பலனே உயிருக்கு வலிமை.",
    paal: "Arathupal"
  },
  {
    number: 48,
    adhigaramNumber: 5,
    tamilText: "அன்போ டியைந்த வழக்கென்ப வையத்து\nஇன்புடைய யெல்லா உயிர்க்கு",
    purul: "அன்புடன் இயைந்த நடத்தையே, உலகத்தில் இன்பம் விரும்பும் அனைத்து உயிர்களுக்கும் சிறந்த வழக்கம் என்று சொல்வார்கள். அன்பான நடத்தையே அனைவருக்கும் இன்பம் தரும்.",
    paal: "Arathupal"
  },
  {
    number: 49,
    adhigaramNumber: 5,
    tamilText: "வையத்துள் வாழ்வாங் கியார் யாரெனின்\nதொட்டான்ற வையத்து ஊர் துய்த்தூன் பின்",
    purul: "உலகத்தில் வாழ்க்கையை சரியாக வாழ்ந்தவர்கள் யார் என்றால், தாம் பிறந்த உலகில் உள்ள ஊர்களில், தம் கடமையை முறையாக செய்த பின்னர் வாழ்ந்தவர்களே. கடமை உணர்வுடன் வாழ்வதே உண்மையான வாழ்க்கை.",
    paal: "Arathupal"
  },
  {
    number: 50,
    adhigaramNumber: 5,
    tamilText: "அன்புடையார் என்பும் உரு க்கணங்குள் மற்றையர்\nென்பென்று நின்று அற்று",
    purul: "அன்பு உடையவர்களின் எலும்புகள் கூட உருகும் தன்மை கொண்டவை. மற்றவர்களின் எலும்புகளோ, எலும்பு என்று பெயரளவில் மட்டும் இருந்து, கடினமாக உள்ளன. அன்பு உள்ளத்தை மென்மையாக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 51,
    adhigaramNumber: 6,
    tamilText: "மனைத்தக்க மாண்புடையள் ஆகித்தற் கொண்டான்\nவளத்தக்காள் வாழ்க்கைத் துணை",
    purul: "வீட்டிற்கு தகுந்த நல்ல பண்புகளை உடையவளாக இருந்து, கணவனுக்கு ஏற்றபடி அவன் செல்வத்திற்கு ஏற்றவாறு நடந்து கொள்பவளே, வாழ்க்கைத் துணையாக சிறந்தவள். நல்ல மனைவி இல்லத்தின் அழகு.",
    paal: "Arathupal"
  },
  {
    number: 52,
    adhigaramNumber: 6,
    tamilText: "மனைமாட்சி இல்லாள்கண் இல்லை யதிருமை\nஇல்லதூம் இல்லாள் கடை",
    purul: "இல்லத்தின் சிறப்பு நல்ல மனைவியிடம் இல்லையென்றால் இல்லை. அந்த இல்லத்தில் வறுமை இல்லாவிட்டாலும், நல்ல மனைவி இல்லாத இடத்தில் உண்மையான செல்வம் இல்லை. நல்ல மனைவியே இல்லத்தின் செல்வம்.",
    paal: "Arathupal"
  },
  {
    number: 53,
    adhigaramNumber: 6,
    tamilText: "பெண்ணின் பெருந்தக்க யாவுள? ஆயின்\nவாழ்க்கைத் துணைவி யா?",
    purul: "பெண்ணிற்கு மிகப் பெரிய சிறப்பு என்ன? அவள் தன் கணவனுக்கு வாழ்க்கையில் உண்மையான துணையாக இருப்பதே. துணையாக நடந்து கொள்வதே மனைவியின் உண்மையான பெருமை.",
    paal: "Arathupal"
  },
  {
    number: 54,
    adhigaramNumber: 6,
    tamilText: "மங்கலம் என்ப மனைமாட்சி மற்றொன்று\nதெங்கு உலகத்து இல்லை",
    purul: "மங்கலம் என்று சொல்லப்படுவது இல்லத்தில் உள்ள நல்ல மனைவியின் சிறப்பே. அதைத் தவிர தெளிவாக இந்த உலகத்தில் வேறு மங்கலம் இல்லை. நல்ல மனைவியே வாழ்வின் மங்கலம்.",
    paal: "Arathupal"
  },
  {
    number: 55,
    adhigaramNumber: 6,
    tamilText: "பெறின்பெறுவ தெல்லாம் பெறினும் பிறன்பெற்ற\nவாழ்க்கை வளர்வது பெறின்",
    purul: "பெறவேண்டிய எல்லாவற்றையும் பெற்றாலும், மற்றவர்கள் பாராட்டும் நல்ல மனைவியை பெற்று, வாழ்க்கை செழிப்பாக வளர்வதைப் பெறுவதே உண்மையான பேறு. நல்ல மனைவி எல்லா செல்வங்களையும் விட உயர்ந்தது.",
    paal: "Arathupal"
  },
  {
    number: 56,
    adhigaramNumber: 6,
    tamilText: "பெறாநற்ற களித்தே மகிழ்ந்து பெறினே\nமிகை நன்றி மக்களை பெறின்",
    purul: "பெறாத நல்ல பொருள்களை அடைந்தால் மகிழ்ச்சியடைந்து, பெற்றதில் மிகுந்த நன்றி உணர்வது, நல்ல பிள்ளைகளைப் பெற்றால் மட்டுமே. நல்ல மக்கள் பேறே மிகப்பெரிய மகிழ்ச்சி.",
    paal: "Arathupal"
  },
  {
    number: 57,
    adhigaramNumber: 6,
    tamilText: "தம்பொருள் என்பதம் மக்கள் அவர்பொருள்\nதாம்தம் வினையான் வரும்",
    purul: "தம்முடைய சொத்து என்று சொல்லப்படுவது தம் மக்களே. அந்த மக்களுக்குரிய சொத்து என்பது அவர்கள் செய்யும் தொழில் மூலம் வருவதே. மக்களே உண்மையான சொத்து, அவர்கள் உழைப்பே அவர்களுக்குரிய சொத்து.",
    paal: "Arathupal"
  },
  {
    number: 58,
    adhigaramNumber: 6,
    tamilText: "அமரர் ஏன்பாவில் பிறப்பினும் மானிடர்\nமமரர் ஏன்பாவில் பிறப்பு",
    purul: "தேவர்களாக பிறப்பதை விட, மனிதனாக பிறந்து நல்ல மக்களைப் பெறுவதே சிறந்த பிறவி. தேவ உலகில் பிறப்பதை விட, நல்ல குழந்தைகளுடன் மனித வாழ்க்கை வாழ்வதே மேலானது.",
    paal: "Arathupal"
  },
  {
    number: 59,
    adhigaramNumber: 6,
    tamilText: "ஈன்ற பொழுதி னனைந்தால் மக்கள்\nசான்றோன் எனப்படு வார்",
    purul: "பெற்ற தாய் குழந்தையை ஈன்ற காலத்திலேயே தழுவி அன்பு செய்தால், அந்த குழந்தைகள் பெரியவர்களாக வளர்ந்து, சான்றோர் என்று சொல்லப்படுபவர்களாக ஆவார்கள். தாயின் அன்பே குழந்தையின் நல்ல எதிர்காலம்.",
    paal: "Arathupal"
  },
  {
    number: 60,
    adhigaramNumber: 6,
    tamilText: "குழவி யிருப்பச் சிறு காலை யழுவித்து\nஅழுவ தன்பால் உழை",
    purul: "குழந்தை சிறியதாக இருக்கும் போதே, அதை தூய்மையாக்கி, அதன் அன்பான தன்மையால் உழைத்து வளர்க்க வேண்டும். சிறு வயதிலேயே குழந்தைக்கு நல்ல பண்புகளை கற்றுக்கொடுக்க வேண்டும்.",
    paal: "Arathupal"
  },
  {
    number: 61,
    adhigaramNumber: 7,
    tamilText: "மக்கள்மெய் தீண்டல் உடற்கின்பம் மற்றுஅவர்\nசொற்கேட்டல் இன்பம் செவிக்கு",
    purul: "பிள்ளைகளின் உடலை தொடுவது உடலுக்கு இன்பம் தரும், அவர்கள் பேசுவதை கேட்பது காதுகளுக்கு இன்பம் தரும். பிள்ளைகள் தரும் மகிழ்ச்சி அளவிட முடியாதது.",
    paal: "Arathupal"
  },
  {
    number: 62,
    adhigaramNumber: 7,
    tamilText: "குழல்இனி யாழினி யென்பதம் மக்கள்\nமழலைச்சொல் கேளா தவர்",
    purul: "குழல் இசை இனிமையானது, யாழ் இசை இனிமையானது என்று சொல்வது, பிள்ளைகளின் மழலை மொழியைக் கேட்காதவர்களே. குழந்தைகளின் பேச்சு எல்லா இசையையும் விட இனிமையானது.",
    paal: "Arathupal"
  },
  {
    number: 63,
    adhigaramNumber: 7,
    tamilText: "தம்மின் தமது மக்கள் அறி வுடைமை\nமாநிலத்து மன்னர்க் கினிய",
    purul: "தம்மை விட தம் மக்கள் அறிவுடையவர்களாக இருப்பது, பெரிய உலகத்தை ஆளும் அரசர்களுக்கும் மிகவும் இனிமையானது. பிள்ளைகள் தன்னை விட சிறந்திருப்பதே பெற்றோர்களின் பெருமை.",
    paal: "Arathupal"
  },
  {
    number: 64,
    adhigaramNumber: 7,
    tamilText: "ஈன்ற புண்ணிய பேணிக் கொளலாகும்\nசான்றோன் பிள்ளை பெறின்",
    purul: "பெற்ற நல்ல புண்ணியத்தை போற்றிக் காப்பாற்றிக் கொள்ளலாம், நல்ல குணம் உடைய சான்றோனாகிய பிள்ளையைப் பெற்றால். நல்ல மகன் பெறுவதே பெரிய புண்ணியம்.",
    paal: "Arathupal"
  },
  {
    number: 65,
    adhigaramNumber: 7,
    tamilText: "மகன்தந்தைக்கு ஆற்றும் உதவி இவன்தந்தை\nஎந்நோற் கினியானென் கேட்டு",
    purul: "மகன் தந்தைக்கு செய்யும் உதவி என்ன? இவன் தந்தை எந்த நல்ல தவம் செய்தவர் என்று மக்கள் கேட்கும்படி நடந்து கொள்வதே. மகன் நன்றாக இருந்தால் தந்தை பெருமை பெறுவார்.",
    paal: "Arathupal"
  },
  {
    number: 66,
    adhigaramNumber: 7,
    tamilText: "தந்தை மகற்கு ஆற்றும் நன்றி அவையத்து\nமந்தி மயங்கா செயல்",
    purul: "தந்தை தன் மகனுக்கு செய்யும் உதவி என்ன? அவையில் (கூட்டத்தில்) மதி மயங்காமல், புத்திசாலித்தனமாக செயல்படும் திறமையை கற்றுக்கொடுப்பதே. கல்வி கற்பித்தலே தந்தையின் கடமை.",
    paal: "Arathupal"
  },
  {
    number: 67,
    adhigaramNumber: 7,
    tamilText: "தம்மின் தம் மக்கள் அறிவுடைமை கண்டு\nமமர் தந்தை உள்ளும் மகிழ்",
    purul: "தம்மை விட தம் மக்கள் அறிவுடையவர்களாக இருப்பதைக் கண்டு, மாண்புமிக்க தந்தை மனதில் மிகவும் மகிழ்ச்சி அடைவார். பிள்ளைகள் சிறந்திருப்பதே பெற்றோர் சந்தோஷம்.",
    paal: "Arathupal"
  },
  {
    number: 68,
    adhigaramNumber: 7,
    tamilText: "ஆற்றுந்தம் மக்கள் பொருள்வய தெய்தியக்காள்\nஏற்றுந் தமக்கு நிழல்",
    purul: "பிள்ளைகள் பொருள் ஈட்டும் வலிமை பெற்றதும், அவர்கள் தாங்கள் பெற்றோர்களுக்கு நிழல் (பாதுகாப்பு) போல் இருப்பார்கள். முதிர்ந்த காலத்தில் மக்களே பெற்றோர்களுக்கு உதவி செய்வார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 69,
    adhigaramNumber: 7,
    tamilText: "ஒன்றா உலகத்து உயர்ந்த புகழின்\nகன்றா குழவி தனக்கு",
    purul: "ஒப்பற்ற இந்த உலகத்தில் உயர்ந்த புகழை உடைய மகன், ஒரு பசுவிற்கு அதன் கன்று போன்றவன். நல்ல மகன் பெற்றோர்களுக்கு கன்று போல் பாதுகாப்பு.",
    paal: "Arathupal"
  },
  {
    number: 70,
    adhigaramNumber: 7,
    tamilText: "மகன் காண் இன்பத்திற் பெற்றோர் அவன்செய்யும்\nதொகைபிழை காண்கட் டியக்கு",
    purul: "பெற்றோர்கள் தங்கள் மகனைக் காணும் இன்பத்தில் இருப்பார்கள், ஆனால் அவன் செய்யும் தவறுகளைக் காணும் போது கண்டிக்க வேண்டிய கடமையில் இருப்பார்கள். அன்பும் ஒழுக்கமும் சேர்ந்ததே பெற்றோர் கடமை.",
    paal: "Arathupal"
  },
  {
    number: 71,
    adhigaramNumber: 8,
    tamilText: "அன்பிற்கும் உண்டோ அடைக்குந் தாழ்\nபுல்லி ஆர்க்கும் புரையச் சலச்",
    purul: "அன்புக்கு அடைக்கும் தாழ்ப்பாள் உண்டா? இல்லை. அன்பு என்பது எல்லோரையும் தழுவி, யாருக்கும் சமமாக பொருந்தி நிற்கும். அன்பிற்கு எல்லை இல்லை, அது அனைவருக்கும் பொதுவானது.",
    paal: "Arathupal"
  },
  {
    number: 72,
    adhigaramNumber: 8,
    tamilText: "அன்பீனும் ஆர்வம் உடைமை அதுஈன்றும்\nஒரு நட்டார் கண் சேறும்",
    purul: "அன்பை விட மிகுந்த ஆர்வம் உடையதாக இருப்பது எது? அது ஒரு நாள் உறவினரிடம் சேரும் தன்மை. உண்மையான அன்பு என்பது ஆழமானதும், நிலையானதும் ஆகும்.",
    paal: "Arathupal"
  },
  {
    number: 73,
    adhigaramNumber: 8,
    tamilText: "அன்போடு பார்க்கும் பணிவுடையார் கண்ணி ன்\nஇன்பம் நயப்பது உண்டு",
    purul: "அன்புடன் பார்த்து, பணிவுடன் நடந்து கொள்பவர்களின் கண்களில், இன்பம் விரும்பி வசிப்பது உண்டு. அன்பும் பணிவும் உடையவர்களுக்கு எப்போதும் மகிழ்ச்சி உண்டு.",
    paal: "Arathupal"
  },
  {
    number: 74,
    adhigaramNumber: 8,
    tamilText: "அன்பிற் படுபயன் யாதெனின் நண்பலற்\nற வினைநாணுதல் ஆற்று",
    purul: "அன்பினால் கிடைக்கும் பயன் என்ன என்றால், நண்பர்கள் இல்லாத தீய செயல்களை செய்ய நாணுதல் (வெட்கப்படுதல்). அன்பு உள்ளவர்கள் தீமை செய்ய மாட்டார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 75,
    adhigaramNumber: 8,
    tamilText: "அன்பின் வழிய துடம்பும் அதுயின்று\nஒன்றாத் தான்கண் பிற",
    purul: "அன்பின் வழியில் இயங்குவதே உடலின் பயன். அந்த அன்பு இல்லாமல், தன்னிடம் மட்டும் ஒன்றி நிற்கும் மற்ற எல்லாமும் வீண். அன்பு இல்லாத வாழ்வு பயனற்றது.",
    paal: "Arathupal"
  },
  {
    number: 76,
    adhigaramNumber: 8,
    tamilText: "அன்பு ஈனும் ஆர்வம் உடைமை குடிஇயல்பு\nஎன்பும் சுளைஇல் கசடு",
    purul: "அன்பை விட மிகுந்த ஆர்வத்துடன் நடந்து கொள்வதே குடும்பத்தின் இயல்பு. அது இல்லாமல் இருப்பது எலும்பில் உள்ள கசடு (குறை) போன்றது. குடும்பத்தில் அன்பு அவசியம்.",
    paal: "Arathupal"
  },
  {
    number: 77,
    adhigaramNumber: 8,
    tamilText: "அன்புஈனும் ஆர்வம் உடைமை அதுஈனும்\nஊக்கமும் மெய்தே உரு",
    purul: "அன்பை விட ஆர்வம் உடையதாக இருப்பது, அதை விட ஊக்கமும் உண்மையில் உருவம் கொண்டதாக இருக்க வேண்டும். அன்பு, ஆர்வம், ஊக்கம் மூன்றும் சேர்ந்ததே முழுமையான குணம்.",
    paal: "Arathupal"
  },
  {
    number: 78,
    adhigaramNumber: 8,
    tamilText: "அன்புஉடையார் ஆத்தும் பரிந்தால் அதுஉடையார்\nஎயிற்றும் சுளைஇல் கசடு",
    purul: "அன்பு உடையவர்கள் உயிரையும் தருவார்கள் என்று சொன்னால், அந்த அன்பு உடையவர்களின் பல் கூட கசடு இல்லாததாக இருக்கும். உண்மையான அன்பு உடையவர்களிடம் எந்த குறையும் இருக்காது.",
    paal: "Arathupal"
  },
  {
    number: 79,
    adhigaramNumber: 8,
    tamilText: "அன்பின் வழிய துடம்பும் அதுஉண்ணும்\nதூண்டில் பொருள்அது உரு",
    purul: "அன்பின் வழியே உடம்பும் செயல்படுகிறது, அதை உண்ணும் தூண்டுதல் பொருளே அதன் உண்மையான வடிவம். அன்பே உடலின் இயக்கத்திற்கு அடிப்படை.",
    paal: "Arathupal"
  },
  {
    number: 80,
    adhigaramNumber: 8,
    tamilText: "புறத்துறை யாதவர் கண்ணும் அகத்துறை\nஆதி யொருவன் புகழ்",
    purul: "வெளிப்புற ஒழுக்கம் இல்லாதவர்களிடத்திலும், உள்ளத்தில் இருப்பது ஆதியான ஒரே இறைவனின் புகழே. அனைவரிடமும் இறைவன் அன்பாக வாழ்கிறார்.",
    paal: "Arathupal"
  },
  {
    number: 81,
    adhigaramNumber: 9,
    tamilText: "இருந்தோம்பி யில்வாழ்வது எல்லாம் விருந்தோம்பி\nவேளாண்மை செய்தற் பொருட்டு",
    purul: "வீட்டில் இருந்து சேமித்து வாழ்வது எல்லாமே, விருந்தினர்களை வரவேற்று உபசரித்து, விருந்தோம்புதல் என்ற கடமையை செய்வதற்காகவே. விருந்தோம்பலே இல்வாழ்க்கையின் முக்கிய நோக்கம்.",
    paal: "Arathupal"
  },
  {
    number: 82,
    adhigaramNumber: 9,
    tamilText: "விருந்து புறத்தது வெளிப்படு முகத்தான்\nஅருந்துபவர் ஆக்கும் விதம்",
    purul: "விருந்தினர் வெளியே நிற்கும் போது, முகம் மலர்ந்து வரவேற்று, உண்ணச் செய்பவர் செய்யும் முறையே உண்மையான விருந்தோம்பல். முகமலர்ச்சியுடன் வரவேற்பதே விருந்தோம்பலின் அடிப்படை.",
    paal: "Arathupal"
  },
  {
    number: 83,
    adhigaramNumber: 9,
    tamilText: "இனைத்துஅமுது ஈயாது இகழார் நினைத்தபின்\nஉண்டல் அமிழ்தினும் இன்று",
    purul: "உணவை விருந்தினருக்கு கொடுக்காமல் இகழ்ந்து நடந்து கொள்ளாதவர்கள், பின்னர் நினைத்து உண்பது அமிழ்தத்தை விட இனிமையானது. விருந்தினரை மதித்து உபசரித்த பின் உண்பதே இனிமை.",
    paal: "Arathupal"
  },
  {
    number: 84,
    adhigaramNumber: 9,
    tamilText: "வித்துமிடி னிருந்தும் பெறுவது தீதே\nவித்தகம் பேணும் குடி",
    purul: "விதை விதைத்தாலும், இருந்தாலும் பெறுவது தீமையே, விருந்தோம்பலை போற்றும் குடும்பத்தில். விருந்தினர் இல்லாத வீட்டில் செல்வம் வீண்.",
    paal: "Arathupal"
  },
  {
    number: 85,
    adhigaramNumber: 9,
    tamilText: "செல்விருந்து ஓம்பி வரு விருந்துபார் கோடு\nபல்விருந்து ஓம்புதல் தலை",
    purul: "செல்லும் விருந்தினரை நன்றாக உபசரித்து, வரும் விருந்தினர்களை எதிர்பார்த்து, பல விருந்தினர்களை உபசரிப்பதே தலையாய கடமை. விருந்தினர் உபசாரமே முக்கிய பண்பு.",
    paal: "Arathupal"
  },
  {
    number: 86,
    adhigaramNumber: 9,
    tamilText: "உடைமையுள் இன்மை விருந்தோம்பல் ஓம்பா\nமடமை மடவார்கண் உண்டு",
    purul: "செல்வம் இருந்தும் இல்லாமை போல் இருப்பது எது? விருந்தோம்பலை போற்றாத மடமை, மடமையாக நடப்பவர்களிடம் உண்டு. விருந்தோம்பாதது மடமையின் அடையாளம்.",
    paal: "Arathupal"
  },
  {
    number: 87,
    adhigaramNumber: 9,
    tamilText: "மோப்பக் குழையும் அனிச்சம் முகந்திரி\nந்தோம்பின் விருந்தும் மகிழும்",
    purul: "மணம் நுகரும் போது மகிழும் அனிச்ச மலர் போல், முகம் மலர்ந்து வரவேற்று உபசரித்தால் விருந்தினரும் மகிழ்வார்கள். முக மலர்ச்சியே விருந்தினர் மகிழ்ச்சிக்கு காரணம்.",
    paal: "Arathupal"
  },
  {
    number: 88,
    adhigaramNumber: 9,
    tamilText: "இன்சொலால் ஈத்தளிக்க வல்லார்க்குத் தன்சொலால்\nதான்கண் டனுஎம் உலகு",
    purul: "இனிய சொற்களால் கொடுத்து அன்பு காட்ட வல்லவர்களுக்கு, அவர்களின் சொல்லாலேயே தானாகவே கண்டு, உலகம் வந்து சேரும். இனிமையாக பேசி உதவுபவர்களுக்கு உலகமே உதவும்.",
    paal: "Arathupal"
  },
  {
    number: 89,
    adhigaramNumber: 9,
    tamilText: "பரிந்தோம்பி பற்றற்றேம் என்பர் விருந்தோம்பி\nவேள்வி தலைப்படா தார்",
    purul: "விருந்தினர்களை உபசரித்து, வேள்வி செய்யாதவர்கள், பற்று அறுத்து துறவு செய்தோம் என்று சொல்வார்கள். விருந்தோம்பல் இல்லாமல் துறவும் பயனற்றது.",
    paal: "Arathupal"
  },
  {
    number: 90,
    adhigaramNumber: 9,
    tamilText: "உடைமை யுடைத்தெனலு மொன்றே யுடையார்\nவிருந்தோம்பு வண்ணம் அறிந்து",
    purul: "உடைமை உள்ளது என்று சொல்வதும் ஒன்றே, உடையவர்கள் விருந்தினர்களை உபசரிக்கும் முறையை அறிந்து செய்வதால். விருந்தோம்பலே உண்மையான செல்வம்.",
    paal: "Arathupal"
  },
  {
    number: 91,
    adhigaramNumber: 10,
    tamilText: "இனிய உளவாக இன்னாத கூறல்\nகனிஇருப்பக் காய்கவர்ந் தற்று",
    purul: "இனிமையான சொற்கள் இருக்கும் போது, கடுமையான வார்த்தைகளைப் பேசுவது, கனிந்த பழம் இருக்கும் போது காய் கனியை பறித்து தின்பது போன்றது. இனிமையாக பேசுவதே சிறந்தது.",
    paal: "Arathupal"
  },
  {
    number: 92,
    adhigaramNumber: 10,
    tamilText: "அகன்அமர்ந்தும் செவிகடை பீரெனினு மகழ்ந்துடன்\nகேட்ப இனிய சொல்",
    purul: "தொலைவில் அமர்ந்திருந்தாலும், காதுகள் கடைந்து போகும் என்று சொன்னாலும், மகிழ்ச்சியுடன் கேட்பது இனிய சொற்களையே. இனிய வார்த்தைகளை எல்லோரும் விரும்புவார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 93,
    adhigaramNumber: 10,
    tamilText: "இனிய சொல் லீதல் கடன்எ றுடைமையு\nளினிய ரிசை பெறலா மதினால்",
    purul: "இனிமையான சொற்களைப் பேசுவது கடமை என்று சொல்வது, உடைமையில் இனியவர்களாக புகழ் பெறலாம் என்பதற்காக. இனிமையாக பேசுவதால் நல்ல பெயர் கிடைக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 94,
    adhigaramNumber: 10,
    tamilText: "சிலசொல் பலதுதறு மதின்பயன் கூறல்\nஇல்அவை கேட்டலு மின்று",
    purul: "சிலவற்றைச் சொல்லி பலவற்றை உணர்த்துவது, அதன் பயனை சொல்வது இல்லாமல், அவைகளைக் கேட்பதும் இனிமையானது. குறைவாக பேசி அதிகம் புரிய வைப்பதே சிறப்பு.",
    paal: "Arathupal"
  },
  {
    number: 95,
    adhigaramNumber: 10,
    tamilText: "பணியுமாம் என்றும் பணிதற்பறம் பிறிதில்லை\nஅணியல்லால் பூணிகின் காண்",
    purul: "பணிவுடையவர் என்றும் பணிவதே சிறந்த ஒழுக்கம், வேறு ஒன்றும் இல்லை. அழகான அணிகலன்களை அணிவது போல் பணிவையும் அணிய வேண்டும். பணிவே சிறந்த அணிகலன்.",
    paal: "Arathupal"
  },
  {
    number: 96,
    adhigaramNumber: 10,
    tamilText: "அல்லவை தேய அளறியா தின்சொல்\nபல்லவை பாவாய் பயில்",
    purul: "தீமைகள் தேய, அளவு இல்லாமல் இனிய சொற்களை பலவாக பேசி பழகு. இனிமையாக அதிகம் பேசுவதால் தீமைகள் அழியும்.",
    paal: "Arathupal"
  },
  {
    number: 97,
    adhigaramNumber: 10,
    tamilText: "நயன்ஈன்றி யின்னாத சொல்லாமை மாண்ட\nமொய்ம்பிற்கு ஒழுக்கு அதுவே",
    purul: "நன்மை இல்லாமல் கடுமையான சொற்களைப் பேசாமல் இருப்பதே, சிறந்த ஒழுக்கத்திற்கு உரிய நடத்தை. கடுமையான வார்த்தைகளைத் தவிர்ப்பதே நல்ல ஒழுக்கம்.",
    paal: "Arathupal"
  },
  {
    number: 98,
    adhigaramNumber: 10,
    tamilText: "நயனின்றி யின்னா செயினு மவனை\nயயனின்றி யல்லல் படுத்து",
    purul: "நன்மை இல்லாமல் தீமை செய்தாலும், அவனை நன்மை இல்லாமல் துன்புறுத்தாதே. பகைவனுக்கும் தீமை செய்யக்கூடாது.",
    paal: "Arathupal"
  },
  {
    number: 99,
    adhigaramNumber: 10,
    tamilText: "சிறப்பொடுபொ ராஅமை யின்மையி னுண்டாங்கு\nமறப்பினும் மன்னிழை யாமை",
    purul: "சிறப்புடன் பொருந்தாமல் இல்லாமையால் உண்டாகும் மறதியிலும், மனதில் நிலைத்திருக்காத தன்மை. இனிமையான சொற்கள் எப்போதும் நினைவில் நிற்கும்.",
    paal: "Arathupal"
  },
  {
    number: 100,
    adhigaramNumber: 10,
    tamilText: "சொல்லுக சொல்லிற் பயன்உடைய சொல்லற்க\nசொல்லிற் பயன்இலாச் சொல்",
    purul: "சொல்ல வேண்டியது என்னவென்றால், பயனுள்ள சொற்களை சொல்ல வேண்டும். சொல்லக்கூடாதது என்னவென்றால், பயன் இல்லாத வார்த்தைகளை சொல்லக்கூடாது. பயனுள்ள வார்த்தைகளே பேச வேண்டும்.",
    paal: "Arathupal"
  },
  {
    number: 101,
    adhigaramNumber: 11,
    tamilText: "செய்யாமல் செய்த உதவிக்கு வையகத்து\nஎய்யாமை யில்லை பகை",
    purul: "தான் உதவி செய்யாத நிலையில், மற்றவர்கள் செய்த உதவிக்கு, இந்த உலகத்தில் பகை என்று சொல்லும்படியான தீமை எதுவும் இல்லை. செய்த உதவியை மறப்பது மிகப்பெரிய பாவம்.",
    paal: "Arathupal"
  },
  {
    number: 102,
    adhigaramNumber: 11,
    tamilText: "செய்யாமல் செய்த உதவிக்கு யாதொன்றும்\nசெய்யாது ஓர்வன் சினம்",
    purul: "தான் உதவி செய்யாத நிலையில், மற்றவர்கள் செய்த உதவிக்கு, ஒன்றும் செய்யாமல் சினம் கொள்வவனுக்கு, அதைவிட பெரிய தீமை எதுவும் இல்லை. நன்றி மறப்பவன் கொடியவன்.",
    paal: "Arathupal"
  },
  {
    number: 103,
    adhigaramNumber: 11,
    tamilText: "செய்த உதவி மறப்பதல் செய்த\nதீயவை அஞ்சாமை யார்க்கு",
    purul: "செய்த உதவியை மறப்பதை விட, செய்த தீய செயல்களுக்கு அஞ்சாமல் இருப்பது யாருக்கு? நன்றி மறப்பவர்களே தீமை செய்ய அஞ்சமாட்டார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 104,
    adhigaramNumber: 11,
    tamilText: "தீய்தார் அறிவி லார் ஆதலி னீதார்\nபயன்தூக்கார் செய்த நன்று",
    purul: "தீமை செய்பவர்கள் அறிவில்லாதவர்கள் என்பதால், நல்லவர்கள் செய்த நன்மையின் பயனை எடை போட்டு பார்க்க மாட்டார்கள். நல்லவர்கள் பலனை எதிர்பார்க்காமல் நன்மை செய்வார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 105,
    adhigaramNumber: 11,
    tamilText: "இன்மை பொருளா யற்றா னெய்தியான்\nஒன்னார் உதவி செயல்",
    purul: "வறுமை பொருளாக (செல்வமாக) உடையவன், பகைவரின் உதவியை செய்ய வேண்டும். வறுமையில் கூட பகைவருக்கு நன்மை செய்ய வேண்டும் என்பது மாண்பு.",
    paal: "Arathupal"
  },
  {
    number: 106,
    adhigaramNumber: 11,
    tamilText: "எந்நன் றிக்கும் உய்வுண்டாம் உய்வில்லை\nசெய்ந்நன் றியற்றது ஒழுக்காரார்க் கீண்டு",
    purul: "எந்த தீமைக்கும் மீட்சி உண்டு, ஆனால் செய்த நன்றியை மறந்து தகாத முறையில் நடப்பவர்களுக்கு இந்த உலகில் மீட்சி இல்லை. நன்றி மறப்பவர்களுக்கு இரட்சிப்பு இல்லை.",
    paal: "Arathupal"
  },
  {
    number: 107,
    adhigaramNumber: 11,
    tamilText: "தன்நம் றிக்கண் டுகந்தா னுதவி யெனல்\nமன்னுயி ராளி யளிக்கும் பயன்",
    purul: "தன் நன்றியைக் கண்டு மகிழ்ந்தவனுக்கு உதவி செய்தல் என்பது, நீண்ட உயிரை ஆள்பவனுக்கு அளிக்கும் பயனாகும். நன்றியுள்ளவர்க்கு உதவுவது மிகப்பெரிய பலன் தரும்.",
    paal: "Arathupal"
  },
  {
    number: 108,
    adhigaramNumber: 11,
    tamilText: "நன்றி மறப்பதுவும் நன்றல்ல நன்றல்லதை\nஅன்றே மறப்பது நன்று",
    purul: "நன்றியை மறப்பது நன்றல்ல (நல்லதல்ல), நன்றல்லாத (தீமையான) செயல்களை அப்போதே மறப்பது நல்லது. உதவியை நினைவில் வைத்து, தீமையை மறந்துவிட வேண்டும்.",
    paal: "Arathupal"
  },
  {
    number: 109,
    adhigaramNumber: 11,
    tamilText: "கொன்றா ருதவி யுரித்தது ஒன்றன்றே\nசென்ற இடத்தாற் செறு",
    purul: "கொன்றவருக்கு உதவி செய்வது உரிமையானது, ஒன்று அல்ல, சென்ற இடத்தில் போர் செய்வது போல் பலவும் உண்டு. பகைவருக்கும் நன்மை செய்வதே பெருமை.",
    paal: "Arathupal"
  },
  {
    number: 110,
    adhigaramNumber: 11,
    tamilText: "எழுமை எழுநலந் தீமைக்கு ஒன்றே\nசெய்ந்நன் றியறிதற் பாற்று",
    purul: "ஏழு பிறவிகளில் செய்த ஏழு நன்மைகளுக்கும், தீமைக்கும் ஒன்றே போதும், செய்த நன்றியை அறிந்து நடப்பவர்களுக்கு. நன்றி உணர்வே பல நன்மைகளை சமமாக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 111,
    adhigaramNumber: 12,
    tamilText: "தகுதி யென்பது தட்டா து நீத்தநுமுமன்றே\nகோலின் ஒர் ஓட்டை விளை",
    purul: "நடுவுநிலைமை என்பது தட்டாமல் (சாயாமல்) நிலைத்து நிற்பது, தராசின் தட்டின் ஒரு ஓட்டை போல் விளங்குகிறது. நீதி என்பது சமமாக இருப்பதே.",
    paal: "Arathupal"
  },
  {
    number: 112,
    adhigaramNumber: 12,
    tamilText: "நடுவுஅற்றா னென்றா லுரை ஒன்றும் மற்றின்றே\nகடுவுஅற்றா னிலங்குஇல் தெரிதல்",
    purul: "நடுவுநிலைமை இல்லாதவன் என்றால், சொல்ல ஒன்றுமில்லை, மற்றபடி விரைவு இல்லாதவன் வீட்டில் விளக்கு இல்லாதது போல் தெளிவு இல்லை. நீதி இல்லாதவன் இருளில் இருப்பவன் போல.",
    paal: "Arathupal"
  },
  {
    number: 113,
    adhigaramNumber: 12,
    tamilText: "சொல்லினு மொழிதல் திருவினு நடுஓர்தி\nமல்லற்கண் மாணாக்கு தற்று",
    purul: "சொல்வதிலும் செல்வத்திலும், நடுவுநிலைமை இல்லாதவனுக்கு மகிழ்ச்சி ஏற்படுவது, மலரின் மேல் மாணிக்கம் பதிப்பது போன்றது. நீதி இல்லாமல் செல்வமும் சொல்லும் பயனற்றவை.",
    paal: "Arathupal"
  },
  {
    number: 114,
    adhigaramNumber: 12,
    tamilText: "அன்பறத்துஆ ஆய்ந்துஉண்ண லாற்றின் னனறுபட\nவன்பிற் குரவு நுதவாது",
    purul: "அன்பும் அறமும் உடையவனாக ஆய்ந்து உண்ண வல்லவனானால், அவனுக்கு பிரிவதற்கு வலிமையான வறுமை உதவாது. நடுவுநிலையுடன் வாழ்பவனை வறுமை தாக்காது.",
    paal: "Arathupal"
  },
  {
    number: 115,
    adhigaramNumber: 12,
    tamilText: "நடுவுஇன்மை யென்பது ஒன்றன்றே வடுவேறு\nபண்பிலா வாய்மை யிடத்து",
    purul: "நடுவுநிலைமை இல்லாமை என்பது ஒன்று மட்டுமல்ல, குற்றம் மற்றும் பண்பு இல்லாத வாய்மையின் இடத்தில் பல உண்டு. நீதி இல்லாதவனிடம் பல குறைகள் இருக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 116,
    adhigaramNumber: 12,
    tamilText: "கெடுவம் கெடும் கெடாது உலகத் துடையமு\nநடுவே நிலம்தரும் நீர்",
    purul: "கெடுபவர்கள் கெடுவார்கள், கெடாதவர்கள் உலகத்தில் செல்வத்தை உடையவராக, நடுவில் நிலையான நீர் போல் இருப்பார்கள். நடுவுநிலையில் இருப்பவர்கள் அழியார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 117,
    adhigaramNumber: 12,
    tamilText: "சமன்சேர்ந்த கோற்போல் நுனிக்கண் நுழைந்துதைத்து\nஉண்ணாது என்பது திரு",
    purul: "சமமாக சேர்ந்த கோல் போல், நுனியில் நுழைந்து துளைத்து உண்ணாதது என்பது செல்வமாகும். நடுவுநிலையுடன் நடப்பவர்களுக்கு செல்வம் நிலைக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 118,
    adhigaramNumber: 12,
    tamilText: "சமம்ஏனு முண்டு என்றான் செய்தற்கண் அந்நின்றும்\nசமம்மற்றே லாம்பெறா தார்",
    purul: "சமமாக இருப்பது என்று உண்டு என்றான், செய்யும் போது அதில் நின்று சமம் மாறிவிட்டால், அதைப் பெறாதவர் ஆவார். நடுவுநிலையில் இருந்து விலகினால் தோல்வி.",
    paal: "Arathupal"
  },
  {
    number: 119,
    adhigaramNumber: 12,
    tamilText: "சமம்என்பது யாதெனின் கோளொன்றா லொன்றைத்\nதமம்செயா வாயா தமை",
    purul: "சமம் என்பது என்னவென்றால், ஒரு பக்கத்தை ஏற்று மற்றொன்றை தவறாக செய்யாத தன்மை. இரு தரப்புக்கும் சமமாக நடப்பதே நீதி.",
    paal: "Arathupal"
  },
  {
    number: 120,
    adhigaramNumber: 12,
    tamilText: "சமம்வல்லா னேயாண்க செங்கோல் தமமுடைமை\nதம்மக் கருள்கூர் பவர்க்கு",
    purul: "சமம் உடையவனே செங்கோலை ஆளட்டும், தம்மையும் உடைமையையும் தம் குடிமக்களுக்கு அருள் செய்பவர்களே அரசர் ஆகட்டும். நடுவுநிலையுடன் ஆட்சி செய்பவனே உண்மையான அரசன்.",
    paal: "Arathupal"
  },
  {
    number: 121,
    adhigaramNumber: 13,
    tamilText: "அடக்கம் அமரருள் உய்க்கும் அடங்காமை\nஆழ்குல் படுக்கும் இடம்",
    purul: "அடக்கம் (தன்னடக்கம்) உடையவர்களை தேவர்களிடம் உயர்த்தும், அடங்காமை (கட்டுப்பாடு இல்லாமை) ஆழமான நரகத்தில் தள்ளும். தன்னடக்கமே வானுலக வாழ்வு தரும்.",
    paal: "Arathupal"
  },
  {
    number: 122,
    adhigaramNumber: 13,
    tamilText: "காக்க பொருளா யடக்கம் அடக்கத்து\nஊக்கம் உடைய தறிவு",
    purul: "பொருளாக (செல்வமாக) காக்க வேண்டியது அடக்கம், அடக்கத்தில் ஊக்கம் உடையது அறிவு. தன்னடக்கமே பாதுகாக்க வேண்டிய செல்வம், அதில் ஊக்கம் கொள்வதே அறிவு.",
    paal: "Arathupal"
  },
  {
    number: 123,
    adhigaramNumber: 13,
    tamilText: "அடக்கி யொழுகுவது நல்லவர் இல்லாதார்\nகெடக்கி யொழுக லினும்",
    purul: "நல்லவர்கள் அடக்கத்துடன் நடந்து கொள்வார்கள், அடக்கம் இல்லாதவர்கள் கெட்டுப் போய் நடந்து கொள்வதை விட அது சிறந்தது. தன்னடக்கமே நல்லவர்களின் அடையாளம்.",
    paal: "Arathupal"
  },
  {
    number: 124,
    adhigaramNumber: 13,
    tamilText: "எண்ணென்ப ஏஎண்ணு மெண்ணி னென்னாட்டு\nண்ணுந்தா னெண்ணும் விழுப்ப",
    purul: "எண் என்பது யாது என்றால், எண்ணிக்கையே, எண்ணி எண்ணினால், ஆட்டுக்குள் இருக்கும் தானே எண்ணும் விருப்பமான பொருள். மனதை அடக்கி எண்ணுவதே உண்மையான சிந்தனை.",
    paal: "Arathupal"
  },
  {
    number: 125,
    adhigaramNumber: 13,
    tamilText: "ஒளிஒருவற் குண்டாக வில்லையே லவ்வோளி\nமெல்லியற் கண்ணும் படும்",
    purul: "ஒளி ஒருவருக்கு உண்டாகவில்லை என்றால், அந்த ஒளி மிக மெல்லியவர்களிடமும் படும் (தன்னடக்கம் இல்லாதவர்களும் அழிவார்கள்). தன்னடக்கம் இல்லாதவர்கள் எவர் என்றாலும் அழிவார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 126,
    adhigaramNumber: 13,
    tamilText: "நிலையின் திரியா துடைத்தா யொழுகுவதன்\nநலம்ஆம் நலத்துள் எலாம்",
    purul: "நிலைத்த நிலையில் இருந்து மாறாமல், அடக்கத்துடன் வாழ்வது, எல்லா நன்மைகளிலும் சிறந்த நன்மையாகும். நிலையான அடக்கமே எல்லா நலன்களுக்கும் அடிப்படை.",
    paal: "Arathupal"
  },
  {
    number: 127,
    adhigaramNumber: 13,
    tamilText: "அடக்கம் சிறப்பா யடங்காமை கீழ்ப்ப\nட நீக்கிற் பதலாம் பயன்",
    purul: "அடக்கம் சிறப்பாக இருக்கும், அடங்காமை (கட்டுப்பாடு இல்லாமை) கீழ்மையாக இருக்கும், இரண்டில் ஒன்றை நீக்கினால் அதுவே பயனாகும். அடக்கம் உயர்வு, அடங்காமை இழிவு.",
    paal: "Arathupal"
  },
  {
    number: 128,
    adhigaramNumber: 13,
    tamilText: "காக்க பயன்பெறு மாற்றமிடை தேய்நதால்\nஆக்கமும் கூடு மழிவு",
    purul: "காக்க வேண்டிய நன்மை பயனை பெறும், மாறுபட்ட நடத்தை நடுவில் தேய்ந்தால், ஆக்கமும் சேர்ந்து அழிவு ஏற்படும். அடக்கம் இழந்தால் செல்வமும் அழியும்.",
    paal: "Arathupal"
  },
  {
    number: 129,
    adhigaramNumber: 13,
    tamilText: "அடக்க முடையா ரகத்துணை யாத்துஅகழ்\nபடச்சியொடு ஊன்றுபுணை போல்",
    purul: "அடக்கம் உடையவர்களின் உள்ளத்தில் உள்ள நன்மை, ஆற்றில் அகழ்ந்து படகில் ஊன்றப்பட்ட தூண் போன்றது (நிலையானது). அடக்கம் உள்ளவர்களின் நன்மை நிலையானது.",
    paal: "Arathupal"
  },
  {
    number: 130,
    adhigaramNumber: 13,
    tamilText: "அந்த ணர்நூல் அறவோர் பொருள்மூன்றும்\nநின்றசொல் அற்றே நிலை",
    purul: "அந்தணர்களின் நூல், அறவோர், பொருள் என்ற மூன்றும் நின்ற சொல்லைப் போலவே நிலையானவை. அடக்கம், அறம், செல்வம் மூன்றும் நிலையான மதிப்புடையவை.",
    paal: "Arathupal"
  },
  {
    number: 131,
    adhigaramNumber: 14,
    tamilText: "ஒழுக்க முடையா ரொளிந்தும்செ யக்காக்கு\nமழுக்குடை யாமை யறி",
    purul: "ஒழுக்கம் உடையவர்கள் மறைந்திருந்தும் செய்யக்கூடாததை செய்யாமல் காப்பது, குற்றமற்ற உடையாகிய அறிவு. ஒழுக்கம் உடையவர்கள் மறைவிலும் தவறு செய்ய மாட்டார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 132,
    adhigaramNumber: 14,
    tamilText: "ஒழுக்கமும் வாய்மை யும்நீதி யுடைமையும்\nகெழுதகத் தூதல் உரன்",
    purul: "ஒழுக்கம், வாய்மை, நீதி, உடைமை (பகிர்தல்) ஆகியவை உறுதியாக இருப்பதே உரன் (வலிமை) ஆகும். இந்த நான்கு குணங்களே உண்மையான வலிமை.",
    paal: "Arathupal"
  },
  {
    number: 133,
    adhigaramNumber: 14,
    tamilText: "ஒழுக்கத்தி னொல்கா ருயிர்வாழ்வா ரொல்லார்\nகெழுதகாச் சூதினும் கேடு",
    purul: "ஒழுக்கத்தில் தவறாதவர்கள் உயிர் வாழ்வார்கள், தவறுபவர்கள் உறுதியான ஊதியத்தில் கூட கேடு அடைவார்கள். ஒழுக்கமே உயிர் வாழ்வதற்கான வழி.",
    paal: "Arathupal"
  },
  {
    number: 134,
    adhigaramNumber: 14,
    tamilText: "நன்றா கனையது ஒழுக்கம் பெருமை\nதரன்றிதை யுள்ளே யுள",
    purul: "நன்றாக கனையும் (மதிக்கப்படும்) ஒழுக்கம், பெருமையை தருவது, இதற்குள்ளேயே உள்ளது. ஒழுக்கத்திலேயே உண்மையான பெருமை அடங்கியுள்ளது.",
    paal: "Arathupal"
  },
  {
    number: 135,
    adhigaramNumber: 14,
    tamilText: "ஒழுக்க முடைமை குடிமை யிழுக்கம்\nஏன்வழி நோக்கி யற்று",
    purul: "ஒழுக்கம் உடைமை குடிப்பிறப்பின் சிறப்பு, ஒழுக்கம் இழப்பது என் வழியில் நோக்கியதைப் போன்றது (தவறான பாதை). ஒழுக்கமே குடிப்பிறப்பின் பெருமை.",
    paal: "Arathupal"
  },
  {
    number: 136,
    adhigaramNumber: 14,
    tamilText: "மறப்பினு மொத்துக் கொளலாகும் பார்ப்பான்\nபிறப்பொழுக்கங் குன்றிக் கெடின்",
    purul: "மறந்தாலும் ஒப்புக் கொள்ளலாம், பார்ப்பான் (அந்தணன்) பிறப்பால் வந்த ஒழுக்கம் குறைந்து கெட்டால். ஒழுக்கம் கெட்டவனை ஏற்றுக்கொள்வது கடினம்.",
    paal: "Arathupal"
  },
  {
    number: 137,
    adhigaramNumber: 14,
    tamilText: "அழுக்கா றுடையா னகடுண் ணமைநும்\nஒழுக்கா தோ காமு மிழுக்கு",
    purul: "பொறாமை உடையவனாக உள்ளத்தில் இருப்பதும், ஒழுக்கம் இல்லாமல் இருப்பதும் இழிவானது. பொறாமையும் ஒழுக்கக்கேடும் கீழ்மை.",
    paal: "Arathupal"
  },
  {
    number: 138,
    adhigaramNumber: 14,
    tamilText: "நல்லொழுக் கென்பது செல்வம் வெகோழுக்\    கத்திற்கு வைக்குந் துணை",
    purul: "நல்ல ஒழுக்கம் என்பது செல்வம், தீய ஒழுக்கத்திற்கு தண்டனை வைக்கும் துணை. நல்லொழுக்கமே உண்மையான செல்வம், தீய ஒழுக்கத்தை அழிக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 139,
    adhigaramNumber: 14,
    tamilText: "பரியு முடையதுஇளிசை யொழுக்கம்\nஜரியும் மணும்கண் டதா ரின்",
    purul: "பரியும் (மதிக்கப்படும்) உடைய புகழ், ஒழுக்கம், மற்றும் மணமும் கண்ட தாரினால் (அணிகலன்) வருகிறது. ஒழுக்கமே புகழையும் அழகையும் தரும்.",
    paal: "Arathupal"
  },
  {
    number: 140,
    adhigaramNumber: 14,
    tamilText: "ஒழுக்க முடையவர் ஆதல் செழுக்குஅற்றீ\nதீதீன்று வாழாவதா லும்",
    purul: "ஒழுக்கம் உடையவர் ஆதல் சிறப்பு, செருக்கு அற்று தீமை இன்றி வாழ்வதால். ஒழுக்கமும் பணிவும் உடையவர்களே சிறப்பானவர்கள்.",
    paal: "Arathupal"
  },
  {
    number: 141,
    adhigaramNumber: 15,
    tamilText: "பிறன்மனை நோக்காதி யான்மனை நோக்கி னென்\nஒன்றுமன் பொன்றாச் செயல்",
    purul: "பிறன் மனைவியை நோக்காதவன், தன் மனைவியை நோக்கி, என் ஒன்றும் அழியாத செயலைச் செய்கிறான். பிறர் மனைவியை விரும்பாமை சிறந்த ஒழுக்கம்.",
    paal: "Arathupal"
  },
  {
    number: 142,
    adhigaramNumber: 15,
    tamilText: "நலக்குரியார் யாவர் எனின்நன் னுதலா\nரிலக்குரியா ராகா தவர்",
    purul: "நல்லொழுக்கத்திற்கு உரியவர் யார் என்றால், நல்ல நெற்றியை உடைய பிறர் மனைவியை இலக்காக கருதாதவர்கள். பிறர் மனைவியை விரும்பாதவர்களே நல்லவர்கள்.",
    paal: "Arathupal"
  },
  {
    number: 143,
    adhigaramNumber: 15,
    tamilText: "மனைவிழைவார் மாண்பி லரே மனைவிழைவீர்\nவிளல்லும் அறத்தி னொழுகு",
    purul: "பிறன் மனைவியை விரும்புபவர்கள் மாண்பு இல்லாதவர்கள், பிறன் மனைவியை விரும்புவதை விட்டு, அறநெறியில் ஒழுகுங்கள். பிறர் மனைவியை விரும்புவது மானமற்ற செயல்.",
    paal: "Arathupal"
  },
  {
    number: 144,
    adhigaramNumber: 15,
    tamilText: "அறவினை யாற்றா னவனில் செழுக்கு\nஆவுஉயிர் நல்லாளு மொன்று",
    purul: "அறச்செயலை செய்யாதவன் வீட்டில் செருக்கு என்பது, அவ்வுயிரும் நல்லாளும் ஒன்று (சேர்ந்து அழிவு). பிறர் மனைவி விருப்பம் அழிவை தரும்.",
    paal: "Arathupal"
  },
  {
    number: 145,
    adhigaramNumber: 15,
    tamilText: "விளைவினை யென்பது ஒருவற் றகடுற்றா\nராகலின் நீத்தது வொழுக்கு",
    purul: "விளையும் தீவினை என்பது, ஒருவர் உள்ளத்தில் பிறர் மனைவியை விரும்புவதால், அதனால் ஒழுக்கம் நீங்கிவிடும். பிறர் மனைவி விருப்பம் ஒழுக்கத்தை அழிக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 146,
    adhigaramNumber: 15,
    tamilText: "அறன்ஆக்கங் கூற்றா னமைந்தா குமென்றும்\nபிறன்ஆங்கில் பேணாநெறி வாழ்வு",
    purul: "அறம் ஆக்கத்தை கூற்றுவன் (எமன்) அமைந்தால் கூட, பிறனுடைய மனைவியை விரும்பாமல் நெறியில் வாழ்வது. மரணம் வந்தாலும் பிறர் மனைவியை விரும்பக்கூடாது.",
    paal: "Arathupal"
  },
  {
    number: 147,
    adhigaramNumber: 15,
    tamilText: "நலத்தின் கடுதுஉடை நல்லவை யெல்லாம்\nதலைத்தலையா காற்றி னுலகு",
    purul: "நல்லொழுக்கத்தில் கடைசியாக வரும் நல்லவைகள் எல்லாம், தலைமையான தலையாக காற்றின் உலகில் இருக்கும். ஒழுக்கம் காக்காதவர்கள் உலகில் அழிவார்கள்.",
    paal: "Arathupal"
  },
  {
    number: 148,
    adhigaramNumber: 15,
    tamilText: "பிறன்மனை நோக்கா தியான்றன் பொருளும்\nமறவன் நோக்கா திருள்",
    purul: "பிறன் மனைவியை நோக்காதவன், தன் பொருளையும் திருடன் நோக்காமல் இருக்கும் போல் பாதுகாக்கிறான். பிறர் மனைவியை விரும்பாதவனுக்கு எல்லாமே பாதுகாப்பு.",
    paal: "Arathupal"
  },
  {
    number: 149,
    adhigaramNumber: 15,
    tamilText: "நலத்தி னது நாண்ஒரு நாண்உ டையார்க்கு\nமலத்தினது வன்ன பிற",
    purul: "நல்லொழுக்கத்தின் நாணம் ஒரு நாணம் உடையவர்களுக்கு, மற்றவை மலம் போன்றவை (தூய்மையற்றவை). பிறர் மனைவியை விரும்புவது அசுத்தமான செயல்.",
    paal: "Arathupal"
  },
  {
    number: 150,
    adhigaramNumber: 15,
    tamilText: "விழைய தியார்வி னையொண்பொ ருள்கொண்டு\nழியுங் கவட்டான் கொளல்",
    purul: "விரும்பத்தக்கவர்கள் செய்யும் வினையால், பிறர் அழகிய பொருளை (மனைவியை) கொண்டு அழியும் வஞ்சகத்தை கொள்ளுதல். பிறர் மனைவியை விரும்புவது வஞ்சகமான அழிவு.",
    paal: "Arathupal"
  },
  {
    number: 151,
    adhigaramNumber: 16,
    tamilText: "உண்ணாமை உள்ளது உயிர்க்குறுத்தி யாதலின்\nஎண்ணாமை வேண்டும் பொறை",
    purul: "உணவு உண்ணாமல் இருப்பது உயிருக்கு துன்பம் தருவதாக இருப்பதால், பொறுமை என்பது எண்ணாமல் (சினம் கொள்ளாமல்) இருப்பதே. பொறுமை என்பது தீமையை நினைக்காமல் இருப்பது.",
    paal: "Arathupal"
  },
  {
    number: 152,
    adhigaramNumber: 16,
    tamilText: "பொறையு ளளா வன்றி பொருள்கண்டு\nசிறையின் பெருங்கோ பறாகா தவர்க்கு",
    purul: "பொறுமை உடையவனே, பொருளைக் கண்டு சிறையில் இருப்பது போன்ற பெரிய சினத்தை கொள்ளாதவர்க்கு உரியவன். பணத்தால் சினம் கொள்ளாதவனே பொறுமையாளன்.",
    paal: "Arathupal"
  },
  {
    number: 153,
    adhigaramNumber: 16,
    tamilText: "ஒறுத்தார்க்கு ஒறுத்துவ னொன்றுஅண் டென்பது\nமறத்தினு முண்டேல் மகிழ்வு",
    purul: "துன்புறுத்தியவருக்கு துன்புறுத்துவேன் என்று ஒன்றும் இல்லை என்பது, மறம் (வீரம்) உடையவர்களுக்கும் மகிழ்ச்சி அளிக்கும். பழிவாங்காமல் இருப்பதே உண்மையான வீரம்.",
    paal: "Arathupal"
  },
  {
    number: 154,
    adhigaramNumber: 16,
    tamilText: "மன்னு யிர்க்குஇன்னா செயினு மவன்ஒன்று\nஎண்ணாமை மாட்சியி னுண்டு",
    purul: "நிலையான உயிருக்கு தீமை செய்தாலும், அவன் ஒரு தீமையையும் எண்ணாமல் இருப்பது மாட்சிமையில் உள்ளது. பகைவனுக்கும் தீமை செய்யாதது பெருமை.",
    paal: "Arathupal"
  },
  {
    number: 155,
    adhigaramNumber: 16,
    tamilText: "துறந்தார்க்குத் துப்பு றவு விருந்து ஒற்றி\nஇறந்தவை யாக்கம் பெறின்",
    purul: "துறவிகளுக்கு உணவு அளிப்பது, விருந்தினர்களை உபசரிப்பது, கடந்து போனவற்றை (இழந்தவற்றை) மீண்டும் ஆக்கம் பெறுவது போன்றது. பொறுமையே இழந்த செல்வத்தை மீட்கும்.",
    paal: "Arathupal"
  },
  {
    number: 156,
    adhigaramNumber: 16,
    tamilText: "பொறுத்தல் இறப்பினை யார்மாட்டு மன்றே\nதிறத்தலறி வினுண் டாகும்",
    purul: "பொறுத்தல் இறப்பு (இறுதி) இல்லாதது யாரிடத்திலும், அதனால் திறமையை அறிவின் உள்ளே ஆகும். எல்லோரிடமும் பொறுமை காட்டுவதே அறிவு.",
    paal: "Arathupal"
  },
  {
    number: 157,
    adhigaramNumber: 16,
    tamilText: "இன்னாசெய் தாரை யொறுத்தல் அவர்நாண\nநன்னயஞ் செய்து விடல்",
    purul: "தீமை செய்தவர்களை பொறுத்துக்கொண்டு, அவர்கள் வெட்கப்படும்படி நல்ல நயத்துடன் செய்து விடுதல். பகைவருக்கு நன்மை செய்வதே உயர்ந்த பொறுமை.",
    paal: "Arathupal"
  },
  {
    number: 158,
    adhigaramNumber: 16,
    tamilText: "அறிவினா னாகு வுளவே யறிவிலான்\nஆக்க மதனினு மில்",
    purul: "அறிவினால் ஆகுவது உள்ளது, அறிவு இல்லாதவனின் ஆக்கம் அதை விட இல்லை. பொறுமையுடன் செயல்படுவதே அறிவு.",
    paal: "Arathupal"
  },
  {
    number: 159,
    adhigaramNumber: 16,
    tamilText: "திருவினை யுண்டாக்கு மன்னார் பொறையொரு\nதீங்கருவி னின்றென் றெனின்",
    purul: "திருவை (செல்வத்தை) உண்டாக்கும் அன்னார், பொறுமை ஒரு நல்ல கருவியாக இருந்தால் என்றால். பொறுமை செல்வத்தை உண்டாக்கும் கருவி.",
    paal: "Arathupal"
  },
  {
    number: 160,
    adhigaramNumber: 16,
    tamilText: "நிலையெனின் நிற்பதுஅ றம்போற் பொறையென்னும்\nஓர்நிலை யான்உ லகு",
    purul: "நிலை என்றால் நிற்பது அறம் போல், பொறுமை என்னும் ஒரு நிலையால் உலகம் நிலைத்திருக்கிறது. பொறுமையே உலகின் அடிப்படை.",
    paal: "Arathupal"
  },
  {
    number: 161,
    adhigaramNumber: 17,
    tamilText: "அழுக்காறு எனஒரு பாவி திருச்செற்று\nவல்வினை யுண்டாக் கொரு",
    purul: "பொறாமை என்ற ஒரு பாவி, செல்வத்தை அழித்து வலிய தீவினையை உண்டாக்கும் ஒன்று. பொறாமை செல்வத்தையும் அறத்தையும் அழிக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 162,
    adhigaramNumber: 17,
    tamilText: "அவ்வித் தழுக்காறு உடையான் தவத்தற்கு\nத்ததுஅ றியான்எ னப்படு",
    purul: "அந்த பொறாமை உடையவன், தவத்திற்கு உரியதை அறியாதவன் என்று சொல்லப்படுவான். பொறாமை உள்ளவன் அறம் அறியாதவன்.",
    paal: "Arathupal"
  },
  {
    number: 163,
    adhigaramNumber: 17,
    tamilText: "அழுக்காற் படுபோ துண்டோ பிறர்க்குஅழுக்கு\nஆற்ற லதுஇல்லா தவர்க்கு",
    purul: "பொறாமை கொள்ளும் போது என்ன இருக்கிறது? பிறருக்கு பொறாமை செய்ய வல்லமை இல்லாதவர்களுக்கு. பொறாமை கொள்வதால் தனக்கே துன்பம்.",
    paal: "Arathupal"
  },
  {
    number: 164,
    adhigaramNumber: 17,
    tamilText: "கொடுப்பன கொடுக்கலும் இன்னா தழுக்காறு\nஒட்பது தான்கண்ட வாறு",
    purul: "கொடுக்க வேண்டியவற்றை கொடுப்பதும் கஷ்டமானது, பொறாமை வந்து ஒட்டுவது தான் கண்ட வழியில். பொறாமை வந்தால் கொடுக்கவும் மனம் இல்லாமல் போகும்.",
    paal: "Arathupal"
  },
  {
    number: 165,
    adhigaramNumber: 17,
    tamilText: "அறன்ஆக்கங் காக்குந் தருமஞ் செழுக்காறு\nஆற்றலிற் றாது பெறின்",
    purul: "அறம் ஆக்கத்தை காக்கும் தருமத்தை, பொறாமை ஆற்றலில் தாக்கினால் பெறும். பொறாமை நல்ல செயல்களை அழிக்கும்.",
    paal: "Arathupal"
  },
  {
    number: 166,
    adhigaramNumber: 17,
    tamilText: "அவ்விய நெஞ்சத் தழுக்கறுப் பானாழும்\nதவ்விருள் மூடிய தாற்று",
    purul: "துன்பமான நெஞ்சத்தில் பொறாமை உறுப்பானால், அது இருள் மூடிய போன்றது. பொறாமை உள்ளத்தை இருளில் ஆழ்த்தும்.",
    paal: "Arathupal"
  },
  {
    number: 167,
    adhigaramNumber: 17,
    tamilText: "அழுக்கா றின்னா தளவல்ல தெற்றெனின்\nவெவ்விய னத்துஅதன் மேல்",
    purul: "பொறாமை தீமையானது, வல்லமை உடையது என்றால், வெவ்வியான் (கொடியவன்) அதன் மேல் இருக்கிறான். பொறாமை மிகவும் தீமையானது.",
    paal: "Arathupal"
  },
  {
    number: 168,
    adhigaramNumber: 17,
    tamilText: "கண்ணுற் றுஇரங்கும் பசுபோல் வழுக்காற்றின்\nசுண்ணிய னொத்தன் கண்ணது",
    purul: "கண்ணுக்கு பட்டு இரங்கும் பசு போல், பொறாமை கொண்டவனின் குணம் (சுண்ணியம்) அதைப் போன்றது. பொறாமை உள்ளவன் எப்போதும் வருந்துவான்.",
    paal: "Arathupal"
  },
  {
    number: 169,
    adhigaramNumber: 17,
    tamilText: "அழுக்கா றுஒரு கண்தொட்கு யாவதும் உள்ளத்தி\nனெழுப்பான் ஒழுகு வொரு",
    purul: "பொறாமை ஒரு கண் தொடுத்தால், எல்லாவற்றையும் உள்ளத்தில் எழுப்பி ஒழுகும் ஒன்று. பொறாமை உள்ளத்தை நிம்மதி இழக்க செய்யும்.",
    paal: "Arathupal"
  },
  {
    number: 170,
    adhigaramNumber: 17,
    tamilText: "அவ்விய னென்பது அழுக்காறு நீயற்றா\nதக்க தறிவி னுளது",
    purul: "துன்பம் தருவது என்பது பொறாமை, அதை விட்டு அகற்றுவது அறிவின் உள்ளே உள்ளது. பொறாமையை அகற்றுவதே அறிவு.",
    paal: "Arathupal"
  },
  {
    number: 171,
    adhigaramNumber: 18,
    tamilText: "வேண்டுதல் வெஃகாமை யின்மை யிரண்டுஅ இன்\nஆண்டு ஆக்கங் கண்ணு மொரு",
    purul: "வேண்டுதல் (விருப்பம்), பொருள் மீது மோகம் கொள்ளாமை, இன்மை (வறுமை) ஆகிய இரண்டும் இல்லாமை, இந்த ஆண்டில் ஆக்கத்தில் கண்ணில் ஒன்று. ஆசை இல்லாமையே செல்வம்.",
    paal: "Arathupal"
  },
  {
    number: 172,
    adhigaramNumber: 18,
    tamilText: "வெஃகி யுழைத்தல் இழிவிற் கிசத்திற்கு\nஏச்சல் இசைஒப் பதன்று",
    purul: "பொருள் மீது ஆசைப்பட்டு உழைத்தல், இழிவிற்கு இசையாக ஏச்சல் (இகழ்ச்சி) சொல்வது போன்றது. பேராசையுடன் செயல்படுவது இழிவானது.",
    paal: "Arathupal"
  },
  {
    number: 173,
    adhigaramNumber: 18,
    tamilText: "வேண்டற்க வெஃகி யபிறவை எல்லாம்\nஉண்டற்க உல்குஇல் புறத்து",
    purul: "பிறரின் பொருள்களை ஆசையுடன் விரும்பாதே, எல்லாவற்றையும் உலகில் புறத்தே (வெளியில்) உணர்ந்து கொள். பிறர் பொருளை விரும்பாதே.",
    paal: "Arathupal"
  },
  {
    number: 174,
    adhigaramNumber: 18,
    tamilText: "வெஃகாமை யன்ன விழுச்செல்வம் யார்க்குஇல்லை\nஆக்கந் தருங்கால் வறி",
    purul: "பொருள் மீது ஆசை இல்லாமையைப் போன்ற விழுமிய செல்வம், யாருக்கும் இல்லை, ஆக்கம் தரும் காலத்தில் கூட வறுமை இருக்கும். ஆசையின்மையே சிறந்த செல்வம்.",
    paal: "Arathupal"
  },
  {
    number: 175,
    adhigaramNumber: 18,
    tamilText: "வஞ்சிப்ப தெல்லாம் வளம்விரும்பி யன்றே\nஅஞ்சு உயிர்க்கும் பொருள்செய்யும் நீர்",
    purul: "வஞ்சனை செய்வது எல்லாம், செல்வத்தை விரும்பியதால் அல்லவா? அஞ்சும் உயிருக்கும் (ஐம்புலன்களுக்கும்) பொருள் செய்யும் நீர் (நீங்கள்). ஆசையே வஞ்சனைக்கு காரணம்.",
    paal: "Arathupal"
  },
];

module.exports = { adhigarams, kurals };
