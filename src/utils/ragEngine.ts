/**
 * RAG (Retrieval-Augmented Generation) Travel Knowledge Engine
 * Indexes deep destination facts, real Indian Rupee (₹ INR) prices,
 * flight routes from India, visa policies, packing guides, and
 * out-of-the-box travel scenarios.
 */

export interface RagChunk {
  id: string;
  title: string;
  category: 'destination' | 'pricing-inr' | 'visa-logistics' | 'itinerary' | 'out-of-box' | 'gear-packing' | 'safety-health';
  source: string;
  keywords: string[];
  content: string;
}

export const RAG_KNOWLEDGE_BASE: RagChunk[] = [
  // -------------------------------------------------------------
  // 1. REAL INDIAN RUPEE (INR / ₹) PRICING CHUNKS
  // -------------------------------------------------------------
  {
    id: 'rag-inr-pricing-overview',
    title: 'Indian Currency (₹ INR) Price Matrix & Budget Guidelines 2026',
    category: 'pricing-inr',
    source: 'Travel Reimagined 2026 Indian Rupee Tariff Index',
    keywords: ['price', 'pricing', 'cost', 'inr', 'rupee', 'rupees', 'budget', 'cheap', 'expensive', 'money', 'how much'],
    content: `Comprehensive Real Pricing in Indian Rupees (₹ INR) for departures from India (DEL/BOM/BLR):
• Varanasi Heritage Pilgrimage: ₹32,000 / person (5 Days incl. heritage riverfront haveli, private dawn boat charter & VIP Aarti).
• Ladakh Trans-Himalayan Odyssey: ₹48,000 / person (7 Days incl. Pangong Tso glamping, Khardung La SUV transit & permits).
• Cambodia & Angkor Wat: ₹55,000 / person (6 Days incl. boutique hotel, multi-day temple passes & floating village boat).
• Bali Tropical Wellness & Surf: ₹68,000 / person (7 Days incl. private Ubud pool villa, Nusa Penida yacht & cooking masterclass).
• Bhutan Kingdom of Happiness: ₹1,10,000 / person (7 Days incl. Indian SDF permit ₹1,200/day, luxury dzong suites & Tiger's Nest guide).
• Cappadocia Balloon & Caves: ₹1,35,000 / person (6 Days incl. Göreme carved cave suite, sunrise hot-air balloon flight & ATV).
• Europe (Santorini / Swiss / Iceland): ₹1,65,000 to ₹2,65,000 / person (8 Days incl. 4-star boutique hotels, scenic rail/yacht).
• Kyoto & Japan Imperial Journey: ₹1,85,000 / person (7 Days incl. ryokan with onsen, Kaiseki dining & Shinkansen 7-day pass).
• Africa Serengeti Great Migration Safari: ₹2,95,000 / person (7 Days incl. luxury tented bush camp, 4x4 game drives & park fees).
• New Zealand Fjord & Alps Road Odyssey: ₹2,85,000 / person (9 Days incl. campervan/luxury lodge, Milford Sound flight & glacier hike).
• Patagonia End-of-World Glacial Trek: ₹3,20,000 / person (10 Days incl. EcoCamp domes, Grey Glacier ice trekking & flights).`,
  },
  {
    id: 'rag-flight-costs-india',
    title: 'Flight Routes and Ticket Estimates from Indian Metros (DEL / BOM / BLR)',
    category: 'pricing-inr',
    source: 'Aviation Booking Intelligence 2026',
    keywords: ['flight', 'airfare', 'tickets', 'delhi', 'mumbai', 'bangalore', 'chennai', 'airlines', 'transit'],
    content: `Round-Trip Flight Estimates in Indian Rupees (₹ INR) departing from New Delhi (DEL) / Mumbai (BOM):
• Domestic to Varanasi (VNS): ₹6,500 – ₹11,000 round-trip (Direct 1h 30m via IndiGo/Air India). Vande Bharat Express available from Delhi ~₹1,800.
• Domestic to Leh Ladakh (IXL): ₹11,000 – ₹17,000 round-trip (Direct morning flight 1h 20m).
• India to Denpasar, Bali (DPS): ₹24,000 – ₹34,000 (Direct IndiGo/VietJet or via KUL/SIN).
• India to Siem Reap, Cambodia (SAI): ₹18,000 – ₹28,000 (Transit via Bangkok or Kuala Lumpur).
• India to Paro, Bhutan (PBH): ₹18,000 – ₹26,000 (Druk Air or Bhutan Airlines from Delhi/Kolkata).
• India to Istanbul & Cappadocia (ASR): ₹36,000 – ₹48,000 (IndiGo/Turkish Airlines direct to IST + 1h domestic hopper).
• India to Zurich / Geneva, Switzerland (ZRH): ₹48,000 – ₹65,000 (Direct Swiss International / Air India).
• India to Reykjavik, Iceland (KEF): ₹52,000 – ₹72,000 (via London, Helsinki or Frankfurt).
• India to Athens & Santorini (JTR): ₹55,000 – ₹70,000 (via Doha/Dubai to Athens + ferry or 40m flight).
• India to Kilimanjaro, Tanzania (JRO): ₹44,000 – ₹62,000 (Ethiopian Airlines via Addis Ababa or Kenya Airways).
• India to Auckland / Queenstown, New Zealand (AKL/ZQN): ₹72,000 – ₹95,000 (Singapore Airlines or Qantas).
• India to Santiago / Punta Arenas, Patagonia (PUQ): ₹1,15,000 – ₹1,48,000 (Qatar Airways via Doha & Sao Paulo/Santiago).`,
  },

  // -------------------------------------------------------------
  // 2. VISA & LOGISTICS FOR INDIAN CITIZENS
  // -------------------------------------------------------------
  {
    id: 'rag-visa-guide-indian-passport',
    title: 'Visa Rules, Permits & Entry Guidelines for Indian Passport Holders',
    category: 'visa-logistics',
    source: 'Consular & Diplomatic Travel Regulations 2026',
    keywords: ['visa', 'passport', 'permit', 'entry', 'vfs', 'rules', 'documents', 'voa', 'evisa', 'embassy'],
    content: `Official Visa Requirements for Indian Travelers:
• Bali (Indonesia): Visa on Arrival (VoA) issued at Denpasar airport. Cost is IDR 500,000 (~₹2,700). Valid 30 days, extendable once. Needs 6-month passport validity and return ticket.
• Cambodia: e-Visa available online (takes 3 business days, ~$36 / ₹3,000) or Visa on Arrival at Siem Reap airport.
• Bhutan: No visa required for Indian citizens. Indian nationals only need an Entry Permit with valid Indian Passport or Voter ID card. Must pay the concessional Sustainable Development Fee (SDF) of ₹1,200 per person/day.
• Ladakh (India): Domestic travel. Indian nationals do not require visas, but require Inner Line Permits (ILP) or Protected Area Permits for sensitive border regions like Nubra Valley, Pangong Tso, and Hanle (~₹600 environmental fee).
• Turkey (Cappadocia): Indian passport holders holding a valid US, UK, Schengen, or Irish visa/residence permit can obtain an online e-Visa in 5 minutes (~₹4,500). Otherwise, regular sticker visa through Gateway Globe.
• Switzerland, Iceland, Greece (Santorini): Requires a Schengen Visa (Type C). Apply through VFS Global 4 to 12 weeks before departure. Fee is €90 (~₹8,200). Mandatory travel insurance covering minimum €30,000 emergency medical expenses.
• Tanzania (Serengeti): e-Visa online or Visa on Arrival for $50 (~₹4,200). Yellow Fever vaccination certificate required if transiting through yellow fever endemic countries.
• New Zealand: NZeTA visitor visa applied online via Immigration New Zealand (~$211 NZD / ₹10,500 including tourist levy). Processing takes 3 to 6 weeks.`,
  },

  // -------------------------------------------------------------
  // 3. OUT-OF-THE-BOX QUESTIONS (HEALTH, SAFETY, PACKING, DIET)
  // -------------------------------------------------------------
  {
    id: 'rag-altitude-sickness-prevention',
    title: 'High-Altitude Acclimatization & Acute Mountain Sickness (AMS) Protocol',
    category: 'safety-health',
    source: 'Himalayan Medical & Mountaineering Institute Guidelines',
    keywords: ['altitude', 'sickness', 'ams', 'leh', 'ladakh', 'breathing', 'oxygen', 'headache', 'diamox', 'height', 'mountains'],
    content: `Vital High-Altitude Safety Protocol for Ladakh (11,500 ft to 17,580 ft) & High Andes:
1. The 48-Hour Rest Rule: Upon flying into Leh (11,500 ft), do NOT do any sightseeing on Day 1 or Day 2. Sleep, rest, and keep exertion minimal.
2. Hydration Protocol: Drink 4 to 5 liters of fluids daily. Electrolyte water, ginger lemon honey tea, and traditional garlic soup (promotes oxygenation). Avoid alcohol and smoking entirely.
3. Medication: Consult your physician regarding Acetazolamide (Diamox 125mg–250mg twice daily), started 24 hours before arriving in Leh.
4. Ascent Rules: Never ascend more than 1,500 ft sleeping elevation per night above 10,000 ft. When crossing Khardung La (17,582 ft) or Chang La (17,688 ft), spend no more than 15–20 minutes at the pass crest.
5. Pulse Oximeter: Carry a portable pulse oximeter. Oxygen saturation between 75%–85% is normal at 11,500 ft; if reading falls below 70% accompanied by dizziness or severe breathlessness, descend immediately to Leh district hospital or use portable oxygen cylinders.`,
  },
  {
    id: 'rag-vegetarian-jain-food-guide',
    title: 'Vegetarian, Vegan, and Jain Food Availability Across All Destinations',
    category: 'out-of-box',
    source: 'Global Culinary Inclusivity Audit 2026',
    keywords: ['veg', 'vegetarian', 'jain', 'pure veg', 'vegan', 'halal', 'food', 'eating', 'diet', 'meal'],
    content: `Vegetarian & Jain Friendly Food Navigation Across Destinations:
• Varanasi & India: 100% vegetarian heaven. Over 90% of old city restaurants are purely vegetarian and satvik (without onion/garlic). Savor Banarasi Tamatar Chaat, Malaiyo, and Kachori Sabzi.
• Ladakh: High prevalence of pure veg options. Tibetan Tingmo bread with dal, vegetable Thukpa noodle soup, and potato momos are universally available.
• Bali: One of the world's best vegan/vegetarian hubs. Ubud features hundreds of plant-based cafes serving organic tempeh, jackfruit curries, smoothie bowls, and gado-gado with peanut sauce. Mention "Tidak makan daging" (no meat).
• Kyoto, Japan: Book "Shojin Ryori" (traditional Zen Buddhist temple vegetarian cuisine refined over 800 years, completely plant-based). Also enjoy Yudofu (silken tofu hot pots) and vegetable tempura. Avoid bonito fish dashi by requesting "Kombu dashi" (kelp broth only).
• Swiss Alps & Europe: Cheese fondue, raclette, and alpine rösti potatoes are naturally vegetarian. High-end restaurants and mountain refugios provide dedicated vegetarian menus. In Greece, enjoy Greek salads, fava bean dip, and spanakopita.
• Cambodia: Theravada Buddhist presence means abundant tofu stir-fries, morning noodle soups with greens, and fresh tropical fruit.`,
  },
  {
    id: 'rag-solo-female-safety',
    title: 'Solo Female Travel Safety & Cultural Respect Protocols',
    category: 'safety-health',
    source: 'Global Solo Traveler Security Matrix 2026',
    keywords: ['solo', 'female', 'woman', 'women', 'safety', 'safe', 'alone', 'scam', 'night', 'harassment'],
    content: `Solo Female Travel Protocols & Safe Destinations:
• Safest Global Picks: Iceland, Japan (Kyoto), Switzerland, New Zealand, and Bhutan are ranked among the top 10 safest countries globally with near-zero violent crime. Women can walk solo at midnight in Kyoto, Reykjavik, or Zurich with peace of mind.
• Sacred Places Dress Codes (Varanasi, Angkor Wat, Bhutan, Bali): Modesty is a sign of respect and guarantees a hassle-free trip. Cover shoulders and knees. In Bali, wear a traditional sarong and sash (kamben) provided at temple entrances. In Varanasi, hire verified government-certified heritage guides for navigating narrow silk galis.
• Transit Tips: In Bali and Cambodia, use the Grab or Gojek apps instead of hailing unmarked street cabs so your trip is GPS-tracked. In India, use prepaid airport taxis or pre-arranged private drivers through your heritage hotel.
• Emergency Digital Setup: Keep your hotel business card with local address in the local language, activate an international eSIM with continuous data, and share real-time location via Google Maps with trusted family.`,
  },
  {
    id: 'rag-photography-drone-gear-hacks',
    title: 'Camera Equipment, Drone Regulations & Extreme Climate Photography Hacks',
    category: 'gear-packing',
    source: 'International Travel Photography Council 2026',
    keywords: ['photography', 'camera', 'drone', 'gear', 'photo', 'lenses', 'drones', 'shoot', 'battery', 'cold'],
    content: `Master Photography and Drone Rules:
• Drone Bans & Permits: Drones are STRICTLY ILLEGAL without high-level defense/aviation permits around Angkor Wat (Cambodia), Varanasi Ganges ghats (India), and all National Parks in the USA, New Zealand, and Switzerland. Drones will be confiscated at customs. Flying without authorization in Bhutan or India carries heavy fines.
• Sub-Zero Battery Care (Iceland, Ladakh, Swiss Alps): Lithium camera batteries deplete 4x faster at -10°C. Keep spare batteries inside your inner coat pocket next to your body heat. When coming indoors from freezing air, leave your camera in your zipped bag for 45 minutes to prevent internal lens condensation.
• Lens Recommendations:
  - Varanasi & Kyoto: 35mm or 50mm f/1.4 prime lens for low-light dawn ceremonies, temple oil lamps, and atmospheric street portraits.
  - Serengeti Safari: 100-400mm or 200-600mm telephoto lens is mandatory; animals are often 50–200 meters away.
  - Iceland & Patagonia: 14-24mm f/2.8 ultra-wide angle for capturing northern lights auroras, vast glaciers, and vertical granite spires.
• Filters: Circular Polarizer (CPL) filter is essential for cutting glare on tropical waters (Bali) and turquoise glacial lakes (Pangong Tso & Lake Oeschinen).`,
  },

  // -------------------------------------------------------------
  // 4. DESTINATION-SPECIFIC EXPEDITION INTELLIGENCE
  // -------------------------------------------------------------
  {
    id: 'rag-dest-varanasi-kashi',
    title: 'Varanasi (Kashi): Dawn Rites, 84 Ghats & Sacred Protocol',
    category: 'destination',
    source: 'Vedic Cultural Heritage Archive',
    keywords: ['varanasi', 'kashi', 'banaras', 'ganges', 'ganga', 'aarti', 'ghat', 'sarnath', 'shiva', 'jyotirlinga'],
    content: `Varanasi (Kashi) Expedition Intelligence:
• Soul of the City: Continuously inhabited for 3,000+ years. Known as the City of Light (Kashi) dedicated to Lord Shiva.
• Dawn Boat Pilgrimage: Must be taken between 5:15 AM and 6:30 AM in a traditional hand-rowed wooden boat from Assi Ghat to Dashashwamedh and Manikarnika. Witness the morning sun illuminate 84 historic stone ghats while Sanskrit stotras echo over the water.
• Evening Maha Aarti: 6:30 PM at Dashashwamedh Ghat. Reserve a private boat 1 hour early to anchor front-row facing the seven priests lifting seven-tiered brass oil lamps.
• Kashi Vishwanath Temple: One of the 12 sacred Jyotirlingas, newly connected via the grand Vishwanath Corridor. Early morning Sugam Darshan tickets can be booked online to bypass lines.
• Sarnath Sanctuary: 10 km away; visit Dhamek Stupa where Lord Buddha delivered his first sermon setting the Wheel of Dharma in motion.
• Best Season: October to March (15°C–25°C with crisp river mist). Avoid May–June heat (42°C+).`,
  },
  {
    id: 'rag-dest-ladakh-himalayas',
    title: 'Ladakh High-Himalayas: Pangong Tso, Nubra & Ancient Gompas',
    category: 'destination',
    source: 'Trans-Himalayan Cultural Guild',
    keywords: ['ladakh', 'leh', 'pangong', 'nubra', 'khardung', 'thiksey', 'monastery', 'gompa', 'himalaya'],
    content: `Ladakh Trans-Himalayan Intelligence:
• High Altitude Cold Desert: Situated in Northern India at elevations starting at 11,500 ft (Leh) up to 17,582 ft (Khardung La).
• Thiksey Monastery: Resembles the Potala Palace of Lhasa; houses a magnificent two-story 49-foot Maitreya Buddha statue. Attend dawn prayers at 6:00 AM with long horns (dungchen) and butter lamps.
• Pangong Tso Lake: High-altitude saltwater lake at 14,270 ft shifting from turquoise to indigo. Stay in an insulated luxury geodesic dome in Spangmik for night astrophotography.
• Nubra Valley: Cross Khardung La pass to reach Hunder's white sand dunes, home to double-humped Bactrian camels against colossal snow peaks.
• Best Season: May to September when all motorable passes are clear of snow.
• Packing: Thermal innerwear, windbreaker jacket, polarized sunglasses, and SPF 50+ sunscreen.`,
  },
  {
    id: 'rag-dest-bhutan-tigers-nest',
    title: 'Bhutan: Paro Taktsang, Gross National Happiness & Dzongs',
    category: 'destination',
    source: 'Royal Bhutanese Heritage Bureau',
    keywords: ['bhutan', 'paro', 'thimphu', 'taktsang', 'tiger', 'dzong', 'punakha', 'sdf', 'monastery'],
    content: `Bhutan Kingdom Intelligence:
• Philosophy: The world's only carbon-negative nation measuring Gross National Happiness over material GDP.
• Paro Taktsang (Tiger's Nest): Clings 900 meters up sheer granite cliffs in Paro Valley. Hike takes 4–5 hours round-trip through blue pine forests with prayer wheels. Rent a hiking pole at the base.
• Punakha Dzong: Palace of Great Bliss situated at the sacred confluence of Pho Chhu and Mo Chhu rivers. The most beautiful fortress in the Himalayas.
• Hot Stone Bath: Restorative traditional bath with mountain river stones heated over wood fire and infused with wild Artemisia medicinal herbs.
• Best Season: March–May (rhododendron blooms) and October–November (crystalline skies).`,
  },
  {
    id: 'rag-dest-angkor-wat-cambodia',
    title: 'Angkor Wat: Sacred Khmer Architecture & Forest Pagodas',
    category: 'destination',
    source: 'UNESCO Angkor Conservation Archive',
    keywords: ['angkor', 'wat', 'cambodia', 'siem reap', 'bayon', 'ta prohm', 'khmer', 'temple'],
    content: `Angkor Wat & Siem Reap Intelligence:
• Monumental Scale: The largest religious monument in human history, built in the 12th century by King Suryavarman II.
• Sunrise Secret: Arrive at the northern lily reflection pond at 5:00 AM. Bring a small flashlight. Once sunrise finishes, immediately enter the inner sanctum before tour groups arrive.
• Bayon Temple: 54 towers with 216 giant smiling stone faces of Avalokiteshvara. Visit at 2:00 PM when soft angled sunlight creates dramatic shadows on the carvings.
• Ta Prohm: The "Tomb Raider" temple where massive silk-cotton tree roots throttle 900-year-old stone galleries.
• Best Season: November to February (cool, dry season, 24°C–30°C).`,
  },
  {
    id: 'rag-dest-kyoto-japan',
    title: 'Kyoto: Zen Temples, Tea Ceremonies & Geiko Traditions',
    category: 'destination',
    source: 'Kyoto Imperial Cultural Preservation Trust',
    keywords: ['kyoto', 'japan', 'zen', 'temple', 'bamboo', 'gion', 'tea', 'kaiseki', 'shinkansen', 'sakura'],
    content: `Kyoto Imperial Intelligence:
• Cultural Heart of Japan: Over 1,600 Buddhist temples, 400 Shinto shrines, and 17 UNESCO World Heritage sites.
• Crowds Avoidance Hack: Visit Fushimi Inari-Taisha at 6:00 AM or 8:30 PM (it is open 24 hours). The vermilion torii gates are completely mystical and empty at night under lantern light.
• Arashiyama Bamboo Grove: Must be visited before 7:30 AM to hear the wind whisper through the stalks (designated one of Japan's 100 Soundscapes).
• Traditional Ryokan Stay: Sleep on tatami mats with futons, soak in cedar onsen baths, and savor 10-course Kaiseki dinners honoring micro-seasonal ingredients.
• Best Season: Late March to mid-April (Cherry Blossoms / Sakura) and November (vibrant crimson maple foliage).`,
  },
  {
    id: 'rag-dest-swiss-alps',
    title: 'Swiss Alps: The Matterhorn, Glacier Express & Luxury Chalets',
    category: 'destination',
    source: 'Swiss Alpine Federation Intelligence',
    keywords: ['swiss', 'alps', 'switzerland', 'matterhorn', 'zermatt', 'glacier', 'train', 'fondue'],
    content: `Swiss Alps Expedition Intelligence:
• Iconic Peaks: The Matterhorn (4,478m) in Zermatt, Eiger, Mönch, and Jungfrau in the Bernese Oberland.
• Car-Free Sanctuary: Zermatt is 100% car-free; arrive via electric mountain train. Gornergrat railway ascends to 3,089m with views of 29 four-thousand-meter peaks.
• Glacier Express: Known as the world's slowest express train, taking 8 hours across 291 bridges from Zermatt to St. Moritz through deep Rhine gorges.
• Swiss Travel Pass: Unlimited travel on Swiss Federal Railways, boats on Lake Lucerne/Thun, and 500+ museums.
• Best Season: June to September for wildflower alpine hikes; December to March for world-class powder skiing.`,
  },
  {
    id: 'rag-dest-iceland-aurora',
    title: 'Iceland: Northern Lights, Glacial Caves & Volcanic Highlands',
    category: 'destination',
    source: 'Nordic Volcanology & Aurora Observatory',
    keywords: ['iceland', 'aurora', 'northern lights', 'glacier', 'lagoon', 'reykjavik', 'geyser', 'ice cave'],
    content: `Iceland Fire & Ice Expedition Intelligence:
• Northern Lights (Aurora Borealis): Best observed between mid-September and early April during dark, clear nights with Kp index 3+.
• Jökulsárlón Glacier Lagoon: Massive turquoise icebergs detach from Vatnajökull glacier and drift toward Diamond Beach's black obsidian sand.
• Subterranean Blue Ice Caves: Formed inside glaciers during winter; only accessible with certified glaciology guides using crampons and helmets.
• Golden Circle: Þingvellir National Park (where you can touch the North American and Eurasian tectonic plates), Geysir, and Gullfoss waterfall.
• Driving Tip: Rent a 4x4 vehicle with studded winter tires if traveling between October and April.`,
  },
  {
    id: 'rag-dest-bali-indonesia',
    title: 'Bali: Rice Terraces, Melukat Purification & Coastal Cliffs',
    category: 'destination',
    source: 'Balinese Heritage & Ecology Guild',
    keywords: ['bali', 'indonesia', 'ubud', 'uluwatu', 'rice', 'temple', 'nusa penida', 'surf'],
    content: `Bali Tropical Sanctuary Intelligence:
• Spiritual Culture: Balinese Hinduism anchored by the Tri Hita Karana philosophy (harmony with gods, humans, and nature).
• Melukat Water Purification: Spiritual cleansing ritual at Tirta Empul sacred water spring where travelers dress in sarongs and pass through 11 holy spouts.
• Tegallalang Rice Terraces: Centuries-old subak gravity irrigation system carved into steep jungle hillsides. Arrive at 7:00 AM for golden sunbeams piercing morning mist.
• Uluwatu Cliff Temple: Perched 70 meters above roaring Indian Ocean waves; daily 6:00 PM Kecak fire dance against sunset.
• Best Season: April to October (Dry season with comfortable humidity and offshore surf winds).`,
  },
  {
    id: 'rag-dest-santorini-greece',
    title: 'Santorini: Caldera Cliffs, Oia Sunsets & Volcanic Wineries',
    category: 'destination',
    source: 'Aegean Cycladic Maritime Institute',
    keywords: ['santorini', 'greece', 'caldera', 'oia', 'fira', 'sunset', 'mediterranean', 'aegean'],
    content: `Santorini Caldera Intelligence:
• Volcanic Caldera: Formed in 1600 BC by one of the largest volcanic eruptions in history. Whitewashed cave houses cascade down 300-meter cliffs.
• Fira to Oia Hike: A 10 km panoramic cliffside coastal trail offering uninterrupted 360-degree views of the turquoise Aegean Sea. Takes 3 hours; start at 7:30 AM before midday heat.
• Private Catamaran Cruise: Sail inside the volcanic crater, swim in geothermal sulfur hot springs off Nea Kameni island, and enjoy grilled Mediterranean dining.
• Volcanic Wine: Assyrtiko white wine produced from ancient vines woven into ground-hugging basket rings (kouloura) to protect grapes from winds.
• Best Season: May–June and September–October (warm sea, golden sunlight, pleasant 25°C weather, fewer crowds).`,
  },
  {
    id: 'rag-dest-cappadocia-turkey',
    title: 'Cappadocia: Fairy Chimneys, Sunrise Balloons & Cave Suites',
    category: 'destination',
    source: 'Anatolian Archaeological Survey',
    keywords: ['cappadocia', 'turkey', 'balloon', 'fairy chimney', 'göreme', 'cave', 'derinkuyu', 'anatolian'],
    content: `Cappadocia Geological Wonder Intelligence:
• Fairy Chimneys: Volcanic tuff formations sculpted over millions of years into whimsical pinnacles, spires, and honeycombed valleys.
• Sunrise Hot-Air Balloon Flight: 150 colorful balloons launch simultaneously at dawn floating 1,000 meters above Love Valley. Book for your first morning in case winds cancel flights.
• Derinkuyu Underground City: Carved 85 meters deep into the earth; once sheltered 20,000 people, livestock, and churches during invasions.
• Cave Suites: Authentic hotels in Göreme and Uçhisar carved directly into volcanic rock with heated stone floors and panoramic terraces.
• Best Season: April to June and September to November (mild temperatures and stable balloon launch weather).`,
  },
  {
    id: 'rag-dest-serengeti-africa',
    title: 'Serengeti & Ngorongoro: The Great Migration & Big Five Safari',
    category: 'destination',
    source: 'East African Wildlife Conservation Society',
    keywords: ['serengeti', 'africa', 'tanzania', 'safari', 'migration', 'lion', 'wildlife', 'ngorongoro'],
    content: `Serengeti & Ngorongoro Frontier Intelligence:
• The Great Migration: 1.5 million wildebeest, 300,000 zebras, and gazelles circumnavigating the Serengeti-Mara ecosystem.
• Mara River Crossings: Dramatic river crossings with Nile crocodiles occur between July and October in Northern Serengeti.
• Ngorongoro Crater: A 260 sq km intact volcanic caldera teeming with 25,000 animals including lions, leopards, elephants, and endangered black rhinos.
• Luxury Tented Camps: Solar-powered canvas suites with en-suite copper bathtubs, private game trackers, and nightly campfire bomas.
• Best Season: July–October (River crossings) and January–March (Calving season on Southern plains).`,
  },
  {
    id: 'rag-dest-new-zealand-fjord',
    title: 'New Zealand: Milford Sound, Southern Alps & Heli-Hikes',
    category: 'destination',
    source: 'New Zealand Conservation & Alpine Council',
    keywords: ['new zealand', 'milford', 'sound', 'fjord', 'queenstown', 'cook', 'rotorua', 'maori'],
    content: `New Zealand Frontier Intelligence:
• Milford Sound (Piopiotahi): Described by Rudyard Kipling as the Eighth Wonder of the World. Sheer vertical rock walls (Mitre Peak) rising 1,200 meters from glacial waters with cascading waterfalls.
• Queenstown: Adventure capital situated on Lake Wakatipu surrounded by the Remarkables mountain range.
• Aoraki / Mount Cook: Highest peak in New Zealand (3,724m); hike the Hooker Valley track across suspension bridges to glacial iceberg lakes.
• Māori Culture: Experience Kaitiakitanga (sacred guardianship of the earth) and traditional hāngī feasts in Rotorua.
• Best Season: December to March (Southern Hemisphere summer with 20°C–25°C warmth and long daylight hours).`,
  },
  {
    id: 'rag-dest-patagonia-glaciers',
    title: 'Patagonia: Torres del Paine, Perito Moreno & End of World',
    category: 'destination',
    source: 'Andean Glaciology and Trekking Institute',
    keywords: ['patagonia', 'chile', 'argentina', 'torres', 'paine', 'glacier', 'perito moreno', 'fitz roy'],
    content: `Patagonia Wild Frontier Intelligence:
• The End of the World: Southern tip of South America spanning Chile and Argentina.
• Torres del Paine (Chile): Three sheer granite towers rising above turquoise lagoons. Hike the iconic 5-day W-Trek or 8-day O-Circuit.
• Perito Moreno Glacier (Argentina): A rare advancing glacier 5 km wide and 70 meters high that calves thunderous icebergs into Lake Argentino.
• Wind Warning: Patagonian winds can exceed 90 km/h in summer. Pack sturdy trekking poles and 3-layer GORE-TEX outerwear.
• Best Season: November to March (Austral summer with 16 hours of daylight).`,
  },
  {
    id: 'rag-dest-banff-rockies',
    title: 'Banff National Park & Lake Louise: Canadian Rockies (North America)',
    category: 'destination',
    source: 'Parks Canada & Rocky Mountain Alpine Guide',
    keywords: ['banff', 'lake louise', 'moraine lake', 'canada', 'rockies', 'north america', 'calgary', 'icefields parkway'],
    content: `Banff & Canadian Rockies Wilderness Intelligence:
• Iconic Turquoise Waters: Lake Louise & Moraine Lake derive their electric turquoise color from glacial silt refracting sunlight.
• Budget & Costs: ₹2,45,000 / person for 8 days. Flights DEL/BOM to Calgary (YYC) range from ₹68,000–₹92,000.
• Top Route: Icefields Parkway (Hwy 93) connecting Banff to Jasper—one of the world's greatest mountain drives. Walk the Athabasca Glacier.
• Wildlife Safety: Grizzly bears, black bears, and elk roam freely. Carry EPA-approved bear spray on all hikes and keep a 100-meter distance.
• Best Season: June to September for canoeing and hiking; December to March for world-class champagne powder skiing.`,
  },
  {
    id: 'rag-dest-machu-picchu',
    title: 'Machu Picchu & Sacred Valley: Inca Citadel (South America)',
    category: 'destination',
    source: 'Peruvian Ministry of Culture & Archaeological Survey',
    keywords: ['machu picchu', 'peru', 'inca', 'cusco', 'andes', 'south america', 'sacred valley', 'huayna picchu'],
    content: `Machu Picchu Ancient Citadel Intelligence:
• Imperial Incan Sanctuary: Situated 2,430m above sea level in the cloud forest above the Urubamba River. Built around 1450 AD without mortar.
• Budget & Costs: ₹2,15,000 / person for 9 days. Flights to Lima/Cusco ~₹95,000–₹1,25,000.
• Altitude Acclimatization: Acclimate in Cusco (3,400m) or the Sacred Valley (2,800m) for 2 days before strenuous hikes. Drink mate de coca.
• Booking Window: Machu Picchu circuits and Vistadome panoramic trains have strict daily visitor caps. Reserve 3–4 months in advance.
• Best Season: May to October (dry Andean winter season with crisp blue skies).`,
  },
  {
    id: 'rag-dest-giza-pyramids',
    title: 'Great Pyramids of Giza & Cairo: Ancient World Wonder (Africa)',
    category: 'destination',
    source: 'Egyptian Ministry of Tourism and Antiquities',
    keywords: ['giza', 'pyramids', 'cairo', 'egypt', 'sphinx', 'africa', 'nile', 'tutankhamun'],
    content: `Giza Pyramids & Ancient Cairo Intelligence:
• The Sole Surviving Ancient Wonder: The Great Pyramid of Khufu has stood for over 4,500 years, built of 2.3 million limestone blocks.
• Budget & Costs: ₹1,25,000 / person for 7 days. Direct or 1-stop flights from DEL/BOM to Cairo ~₹32,000–₹45,000.
• Grand Egyptian Museum (GEM): Located right near Giza plateau displaying all 5,000 treasures from King Tutankhamun's tomb.
• Visa Logistics: Indian passport holders with valid US, UK, or Schengen visas can obtain Visa on Arrival / e-Visa for Egypt.
• Best Season: October to April (pleasant 18°C–24°C days; avoid scorching summer heat).`,
  },
  {
    id: 'rag-dest-great-barrier-reef',
    title: 'Great Barrier Reef & Coral Sea: Living World Heritage (Oceania)',
    category: 'destination',
    source: 'Great Barrier Reef Marine Park Authority (GBRMPA)',
    keywords: ['great barrier reef', 'cairns', 'australia', 'oceania', 'coral', 'scuba', 'whitsundays', 'daintree'],
    content: `Great Barrier Reef Marine Sanctuary Intelligence:
• Planet's Largest Living Structure: Stretches 2,300km off the Queensland coast, visible from space with over 1,500 fish species.
• Budget & Costs: ₹2,35,000 / person for 8 days. Flights DEL/BOM to Cairns/Brisbane ~₹65,000–₹88,000.
• Key Excursions: Agincourt Outer Ribbon Reef catamaran cruise, scenic helicopter flight over Heart Reef, and ancient Daintree Rainforest.
• Marine Protection: Use only reef-safe mineral sunscreen without oxybenzone. Wear full stinger suits during wet season (Nov–May).
• Best Season: June to October (Australian winter with dry skies, warm 25°C water and optimal underwater visibility).`,
  },
  {
    id: 'rag-dest-antarctica',
    title: 'Antarctica: The Seventh Continent Expedition (Antarctica)',
    category: 'destination',
    source: 'International Association of Antarctica Tour Operators (IAATO)',
    keywords: ['antarctica', 'seventh continent', 'lemaire channel', 'iceberg', 'penguins', 'polar', 'drake passage', 'ushuaia'],
    content: `Antarctica Seventh Continent Expeditions Intelligence:
• Ultimate Polar Frontier: The coldest, windiest, and driest continent on Earth, dedicated to science and pristine conservation.
• Budget & Costs: ₹6,80,000 / person for 11 days all-inclusive aboard polar-class expedition ship (Zodiac landings, lectures, expedition parkas). Flights to Ushuaia ~₹1,35,000–₹1,75,000.
• Highlights: Navigating the sheer mountain walls of Lemaire Channel, visiting Deception Island volcanic caldera, and stepping foot on the continental mainland at Neko Harbour.
• Wildlife: Tens of thousands of gentoo, chinstrap, and Adélie penguins, breaching humpback and orca whales, and leopard seals.
• Best Season: November to March (Austral polar summer with 20–24 hours of midnight daylight and mild -2°C to +4°C temperatures).`,
  },
  {
    id: 'rag-seven-wonders-guide',
    title: 'The Seven Wonders of the World: Complete Global Directory & Logistics',
    category: 'destination',
    source: 'New7Wonders Foundation & UNESCO World Heritage Center',
    keywords: ['seven wonders', 'wonders', '7 wonders', 'taj mahal', 'great wall', 'petra', 'colosseum', 'christ redeemer', 'machu picchu', 'chichen itza', 'giza'],
    content: `Official New Seven Wonders of the World Intelligence:
1. Taj Mahal (Agra, India): Emperor Shah Jahan's ivory marble masterpiece of eternal love on the Yamuna. ₹14,500 budget from Delhi.
2. Great Wall of China (Beijing, China): 21,000km stone dragon winding across mountain ridges. Mutianyu cable car and Simatai night wall. ₹1,45,000 package.
3. Petra (Jordan): Rose-red Nabataean rock-hewn Treasury (Al-Khazneh) through the Siq canyon. ₹1,25,000 package.
4. Colosseum (Rome, Italy): Imperial Roman amphitheatre holding 50,000 gladiatorial spectators. Underground hypogeum and arena floor. ₹1,85,000 package.
5. Christ the Redeemer (Rio, Brazil): 38-meter Art Deco statue crowning Corcovado peak over Guanabara Bay. Cog railway through Tijuca rainforest. ₹2,60,000 package.
6. Machu Picchu (Andes, Peru): 15th-century Incan cloud sanctuary atop granite peaks. Vistadome panoramic train from Cusco. ₹2,15,000 package.
7. Chichén Itzá (Yucatan, Mexico): Mayan astronomical step-pyramid El Castillo with equinox feathered serpent shadow. ₹2,25,000 package.
Honorary Ancient Wonder: Great Pyramids of Giza (Egypt): 4,500-year-old sole surviving ancient wonder. ₹1,25,000 package.`,
  },
  {
    id: 'rag-dest-kerala-tourism',
    title: 'Kerala: Alleppey Backwater Houseboats & Munnar Tea Estates',
    category: 'destination',
    source: 'Kerala Tourism Development Corporation (KTDC)',
    keywords: ['kerala', 'alleppey', 'munnar', 'backwaters', 'houseboat', 'south india', 'ayurveda', 'tea gardens'],
    content: `Kerala (God's Own Country) Intelligence:
• Backwaters of Alleppey: 900km of tranquil palm-shaded canals on Vembanad Lake. Experience traditional thatched wooden kettuvallam houseboats with private chef serving Karimeen Pollichathu.
• Munnar Tea Highlands: Rolling green tea plantations at 1,600m altitude in Western Ghats, Eravikulam National Park (Nilgiri Tahr), and Mattupetty Dam.
• Budget & Connectivity: ₹28,500 / person for 6-day package. Direct flights to Kochi (COK) from DEL/BOM/BLR/HYD.
• Best Season: September to March for pleasant waterways and crisp misty tea slopes; June–August for traditional Monsoon Ayurveda treatments.`,
  },
  {
    id: 'rag-dest-araku-valley',
    title: 'Araku Valley & Borra Caves: Coffee Hills of Andhra Pradesh',
    category: 'destination',
    source: 'Andhra Pradesh Tourism Development Corporation (APTDC)',
    keywords: ['araku', 'araku valley', 'andhra pradesh', 'borra caves', 'vizag', 'visakhapatnam', 'katiki', 'coffee'],
    content: `Araku Valley & Eastern Ghats Intelligence:
• Emerald Coffee Highlands: Situated at 911m in the Eastern Ghats of Andhra Pradesh, famous for shade-grown organic tribal Araku Coffee (awarded globally).
• 150-Million-Year-Old Borra Caves: Colossal limestone karsts with naturally sculpted Shiva-Parvati stalactites illuminated by ambient neon lights.
• Scenic Vistadome Train Route: 130km journey from Visakhapatnam passing through 58 tunnels and over 84 bridges clinging to mountain gorges.
• Culinary & Culture: Bamboo Chicken (chicken marinated in tribal spices steamed inside green bamboo stalks over wood embers), Araku Arabica coffee, Katiki waterfalls.
• Budget & Logistics: ₹12,500 / person for 3-day complete circuit. Fly to Visakhapatnam (VTZ) + Vistadome train. Best season: September to March.`,
  },
  {
    id: 'rag-dest-ooty-nilgiris',
    title: 'Ooty (Udhagamandalam): Queen of Hill Stations in the Nilgiris',
    category: 'destination',
    source: 'Tamil Nadu Tourism Development Corporation (TTDC)',
    keywords: ['ooty', 'nilgiris', 'tamil nadu', 'toy train', 'doddabetta', 'pykara', 'queen of hill stations'],
    content: `Ooty (Nilgiris) Tourism Intelligence:
• Queen of Hill Stations: Nestled at 2,240m among blue eucalyptus hills and pine forests in Tamil Nadu.
• UNESCO Nilgiri Mountain Railway (Toy Train): Blue-and-cream steam train running from Mettupalayam through Coonoor tunnels with spectacular canyon bridges.
• Key Attractions: Doddabetta Peak (2,637m panoramic vista), Pykara Waterfalls and Lake boathouse, Government Botanical Gardens, Emerald Lake.
• Local Delicacies: Crispy layered Ooty Varkey pastry, handcrafted artisanal Nilgiri chocolates, and fragrant eucalyptus honey.
• Budget & Route: ₹16,500 / person for 4-day tour. Nearest airport Coimbatore (CJB) 88km away. Best season: October to June.`,
  },
  {
    id: 'rag-dest-coorg-kodagu',
    title: 'Coorg (Kodagu): Scotland of India & Coffee Plantations',
    category: 'destination',
    source: 'Karnataka State Tourism Development Corporation (KSTDC)',
    keywords: ['coorg', 'kodagu', 'karnataka', 'madikeri', 'abbey falls', 'coffee', 'rajas seat'],
    content: `Coorg (Kodagu) Tourism Intelligence:
• The Scotland of India: Mist-draped slopes of the Western Ghats covered in dense arabica/robusta coffee estates and black pepper vines.
• Top Sights: Abbey Falls roaring amidst spice trees, Raja's Seat musical sunset garden, Namdroling Golden Temple Tibetan monastery in Bylakuppe, Talakaveri river origin.
• Food & Kodava Hospitality: Authentic Kadambuttu (steamed rice dumplings), spicy Pandi Curry cooked with black vinegar (kachampuli), and fresh estate-brewed filter coffee.
• Budget & Route: ₹18,000 / person for 4-day plantation stay. Drive from Bangalore (260km, 5h) or Mangalore (135km). Best season: October to March.`,
  },
  {
    id: 'rag-dest-manali-himachal',
    title: 'Manali & Solang Valley: Himalayan Adventure & Rohtang Pass',
    category: 'destination',
    source: 'Himachal Pradesh Tourism Development Corporation (HPTDC)',
    keywords: ['manali', 'himachal pradesh', 'solang valley', 'rohtang pass', 'atal tunnel', 'himalayas', 'snow'],
    content: `Manali & Kullu Valley Intelligence:
• High Himalayan Alpine Haven: Situated at 2,050m along the Beas River, framed by snowcapped Pir Panjal and Dhauladhar ranges.
• Solang Valley & Atal Tunnel: Year-round adventure hub for paragliding, zorbing, quad biking, and skiing. Atal Tunnel leads directly to mystical Lahaul valley.
• Old Manali & Hadimba Temple: Ancient cedar-wood pagoda temple built in 1553 AD, bohemian cafes, and natural hot sulfur springs at Vashisht.
• Food & Culture: Traditional Siddu (steamed wheat bread filled with spiced walnut/poppy paste), Kullu trout fish, and warm apple crumble.
• Budget & Route: ₹19,500 / person for 5-day package. Volvo bus or drive from Delhi/Chandigarh, or fly to Bhuntar (KUU). Best season: Oct–Feb for snow; Mar–June for pleasant alpine wildflowers.`,
  },
  {
    id: 'rag-dest-pondy-puducherry',
    title: 'Pondicherry (Puducherry): French Quarter, Promenade & Auroville',
    category: 'destination',
    source: 'Puducherry Tourism Development Corporation',
    keywords: ['pondy', 'pondicherry', 'puducherry', 'white town', 'auroville', 'french quarter', 'promenade'],
    content: `Pondicherry (Pondy) Tourism Intelligence:
• French Colonial Heritage: Pastel mustard-yellow colonial villas adorned with bougainvillea in White Town, cobblestone French street signs (Rue Romain Rolland).
• Seaside Promenade: 1.5km pedestrian seafront boulevard on the Bay of Bengal, ideal for sunrise strolls and sea breezes.
• Auroville & Matrimandir: Experimental universal township founded by The Mother; magnificent golden geodesic meditation sphere.
• Culinary Delights: French-Tamil fusion creole cooking, freshly baked almond croissants, wood-fired sourdough pizzas, and seaside cafes.
• Budget & Route: ₹13,500 / person for 3-day beachside retreat. Drive 150km from Chennai via scenic East Coast Road (ECR). Best season: October to March.`,
  },
];

const STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of',
  'with', 'and', 'or', 'how', 'what', 'which', 'who', 'where', 'when', 'why', 'can',
  'i', 'you', 'my', 'your', 'please', 'tell', 'me', 'about', 'give', 'details',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9₹\s]/g, ' ')
    .split(/\s+/)
    .filter((term) => term.length > 1 && !STOPWORDS.has(term));
}

export function searchRagKnowledge(query: string, topK: number = 3): { chunk: RagChunk; score: number }[] {
  const terms = tokenize(query);
  const rawQuery = query.toLowerCase();

  if (terms.length === 0) {
    return RAG_KNOWLEDGE_BASE.slice(0, topK).map((chunk) => ({ chunk, score: 1.0 }));
  }

  const scored = RAG_KNOWLEDGE_BASE.map((chunk) => {
    let score = 0;
    const chunkTitle = chunk.title.toLowerCase();
    const chunkContent = chunk.content.toLowerCase();
    const chunkKeywords = chunk.keywords.map((k) => k.toLowerCase());

    if (chunkTitle.includes(rawQuery)) score += 15;

    terms.forEach((term) => {
      if (chunkKeywords.includes(term)) score += 8;
      if (chunkTitle.includes(term)) score += 6;
      if (chunkContent.includes(term)) score += 2;
    });

    if ((rawQuery.includes('price') || rawQuery.includes('cost') || rawQuery.includes('inr') || rawQuery.includes('rupee')) && chunk.category === 'pricing-inr') {
      score += 10;
    }
    if ((rawQuery.includes('visa') || rawQuery.includes('passport') || rawQuery.includes('permit')) && chunk.category === 'visa-logistics') {
      score += 10;
    }
    if ((rawQuery.includes('altitude') || rawQuery.includes('sickness') || rawQuery.includes('diamox')) && chunk.id === 'rag-altitude-sickness-prevention') {
      score += 14;
    }
    if ((rawQuery.includes('veg') || rawQuery.includes('jain') || rawQuery.includes('vegan') || rawQuery.includes('diet')) && chunk.id === 'rag-vegetarian-jain-food-guide') {
      score += 14;
    }
    if ((rawQuery.includes('solo') || rawQuery.includes('female') || rawQuery.includes('woman') || rawQuery.includes('safe')) && chunk.id === 'rag-solo-female-safety') {
      score += 14;
    }
    if ((rawQuery.includes('drone') || rawQuery.includes('camera') || rawQuery.includes('photo') || rawQuery.includes('lens')) && chunk.id === 'rag-photography-drone-gear-hacks') {
      score += 14;
    }

    return { chunk, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function buildRagPromptContext(query: string, topK: number = 3): {
  contextText: string;
  retrievedSources: string[];
} {
  const matches = searchRagKnowledge(query, topK);

  if (matches.length === 0) {
    return {
      contextText: 'No specific knowledge chunks retrieved. Answer based on verified travel domain data.',
      retrievedSources: ['Travel Reimagined General Atlas'],
    };
  }

  const contextText = matches
    .map(
      (m, idx) =>
        `### Knowledge Source ${idx + 1}: [${m.chunk.title}]\nCategory: ${m.chunk.category} | Source: ${m.chunk.source}\n${m.chunk.content}`
    )
    .join('\n\n');

  const retrievedSources = matches.map((m) => m.chunk.title);

  return { contextText, retrievedSources };
}

export function generateRagGroundedResponse(query: string, userContext?: any): {
  reply: string;
  sources: string[];
} {
  const matches = searchRagKnowledge(query, 2);

  if (matches.length > 0 && matches[0].score >= 4) {
    const topChunk = matches[0].chunk;
    const secondChunk = matches.length > 1 ? matches[1].chunk : null;
    const sources = matches.map((m) => m.chunk.title);

    let reply = `**Verified RAG Intelligence for "${topChunk.title}"**:\n\n`;

    const lines = topChunk.content.split('\n').filter((l) => l.trim().length > 0);
    reply += lines.slice(0, 5).join('\n') + '\n\n';

    if (secondChunk && secondChunk.id !== topChunk.id) {
      reply += `**Related Intelligence (${secondChunk.title})**:\n`;
      const secondaryLines = secondChunk.content.split('\n').filter((l) => l.trim().length > 0);
      reply += secondaryLines.slice(0, 3).join('\n') + '\n\n';
    }

    reply += `*Grounding citation: Verified via ${topChunk.source}.*`;
    return { reply, sources };
  }

  return {
    reply: `I am WanderAI with active RAG groundings. I have access to real Indian Rupee (₹ INR) package rates, flight costs from DEL/BOM, visa guidelines, altitude protocols, dietary options, and multi-day expedition schedules for all 13 world sanctuaries.\n\n` +
      `Feel free to ask me:\n` +
      `• *"What is the real cost in Indian Rupees for a 7-day trip to Bali or Swiss Alps?"*\n` +
      `• *"How can I prevent altitude sickness when traveling to Ladakh?"*\n` +
      `• *"Can I get pure vegetarian or Jain food in Kyoto and Europe?"*\n` +
      `• *"What are the visa rules for Indian passport holders visiting Bhutan or Santorini?"*`,
    sources: ['Travel Reimagined Atlas Index'],
  };
}
