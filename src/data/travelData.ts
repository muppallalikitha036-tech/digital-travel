// Generated cinematic image assets
import heroLandscape from '../assets/images/hero_cinematic_landscape_1791213736467.jpg';
import icelandAurora from '../assets/images/iceland_aurora_lights_1791213753008.jpg';
import kyotoTemple from '../assets/images/kyoto_serene_temple_1791213775062.jpg';
import swissSummit from '../assets/images/swiss_alps_summit_1791213787949.jpg';
import patagoniaPeaks from '../assets/images/patagonia_torres_peaks_1791213799275.jpg';
import varanasiGhats from '../assets/images/varanasi_ganges_ghats_1791214904380.jpg';
import angkorSunrise from '../assets/images/angkor_wat_sunrise_1791214925554.jpg';
import bhutanTigersNest from '../assets/images/bhutan_tigers_nest_1791214940922.jpg';
import autumnBg from '../assets/images/autumn_blossom_ambient_bg_1791214878260.jpg';

export interface Destination {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Asia' | 'Africa' | 'North America' | 'South America' | 'Oceania';
  headline: string;
  shortDescription: string;
  overview: string;
  bestSeason: string;
  weatherOverview: string;
  climateType: string;
  budgetLevel: 'Budget' | 'Comfortable' | 'Premium' | 'Luxury';
  image: string;
  gallery: string[];
  tags: string[];
  highlights: { title: string; desc: string }[];
  localExperiences: string[];
  food: string[];
  culture: string[];
  adventureActivities: string[];
  suggestedItinerary: { day: string; title: string; desc: string }[];
  travelTips: string[];
  nearbyDestinationIds: string[];
  coordinates: { lat: number; lng: number };
}

export interface Experience {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  location: string;
  country: string;
  category: 'Adventure' | 'Nature' | 'Culture' | 'Pilgrimage' | 'Food' | 'Wellness' | 'Luxury' | 'Photography' | 'Wildlife' | 'Road Trips';
  duration: string;
  difficulty: 'Gentle' | 'Moderate' | 'Demanding' | 'Challenging';
  priceIndicator: '$$' | '$$$' | '$$$$' | '$$$$$';
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  whatYouWillExperience: string[];
  recommendedEquipment: string[];
  suggestedItinerary: { time: string; activity: string }[];
  nearbyAttractions: string[];
  bestSeason: string;
}

export interface TravelStory {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  destinationId: string;
  content: {
    heading: string;
    paragraphs: string[];
    quote?: string;
  }[];
}

