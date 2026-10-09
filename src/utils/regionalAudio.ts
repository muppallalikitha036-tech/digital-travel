/**
 * Regional Audio Synthesizer (Web Audio API)
 * Generates an immersive, authentic 6-second soundscape for places and regions around the world.
 */

export interface RegionalSoundInfo {
  placeId: string;
  placeName: string;
  country: string;
  region: string;
  title: string;
  description: string;
  duration: number; // 6.0 seconds
}

export const REGIONAL_SOUND_MAP: Record<string, { title: string; description: string }> = {
  varanasi: {
    title: 'Sacred Dawn Bells & Ganges River Currents',
    description: 'Vedic Om resonance (136.1Hz), resonating bronze temple bells & morning river waters of Kashi',
  },
  ladakh: {
    title: 'High-Himalayan Dungchen Horn & Wind Chimes',
    description: 'Deep monastic long-horn brass drone, fluttering prayer flags & high alpine chimes at 14,000 ft',
  },
  bhutan: {
    title: 'Tiger’s Nest Sacred Singing Bowls & Mountain Breeze',
    description: 'Tibetan singing bowl harmonics, peaceful chant resonance & fragrant pine mountain wind',
  },
  'angkor-wat': {
    title: 'Ancient Khmer Temple Dawn Gong & Rainforest Mist',
    description: 'Deep resonant temple gong, morning cicadas & gentle tropical dawn breeze over lotus pools',
  },
  kyoto: {
    title: 'Arashiyama Bamboo Breeze & Zen Temple Gong',
    description: 'Shakuhachi bamboo wind resonance, shishi-odoshi water strike & contemplative bronze gong',
  },
  'swiss-alps': {
    title: 'Majestic Alpine Horn & Echoing Meadow Cowbells',
    description: 'Resonant harmonic Alphorn chords, crisp alpine wind & tuned meadow bell chimes',
  },
  iceland: {
    title: 'Arctic Glacial Winds & Aurora Borealis Drone',
    description: 'Sub-bass ethereal aurora resonance, howling sub-polar wind & crackling glacial ice',
  },
  patagonia: {
    title: 'Wild Patagonian Squall & Glacial Calving Echo',
    description: 'Untamed Andes mountain wind gusts, glacial spray & deep rumbling ice calve echoes',
  },
  bali: {
    title: 'Balinese Gamelan Metallophone & Indian Ocean Surf',
    description: 'Pentatonic slendro bronze gamelan chimes & warm turquoise ocean waves breaking on the reef',
  },
  cappadocia: {
    title: 'Anatolian Ney Flute & Sunrise Balloon Burner',
    description: 'Haunting desert reed flute tones with vibrato & soft hot-air balloon burner flame rush',
  },
  maldives: {
    title: 'Lagoon Ocean Swells & Tropical Sea Breeze',
    description: 'Crystal-clear turquoise waves gently lapping coral sands & soft Indian Ocean wind',
  },
  'new-zealand': {
    title: 'Fjordland Waterfalls & Native Bellbird Chimes',
    description: 'Cascading alpine water spray, mountain canyon breeze & sweet native bird whistle notes',
  },
  serengeti: {
    title: 'African Savannah Dusk Breeze & Tribal Log Drums',
    description: 'Warm golden savannah wind, deep rhythmic tribal drum pulse & twilight cicada chorus',
  },
  santorini: {
    title: 'Aegean Waves & Cycladic Chapel Bell',
    description: 'Cobalt Mediterranean surf wash, sun-warmed sea breeze & clear brass chapel bell toll',
  },
  banff: {
    title: 'Canadian Rockies Pine Wind & Crystal Alpine Chimes',
    description: 'Glacial canyon mountain breeze, rustling spruce needles & crystalline lake reflections',
  },
  'machu-picchu': {
    title: 'Andean Cloud Forest Flute & Sacred Incan Mountain Echo',
    description: 'Pentatonic Andean pan flute melody, misty valley gusts & ancient stone terrace reverb',
  },
  giza: {
    title: 'Giza Twilight Desert Wind & Resonant Pharaonic Drone',
    description: 'Silken desert sand dune currents, deep acoustic oud strum & sunset call echo across pyramids',
  },
  'great-barrier-reef': {
    title: 'Coral Sea Azure Waves & Subaquatic Marine Resonance',
    description: 'Warm tropical reef breakers, rhythmic ocean swells & crystal-clear barrier reef tide wash',
  },
  antarctica: {
    title: 'Polar Ice Shelf Howling Gale & Calving Sapphire Glacier',
    description: 'Sub-zero Antarctic katabatic winds, deep thunderous ice calf sub-bass & glass iceberg chimes',
  },
};

