import React, { useEffect, useRef, useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import page1CherryWalkway from '../assets/images/page1_cherry_walkway_1791218701001.jpg';
import page2MountainRiver from '../assets/images/page2_mountain_river_1791218714251.jpg';
import page3TropicalBeach from '../assets/images/page3_tropical_beach_1791218727955.jpg';
import page4WaterfallBoat from '../assets/images/page4_waterfall_boat_1791218745015.jpg';
import angkorSunrise from '../assets/images/angkor_wat_sunrise_1791214925554.jpg';
import lastPageAlpineFlowers from '../assets/images/last_page_alpine_flowers_1791222007983.jpg';
import { Play, Pause, Video, Clapperboard, Wind, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  type: 'blossom' | 'leaf' | 'mist' | 'sparkle' | 'wave';
  phase: number;
  amplitude: number;
}

export const CinematicVideoBackground: React.FC = () => {
  const { currentPath, customVideoBackgroundUrl, openAnimateModal } = useJourney();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [motionIntensity, setMotionIntensity] = useState<'gentle' | 'cinematic' | 'dynamic'>('cinematic');
  const [ambientAudioActive, setAmbientAudioActive] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioNode | null>(null);

  // Active page video configuration
  let pageTheme = {
    title: 'Autumn Cherry Blossom Walkway',
    videoType: 'cherry-blossom',
    baseImage: page1CherryWalkway,
    tag: 'Live 4K Sakura Drift Video',
  };

  if (currentPath.startsWith('/destinations')) {
    pageTheme = {
      title: 'Alpine Mountain River Reflections',
      videoType: 'mountain-river',
      baseImage: page2MountainRiver,
      tag: 'Live 4K Alpine Stream Video',
    };
  } else if (currentPath.startsWith('/experiences')) {
    pageTheme = {
      title: 'Tropical Sunset Ocean Waves',
      videoType: 'tropical-beach',
      baseImage: page3TropicalBeach,
      tag: 'Live 4K Ocean Waves Video',
    };
  } else if (currentPath.startsWith('/planner') || currentPath.startsWith('/journey')) {
    pageTheme = {
      title: 'Cascading Waterfall & Rapids',
      videoType: 'waterfall-boat',
      baseImage: page4WaterfallBoat,
      tag: 'Live 4K Waterfall Motion Video',
    };
  } else if (currentPath.startsWith('/stories')) {
    pageTheme = {
      title: 'Ancient Temple Sunrise Mist',
      videoType: 'temple-dawn',
      baseImage: angkorSunrise,
      tag: 'Live 4K Temple Sanctuary Video',
    };
  } else if (currentPath.startsWith('/about') || currentPath.startsWith('/quiz')) {
    pageTheme = {
      title: 'Alpine Wildflower Meadow Sunset',
      videoType: 'alpine-flowers',
      baseImage: lastPageAlpineFlowers,
      tag: 'Live 4K Mountain Sunset Video',
    };
  }

  // Toggle ambient audio matching the active page's video theme
  const toggleAmbientAudio = () => {
    if (!ambientAudioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          last = last * 0.96 + white * 0.04;
          data[i] = last * 2;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        if (pageTheme.videoType === 'tropical-beach') {
          // Ocean waves
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
        } else if (pageTheme.videoType === 'waterfall-boat') {
          // Rushing water
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(600, ctx.currentTime);
          filter.Q.setValueAtTime(1.5, ctx.currentTime);
          gain.gain.setValueAtTime(0.14, ctx.currentTime);
        } else {
          // Mountain / Blossom breeze
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(380, ctx.currentTime);
          filter.Q.setValueAtTime(2.0, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
        }

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        audioSourceRef.current = noise;
        setAmbientAudioActive(true);
      } catch (e) {
        console.warn('AudioContext error:', e);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setAmbientAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Continuous Canvas Video Synthesis Layer:
  // Renders fluid water ripples, floating foliage, moving fog, wave surges, and sunlight glimmer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle setup
    const particles: Particle[] = [];
    const count = Math.min(Math.floor(width / 24), 50);

    const speedMultiplier = motionIntensity === 'gentle' ? 0.6 : motionIntensity === 'dynamic' ? 1.6 : 1.0;

    for (let i = 0; i < count; i++) {
      if (pageTheme.videoType === 'cherry-blossom') {
        const colors = ['#F472B6', '#FDA4AF', '#FB7185', '#FBBF24', '#F59E0B', '#EF4444'];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 8 + 5,
          speedX: (Math.random() * 1.5 + 0.6) * speedMultiplier,
          speedY: (Math.random() * 1.6 + 0.8) * speedMultiplier,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.04,
          opacity: Math.random() * 0.55 + 0.35,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: 'blossom',
          phase: Math.random() * Math.PI * 2,
          amplitude: Math.random() * 2.5 + 1.2,
        });
      } else if (pageTheme.videoType === 'tropical-beach') {
        particles.push({
          x: Math.random() * width,
          y: height * 0.5 + Math.random() * (height * 0.5),
          size: Math.random() * 20 + 10,
          speedX: (Math.random() * 0.8 - 0.4) * speedMultiplier,
          speedY: (Math.random() * 0.4 - 0.2) * speedMultiplier,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: 0.01,
          opacity: Math.random() * 0.3 + 0.15,
          color: 'rgba(255, 255, 255, 0.4)',
          type: 'wave',
          phase: Math.random() * Math.PI * 2,
          amplitude: Math.random() * 4 + 2,
        });
      } else if (pageTheme.videoType === 'waterfall-boat') {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 14 + 6,
          speedX: (Math.random() * 0.8 + 0.2) * speedMultiplier,
          speedY: (Math.random() * 2.5 + 1.2) * speedMultiplier,
          rotation: Math.random() * Math.PI,
          rotSpeed: 0.02,
          opacity: Math.random() * 0.4 + 0.2,
          color: 'rgba(224, 242, 254, 0.7)',
          type: 'mist',
          phase: Math.random() * Math.PI * 2,
          amplitude: Math.random() * 2 + 1,
        });
      } else {
        // Alpine flowers / Mountains / Temple: golden pollen & gentle breeze sparkles
        const colors = ['#FDE68A', '#FBCFE8', '#DDD6FE', '#BAE6FD'];
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 5 + 3,
          speedX: (Math.random() * 0.9 + 0.3) * speedMultiplier,
          speedY: (Math.random() * 0.8 - 0.3) * speedMultiplier,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: 0.03,
          opacity: Math.random() * 0.45 + 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: 'sparkle',
          phase: Math.random() * Math.PI * 2,
          amplitude: Math.random() * 3 + 1,
        });
      }
    }

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Living video water & light wave simulation across screen
      if (pageTheme.videoType === 'tropical-beach' || pageTheme.videoType === 'mountain-river') {
        const waveGradient = ctx.createLinearGradient(0, height * 0.45, 0, height);
        const waveSwell = Math.sin(frame * 0.02 * speedMultiplier) * 0.08 + 0.12;
        waveGradient.addColorStop(0, `rgba(56, 189, 248, 0)`);
        waveGradient.addColorStop(0.5, `rgba(14, 165, 233, ${waveSwell})`);
        waveGradient.addColorStop(1, `rgba(3, 105, 161, 0.08)`);
        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, height * 0.45, width, height * 0.55);
      }

      // Render individual video motion particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += 0.02 * speedMultiplier;
        p.x += p.speedX + Math.sin(p.phase) * (p.amplitude * 0.6);
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > height + 25) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 25) {
          p.x = -20;
          p.y = Math.random() * height;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.type === 'blossom') {
          // Realistic petal curve
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.8, p.size * 0.8, p.size * 0.6, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.9, -p.size * 0.8, 0, -p.size);
          ctx.fill();
        } else if (p.type === 'mist') {
          // Soft circular mist droplet
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'wave') {
          // Horizontal ocean foam crest
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 1.8, p.size * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Ethereal diamond sparkle
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, motionIntensity, pageTheme.videoType]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Cinematic Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {customVideoBackgroundUrl ? (
          // Custom AI-Generated Video (Veo)
          <video
            ref={videoRef}
            key={customVideoBackgroundUrl}
            src={customVideoBackgroundUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center scale-100 opacity-95 transition-all duration-700"
          />
        ) : (
          // Native Living Cinematic Video Feed with Infinite Pan & Motion
          <div className="relative w-full h-full overflow-hidden">
            <img
              key={pageTheme.baseImage}
              src={pageTheme.baseImage}
              alt={pageTheme.title}
              className={`w-full h-full object-cover object-center opacity-92 transition-all duration-1000 ${
                isPlaying ? 'animate-[pulse_8s_ease-in-out_infinite] scale-[1.04]' : 'scale-100'
              }`}
              style={{
                filter: 'contrast(1.04) saturate(1.08) brightness(0.96)',
                transition: 'transform 12s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease',
              }}
            />

            {/* Subtle light shimmer layer simulating moving sunlight on water and clouds */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
                isPlaying ? 'opacity-40 animate-[pulse_6s_ease-in-out_infinite]' : 'opacity-10'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 50% 30%, rgba(254, 243, 199, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
              }}
            />
          </div>
        )}

        {/* Minimal soft ambient tint so video scenery is very visible, vibrant, and clear */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. Real-Time Dynamic Video Canvas Motion Layer */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 w-full h-full pointer-events-none" />

      {/* 3. Floating Interactive Video HUD Controller (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto flex flex-wrap items-center gap-2">
        {/* Live Video Indicator Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-xs font-mono text-amber-300 shadow-2xl">
          <span className="relative flex h-2 w-2">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${
                isPlaying ? 'inline-flex' : 'hidden'
              }`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                isPlaying ? 'bg-emerald-400' : 'bg-amber-500'
              }`}
            ></span>
          </span>
          <span className="font-semibold text-[11px]">{pageTheme.tag}</span>
        </div>

        {/* Play / Pause Video Motion */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-xl border border-white/20 text-slate-200 hover:text-white transition-all shadow-xl"
          title={isPlaying ? 'Pause Background Video Motion' : 'Resume Background Video Motion'}
          aria-label="Toggle background video playback"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
        </button>

        {/* Motion Intensity (Gentle / Cinematic / Dynamic) */}
        <div className="hidden sm:inline-flex items-center bg-black/60 backdrop-blur-xl border border-white/20 rounded-full p-0.5 text-xs text-slate-300 shadow-xl">
          <button
            onClick={() => setMotionIntensity('gentle')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
              motionIntensity === 'gentle' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
            }`}
            title="Gentle Video Motion"
          >
            Calm
          </button>
          <button
            onClick={() => setMotionIntensity('cinematic')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
              motionIntensity === 'cinematic' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
            }`}
            title="Cinematic Video Motion"
          >
            Cinematic
          </button>
          <button
            onClick={() => setMotionIntensity('dynamic')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
              motionIntensity === 'dynamic' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
            }`}
            title="Dynamic Video Motion"
          >
            Active
          </button>
        </div>

        {/* Ambient Video Nature Soundscape Toggle */}
        <button
          onClick={toggleAmbientAudio}
          className={`p-2 rounded-full border transition-all shadow-xl ${
            ambientAudioActive
              ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-amber-500/30'
              : 'bg-black/60 hover:bg-black/80 border-white/20 text-slate-300 hover:text-white'
          }`}
          title={ambientAudioActive ? 'Mute Video Ambient Audio' : 'Play Ambient Video Soundscape'}
          aria-label="Toggle video ambient soundscape"
        >
          {ambientAudioActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>

        {/* Quick Button: "Animate Any Photo into Video (Veo)" */}
        <button
          onClick={() => openAnimateModal(pageTheme.baseImage)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-display font-bold text-[11px] uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:scale-105 transition-all"
          title="Upload or animate any photo into video using Veo 3.1"
        >
          <Clapperboard className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Animate to Video</span>
        </button>
      </div>
    </div>
  );
};