export const DESTINATIONS: Destination[] = [
  // 1. VARANASI (INDIA) - Flagship Pilgrimage & Cultural Site
  {
    id: 'varanasi',
    name: 'Varanasi (Kashi)',
    country: 'India',
    region: 'Asia',
    headline: 'THE ETERNAL CITY OF LIGHT & SPIRIT',
    shortDescription: 'Ancient stone ghats along the sacred Ganges, evening Ganga Aarti fire ceremonies, and timeless Hindu pilgrimage traditions.',
    overview: 'Inhabited continuously for over 3,000 years, Varanasi (Kashi) is the spiritual capital of India. Mark Twain famously noted that Varanasi is older than history, older than tradition, and looks even twice as old as all of them put together. Pilgrims journey from across the subcontinent to wash away karmic burdens in the sacred mother Ganges (Maa Ganga), chant Sanskrit hymns at dawn, and witness the incandescent Ganga Aarti illuminated by multi-tiered brass oil lamps.',
    bestSeason: 'October – March (Cool, pleasant 15°C–25°C days with crisp dawn river mist)',
    weatherOverview: 'Subtropical; cool soothing winters, vibrant post-monsoon festivities, warm summer months.',
    climateType: 'Humid Subtropical',
    budgetLevel: 'Comfortable',
    image: varanasiGhats,
    gallery: [varanasiGhats, angkorSunrise, bhutanTigersNest],
    tags: ['Pilgrimage', 'Culture', 'Photography', 'Wellness'],
    highlights: [
      { title: 'Dashashwamedh & Assi Ghats', desc: 'The spiritual heart of Kashi where the magnificent evening Ganga Aarti fire ceremony unfolds to the rhythm of brass cymbals and conch shells.' },
      { title: 'Dawn Boat Pilgrimage on the Ganges', desc: 'Glide silently across misty river currents as sunrise paints the centuries-old palace facades in gold and devotees perform morning Surya Namaskar.' },
      { title: 'Kashi Vishwanath Golden Temple', desc: 'One of the twelve sacred Jyotirlingas of Lord Shiva, crowned with a spire gilded in pure gold, reconnected via a grand spiritual corridor to the river.' },
      { title: 'Sarnath Deer Park', desc: 'Located 10km away, the sacred site where Gautama Buddha preached his first sermon setting the Wheel of Dharma (Dharmachakra) in motion.' },
    ],
    localExperiences: [
      'Private dawn wooden boat charter with a Vedic Sanskrit scholar reciting sacred morning mantras',
      'Front-row VIP boat seating for the twilight Maha Aarti at Dashashwamedh Ghat',
      'Guided walk through the ancient labyrinthine galis (alleys) exploring centuries-old silk weaving lofts and spice markets',
      'Classical Hindustani morning sitar and flute recital at a historic riverfront haveli',
    ],
    food: [
      'Banarasi Tamatar Chaat (spiced tomato delicacy served in terracotta bowls)',
      'Malaiyo (saffron-infused winter milk foam crowned with pistachios and silver leaf)',
      'Crisp Kachori Sabzi with spicy hing aloo curry',
      'Traditional creamy lassi served in earthen kulhad cups with clotted malai',
    ],
    culture: [
      'The sacred philosophy of Moksha: liberation from the cycle of rebirth',
      'Living traditions of master Banarasi silk weavers weaving gold zari brocades',
      'Varanasi Gharana: legendary heritage of classical Indian music, sitar, and tabla',
    ],
    adventureActivities: [
      'Sunrise rowing expeditions down the full 84-ghat river crescent',
      'Heritage cycling trail through Buddhist monastic ruins in Sarnath',
      'Walking pilgrimage through the sacred Panchkroshi route',
    ],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Arrival & Twilight River Introduction', desc: 'Check in to a historic riverfront palace; evening wooden boat cruise to witness Dashashwamedh Aarti.' },
      { day: 'Day 02', title: 'Dawn Ganges Pilgrimage & Kashi Vishwanath', desc: '5:30 AM sunrise boat tour watching morning prayers; visit the sacred Golden Temple corridor.' },
      { day: 'Day 03', title: 'Sarnath Buddhist Sanctuary', desc: 'Excursion to Dhamek Stupa where Buddha gave his first discourse; explore the Archaeological Museum.' },
      { day: 'Day 04', title: 'Ancient Galis & Banarasi Silk Heritage', desc: 'Discover 400-year-old silk weaving looms and savor street cuisine in Thatheri Bazar.' },
      { day: 'Day 05', title: 'Assi Ghat Yoga & Classical Music', desc: 'Morning meditation at Assi Ghat followed by a private sitar masterclass in a traditional ashram.' },
      { day: 'Day 06', title: 'Ramnagar Fort & Crafts Corridor', desc: 'Cross the river to the 18th-century sandstone fortress of the Maharaja of Kashi.' },
      { day: 'Day 07', title: 'Farewell Diya Offering & Departure', desc: 'Release floating marigold and clay oil lamps into the Ganges at sunrise before departure.' },
    ],
    travelTips: [
      'Rise early: dawn (5:30 AM – 7:30 AM) offers the most serene, spiritual, and photogenic moments on the river.',
      'Dress modestly covering shoulders and knees when visiting temples and sacred ghats.',
      'Remove footwear at all temple entrances and ashram courtyards.',
    ],
    nearbyDestinationIds: ['ladakh', 'bhutan', 'angkor-wat'],
    coordinates: { lat: 25.3176, lng: 82.9739 },
  },

  // 2. LADAKH & HIMALAYAS (INDIA) - High-Altitude Buddhist Pilgrimage
  {
    id: 'ladakh',
    name: 'Ladakh & High Himalayas',
    country: 'India',
    region: 'Asia',
    headline: 'THE ROOF OF THE SACRED MOUNTAINS',
    shortDescription: 'Cliffside Tibetan Buddhist monasteries, high-altitude turquoise lakes at 14,000 ft, and dramatic Himalayan passes.',
    overview: 'Perched in the trans-Himalayan rain shadow of Northern India, Ladakh—known as the Land of High Passes—is a realm of otherworldly stark beauty and profound Buddhist spirituality. Ancient gompas (monasteries) cling to sheer jagged rock spires above the Indus Valley, while prayer flags flutter across high mountain passes like Khardung La. At dawn in monasteries like Thiksey and Hemis, the deep resonant drone of monastic long horns (dungchen) reverberates across glacial valleys.',
    bestSeason: 'May – September (Pleasant sunny mountain summer 15°C–25°C with clear passes)',
    weatherOverview: 'High-altitude cold desert; extreme sunlight clarity, cool mountain air, crisp starry nights.',
    climateType: 'Alpine Cold Desert',
    budgetLevel: 'Premium',
    image: bhutanTigersNest,
    gallery: [bhutanTigersNest, swissSummit, patagoniaPeaks],
    tags: ['Pilgrimage', 'Adventure', 'Nature', 'Culture'],
    highlights: [
      { title: 'Thiksey & Hemis Monasteries', desc: 'Spectacular multi-tiered monastery complex resembling Lhasa’s Potala Palace, housing a 49-foot Maitreya Buddha statue.' },
      { title: 'Pangong Tso & Tso Moriri Lakes', desc: 'Endorheic crystal-clear saltwater lakes at 14,270 ft that shift mesmerizingly from aquamarine to cobalt blue.' },
      { title: 'Nubra Valley & Diskit Monastery', desc: 'A dramatic valley where white sand dunes and double-humped Bactrian camels meet colossal snow peaks and a 106-foot Buddha.' },
      { title: 'Khardung La High Pass', desc: 'One of the world’s highest motorable mountain passes at 17,582 ft offering views of the Karakoram range.' },
    ],
    localExperiences: [
      'Dawn monastic chanting and butter-lamp prayer offering inside Thiksey Monastery prayer hall',
      'Stargazing beneath certified zero-light pollution skies at Hanle Dark Sky Sanctuary',
      'Private tea and barley tsampa breakfast with Himalayan village elders in a traditional adobe homestay',
    ],
    food: [
      'Steaming Thukpa noodle soup with wild mountain greens',
      'Handmade Tingmo steamed Tibetan bread with savory spiced stews',
      'Warm salty butter tea (Gur Gur Chai)',
      'Fresh apricot tarts made from Sham Valley orchards',
    ],
    culture: [
      'Living Mahayana and Vajrayana Tibetan Buddhist traditions',
      'Sacred Cham dance festivals with colorful silk robes and carved wood masks',
      'Traditional zero-waste earthen architecture adapted to sub-zero winters',
    ],
    adventureActivities: [
      'High-altitude trekking along the Markha Valley trail',
      'Rafting on the foaming Zanskar river through deep granite gorges',
      'Overland motorcycle touring across ancient Silk Route passes',
    ],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Leh Arrival & Acclimatization', desc: 'Rest and hydration at 11,500 ft; peaceful sunset at Shanti Stupa.' },
      { day: 'Day 02', title: 'Indus Valley Monasteries', desc: 'Visit Shey Palace and attend morning prayers at Thiksey Monastery.' },
      { day: 'Day 03', title: 'Over Khardung La to Nubra Valley', desc: 'Drive across the 17,582 ft pass into the sand dunes of Hunder.' },
      { day: 'Day 04', title: 'Diskit Monastery & Panamik Springs', desc: 'Gaze upon the giant Maitreya statue and soak in natural sulfur hot springs.' },
      { day: 'Day 05', title: 'Shyok River Route to Pangong Tso', desc: 'Scenic mountain canyon transit arriving at the turquoise shores of Pangong Lake.' },
      { day: 'Day 06', title: 'Sunrise Over Pangong & Return to Leh', desc: 'Watch golden morning light illuminate the Changchenmo range; cross Chang La pass.' },
      { day: 'Day 07', title: 'Hemis Spiritual Heritage & Departure', desc: 'Explore the royal museum of Hemis before your morning flight.' },
    ],
    travelTips: [
      'Acclimatize: spend at least 48 hours resting in Leh before ascending higher passes.',
      'Carry high SPF sunscreen, polarized sunglasses, and lip balm due to intense UV rays.',
      'Inner Line Permits (ILP) are required for Nubra Valley and Pangong Tso.',
    ],
    nearbyDestinationIds: ['varanasi', 'bhutan'],
    coordinates: { lat: 34.1526, lng: 77.5771 },
  },

  // 3. BHUTAN (PARO & THIMPHU) - Sacred Himalayan Pilgrimage
  {
    id: 'bhutan',
    name: 'Bhutan (The Thunder Dragon)',
    country: 'Bhutan',
    region: 'Asia',
    headline: 'THE DRAGON KINGDOM OF GROSS NATIONAL HAPPINESS',
    shortDescription: 'Sacred cliffside Tiger’s Nest monastery, fortress dzongs, untouched Himalayan valleys, and Vajrayana Buddhist culture.',
    overview: 'Hidden in the eastern Himalayas, the Kingdom of Bhutan is the world’s only carbon-negative nation and the last surviving Vajrayana Buddhist kingdom. Guided by the holistic philosophy of Gross National Happiness, Bhutan preserves pristine biodiversity, prayer-wheel-lined mountain passes, and dramatic monastic dzongs where red-robed monks debate Buddhist philosophy amidst fragrant pine air.',
    bestSeason: 'March – May (Rhododendron blooms) & September – November (Crystal clear skies)',
    weatherOverview: 'Mountain temperate; crisp fresh alpine air, sunny days and cool evenings.',
    climateType: 'Subtropical Highland',
    budgetLevel: 'Luxury',
    image: bhutanTigersNest,
    gallery: [bhutanTigersNest, kyotoTemple, swissSummit],
    tags: ['Pilgrimage', 'Culture', 'Nature', 'Wellness'],
    highlights: [
      { title: 'Paro Taktsang (Tiger’s Nest)', desc: 'The iconic monastery clinging to a sheer 900-meter cliff above Paro Valley where Guru Rinpoche meditated in the 8th century.' },
      { title: 'Punakha Dzong (Palace of Great Bliss)', desc: 'Majestic 17th-century fortress situated at the sacred confluence of the Pho Chhu and Mo Chhu rivers.' },
      { title: 'Dochula Pass (108 Chortens)', desc: 'High mountain pass at 3,100m crowned with 108 memorial stupas with panoramic views of snow-capped Himalayan peaks.' },
      { title: 'Phobjikha Glacial Valley', desc: 'Wide U-shaped glacial haven where rare black-necked cranes migrate each winter from the Tibetan plateau.' },
    ],
    localExperiences: [
      'Private butter-lamp lighting ceremony and blessing with a senior Rinpoche monk at Tiger’s Nest',
      'Traditional Bhutanese hot stone bath infused with aromatic Artemisia medicinal herbs',
      'Archery contest (the national sport) accompanied by folk songs and celebration',
    ],
    food: [
      'Ema Datshi (Bhutan’s national dish of fiery chilies simmering in artisanal yak cheese)',
      'Nutty red Himalayan rice harvested from terraced mountain valleys',
      'Momos stuffed with wild mushrooms, cabbage, and mountain herbs',
      'Suja (Bhutanese butter tea with roasted puffed rice)',
    ],
    culture: [
      'Gross National Happiness: measuring spiritual wellbeing and ecological preservation over GDP',
      'Mandatory national dress code (Gho for men, Kira for women) celebrating cultural continuity',
      'Deep reverence for sacred mountains—mountaineering above 6,000m is forbidden to respect divine peaks',
    ],
    adventureActivities: [
      'Hike through pine and rhododendron forests up to the cliff of Tiger’s Nest',
      'Biking across the suspension bridges of Punakha Valley',
      'High alpine treks along the legendary Druk Path',
    ],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Paro Arrival & Transit to Thimphu', desc: 'Scenic flight past Mount Everest; visit the colossal Buddha Dordenma statue overlooking Thimphu.' },
      { day: 'Day 02', title: 'Thimphu Arts & Monastic Heritage', desc: 'Explore the Institute for Zorig Chusum (13 Traditional Arts) and Tashichho Dzong.' },
      { day: 'Day 03', title: 'Dochula Pass to Punakha Valley', desc: 'Cross the 108 stupas of Dochula Pass; descend into the subtropical valley of Punakha.' },
      { day: 'Day 04', title: 'Punakha Dzong & Chimi Lhakhang', desc: 'Marvel at the Fortress of Great Bliss and walk through rice terraces to the Temple of Fertility.' },
      { day: 'Day 05', title: 'Scenic Return to Paro', desc: 'Drive through alpine valleys; explore the historic Paro Rinpung Dzong and national museum.' },
      { day: 'Day 06', title: 'The Sacred Pilgrimage to Tiger’s Nest', desc: 'Ascend the pilgrimage path to Paro Taktsang; evening restorative hot stone bath ritual.' },
      { day: 'Day 07', title: 'Morning Blessing & Paro Departure', desc: 'Receive a traditional travelers silk blessing scarf (khata) before your flight.' },
    ],
    travelTips: [
      'Bhutan enforces a Sustainable Development Fee (SDF) which funds free healthcare and education for its citizens.',
      'Pack sturdy broken-in hiking boots with good tread for the Tiger’s Nest trail.',
      'Photography is strictly prohibited inside sacred inner shrine rooms.',
    ],
    nearbyDestinationIds: ['varanasi', 'ladakh', 'angkor-wat'],
    coordinates: { lat: 27.5142, lng: 89.8677 },
  },

  // 4. ANGKOR WAT & SIEM REAP (CAMBODIA) - Sacred UNESCO Monument
  {
    id: 'angkor-wat',
    name: 'Angkor Wat & Siem Reap',
    country: 'Cambodia',
    region: 'Asia',
    headline: 'THE SACRED SANCTUARY OF GOD-KINGS',
    shortDescription: 'The world’s largest religious temple complex, giant stone faces of Bayon, and mystical roots of Ta Prohm.',
    overview: 'Spanning over 400 square kilometers within the tropical jungle of Siem Reap, Angkor was once the greatest megacity of the pre-industrial world and the spiritual epicenter of the Khmer Empire. Conceived as a microcosm of Mount Meru—the cosmic home of Hindu and Buddhist deities—Angkor Wat’s five central lotus-bud towers rise in divine architectural symmetry. Nearby, giant strangler fig roots embrace the mossy ruins of Ta Prohm, and 216 serene smiling faces of Avalokiteshvara gaze down from the Bayon.',
    bestSeason: 'November – February (Cool, dry sunny season with lower humidity)',
    weatherOverview: 'Tropical monsoon; sunny, pleasant breezes in winter, lush emerald foliage in green season.',
    climateType: 'Tropical Wet and Dry',
    budgetLevel: 'Comfortable',
    image: angkorSunrise,
    gallery: [angkorSunrise, kyotoTemple, heroLandscape],
    tags: ['Pilgrimage', 'Culture', 'Photography', 'History'],
    highlights: [
      { title: 'Angkor Wat Sunrise', desc: 'Watch the sun rise behind the five iconic sandstone spires, casting a mirror reflection onto the lotus lily pools.' },
      { title: 'The Smiling Faces of Bayon', desc: 'Stand in the center of Angkor Thom surrounded by 54 gothic towers carved with enigmatic stone smiles.' },
      { title: 'Ta Prohm (Jungle Temple)', desc: 'Nature reclaiming history: massive silk-cotton tree roots intertwined with 12th-century carved stone galleries.' },
      { title: 'Banteay Srei (Citadel of Women)', desc: 'Exquisite 10th-century temple carved from rose-pink sandstone with intricate bas-reliefs depicting Hindu epics.' },
    ],
    localExperiences: [
      'Private dawn monk water blessing ceremony at a tranquil forest pagoda',
      'Private tethered hot-air balloon flight gazing over Angkor Wat and the jungle canopy',
      'Sunset vintage wooden gondola cruise along the ancient moat of Angkor Thom',
    ],
    food: [
      'Fish Amok (steamed curried fish soufflé infused with lemongrass, kaffir lime, and coconut)',
      'Nom Banh Chok (Khmer breakfast rice noodles in fragrant green fish curry)',
      'Beef Lok Lak with lime and Kampot black pepper dipping sauce',
      'Fresh tropical passionfruit and dragonfruit delicacies',
    ],
    culture: [
      'Synthesis of ancient Hinduism and Theravada Buddhism',
      'Living art of classical Royal Apsara celestial dance',
      'Advanced hydraulic engineering and spiritual water reservoir sacred systems (Barays)',
    ],
    adventureActivities: [
      'Dawn cycling tour along shaded jungle paths connecting hidden temples',
      'Kayaking through the floating villages and flooded forests of Tonle Sap Lake',
      'Canopy zip-line expedition through Angkor national park rainforest',
    ],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Siem Reap Arrival & Apsara Dance', desc: 'Check in to a boutique colonial hotel; evening Royal Khmer dinner with classical Apsara dance.' },
      { day: 'Day 02', title: 'The Grand Sunrise at Angkor Wat', desc: '5:00 AM sunrise over the reflection ponds; explore the celestial bas-relief galleries.' },
      { day: 'Day 03', title: 'Bayon & Ta Prohm Jungle Temple', desc: 'Marvel at the stone faces of Angkor Thom and explore the roots of Ta Prohm.' },
      { day: 'Day 04', title: 'Pink Sandstone of Banteay Srei', desc: 'Scenic countryside drive to Banteay Srei and visit an organic sugar-palm farm.' },
      { day: 'Day 05', title: 'Sacred Waterfalls of Phnom Kulen', desc: 'Visit the riverbed of 1,000 carved Shiva lingas and holy mountain springs.' },
      { day: 'Day 06', title: 'Tonle Sap Floating Community', desc: 'Boat expedition through the stilt villages of Kampong Phluk; private monk blessing.' },
      { day: 'Day 07', title: 'Artisans d’Angkor & Departure', desc: 'Watch stone carving and silk painting masters before onward travel.' },
    ],
    travelTips: [
      'Dress code (shoulders and knees covered) is strictly enforced to ascend the top tier of Angkor Wat.',
      'Purchase an Angkor Pass online or at the official ticket center; multi-day passes offer great flexibility.',
      'Early starts (before 8 AM) ensure cooler temperatures and fewer crowds.',
    ],
    nearbyDestinationIds: ['kyoto', 'bali', 'varanasi'],
    coordinates: { lat: 13.4125, lng: 103.867 },
  },

  // Existing Flagship Destinations
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    region: 'Europe',
    headline: 'ENTER THE LAND OF FIRE & ICE',
    shortDescription: 'Glacial lagoons, dancing emerald auroras, volcanic craters, and raw primordial geothermal power.',
    overview: 'Iceland presents one of earth’s most theatrical landscapes: a sub-arctic frontier where massive ice caps meet active geothermal fissures, cascading black basalt waterfalls, and midnight sunlit fjords.',
    bestSeason: 'September – April (Northern Lights) or June – August (Midnight Sun)',
    weatherOverview: 'Mild oceanic sub-polar; rapidly changing conditions. Summer 10°C–16°C, Winter -2°C–3°C.',
    climateType: 'Subpolar Oceanic',
    budgetLevel: 'Premium',
    image: icelandAurora,
    gallery: [icelandAurora, heroLandscape, patagoniaPeaks],
    tags: ['Adventure', 'Nature', 'Photography', 'Road Trips'],
    highlights: [
      { title: 'Jökulsárlón Glacier Lagoon', desc: 'Watch ancient icebergs drift from Breiðamerkurjökull into the Atlantic ocean.' },
      { title: 'The Golden Circle', desc: 'Geysir geothermal fields, Gullfoss falls, and the tectonic rift valley of Þingvellir.' },
      { title: 'Reynisfjara Black Sand Beach', desc: 'Towering hexagonal basalt columns and thunderous North Atlantic ocean breakers.' },
      { title: 'Vatnajökull Ice Caves', desc: 'Venture into electric-blue subterranean crystalline glacier caverns with certified guides.' },
    ],
    localExperiences: [
      'Private geothermal lagoon soaking under Arctic starlight',
      'Super-Jeep traversal across volcanic highland ash plains',
      'Nordic foraged tasting dinners featuring wild Arctic char and rye bread baked in volcanic ground',
    ],
    food: ['Slow-cooked mountain lamb soup (Kjötsúpa)', 'Arctic char with dill & sea salt', 'Skyr with Arctic bilberries', 'Traditional rye pot bread'],
    culture: ['Rich saga heritage and poetry traditions', 'Commitment to 100% renewable geothermal energy', 'Deep reverence for untamed coastal elements'],
    adventureActivities: ['Glacier crevasse hiking', 'Snowmobile expeditions', 'Silfra tectonic rift snorkeling', 'Volcano cave spelunking'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Reykjavik Arrival & Geothermal Unwind', desc: 'Explore the harbor architecture, Harpa Concert Hall, and take a private thermal mineral bath.' },
      { day: 'Day 02', title: 'The Golden Circle', desc: 'Witness the Strokkur geyser eruption and stand at the Eurasian-North American rift.' },
      { day: 'Day 03', title: 'South Coast Waterfalls', desc: 'Walk behind Seljalandsfoss and marvel at the massive 60m drop of Skógafoss.' },
      { day: 'Day 04', title: 'Black Sand Beach & Basalt Columns', desc: 'Encounter the dramatic sea stacks of Reynisdrangar and the coastal village of Vík.' },
      { day: 'Day 05', title: 'Glacier Lagoon & Diamond Beach', desc: 'Sail among floating icebergs and touch crystal ice chunks washed ashore on obsidian sand.' },
      { day: 'Day 06', title: 'Subterranean Ice Caves', desc: 'Enter the blue ice chambers of Vatnajökull with glaciology specialists.' },
      { day: 'Day 07', title: 'Midnight Aurora Hunt & Departure', desc: 'Night sky vigil beneath the aurora borealis before your return flight.' },
    ],
    travelTips: [
      'Pack three-layer technical clothing with GORE-TEX outer shell.',
      'Always check safetravel.is before driving in winter months.',
      'Reserve geothermal lagoon admissions at least 3 weeks ahead.',
    ],
    nearbyDestinationIds: ['norway', 'swiss-alps'],
    coordinates: { lat: 64.9631, lng: -19.0208 },
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Europe',
    headline: 'WHERE MOUNTAINS MEET THE SKY',
    shortDescription: 'High-altitude luxury, majestic granite summits, serene alpine lakes, and world-class rail panoramas.',
    overview: 'The Swiss Alps represent the pinnacle of mountain splendor. From the unmistakable pyramidal silhouette of the Matterhorn to pristine turquoise glacial tarns, each valley offers refined tranquility and legendary alpine craftsmanship.',
    bestSeason: 'December – March (Winter Snow) & June – September (Alpine Trails)',
    weatherOverview: 'Alpine temperate; crisp mountain air, warm sunny valleys in summer, deep powder in winter.',
    climateType: 'Alpine Continental',
    budgetLevel: 'Luxury',
    image: swissSummit,
    gallery: [swissSummit, heroLandscape, kyotoTemple],
    tags: ['Luxury', 'Adventure', 'Nature', 'Wellness'],
    highlights: [
      { title: 'The Iconic Matterhorn', desc: 'Gaze upon the world’s most celebrated pyramid peak from the car-free village of Zermatt.' },
      { title: 'Glacier Express Scenic Rail', desc: 'Traverse 291 bridges and 91 tunnels through dramatic gorges and high passes.' },
      { title: 'Jungfraujoch - Top of Europe', desc: 'Ascend to 3,454m elevation overlooking the colossal Aletsch Glacier.' },
      { title: 'Lake Oeschinen Alpine Haven', desc: 'Turquoise glacial waters surrounded by 500-meter sheer limestone cliffs.' },
    ],
    localExperiences: [
      'High-altitude fondue tasting on a private sun terrace facing Monte Rosa',
      'Panoramic helicopter glacier flight over the Bernese Oberland',
      'Thermal mineral wellness retreats in historic mountain valleys',
    ],
    food: ['Gruyère and Vacherin cheese fondue', 'Crisp potato rösti with alpine herbs', 'Artisanal Swiss mountain chocolate', 'Valais dried beef and air-cured prosciutto'],
    culture: ['Centuries-old alpine pastoral heritage', 'Punctual precision and clean architectural design', 'Deep mountaineering ethics and environmental stewardship'],
    adventureActivities: ['Heli-skiing on untracked virgin powder', 'Via ferrata climbing along high ridge lines', 'Paragliding over Lauterbrunnen waterfalls'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Zurich to Lucerne', desc: 'Scenic lake arrival, historic wooden Chapel Bridge, and alpine lake cruise.' },
      { day: 'Day 02', title: 'GoldenPass Express to Interlaken', desc: 'Panoramic mountain transit through lush meadows into the Bernese Oberland.' },
      { day: 'Day 03', title: 'Jungfraujoch & Lauterbrunnen Valley', desc: 'High-altitude ice palace and the dramatic 72 waterfalls of Lauterbrunnen.' },
      { day: 'Day 04', title: 'Glacier Express to Zermatt', desc: 'Scenic journey through the Rhone Valley into the car-free realm of the Matterhorn.' },
      { day: 'Day 05', title: 'Gornergrat Panoramic Ridge', desc: 'Historic cogwheel railway ascending to 3,089m with views of 29 peaks exceeding 4,000m.' },
      { day: 'Day 06', title: 'Alpine Spa Sanctuary', desc: 'Thermal saltwater infinity pools gazing directly at the Matterhorn North Face.' },
      { day: 'Day 07', title: 'Lake Geneva & Montreux Departure', desc: 'Lakeside vineyard strolls in Lavaux before your departure.' },
    ],
    travelTips: [
      'Obtain a Swiss Travel Pass for seamless train, boat, and cable car access.',
      'Carry sunglasses and high SPF sunscreen due to high-altitude UV reflection.',
      'Respect mountain silence: early starts yield the clearest skies.',
    ],
    nearbyDestinationIds: ['iceland', 'norway'],
    coordinates: { lat: 46.56, lng: 7.98 },
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    headline: 'THE POETRY OF TIMELESS ZEN',
    shortDescription: 'Centuries-old wooden temples, meditative moss gardens, quiet bamboo groves, and exquisite Kaiseki dining.',
    overview: 'Kyoto was Japan’s imperial capital for over a millennium and remains the spiritual heart of Japanese culture. Walking through quiet stone alleys at dawn, one discovers an enduring rhythm of craftsmanship, tea ceremony mindfulness, and seasonal devotion.',
    bestSeason: 'March – May (Cherry Blossom) & October – November (Autumn Leaves)',
    weatherOverview: 'Four distinct seasons. Spring & Autumn are mild (15°C–22°C); Summer is humid, Winter is brisk and tranquil.',
    climateType: 'Humid Subtropical',
    budgetLevel: 'Comfortable',
    image: kyotoTemple,
    gallery: [kyotoTemple, heroLandscape, swissSummit],
    tags: ['Culture', 'Pilgrimage', 'Food', 'Wellness', 'Photography'],
    highlights: [
      { title: 'Arashiyama Bamboo Grove', desc: 'Walk beneath soaring green stalks swaying gently in the morning mountain breeze.' },
      { title: 'Fushimi Inari-Taisha', desc: 'Ascend Mt. Inari through thousands of vermilion torii shrine gates winding through sacred forest.' },
      { title: 'Kinkaku-ji (Golden Pavilion)', desc: 'Gilded Zen temple reflecting serenely in the mirror-like waters of Kyōko-chi pond.' },
      { title: 'Gion Preservation Quarter', desc: 'Historic wooden machiya merchant townhouses where geiko and maiko traditions thrive.' },
    ],
    localExperiences: [
      'Private dawn meditation and tea ceremony with a Zen Buddhist abbot',
      'Multi-course Kaiseki culinary journey honoring micro-seasonal ingredients',
      'Traditional masterclass in Japanese joinery and indigo textiles',
    ],
    food: ['Kaiseki multi-course imperial dining', 'Yudofu (silken simmering artisan tofu)', 'Matcha ceremonies with seasonal wagashi sweets', 'Kyoto-style pressed sushi (Sabazushi)'],
    culture: ['Over 1,600 Buddhist temples and 400 Shinto shrines', 'Reverence for Wabi-Sabi: finding beauty in imperfection and impermanence', 'Centuries-old living artisanal guilds'],
    adventureActivities: ['Dawn cycling through historic philosopher trails', 'Kayaking on the Hozu River rapids', 'Mount Hiei mountain pilgrimage trek'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Arrival & Gion Twilight Walk', desc: 'Check in to a traditional ryokan; evening walk through Shirakawa canal.' },
      { day: 'Day 02', title: 'Arashiyama Bamboo & Tenryu-ji', desc: 'Dawn walk in the bamboo forest and UNESCO World Heritage moss garden.' },
      { day: 'Day 03', title: 'Torii Gates & Southern Kyoto', desc: 'Ascend the mountain path of Fushimi Inari; sake brewery tasting in Fushimi.' },
      { day: 'Day 04', title: 'Northern Zen & Golden Pavilion', desc: 'Reflect at Ryoan-ji dry rock garden and the glowing facade of Kinkaku-ji.' },
      { day: 'Day 05', title: 'Uji Tea Terroirs & Byodoin', desc: 'Excursion to the birthplace of Japanese green tea; private matcha grinding masterclass.' },
      { day: 'Day 06', title: 'Higashiyama Crafts & Tea Houses', desc: 'Kiyomizu-dera temple, ceramic studios, and contemplative tea ceremony.' },
      { day: 'Day 07', title: 'Nishiki Market & Shinkansen Transit', desc: 'Savor seasonal street delicacies before boarding the Shinkansen.' },
    ],
    travelTips: [
      'Visit popular shrines before 7:30 AM to experience their quiet spiritual essence.',
      'Wear slip-on shoes as shoes are removed at all temple tatami pavilions.',
      'Purchase an IC card (Suica/Pasmo) for effortless local bus and subway travel.',
    ],
    nearbyDestinationIds: ['bali', 'varanasi'],
    coordinates: { lat: 35.0116, lng: 135.7681 },
  },
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Chile & Argentina',
    region: 'South America',
    headline: 'THE EDGE OF THE KNOWN CONTINENT',
    shortDescription: 'Towering granite spires, calving blue glaciers, untamed winds, and vast golden steppe wilderness.',
    overview: 'Spanning the southernmost reaches of South America, Patagonia is one of the world’s last great wild frontiers. Here, dramatic cordilleras of sharp granite rise abruptly above glacial fjords, and guanacos roam across silent pampas.',
    bestSeason: 'November – March (Austral Summer)',
    weatherOverview: 'Dynamic sub-Antarctic climate; sudden squalls and pristine crystalline sun on the same afternoon.',
    climateType: 'Subpolar Tundra & Alpine',
    budgetLevel: 'Premium',
    image: patagoniaPeaks,
    gallery: [patagoniaPeaks, heroLandscape, icelandAurora],
    tags: ['Adventure', 'Nature', 'Road Trips', 'Photography'],
    highlights: [
      { title: 'Torres del Paine National Park', desc: 'The iconic three granite towers rising 2,500 meters above glacial lakes.' },
      { title: 'Perito Moreno Glacier', desc: 'A thunderous wall of ice 5km wide that constantly calves into Lake Argentino.' },
      { title: 'Mount Fitz Roy (El Chaltén)', desc: 'Legendary sheer granite monolith beloved by world-class mountaineers.' },
      { title: 'Tierra del Fuego & Beagle Channel', desc: 'The windswept End of the World where the Atlantic and Pacific oceans merge.' },
    ],
    localExperiences: [
      'Ice trekking across the seracs and crevasses of Grey Glacier',
      'Ranch stay with traditional gauchos roasting Patagonian cordero al palo',
      'Catamaran navigation alongside colossal icebergs in Lake Pehoe',
    ],
    food: ['Cordero al palo (open-flame spit roasted lamb)', 'King crab (Centolla) from Beagle Channel waters', 'Wild calafate berry pastries', 'Malbec wine from high-altitude vineyards'],
    culture: ['Gaucho equestrian lore and horsemanship', 'Tales of early explorers like Magellan and Darwin', 'Deep respect for the raw power of Antarctic weather systems'],
    adventureActivities: ['W-Trek or O-Circuit backpacking', 'Kayaking past icebergs in glacial rivers', 'Puma tracking expeditions with conservation biologists'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Arrival in Punta Arenas & Puerto Natales', desc: 'Scenic drive along the Ultima Esperanza fjord; gear check and orientation.' },
      { day: 'Day 02', title: 'Torres del Paine Granite Base', desc: 'Challenging hike up Ascencio Valley to the turquoise lagoon beneath the three towers.' },
      { day: 'Day 03', title: 'French Valley & Lake Nordenskjöld', desc: 'Spectacular hanging glaciers of Mount Paine Grande and panoramic amphitheater.' },
      { day: 'Day 04', title: 'Grey Glacier Ice Navigation', desc: 'Catamaran boat trip to the cobalt ice wall and private ice hike.' },
      { day: 'Day 05', title: 'Cross the Andes to El Chaltén', desc: 'Drive across the Argentine steppe into the hiking capital of Patagonia.' },
      { day: 'Day 06', title: 'Laguna de los Tres & Mount Fitz Roy', desc: 'Ascend to the breathtaking base lagoon reflecting the sheer east face of Fitz Roy.' },
      { day: 'Day 07', title: 'Perito Moreno Glacier & Departure', desc: 'Stand before the thunderous ice walls of Perito Moreno in El Calafate.' },
    ],
    travelTips: [
      'Pack extreme wind-resistant gear (Patagonian gusts routinely exceed 80 km/h).',
      'Book National Park refugios and luxury eco-camp tents months in advance.',
      'Carry cash in both US Dollars and Argentine Pesos for border transitions.',
    ],
    nearbyDestinationIds: ['new-zealand'],
    coordinates: { lat: -51.25, lng: -72.88 },
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    headline: 'ISLAND OF THE SACRED GODS',
    shortDescription: 'Lush emerald rice terraces, cliffside ocean temples, holistic wellness sanctuaries, and warm surf breaks.',
    overview: 'Bali captivates with its spiritual elegance. From mist-shrouded volcano peaks to vibrant coral reefs and sacred river valleys, the island balances ancient Hindu temple rites with modern barefoot luxury.',
    bestSeason: 'April – October (Dry Season with low humidity and ocean breezes)',
    weatherOverview: 'Tropical; average temperature 28°C year-round. Refreshing coastal winds in dry months.',
    climateType: 'Tropical Savanna',
    budgetLevel: 'Comfortable',
    image: heroLandscape,
    gallery: [heroLandscape, kyotoTemple, patagoniaPeaks],
    tags: ['Nature', 'Wellness', 'Culture', 'Pilgrimage', 'Luxury'],
    highlights: [
      { title: 'Tegallalang Rice Terraces', desc: 'Cascading emerald green terraces carved into the Ubud hillsides using subak irrigation.' },
      { title: 'Uluwatu Sunset Temple', desc: 'Ancient cliff-edge sea shrine perched 70 meters above roaring Indian Ocean waves.' },
      { title: 'Mount Batur Sunrise Trek', desc: 'Hike to the active volcanic rim at dawn to watch sunrise over a sea of clouds.' },
      { title: 'Nusa Penida Coastal Cliffs', desc: 'Dramatic T-Rex shaped limestone peninsula dropping into turquoise waters.' },
    ],
    localExperiences: [
      'Traditional Melukat spiritual water purification at Tirta Empul',
      'Private Ayurvedic healing and organic plant-based gastronomy retreat',
      'Sunset kecak fire dance performance accompanied by 50 chanting dancers',
    ],
    food: ['Babi Guling (slow-roasted spiced pork with crackling)', 'Nasi Campur with sambal matah', 'Fresh coconut water & organic dragonfruit smoothie bowls', 'Aromatic Betutu duck steamed in banana leaves'],
    culture: ['Tri Hita Karana philosophy: harmony between humans, nature, and the divine', 'Daily Canang Sari flower offerings placed on doorways and shrines', 'Intricate stone carving and gamelan orchestral music'],
    adventureActivities: ['Surfing legendary breaks at Padang Padang', 'Diving with giant manta rays at Manta Point', 'Canyoneering through hidden jungle gorges'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Ubud Jungle Arrival', desc: 'Check in to a river valley villa overlooking the Ayung River canopy.' },
      { day: 'Day 02', title: 'Sacred Water Purification & Rice Terraces', desc: 'Morning visit to Tirta Empul and artisan walk through Tegallalang.' },
      { day: 'Day 03', title: 'Mount Batur Sunrise & Hot Springs', desc: 'Dawn volcano ascent followed by restorative geothermal lakeside springs.' },
      { day: 'Day 04', title: 'Artisan Villages & Balinese Feast', desc: 'Silversmithing in Celuk, woodcarving in Mas, and an evening garden banquet.' },
      { day: 'Day 05', title: 'Uluwatu Ocean Cliffs & Kecak Dance', desc: 'Transfer to Southern Bukit peninsula; cliff walk and sunset temple amphitheater.' },
      { day: 'Day 06', title: 'Nusa Penida Manta Ray Safari', desc: 'Private yacht charter to Kelingking Beach and snorkeling with mantas.' },
      { day: 'Day 07', title: 'Seminyak Coastal Brunch & Departure', desc: 'Lakeside relaxation, tropical fruit spa ritual, and farewell sunset.' },
    ],
    travelTips: [
      'Always dress respectfully (sarong and sash) when entering sacred temple grounds.',
      'Hire a private local driver for seamless travel between island regions.',
      'Stay hydrated and drink only filtered or bottled water.',
    ],
    nearbyDestinationIds: ['kyoto', 'angkor-wat'],
    coordinates: { lat: -8.3405, lng: 115.092 },
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    headline: 'CALDERA DREAMS IN WHITE & BLUE',
    shortDescription: 'Whitewashed cliffside villas, iconic blue-domed chapels, volcanic beaches, and world-renowned Aegean sunsets.',
    overview: 'Carved into the rim of an ancient submerged volcano, Santorini is the crown jewel of the Cyclades. Cobalt waters contrast with gleaming whitewashed stone villages cascading down 300-meter cliffs.',
    bestSeason: 'May – June & September – October (Warm sea, golden light, fewer crowds)',
    weatherOverview: 'Mediterranean; warm, dry sunny summers (26°C–32°C) with refreshing Meltemi winds.',
    climateType: 'Hot Semi-Arid Mediterranean',
    budgetLevel: 'Luxury',
    image: heroLandscape,
    gallery: [heroLandscape, swissSummit, icelandAurora],
    tags: ['Luxury', 'Romance', 'Culture', 'Photography'],
    highlights: [
      { title: 'Oia Village & Sunset Views', desc: 'World-famous amphitheater of cave houses, windmills, and Aegean twilight hues.' },
      { title: 'The Fira to Oia Caldera Trail', desc: 'A 10km cliffside coastal walk with uninterrupted panoramic sea views.' },
      { title: 'Akrotiri Prehistoric City', desc: 'Remarkably preserved Bronze Age Minoan ruins buried beneath volcanic ash in 1600 BC.' },
      { title: 'Volcanic Red & Black Beaches', desc: 'Striking red scoria cliffs of Kokkini Beach and black volcanic sands of Perissa.' },
    ],
    localExperiences: [
      'Private catamaran cruise across the caldera with hot springs swim',
      'Assyrtiko volcanic wine tasting at cliffside vineyards',
      'Candlelit dinner suspended over the Aegean rim',
    ],
    food: ['Assyrtiko dry mineral white wine', 'Tomatokeftedes (crispy santorini tomato fritters)', 'Fresh grilled octopus with wild oregano', 'Fava dip with caramelized capers and onions'],
    culture: ['Cycladic minimalist architecture adapted to volcanic caves', 'Maritime seafaring tradition and vineyard heritage', 'Aegean hospitality and leisurely sunset gatherings'],
    adventureActivities: ['Sea kayaking around the volcanic caldera craters', 'Scuba diving along underwater volcanic lava shelves', 'Speedboat excursions to secret swimming coves'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Arrival & Imerovigli Sunset', desc: 'Check in to a caldera cave villa; watch the twilight glow from the balcony.' },
      { day: 'Day 02', title: 'Fira to Oia Cliffside Hike', desc: 'Morning coastal trek winding along the caldera rim with 360-degree sea vistas.' },
      { day: 'Day 03', title: 'Private Catamaran Caldera Cruise', desc: 'Sail past the volcanic islands of Nea Kameni; swim in geothermal sulfur springs.' },
      { day: 'Day 04', title: 'Akrotiri & Volcanic Vineyards', desc: 'Tour the ancient Minoan archaeological site followed by an Assyrtiko cellar tasting.' },
      { day: 'Day 05', title: 'Red Beach & Pyrgos Village', desc: 'Explore the highest medieval village on the island and its quiet labyrinth pathways.' },
      { day: 'Day 06', title: 'Oia Maritime Heritage & Sunset', desc: 'Visit historic captain mansions and enjoy front-row seats for the Oia sunset.' },
      { day: 'Day 07', title: 'Lakeside Brunch & Departure', desc: 'Farewell Aegean breakfast overlooking the sea before island departure.' },
    ],
    travelTips: [
      'Pack comfortable footwear with rubber soles for stone cliff steps.',
      'Book dinner reservations in Oia for sunset hours weeks in advance.',
      'Visit Pyrgos or Megalochori for peaceful traditional Greek village life away from main crowds.',
    ],
    nearbyDestinationIds: ['swiss-alps', 'cappadocia'],
    coordinates: { lat: 36.3932, lng: 25.4615 },
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    country: 'New Zealand',
    region: 'Oceania',
    headline: 'THE ULTIMATE FRONTIER OF WONDER',
    shortDescription: 'Glacial fjords, emerald rainforests, geothermal wonders, and alpine mountain passes.',
    overview: 'From the sheer granite walls of Milford Sound to the geothermal wonders of Rotorua and the Southern Alps, New Zealand offers unparalleled geographic diversity packed into two magnificent islands.',
    bestSeason: 'December – March (Summer Warmth) & June – August (Winter Skiing)',
    weatherOverview: 'Temperate maritime; clear skies and dramatic alpine weather systems.',
    climateType: 'Maritime Temperate',
    budgetLevel: 'Premium',
    image: patagoniaPeaks,
    gallery: [patagoniaPeaks, heroLandscape, swissSummit],
    tags: ['Adventure', 'Nature', 'Road Trips', 'Wildlife'],
    highlights: [
      { title: 'Milford Sound (Piopiotahi)', desc: 'Sheer vertical rock faces rising 1,200 meters from dark glacial fjord waters.' },
      { title: 'Mount Cook (Aoraki) National Park', desc: 'Home to the country’s highest peak and the Hooker Valley glacial lakes.' },
      { title: 'Queenstown Adventure Capital', desc: 'Nestled between the Remarkables range and crystalline Lake Wakatipu.' },
      { title: 'Waitomo Glowworm Caves', desc: 'Drift silently by boat beneath subterranean limestone arches lit by thousands of bioluminescent glowworms.' },
    ],
    localExperiences: [
      'Helicopter landing on the snowfields of Franz Josef Glacier',
      'Māori cultural gathering and traditional hāngī feast cooked in earth ovens',
      'Stargazing in the Aoraki Mackenzie International Dark Sky Reserve',
    ],
    food: ['Canterbury lamb roasted with rosemary', 'Fresh Green-lipped mussels from Marlborough', 'Pavlova with kiwi and passionfruit', 'World-class Marlborough Sauvignon Blanc & Central Otago Pinot Noir'],
    culture: ['Māori values of Kaitiakitanga (guardianship and protection of the environment)', 'Pioneering outdoor adventure ethos', 'Warm Kiwi hospitality and down-to-earth spirit'],
    adventureActivities: ['Jet boating through narrow canyon gorges', 'Bungee jumping from historic bridges', 'Multi-day Great Walks like Routeburn and Milford Tracks'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Auckland to Rotorua', desc: 'Thermal springs, bubbling mud pools, and Māori cultural evening.' },
      { day: 'Day 02', title: 'Waitomo Caves & Fly to South Island', desc: 'Glowworm boat tour and transit to Christchurch.' },
      { day: 'Day 03', title: 'Aoraki / Mount Cook & Hooker Valley', desc: 'Walk alongside alpine glaciers and icebergs under towering peaks.' },
      { day: 'Day 04', title: 'Lake Wanaka & Cardrona Valley', desc: 'Lakeside tranquility and scenic mountain pass drive into Wanaka.' },
      { day: 'Day 05', title: 'Queenstown & Lake Wakatipu', desc: 'Gondola views, lakeside culinary dining, and optional adventure sports.' },
      { day: 'Day 06', title: 'Milford Sound Expedition', desc: 'Scenic flight or coach through Homer Tunnel into the majestic fjord.' },
      { day: 'Day 07', title: 'Central Otago Wine Valley Departure', desc: 'Tasting Pinot Noir at boutique vineyards before Queenstown departure.' },
    ],
    travelTips: [
      'Rent a campervan or SUV for the freedom to explore scenic mountain lookouts.',
      'Remember that driving is on the left-hand side of the road.',
      'Bio-security checks at entry are strict: clean all hiking gear before travel.',
    ],
    nearbyDestinationIds: ['patagonia'],
    coordinates: { lat: -40.9006, lng: 174.886 },
  },
  {
    id: 'cappadocia',
    name: 'Cappadocia',
    country: 'Turkey',
    region: 'Asia',
    headline: 'FAIRY CHIMNEYS & FLOATING HORIZONS',
    shortDescription: 'Hundreds of hot-air balloons at dawn over surreal honeycombed tuff valleys and ancient subterranean cities.',
    overview: 'Formed by volcanic eruptions millions of years ago and sculpted by wind and rain, Cappadocia seems plucked from a dream. Beneath its surreal fairy chimneys lie vast underground subterranean cities and historic cave churches decorated with Byzantine frescoes.',
    bestSeason: 'April – June & September – November (Crisp clear skies and mild temperatures)',
    weatherOverview: 'Continental; sunny warm days with cool, pleasant mornings perfect for balloon launches.',
    climateType: 'Semi-Arid Continental',
    budgetLevel: 'Comfortable',
    image: heroLandscape,
    gallery: [heroLandscape, kyotoTemple, swissSummit],
    tags: ['Culture', 'Adventure', 'Pilgrimage', 'Photography', 'Romance'],
    highlights: [
      { title: 'Dawn Hot-Air Balloon Flight', desc: 'Float gently 1,000 meters above volcanic rock spires as the sunrise paints the valleys in gold.' },
      { title: 'Göreme Open-Air Museum', desc: 'UNESCO World Heritage complex of rock-cut Byzantine cave churches with 10th-century frescoes.' },
      { title: 'Derinkuyu Underground City', desc: 'Carved 85 meters deep into volcanic tuff, once sheltering up to 20,000 people and livestock.' },
      { title: 'Love Valley & Rose Valley Hikes', desc: 'Wander through pastel pink and apricot canyons sculpted by millions of years of erosion.' },
    ],
    localExperiences: [
      'Boutique cave hotel suite stay with a private carved stone terrace',
      'Artisan pottery workshop using red clay from the Kizilirmak River',
      'Traditional Anatolian musical night in a historic caravanserai',
    ],
    food: ['Testi Kebab (slow-cooked meat in a clay pot broken open at your table)', 'Freshly baked pide with kashar cheese and herbs', 'Manti (Turkish dumplings in garlic yogurt and mint butter)', 'Baklava paired with rich Turkish coffee'],
    culture: ['Silk Road crossroads between East and West', 'Early Christian sanctuary and monastic communities', 'Anatolian rug weaving and handcrafted ceramics'],
    adventureActivities: ['ATV quad biking through the sand canyons at sunset', 'Horseback riding through valleys ("Land of Beautiful Horses")', 'Mountain biking along ancient volcanic ridge tracks'],
    suggestedItinerary: [
      { day: 'Day 01', title: 'Arrival & Cave Suite Unwind', desc: 'Check into your carved cave suite in Uçhisar; sunset terrace drinks.' },
      { day: 'Day 02', title: 'Sunrise Balloon Flight & Göreme', desc: 'Float over fairy chimneys at dawn; explore Göreme rock-cut churches in afternoon.' },
      { day: 'Day 03', title: 'Derinkuyu Underground Expedition', desc: 'Explore eight levels of subterranean chambers, ventilation shafts, and wine presses.' },
      { day: 'Day 04', title: 'Rose & Red Valley Canyon Trek', desc: 'Hike among apricot orchards and hidden rock chapels; sunset panoramic viewpoint.' },
      { day: 'Day 05', title: 'Avanos Pottery & Pigeon Valley', desc: 'Try your hand at kick-wheel pottery and hike through Pigeon Valley to Uçhisar Castle.' },
      { day: 'Day 06', title: 'Horseback Trail & Anatolian Banquet', desc: 'Ride through secluded canyons and celebrate with an authentic clay pot feast.' },
      { day: 'Day 07', title: 'Sunrise Balloon Watch & Departure', desc: 'Watch the morning fleet of 150 balloons from your terrace before departure.' },
    ],
    travelTips: [
      'Book balloon flights for your first morning in case weather delays require rescheduling.',
      'Pack a warm fleece jacket for dawn balloon flights even in summer.',
      'Wear sturdy sneakers with good grip for exploring underground city tunnels.',
    ],
    nearbyDestinationIds: ['santorini'],
    coordinates: { lat: 38.6431, lng: 34.8289 },
  },
];

