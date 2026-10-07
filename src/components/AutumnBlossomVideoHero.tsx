import React, { useEffect, useRef, useState } from 'react';
import page1CherryWalkway from '../assets/images/page1_cherry_walkway_1791218701001.jpg';
import { Volume2, VolumeX, Wind, Sparkles } from 'lucide-react';

interface FallingLeaf {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
  type: 'blossom' | 'maple' | 'ginkgo';
  amplitude: number;
  frequency: number;
  phase: number;
}

export const AutumnBlossomVideoHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [windLevel, setWindLevel] = useState<'gentle' | 'breeze' | 'gale'>('breeze');
  const [soundActive, setSoundActive] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Sound synthesis using Web Audio API for soothing autumn wind ambient tone
  const toggleSoundscape = () => {
    if (!soundActive) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Create pink noise buffer for realistic gentle wind
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.035; // quiet ambient volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Bandpass filter to sculpt wind resonance
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        filter.Q.setValueAtTime(1.8, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNodeRef.current = gainNode;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        whiteNoise.start();

        setSoundActive(true);
      } catch (err) {
        console.warn('AudioContext not supported or restricted:', err);
      }
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setSoundActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Falling leaves & cherry blossom petals animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      '#F472B6', // cherry blossom rose
      '#FDA4AF', // soft blossom pink
      '#FB7185', // vibrant blossom
      '#FBBF24', // autumn golden amber
      '#F59E0B', // warm maple amber
      '#EA580C', // autumn sunset burnt orange
      '#EF4444', // crimson maple leaf
      '#FDE68A', // delicate pale gold
    ];

    const leafTypes: ('blossom' | 'maple' | 'ginkgo')[] = ['blossom', 'blossom', 'maple', 'ginkgo'];
    const leafCount = Math.min(Math.floor(width / 18), 65);
    const leaves: FallingLeaf[] = [];

    const getWindMultipliers = () => {
      if (windLevel === 'gentle') return { speedX: 0.6, speedY: 0.9, amp: 1.0 };
      if (windLevel === 'gale') return { speedX: 2.2, speedY: 1.8, amp: 2.8 };
      return { speedX: 1.2, speedY: 1.3, amp: 1.8 }; // breeze default
    };

    for (let i = 0; i < leafCount; i++) {
      const type = leafTypes[Math.floor(Math.random() * leafTypes.length)];
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'blossom' ? Math.random() * 8 + 6 : Math.random() * 12 + 10,
        speedX: Math.random() * 1.5 + 0.5,
        speedY: Math.random() * 1.4 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        flip: Math.random() * Math.PI,
        flipSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.65 + 0.35,
        color: colors[Math.floor(Math.random() * colors.length)],
        type,
        amplitude: Math.random() * 2 + 1.2,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const drawLeaf = (l: FallingLeaf) => {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rotation);
      ctx.scale(Math.cos(l.flip), 1); // 3D fluttering flip effect
      ctx.globalAlpha = l.opacity;
      ctx.fillStyle = l.color;

      ctx.beginPath();
      if (l.type === 'blossom') {
        // Delicate curved cherry blossom petal
        ctx.moveTo(0, -l.size);
        ctx.bezierCurveTo(l.size * 0.9, -l.size * 0.8, l.size * 0.8, l.size * 0.6, 0, l.size);
        ctx.bezierCurveTo(-l.size * 0.8, l.size * 0.6, -l.size * 0.9, -l.size * 0.8, 0, -l.size);
      } else if (l.type === 'maple') {
        // Sculpted pointed autumn maple leaf
        ctx.moveTo(0, -l.size * 1.2);
        ctx.lineTo(l.size * 0.4, -l.size * 0.4);
        ctx.lineTo(l.size * 1.1, -l.size * 0.2);
        ctx.lineTo(l.size * 0.5, l.size * 0.3);
        ctx.lineTo(l.size * 0.7, l.size * 1.0);
        ctx.lineTo(0, l.size * 0.6);
        ctx.lineTo(-l.size * 0.7, l.size * 1.0);
        ctx.lineTo(-l.size * 0.5, l.size * 0.3);
        ctx.lineTo(-l.size * 1.1, -l.size * 0.2);
        ctx.lineTo(-l.size * 0.4, -l.size * 0.4);
        ctx.closePath();
      } else {
        // Ginkgo fan leaf
        ctx.moveTo(0, l.size);
        ctx.arc(0, 0, l.size, Math.PI * 0.15, Math.PI * 0.85, true);
        ctx.lineTo(0, l.size);
      }
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mult = getWindMultipliers();

      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i];
        l.phase += l.frequency;
        l.x += l.speedX * mult.speedX + Math.sin(l.phase) * (l.amplitude * mult.amp);
        l.y += l.speedY * mult.speedY;
        l.rotation += l.rotSpeed;
        l.flip += l.flipSpeed;

        // Reset when moving past bottom or right screen edge
        if (l.y > height + 25) {
          l.y = -25;
          l.x = Math.random() * (width + 100) - 50;
        }
        if (l.x > width + 30) {
          l.x = -30;
          l.y = Math.random() * height;
        }

        drawLeaf(l);
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [windLevel]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. Cinematic Autumn Cherry Blossom Video-Style Backdrop with Ken Burns Drift - Clearly Visible */}
      <div className="absolute inset-0 z-0">
        <img
          src={page1CherryWalkway}
          alt="Majestic autumn cherry blossom walkway with falling petals"
          className="w-full h-full object-cover object-center scale-105 opacity-90 animate-in fade-in duration-700"
        />
        {/* Light soft warm overlay (no dark shading, no blackout) */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. High-Density Falling Autumn Leaves & Cherry Blossom Petals Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
      />

      {/* 3. Floating Interactive Video Status & Ambient Controls */}
      <div className="absolute top-28 sm:top-24 right-4 sm:right-8 z-20 pointer-events-auto flex items-center gap-2">
        {/* Video Ambience Live Pill */}
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] font-mono text-amber-300 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>4K Autumn Ambience</span>
        </div>

        {/* Wind Breeze Selector */}
        <div className="flex items-center bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-0.5 text-xs text-slate-300">
          <button
            onClick={() => setWindLevel('gentle')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
              windLevel === 'gentle' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
            }`}
            title="Gentle Wind"
          >
            Calm
          </button>
          <button
            onClick={() => setWindLevel('breeze')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
              windLevel === 'breeze' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
            }`}
            title="Autumn Breeze"
          >
            Breeze
          </button>
          <button
            onClick={() => setWindLevel('gale')}
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
              windLevel === 'gale' ? 'bg-amber-500 text-slate-950 font-bold' : 'hover:text-white'
            }`}
            title="Active Autumn Gust"
          >
            Gust
          </button>
        </div>

        {/* Soothing Nature Breeze Soundscape Toggle */}
        <button
          onClick={toggleSoundscape}
          className={`p-2 rounded-full border transition-all ${
            soundActive
              ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/30'
              : 'bg-black/50 hover:bg-black/70 border-white/10 text-slate-300 hover:text-white'
          }`}
          title={soundActive ? 'Mute Autumn Breeze Soundscape' : 'Enable Gentle Autumn Wind Soundscape'}
          aria-label={soundActive ? 'Mute sound' : 'Enable ambient soundscape'}
        >
          {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