let activeAudioContext: AudioContext | null = null;
let activeStopTimeout: number | null = null;
let currentStopFunction: (() => void) | null = null;

export function stopCurrentRegionalSound() {
  if (currentStopFunction) {
    try {
      currentStopFunction();
    } catch {
      // ignore
    }
    currentStopFunction = null;
  }
  if (activeStopTimeout) {
    window.clearTimeout(activeStopTimeout);
    activeStopTimeout = null;
  }
}

/**
 * Generates and plays a 6-second regional sound for a destination or place.
 * Returns information about the soundscape and a stop callback.
 */
export function play6SecRegionalSound(
  destinationIdOrName: string,
  countryHint?: string,
  regionHint?: string
): RegionalSoundInfo {
  // Stop any currently playing 6s sound
  stopCurrentRegionalSound();

  const id = destinationIdOrName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
  const details =
    REGIONAL_SOUND_MAP[id] ||
    REGIONAL_SOUND_MAP[id.split('-')[0]] || {
      title: `${countryHint || 'Global'} Atmospheric Soundscape`,
      description: `6-second environmental audio generated for ${destinationIdOrName}`,
    };

  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) {
      return {
        placeId: id,
        placeName: destinationIdOrName,
        country: countryHint || 'Global',
        region: regionHint || 'World',
        title: details.title,
        description: details.description,
        duration: 6.0,
      };
    }

    if (!activeAudioContext || activeAudioContext.state === 'closed') {
      activeAudioContext = new AudioCtx();
    } else if (activeAudioContext.state === 'suspended') {
      activeAudioContext.resume();
    }

    const ctx = activeAudioContext;
    const now = ctx.currentTime;
    const duration = 6.0;

    // Master gain with smooth envelope: attack 0.3s, sustain, fade-out starting at 5.2s down to 6.0s
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.35);
    masterGain.gain.setValueAtTime(0.35, now + 5.1);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    masterGain.connect(ctx.destination);

    // Audio node collectors for clean shutdown
    const sourcesToStop: (AudioNode & { stop?: (when: number) => void })[] = [];

    // Helper: Create noise buffer for wind/water
    const createNoise = (filterType: BiquadFilterType, freq: number, q = 1) => {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let last = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pinkish noise
        last = last * 0.94 + white * 0.06;
        data[i] = last * 2.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(q, now);

      noise.connect(filter);
      sourcesToStop.push(noise);
      return { noise, filter };
    };

    // Helper: Resonant metallic bell/gong/chime
    const playBell = (freq: number, startTime: number, ringDuration: number, gainVal = 0.25) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      oscGain.gain.setValueAtTime(0.001, startTime);
      oscGain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, startTime + ringDuration);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + ringDuration);
      sourcesToStop.push(osc);

      // Inharmonic overtone for realistic metal bell resonance
      const overtone = ctx.createOscillator();
      const overtoneGain = ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.76, startTime);
      overtoneGain.gain.setValueAtTime(0.001, startTime);
      overtoneGain.gain.exponentialRampToValueAtTime(gainVal * 0.4, startTime + 0.02);
      overtoneGain.gain.exponentialRampToValueAtTime(0.0001, startTime + ringDuration * 0.6);

      overtone.connect(overtoneGain);
      overtoneGain.connect(masterGain);
      overtone.start(startTime);
      overtone.stop(startTime + ringDuration * 0.6);
      sourcesToStop.push(overtone);
    };

    // -------------------------------------------------------------
    // REGIONAL ACOUSTIC COMPOSITIONS (Each plays for 6.0 seconds)
    // -------------------------------------------------------------
    if (id.includes('varanasi') || id.includes('india') || id.includes('ganges') || id.includes('kashi')) {
      // 1. VARANASI: Sacred Om Drone (136.1Hz - cosmic frequency) + River water + Triple temple bells
      const omDrone = ctx.createOscillator();
      const omGain = ctx.createGain();
      omDrone.type = 'triangle';
      omDrone.frequency.setValueAtTime(136.1, now);
      omDrone.frequency.linearRampToValueAtTime(136.5, now + 6);
      omGain.gain.setValueAtTime(0.18, now);
      omDrone.connect(omGain);
      omGain.connect(masterGain);
      omDrone.start(now);
      omDrone.stop(now + duration);
      sourcesToStop.push(omDrone);

      // Water lapping against stone ghats
      const { noise, filter } = createNoise('bandpass', 450, 2);
      const waterGain = ctx.createGain();
      waterGain.gain.setValueAtTime(0.08, now);
      filter.connect(waterGain);
      waterGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // 3 Temple bells ringing sequentially
      playBell(540, now + 0.2, 3.2, 0.35); // 1st Ghanta bell
      playBell(810, now + 1.8, 3.0, 0.28); // 2nd Aarti bell
      playBell(1080, now + 3.4, 2.5, 0.22); // 3rd High chime
    } else if (id.includes('ladakh') || id.includes('himalaya') || id.includes('bhutan')) {
      // 2. LADAKH / BHUTAN: Dungchen low Tibetan horn + High Singing bowl (528Hz love/miracle tone)
      const horn = ctx.createOscillator();
      const hornFilter = ctx.createBiquadFilter();
      const hornGain = ctx.createGain();
      horn.type = 'sawtooth';
      horn.frequency.setValueAtTime(65.4, now); // Low C2
      hornFilter.type = 'lowpass';
      hornFilter.frequency.setValueAtTime(180, now);
      hornFilter.frequency.exponentialRampToValueAtTime(320, now + 2);
      hornGain.gain.setValueAtTime(0.22, now);
      horn.connect(hornFilter);
      hornFilter.connect(hornGain);
      hornGain.connect(masterGain);
      horn.start(now);
      horn.stop(now + duration);
      sourcesToStop.push(horn);

      // Himalayan Singing bowl (528Hz & 1056Hz)
      playBell(528, now + 0.4, 4.5, 0.38);
      playBell(792, now + 2.5, 3.2, 0.25);

      // High mountain wind
      const { noise, filter } = createNoise('bandpass', 750, 4);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);
    } else if (id.includes('kyoto') || id.includes('japan')) {
      // 3. KYOTO: Zen Bronze Bell + Bamboo Water Clack + Wind in Bamboo
      playBell(432, now + 0.3, 4.8, 0.4); // Deep Zen temple bell
      playBell(864, now + 3.0, 2.8, 0.2);

      // Bamboo strike (Shishi-odoshi) at 1.8s
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(980, now + 1.8);
      clickGain.gain.setValueAtTime(0.3, now + 1.8);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 1.95);
      clickOsc.connect(clickGain);
      clickGain.connect(masterGain);
      clickOsc.start(now + 1.8);
      clickOsc.stop(now + 2.0);
      sourcesToStop.push(clickOsc);

      // Bamboo grove breeze
      const { noise, filter } = createNoise('bandpass', 620, 3);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);
    } else if (id.includes('swiss') || id.includes('alps')) {
      // 4. SWISS ALPS: Alphorn Triad chord (C - G - E) + Alpine Cowbells
      const frequencies = [261.6, 392.0, 523.2];
      frequencies.forEach((f, idx) => {
        const alphorn = ctx.createOscillator();
        const aGain = ctx.createGain();
        alphorn.type = 'triangle';
        alphorn.frequency.setValueAtTime(f, now + idx * 0.4);
        aGain.gain.setValueAtTime(0.001, now + idx * 0.4);
        aGain.gain.exponentialRampToValueAtTime(0.12, now + idx * 0.4 + 0.2);
        aGain.gain.exponentialRampToValueAtTime(0.001, now + 5.5);
        alphorn.connect(aGain);
        aGain.connect(masterGain);
        alphorn.start(now + idx * 0.4);
        alphorn.stop(now + duration);
        sourcesToStop.push(alphorn);
      });

      // Cowbell tinkles (high metallic bells)
      playBell(1250, now + 1.2, 1.4, 0.2);
      playBell(1420, now + 2.6, 1.5, 0.22);
      playBell(1100, now + 4.0, 1.6, 0.18);
    } else if (id.includes('iceland') || id.includes('norway')) {
      // 5. ICELAND: Low sub-bass ethereal drone + Whistling Arctic wind
      const auroraDrone = ctx.createOscillator();
      const aGain = ctx.createGain();
      auroraDrone.type = 'sine';
      auroraDrone.frequency.setValueAtTime(55, now);
      auroraDrone.frequency.exponentialRampToValueAtTime(110, now + 5.0);
      aGain.gain.setValueAtTime(0.3, now);
      auroraDrone.connect(aGain);
      aGain.connect(masterGain);
      auroraDrone.start(now);
      auroraDrone.stop(now + duration);
      sourcesToStop.push(auroraDrone);

      // Whistling wind
      const { noise, filter } = createNoise('bandpass', 350, 6);
      filter.frequency.linearRampToValueAtTime(800, now + 3);
      filter.frequency.linearRampToValueAtTime(320, now + 5.5);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // Ice crackling ping
      playBell(2200, now + 2.1, 0.8, 0.15);
    } else if (id.includes('bali') || id.includes('maldives') || id.includes('tropical') || id.includes('beach')) {
      // 6. BALI / TROPICAL BEACH: Ocean surf swell + Gamelan metallic chimes
      const { noise, filter } = createNoise('lowpass', 600, 1.2);
      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.02, now);
      waveGain.gain.linearRampToValueAtTime(0.28, now + 2.4); // Wave surge
      waveGain.gain.linearRampToValueAtTime(0.05, now + 5.0); // Wave wash
      filter.connect(waveGain);
      waveGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // Gamelan chime pentatonic melody
      const gamelanNotes = [660, 740, 830, 990];
      gamelanNotes.forEach((n, idx) => {
        playBell(n, now + 0.6 + idx * 0.9, 2.0, 0.22);
      });
    } else if (id.includes('cappadocia') || id.includes('turkey') || id.includes('desert')) {
      // 7. CAPPADOCIA: Turkish Ney flute simulation + Hot air balloon burner
      const flute = ctx.createOscillator();
      const fGain = ctx.createGain();
      flute.type = 'triangle';
      flute.frequency.setValueAtTime(440, now);
      flute.frequency.linearRampToValueAtTime(466, now + 1.5);
      flute.frequency.linearRampToValueAtTime(523, now + 3.2);
      flute.frequency.linearRampToValueAtTime(440, now + 4.8);
      fGain.gain.setValueAtTime(0.18, now);
      flute.connect(fGain);
      fGain.connect(masterGain);
      flute.start(now);
      flute.stop(now + duration);
      sourcesToStop.push(flute);

      // Soft burner whoosh at 1.5s
      const { noise, filter } = createNoise('bandpass', 240, 1.5);
      const burnerGain = ctx.createGain();
      burnerGain.gain.setValueAtTime(0.01, now);
      burnerGain.gain.linearRampToValueAtTime(0.16, now + 1.8);
      burnerGain.gain.linearRampToValueAtTime(0.01, now + 3.2);
      filter.connect(burnerGain);
      burnerGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);
    } else if (id.includes('serengeti') || id.includes('africa') || id.includes('safari')) {
      // 8. SERENGETI / AFRICA: Savannah dusk breeze + African rhythmic log drum heartbeats
      const { noise, filter } = createNoise('lowpass', 480, 1.0);
      const windGain = ctx.createGain();
      windGain.gain.setValueAtTime(0.08, now);
      filter.connect(windGain);
      windGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // Resonant deep tribal drum beats (80Hz - 110Hz damped pulses)
      const drumBeats = [0.3, 1.1, 1.9, 2.7, 3.8, 4.6];
      drumBeats.forEach((timeOffset, idx) => {
        const drumOsc = ctx.createOscillator();
        const drumGain = ctx.createGain();
        drumOsc.type = 'sine';
        drumOsc.frequency.setValueAtTime(idx % 2 === 0 ? 82 : 110, now + timeOffset);
        drumOsc.frequency.exponentialRampToValueAtTime(45, now + timeOffset + 0.35);

        drumGain.gain.setValueAtTime(0.35, now + timeOffset);
        drumGain.gain.exponentialRampToValueAtTime(0.001, now + timeOffset + 0.4);

        drumOsc.connect(drumGain);
        drumGain.connect(masterGain);
        drumOsc.start(now + timeOffset);
        drumOsc.stop(now + timeOffset + 0.45);
        sourcesToStop.push(drumOsc);
      });
    } else if (id.includes('santorini') || id.includes('greece') || id.includes('mediterranean')) {
      // 9. SANTORINI: Aegean azure waves + Church bells + Warm coastal breeze
      const { noise, filter } = createNoise('bandpass', 400, 1.5);
      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.04, now);
      waveGain.gain.linearRampToValueAtTime(0.25, now + 2.0);
      waveGain.gain.linearRampToValueAtTime(0.06, now + 5.0);
      filter.connect(waveGain);
      waveGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // Cycladic brass church bells
      playBell(659, now + 0.4, 3.8, 0.32); // E5
      playBell(880, now + 2.2, 3.2, 0.26); // A5
    } else if (id.includes('new-zealand') || id.includes('oceania') || id.includes('fjord')) {
      // 10. NEW ZEALAND: Fjord waterfall roar + Native Bellbird melodic whistling
      const { noise, filter } = createNoise('bandpass', 320, 2);
      const waterfallGain = ctx.createGain();
      waterfallGain.gain.setValueAtTime(0.12, now);
      filter.connect(waterfallGain);
      waterfallGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // Bellbird high ringing chimes
      playBell(1580, now + 0.8, 1.2, 0.2);
      playBell(2100, now + 1.4, 1.0, 0.18);
      playBell(1760, now + 2.8, 1.5, 0.22);
    } else if (id.includes('patagonia') || id.includes('south-america') || id.includes('andes')) {
      // 11. PATAGONIA: Glacial wind squall + Low acoustic harmonic arpeggio
      const { noise, filter } = createNoise('bandpass', 480, 5);
      filter.frequency.linearRampToValueAtTime(850, now + 2.5);
      filter.frequency.linearRampToValueAtTime(380, now + 5.2);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      playBell(330, now + 0.5, 3.5, 0.28); // E4
      playBell(494, now + 1.6, 3.2, 0.22); // B4
      playBell(659, now + 3.0, 2.8, 0.18); // E5
    } else if (id.includes('banff') || id.includes('canada') || id.includes('rockies')) {
      // 12. BANFF & ROCKIES: Pine forest wind + High crystal bell notes
      const { noise, filter } = createNoise('bandpass', 550, 3);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      playBell(880, now + 0.4, 2.5, 0.26); // A5
      playBell(1174, now + 1.5, 2.8, 0.22); // D6
      playBell(1318, now + 2.9, 3.0, 0.20); // E6
    } else if (id.includes('machu-picchu') || id.includes('peru') || id.includes('incas')) {
      // 13. MACHU PICCHU: Andean pentatonic pan flute simulation + Mountain mist
      const flute = ctx.createOscillator();
      const fGain = ctx.createGain();
      flute.type = 'sine';
      flute.frequency.setValueAtTime(587.33, now + 0.3); // D5
      flute.frequency.setValueAtTime(659.25, now + 1.2); // E5
      flute.frequency.setValueAtTime(783.99, now + 2.1); // G5
      flute.frequency.setValueAtTime(880.00, now + 3.2); // A5
      flute.frequency.setValueAtTime(1046.5, now + 4.1); // C6

      fGain.gain.setValueAtTime(0.001, now);
      fGain.gain.linearRampToValueAtTime(0.22, now + 0.6);
      fGain.gain.linearRampToValueAtTime(0.18, now + 3.5);
      fGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      flute.connect(fGain);
      fGain.connect(masterGain);
      flute.start(now + 0.2);
      flute.stop(now + duration);
      sourcesToStop.push(flute);
    } else if (id.includes('giza') || id.includes('egypt') || id.includes('pyramids')) {
      // 14. GIZA PYRAMIDS: Desert wind sweep + Pharaonic scale harmonic bells
      const { noise, filter } = createNoise('bandpass', 350, 4);
      filter.frequency.linearRampToValueAtTime(600, now + 2.0);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      playBell(293.66, now + 0.4, 3.5, 0.32); // D4
      playBell(311.13, now + 1.4, 3.0, 0.28); // Eb4 (Hijaz flavor)
      playBell(369.99, now + 2.6, 3.2, 0.26); // F#4
      playBell(440.00, now + 3.8, 3.0, 0.24); // A4
    } else if (id.includes('great-barrier-reef') || id.includes('cairns') || id.includes('coral')) {
      // 15. GREAT BARRIER REEF: Tropical turquoise surf swell + gentle aquatic chimes
      const { noise, filter } = createNoise('bandpass', 420, 2);
      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.05, now);
      waveGain.gain.linearRampToValueAtTime(0.26, now + 1.8);
      waveGain.gain.linearRampToValueAtTime(0.08, now + 4.8);
      filter.connect(waveGain);
      waveGain.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      playBell(1046.5, now + 1.2, 2.0, 0.16); // C6
      playBell(1318.5, now + 2.4, 2.2, 0.18); // E6
      playBell(1567.9, now + 3.6, 2.5, 0.14); // G6
    } else if (id.includes('antarctica') || id.includes('polar') || id.includes('glacier')) {
      // 16. ANTARCTICA: Sub-zero katabatic polar wind howling + Glacial ice calf boom
      const { noise, filter } = createNoise('bandpass', 280, 6);
      filter.frequency.linearRampToValueAtTime(450, now + 1.5);
      filter.frequency.linearRampToValueAtTime(190, now + 4.5);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      // Deep glacial sub-bass calving boom
      const iceBoom = ctx.createOscillator();
      const iceGain = ctx.createGain();
      iceBoom.type = 'triangle';
      iceBoom.frequency.setValueAtTime(65, now + 0.6);
      iceBoom.frequency.exponentialRampToValueAtTime(28, now + 2.2);

      iceGain.gain.setValueAtTime(0.35, now + 0.6);
      iceGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      iceBoom.connect(iceGain);
      iceGain.connect(masterGain);
      iceBoom.start(now + 0.6);
      iceBoom.stop(now + 2.6);
      sourcesToStop.push(iceBoom);

      playBell(1760, now + 2.8, 2.5, 0.15); // Ice crystal chime
    } else {
      // 8. GENERAL ADVENTURE: Dynamic mountain wind + Crystal explorer bell
      const { noise, filter } = createNoise('bandpass', 520, 2);
      filter.connect(masterGain);
      noise.start(now);
      noise.stop(now + duration);

      playBell(659, now + 0.3, 3.8, 0.3); // E5
      playBell(987, now + 2.2, 3.0, 0.25); // B5
    }

    currentStopFunction = () => {
      try {
        sourcesToStop.forEach((s) => {
          if (s.stop) s.stop(0);
          s.disconnect();
        });
        masterGain.disconnect();
      } catch {
        // ignore
      }
    };

    activeStopTimeout = window.setTimeout(() => {
      stopCurrentRegionalSound();
    }, 6050);
  } catch (err) {
    console.warn('Web Audio synthesis error:', err);
  }

  return {
    placeId: id,
    placeName: destinationIdOrName,
    country: countryHint || 'Global',
    region: regionHint || 'World',
    title: details.title,
    description: details.description,
    duration: 6.0,
  };
}