export const EXPERIENCES: Experience[] = [
  // 1. VARANASI DAWN RITES (INDIA)
  {
    id: 'varanasi-dawn-pilgrimage',
    title: 'Dawn Pilgrimage along the Sacred Ganges',
    destinationId: 'varanasi',
    destinationName: 'Varanasi',
    location: 'Ganges River & Manikarnika Ghat',
    country: 'India',
    category: 'Pilgrimage',
    duration: '4.5 Hours',
    difficulty: 'Gentle',
    priceIndicator: '$$',
    rating: 4.99,
    reviewsCount: 684,
    image: varanasiGhats,
    description: 'Drift upon a handcrafted wooden boat at first light as the ancient stone ghats awaken. Witness Vedic priests chanting sacred mantras, floating marigold oil lamps drifting across golden waters, and experience the profound spiritual pulse of India’s oldest living city.',
    whatYouWillExperience: [
      'Private sunrise boat charter navigated by hereditary Ganges boatmen',
      'Accompanied by a Sanskrit scholar interpreting the sacred Vedic symbolism of each ghat',
      'Ceremony of releasing handmade earthen diyas (oil lamps) with personal prayers into the current',
      'Walking exploration through 500-year-old silk-weaving gallis and traditional chai stalls',
    ],
    recommendedEquipment: [
      'Modest comfortable clothing covering shoulders and knees',
      'Slip-on footwear for stepping easily in and out of river boats and temple courtyards',
      'Light shawl or jacket for cool morning river breezes',
      'Camera with good low-light sensitivity for dawn reflection shots',
    ],
    suggestedItinerary: [
      { time: '05:15', activity: 'Rendezvous at Assi Ghat; boarding wooden boat in tranquil dawn mist' },
      { time: '05:45', activity: 'Sunrise over the eastern horizon; chanting of Gayatri Mantra on the water' },
      { time: '06:30', activity: 'Navigation past Harishchandra, Dashashwamedh, and Manikarnika Ghats' },
      { time: '07:45', activity: 'Disembark for walking tour of ancient silk gallis and traditional tea stop' },
      { time: '09:30', activity: 'Return to riverfront heritage haveli for breakfast' },
    ],
    nearbyAttractions: ['Kashi Vishwanath Temple', 'Sarnath Stupa', 'Ramnagar Palace'],
    bestSeason: 'October through March',
  },

  // 2. BHUTAN TIGER'S NEST TREK
  {
    id: 'bhutan-tigers-nest-trek',
    title: 'Pilgrimage to Tiger’s Nest Monastery',
    destinationId: 'bhutan',
    destinationName: 'Bhutan',
    location: 'Paro Valley Cliffs (3,120m)',
    country: 'Bhutan',
    category: 'Pilgrimage',
    duration: '7 Hours',
    difficulty: 'Moderate',
    priceIndicator: '$$$$',
    rating: 4.98,
    reviewsCount: 395,
    image: bhutanTigersNest,
    description: 'Hike through fragrant blue pine forests and fluttering multi-colored prayer flags up to Paro Taktsang, the cliffside sanctuary perched sheer 900 meters above the valley floor. Light butter lamps inside 8th-century sacred cave shrines.',
    whatYouWillExperience: [
      'Guided trek alongside a Bhutanese cultural master sharing ancient folklore of Guru Padmasambhava',
      'Crossing the dramatic waterfall ravine onto the sacred cliffside monastery terraces',
      'Private butter-lamp lighting ceremony and meditation inside the sacred cave shrine',
      'Post-trek traditional hot stone bath infused with aromatic Artemisia mountain herbs',
    ],
    recommendedEquipment: [
      'Sturdy hiking boots with ankle support',
      'Trekking poles with rubber tips',
      'Layered fleece and windproof shell for altitude changes',
      'Small daypack with 2 liters of water and snacks',
    ],
    suggestedItinerary: [
      { time: '07:30', activity: 'Departure from Paro hotel to trailhead' },
      { time: '08:00', activity: 'Begin hike through blue pine forest and prayer flag corridors' },
      { time: '10:00', activity: 'Reach mid-way Taktsang cafeteria viewpoint for tea and panoramic photos' },
      { time: '11:15', activity: 'Cross waterfall bridge and enter sacred Tiger’s Nest monastery' },
      { time: '12:30', activity: 'Private prayer ritual and butter-lamp offering inside cave temples' },
      { time: '14:30', activity: 'Descent down to valley floor followed by restorative herbal hot stone bath' },
    ],
    nearbyAttractions: ['Kyichu Lhakhang', 'Paro Dzong', 'Chele La Pass'],
    bestSeason: 'March to May & September to November',
  },

  // 3. ANGKOR WAT SUNRISE PILGRIMAGE
  {
    id: 'angkor-wat-dawn-spiritual',
    title: 'Spiritual Sunrise Over Angkor Wat',
    destinationId: 'angkor-wat',
    destinationName: 'Angkor Wat',
    location: 'Siem Reap Sacred Complex',
    country: 'Cambodia',
    category: 'Pilgrimage',
    duration: '5 Hours',
    difficulty: 'Gentle',
    priceIndicator: '$$$',
    rating: 4.97,
    reviewsCount: 820,
    image: angkorSunrise,
    description: 'Stand at the lotus reflection pools of Angkor Wat as the morning sun rises directly behind its five sacred sandstone spires. Receive a traditional Buddhist water blessing from resident monks in an ancient forest pagoda.',
    whatYouWillExperience: [
      'VIP dawn access to unobstructed reflections of the world’s largest temple complex',
      'Private archaeological scholar decoding the celestial bas-relief carvings of the Churning of the Ocean of Milk',
      'Authentic chanting and sacred red-thread wristlet blessing from senior Buddhist monks',
      'Scenic champagne breakfast served under tropical jungle trees near the ancient moat',
    ],
    recommendedEquipment: [
      'Modest light linen clothing covering shoulders and knees',
      'Comfortable walking sneakers or walking sandals',
      'Insect repellent and sun protection',
    ],
    suggestedItinerary: [
      { time: '05:00', activity: 'Pre-dawn departure from Siem Reap to Angkor Wat western moat' },
      { time: '05:40', activity: 'Witness sunrise colors illuminate the five sacred temple spires' },
      { time: '06:45', activity: 'Walk through central sanctum galleries before daytime crowds' },
      { time: '08:30', activity: 'Private water blessing ceremony with elder monks at forest monastery' },
      { time: '09:30', activity: 'Tropical breakfast served in scenic garden pavilion' },
    ],
    nearbyAttractions: ['Bayon Temple', 'Ta Prohm', 'Banteay Srei'],
    bestSeason: 'November through March',
  },

  // Existing Flagship Experiences
  {
    id: 'chase-the-northern-lights',
    title: 'Chase the Northern Lights',
    destinationId: 'iceland',
    destinationName: 'Iceland',
    location: 'Reykjavik & Thingvellir Hinterlands',
    country: 'Iceland',
    category: 'Adventure',
    duration: '6 Hours',
    difficulty: 'Gentle',
    priceIndicator: '$$$',
    rating: 4.95,
    reviewsCount: 342,
    image: icelandAurora,
    description: 'Venture into the Arctic darkness aboard a custom 4x4 super-jeep guided by veteran aurora hunters and meteorologists. Escape ambient light pollution to stand under swirling celestial emerald ribbons.',
    whatYouWillExperience: [
      'Deep wilderness navigation to secluded dark sky viewing spots based on live geomagnetic and cloud radar',
      'Aurora photography masterclass with tripods and long-exposure coaching',
      'Warm Icelandic cocoa, spiced Brennivín schnapps, and cinnamon pastries around an Arctic fire',
      'Professional high-resolution portraits of you under the glowing aurora included',
    ],
    recommendedEquipment: [
      'Thermal base layers (merino wool)',
      'Windproof and waterproof insulated winter parka',
      'Sturdy insulated snow boots with wool socks',
      'Camera with manual exposure mode and tripod',
    ],
    suggestedItinerary: [
      { time: '20:00', activity: 'Super-Jeep pickup from your Reykjavik hotel' },
      { time: '21:15', activity: 'Arrival at remote volcanic clearing far beyond city glow' },
      { time: '21:45', activity: 'Aurora watch begins with camera calibration and hot cocoa' },
      { time: '23:30', activity: 'Active aurora peak: swirling ribbons of green and violet' },
      { time: '01:30', activity: 'Return journey to Reykjavik under starry skies' },
    ],
    nearbyAttractions: ['Thingvellir National Park', 'Laugarvatn Fontana Geothermal Baths', 'Kerid Volcanic Crater'],
    bestSeason: 'September through April',
  },
  {
    id: 'walk-ancient-kyoto-zen',
    title: 'Walk Through Ancient Kyoto',
    destinationId: 'kyoto',
    destinationName: 'Kyoto',
    location: 'Higashiyama & Arashiyama',
    country: 'Japan',
    category: 'Culture',
    duration: 'Full Day (8 Hours)',
    difficulty: 'Moderate',
    priceIndicator: '$$$',
    rating: 4.98,
    reviewsCount: 421,
    image: kyotoTemple,
    description: 'Step into the living heritage of Japan’s ancient capital alongside a cultural historian. Wander through quiet bamboo corridors at sunrise, visit private Zen garden pavilions closed to the public, and take tea with a certified master.',
    whatYouWillExperience: [
      'Dawn stroll through Arashiyama bamboo before the morning crowds arrive',
      'Exclusive access to a 400-year-old sub-temple moss garden for seated meditation',
      'Authentic tea ceremony in a historic wooden chashitsu with wagashi sweets',
      'Private multi-course Shojin Ryori (monastic vegetarian culinary art) lunch',
    ],
    recommendedEquipment: [
      'Comfortable walking shoes that slip off easily for temple tatami',
      'Modest comfortable clothing suitable for seated meditation',
      'Small daypack and refillable water bottle',
    ],
    suggestedItinerary: [
      { time: '06:30', activity: 'Dawn rendezvous at Arashiyama Bamboo Path' },
      { time: '08:00', activity: 'Morning meditation at private Zen temple garden' },
      { time: '10:30', activity: 'Stroll through historic Gion preservation alleys' },
      { time: '12:30', activity: 'Shojin Ryori temple culinary experience' },
      { time: '14:30', activity: 'Ceremonial matcha preparation with master' },
      { time: '16:00', activity: 'Contemplative walk along the Philosopher’s Path' },
    ],
    nearbyAttractions: ['Kinkaku-ji', 'Fushimi Inari Shrine', 'Nishiki Market'],
    bestSeason: 'Year-round (stunning in Spring & Autumn)',
  },
  {
    id: 'patagonia-ice-expedition',
    title: 'Road Trip Through Patagonia',
    destinationId: 'patagonia',
    destinationName: 'Patagonia',
    location: 'Ruta 40 & Carretera Austral',
    country: 'Chile & Argentina',
    category: 'Road Trips',
    duration: '5 Days',
    difficulty: 'Demanding',
    priceIndicator: '$$$$$',
    rating: 4.96,
    reviewsCount: 167,
    image: patagoniaPeaks,
    description: 'An overland adventure tracing the dramatic cordillera of the southern Andes. Cross from the windswept Argentine steppe into the towering granite needles and turquoise glacial waters of Chilean Patagonia.',
    whatYouWillExperience: [
      'Driving premium 4x4 vehicles across the legendary Ruta 40 gravel stretches',
      'Guided crevasse trek with crampons on the surface of Grey Glacier',
      'Gaucho barbecue with open-flame spit roasted lamb at an authentic estancia',
      'Unobstructed sunset vantage points facing the sheer vertical granite towers',
    ],
    recommendedEquipment: [
      'GORE-TEX shell jacket and waterproof hiking trousers',
      'Rigid mountaineering or trekking boots with good ankle support',
      'Thermal gloves, fleece beanie, and polar neck gaiter',
    ],
    suggestedItinerary: [
      { time: 'Day 1', activity: 'El Calafate to Perito Moreno Glacier catwalks' },
      { time: 'Day 2', activity: 'Steppe drive across the border into Torres del Paine' },
      { time: 'Day 3', activity: 'French Valley day trek and Lake Pehoe catamaran' },
      { time: 'Day 4', activity: 'Glacier Grey ice trek with glaciologist' },
      { time: 'Day 5', activity: 'Estancia horseback ride and farewell Patagonian banquet' },
    ],
    nearbyAttractions: ['Mount Fitz Roy', 'Lake Argentino', 'Milodon Cave'],
    bestSeason: 'November to March',
  },
  {
    id: 'swiss-alps-heli-adventure',
    title: 'Hike Above the Clouds',
    destinationId: 'swiss-alps',
    destinationName: 'Swiss Alps',
    location: 'Zermatt & Gornergrat',
    country: 'Switzerland',
    category: 'Adventure',
    duration: '7 Hours',
    difficulty: 'Demanding',
    priceIndicator: '$$$$',
    rating: 4.97,
    reviewsCount: 284,
    image: swissSummit,
    description: 'Ascend into the rarified realm of 4,000-meter peaks. Walk high alpine ridges overlooking ancient glaciers, mirror-clear alpine tarns reflecting the Matterhorn, and savor champagne on a private mountain terrace.',
    whatYouWillExperience: [
      'Ascent on Europe’s highest open-air cogwheel railway to Gornergrat (3,089m)',
      'Trek past Riffelsee lake capturing the flawless inverted reflection of the Matterhorn',
      'Traverse a safe guided via-ferrata suspension bridge across a sheer gorge',
      'Gourmet alpine lunch featuring artisanal Valais cheeses and crisp Fendant wine',
    ],
    recommendedEquipment: [
      'Sturdy hiking boots with vibram soles',
      'Layered fleece and windproof shell',
      'Trekking poles with rubber tips',
    ],
    suggestedItinerary: [
      { time: '08:00', activity: 'Depart Zermatt via the historic Gornergrat Bahn' },
      { time: '08:45', activity: 'Summit viewing platform: panorama of 29 four-thousanders' },
      { time: '10:00', activity: 'Alpine trail hike to Riffelsee reflecting pool' },
      { time: '12:30', activity: 'Private terrace lunch facing Matterhorn North Face' },
      { time: '14:30', activity: 'Descent via scenic larch forest paths into Zermatt' },
    ],
    nearbyAttractions: ['Matterhorn Glacier Paradise', 'Sunnegga Paradise', 'Charles Kuonen Suspension Bridge'],
    bestSeason: 'June through September',
  },
  {
    id: 'cappadocia-dawn-balloon',
    title: 'Float Above Fairy Chimneys',
    destinationId: 'cappadocia',
    destinationName: 'Cappadocia',
    location: 'Göreme Valley',
    country: 'Turkey',
    category: 'Photography',
    duration: '3.5 Hours',
    difficulty: 'Gentle',
    priceIndicator: '$$$',
    rating: 4.94,
    reviewsCount: 512,
    image: heroLandscape,
    description: 'Drift silently with the morning wind over the surreal honeycombed valleys and fairy chimneys of Cappadocia as up to 150 colorful hot-air balloons fill the sunrise sky.',
    whatYouWillExperience: [
      'Pre-dawn pickup and gourmet breakfast buffet at the launch site',
      '60-minute hot-air balloon flight with a master pilot navigating canyon contours',
      'Breathtaking 360-degree sunrise view over Love Valley and Rose Valley',
      'Traditional champagne toast and personalized commemorative flight certificate',
    ],
    recommendedEquipment: [
      'Warm jacket or sweater (mornings are brisk at altitude)',
      'Flat, comfortable shoes for boarding the basket',
      'Camera or smartphone with ample storage and battery',
    ],
    suggestedItinerary: [
      { time: '05:00', activity: 'Hotel pickup and light breakfast at launch lounge' },
      { time: '05:45', activity: 'Watch massive balloon inflation as burners roar' },
      { time: '06:15', activity: 'Gentle liftoff into the sunrise over Göreme' },
      { time: '07:15', activity: 'Smooth landing followed by traditional champagne celebration' },
      { time: '08:00', activity: 'Return to hotel in time for terrace breakfast' },
    ],
    nearbyAttractions: ['Göreme Open Air Museum', 'Uçhisar Castle', 'Pigeon Valley'],
    bestSeason: 'April through November',
  },
];

export const TRAVEL_STORIES: TravelStory[] = [
  {
    id: 'varanasi-eternal-light',
    title: 'The City of Eternal Light',
    subtitle: 'Dawn hymns, holy fires, and timeless pilgrimage on the sacred ghats of Varanasi.',
    author: 'Aarav Sengupta',
    authorRole: 'Cultural Historian & Author',
    readTime: '6 min read',
    date: 'March 2026',
    image: varanasiGhats,
    destinationId: 'varanasi',
    excerpt: 'As the morning sun lifts above the eastern sands of the Ganges, thousands of brass bells chime in unison. Here, mortality is not feared; it is woven into the divine fabric of life.',
    content: [
      {
        heading: 'Where Time Becomes an Offering',
        paragraphs: [
          'To step onto the ghats of Varanasi at five in the morning is to enter an unbroken continuum that began before Rome was envisioned and before Athens erected the Parthenon. The air smells of burning camphor, wet sandalwood paste, and river clay.',
          'Wooden boats push off into the silver haze. As our oarsman dips his long cedar blades into the water, a priest on the stone stairs raises a brass conch to his lips, blowing a deep, resonant tone that vibrates in the chest.',
        ],
        quote: 'Varanasi is not merely a geography; it is a sacred state of consciousness where the ephemeral touches the eternal.',
      },
      {
        heading: 'The Geometry of Aarti',
        paragraphs: [
          'At Dashashwamedh Ghat in the evening, eight young Brahmins draped in saffron silk elevate tiered brass lamps crowned with dozens of flaming wicks. In synchronized choreography, they circle the fire toward the river, dedicating the flame to Maa Ganga, Lord Shiva, and the cosmos.',
          'From the water, looking back at the illuminated stairs packed with thousands of serene faces, the entire riverbank appears to dissolve into a floating constellation.',
        ],
      },
    ],
  },
  {
    id: 'into-the-wild-iceland',
    title: 'Into the Wild',
    subtitle: 'Seven days across Iceland’s volcanic landscapes and glacial rivers.',
    author: 'Elena Vance',
    authorRole: 'Exploration Photographer',
    readTime: '6 min read',
    date: 'February 2026',
    image: icelandAurora,
    destinationId: 'iceland',
    excerpt: 'Standing on the obsidian sands of Reynisfjara as Atlantic breakers crash against basalt needles, you understand why early settlers believed hidden folk dwelled in the stones.',
    content: [
      {
        heading: 'The Primordial Edge',
        paragraphs: [
          'There is a quiet weight to the Icelandic landscape that resists easy description. You step out of the vehicle onto crushed volcanic cinder, and the wind carries the mineral scent of sulfur and sea salt.',
          'Driving the southern ribbon of Route 1, civilization quickly recedes into occasional timber farmhouses huddled beneath vertical cliffs.',
        ],
        quote: 'In Iceland, the earth is not a static pedestal; it is an active, breathing organism that shapes every human gesture.',
      },
    ],
  },
  {
    id: 'beyond-the-horizon-bali',
    title: 'Beyond the Horizon',
    subtitle: 'Discovering hidden bamboo valleys and sacred temple rituals in Bali.',
    author: 'Julian Thorne',
    authorRole: 'Cultural Anthropologist',
    readTime: '5 min read',
    date: 'January 2026',
    image: heroLandscape,
    destinationId: 'bali',
    excerpt: 'Deep in the misty central highlands of Bali, the ancient rhythm of Subak irrigation channels has sustained a continuous covenant with nature for over a thousand years.',
    content: [
      {
        heading: 'The Living Architecture of Water',
        paragraphs: [
          'Morning arrives in Ubud not with a sharp alarm, but with the distant crow of roosters and the murmuring trickle of mountain water directed through bamboo aqueducts.',
        ],
      },
    ],
  },
  {
    id: 'where-mountains-meet-sky-swiss',
    title: 'Where Mountains Meet the Sky',
    subtitle: 'High alpine traverses and silent twilight moments in the Swiss Alps.',
    author: 'Marcella Rossi',
    authorRole: 'Alpinist & Travel Writer',
    readTime: '7 min read',
    date: 'December 2025',
    image: swissSummit,
    destinationId: 'swiss-alps',
    excerpt: 'From the car-free serenity of Zermatt to the razor-thin ridges of Gornergrat, the Matterhorn remains an eternal monument to human wonder.',
    content: [
      {
        heading: 'The Geometry of Awe',
        paragraphs: [
          'Few geological structures command human attention quite like the Matterhorn. Rising alone in stark geometric perfection above the Zmutt Glacier, its four triangular facets catch the morning light.',
        ],
      },
    ],
  },
];

export const WORLD_REGIONS = [
  { id: 'all', name: 'All Regions', count: 12 },
  { id: 'Europe', name: 'Europe', count: 3, desc: 'Sub-arctic auroras, high alpine majesty, and whitewashed Aegean calderas.' },
  { id: 'Asia', name: 'Asia', count: 6, desc: 'Sacred Ganges ghats, Himalayan monasteries, Zen temples, and jungle sanctuaries.' },
  { id: 'South America', name: 'South America', count: 1, desc: 'Untamed Patagonian granite spires and glacial steppe.' },
  { id: 'Oceania', name: 'Oceania', count: 1, desc: 'Dramatic fjords, alpine Great Walks, and glowworm grottos.' },
];

export const ADVENTURE_MOODS = [
  {
    id: 'pilgrimage',
    emoji: '🕉️',
    label: 'SACRED',
    tagline: 'Connect with ancient pilgrimage sites, sacred waters, and living spiritual heritage.',
    color: 'from-amber-950/70 to-orange-950/90',
    matchedDestinations: ['varanasi', 'ladakh', 'bhutan', 'angkor-wat', 'kyoto'],
  },
  {
    id: 'escape',
    emoji: '🌊',
    label: 'ESCAPE',
    tagline: 'Leave the noise behind and surrender to tranquility.',
    color: 'from-cyan-900/60 to-blue-950/90',
    matchedDestinations: ['santorini', 'bali'],
  },
  {
    id: 'conquer',
    emoji: '🏔️',
    label: 'CONQUER',
    tagline: 'Test your limits against nature’s most formidable peaks.',
    color: 'from-slate-900/80 to-stone-900/90',
    matchedDestinations: ['ladakh', 'patagonia', 'swiss-alps', 'iceland', 'new-zealand'],
  },
  {
    id: 'discover',
    emoji: '🌿',
    label: 'DISCOVER',
    tagline: 'Uncover ancient wisdom, living heritage, and hidden trails.',
    color: 'from-emerald-950/70 to-teal-950/90',
    matchedDestinations: ['varanasi', 'kyoto', 'angkor-wat', 'bhutan'],
  },
  {
    id: 'indulge',
    emoji: '✨',
    label: 'INDULGE',
    tagline: 'Surround yourself with bespoke elegance and refined comfort.',
    color: 'from-amber-950/60 to-slate-950/90',
    matchedDestinations: ['santorini', 'bhutan', 'swiss-alps'],
  },
  {
    id: 'explore',
    emoji: '🔥',
    label: 'EXPLORE',
    tagline: 'Venture into raw geothermal lands and untamed frontiers.',
    color: 'from-orange-950/60 to-red-950/90',
    matchedDestinations: ['iceland', 'cappadocia', 'patagonia'],
  },
];

export const TRAVEL_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'When you close your eyes and imagine the ideal horizon, what do you see?',
    options: [
      { text: 'Sacred river ghats with dawn bells and floating marigold lamps', trait: 'sacred' },
      { text: 'Jagged snow-capped peaks rising into crisp alpine blue', trait: 'mountain' },
      { text: 'Sunlit turquoise waters and dramatic cliffside villages', trait: 'ocean' },
      { text: 'Ancient bamboo groves and moss-covered stone lantern paths', trait: 'culture' },
    ],
  },
  {
    id: 2,
    question: 'What is your preferred rhythm during an expedition?',
    options: [
      { text: 'Dawn Vedic chanting, monastic morning rites, and contemplative pilgrimage', trait: 'sacred' },
      { text: 'Active dawn treks, high-altitude trails, and pushing personal endurance', trait: 'mountain' },
      { text: 'Contemplative walks, private tea ceremonies, and slow immersion', trait: 'culture' },
      { text: 'Panoramic terrace brunches, catamaran sails, and curated spa rituals', trait: 'ocean' },
    ],
  },
  {
    id: 3,
    question: 'How do you like to dine when traveling?',
    options: [
      { text: 'Pure vegetarian delicacies, sacred temple prasad, and street chaat in earthen kulhads', trait: 'sacred' },
      { text: 'Multi-course Kaiseki tasting menus crafted with micro-seasonal ingredients', trait: 'culture' },
      { text: 'Hearty alpine fondue and open-fire roasted feasts after an arduous hike', trait: 'mountain' },
      { text: 'Fresh grilled coastal seafood paired with chilled mineral white wine', trait: 'ocean' },
    ],
  },
  {
    id: 4,
    question: 'What type of sanctuary feels most restorative to you?',
    options: [
      { text: 'A historic riverfront palace ashram gazing over the sacred Ganges', trait: 'sacred' },
      { text: 'A cliffside Buddhist hermitage surrounded by fluttering prayer flags', trait: 'mountain' },
      { text: 'A traditional wooden ryokan with private cedar hot spring bath', trait: 'culture' },
      { text: 'A private cliffside cave villa with infinity pool over the caldera', trait: 'ocean' },
    ],
  },
  {
    id: 5,
    question: 'What memory would you treasure most 10 years from now?',
    options: [
      { text: 'Releasing a floating lamp onto the Ganges during evening Maha Aarti', trait: 'sacred' },
      { text: 'Standing beneath the dancing aurora borealis in absolute sub-arctic silence', trait: 'mountain' },
      { text: 'A meaningful conversation with a Zen abbot or master artisan', trait: 'culture' },
      { text: 'A golden sunset over the Aegean with the person you love most', trait: 'ocean' },
    ],
  },
  {
    id: 6,
    question: 'What describes your approach to digital innovation in travel?',
    options: [
      { text: 'Authentic cultural insight that guides me toward sacred sanctuaries respectfully', trait: 'sacred' },
      { text: 'Precise topographic satellite data and weather route optimization', trait: 'mountain' },
      { text: 'Deep cultural context and curated historical storytelling', trait: 'culture' },
      { text: 'Intelligent personalization that anticipates my taste without friction', trait: 'ocean' },
    ],
  },
];

export const PERSONALITIES = {
  sacred: {
    title: 'THE SACRED PILGRIM',
    tagline: 'Seeking transcendental spaces, living rituals, and timeless spiritual alignment.',
    description: 'You travel with reverence and wonder. You are drawn to holy rivers, sacred mountain hermitages, dawn temple chants, and ancient cultural monuments that connect humanity to the divine.',
    recommendedDestinationIds: ['varanasi', 'ladakh', 'bhutan', 'angkor-wat'],
  },
  mountain: {
    title: 'THE HIGH-ALTITUDE ALPINIST',
    tagline: 'Drawn to raw scale, vertical horizons, and the silence of the summits.',
    description: 'You find your truest clarity where oxygen is crisp and nature is monumentally vast. You respect endurance, geology, and the pure thrill of standing above a sea of clouds.',
    recommendedDestinationIds: ['ladakh', 'swiss-alps', 'patagonia', 'new-zealand'],
  },
  ocean: {
    title: 'THE SERENITY SEEKER',
    tagline: 'Attuned to coastal breezes, warm golden hour light, and refined indulgence.',
    description: 'Travel for you is an art of restoration. You savor panoramic sea horizons, architectural beauty, and immersive wellness experiences that reset your nervous system.',
    recommendedDestinationIds: ['santorini', 'bali'],
  },
  culture: {
    title: 'THE CULTURAL PHILOSOPHER',
    tagline: 'Enamored by living traditions, mindful craft, and centuries of heritage.',
    description: 'You travel with reverent curiosity. You want to understand the soul of a place: its rituals, its master artisans, its culinary philosophy, and its enduring monuments.',
    recommendedDestinationIds: ['kyoto', 'varanasi', 'angkor-wat', 'cappadocia'],
  },
};
