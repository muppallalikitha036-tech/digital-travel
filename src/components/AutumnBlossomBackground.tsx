import React, { useEffect, useRef, useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import page1CherryWalkway from '../assets/images/page1_cherry_walkway_1791218701001.jpg';
import page2MountainRiver from '../assets/images/page2_mountain_river_1791218714251.jpg';
import page3TropicalBeach from '../assets/images/page3_tropical_beach_1791218727955.jpg';
import page4WaterfallBoat from '../assets/images/page4_waterfall_boat_1791218745015.jpg';
import varanasiGhats from '../assets/images/varanasi_ganges_ghats_1791214904380.jpg';
import angkorSunrise from '../assets/images/angkor_wat_sunrise_1791214925554.jpg';
import lastPageAlpineFlowers from '../assets/images/last_page_alpine_flowers_1791222007983.jpg';
import { Wind } from 'lucide-react';

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
  type: 'blossom' | 'leaf';
  oscillationAmplitude: number;
  oscillationSpeed: number;
  oscillationAngle: number;
}

export const AutumnBlossomBackground: React.FC = () => {
  const { currentPath } = useJourney();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particlesEnabled, setParticlesEnabled] = useState(true);

  // Dynamic route-based background mapping to match user specifications exactly:
  // Page 1 (Main/Home): 1st attached picture (Cherry blossom walkway)
  // Page 2 (Destinations): 2nd attached screenshot (Alpine mountain reflection in river)
  // Page 3 (Experiences): 3rd attached screenshot (Tropical sunset beach with loungers)
  // Page 4 (Trip Planner): 4th attached screenshot (Cascading waterfall with tour boat)
  // Page 5 (My Journey): 4th attached screenshot (Cascading waterfall with tour boat)
  // Additional pages: Cultural & natural wonder sanctuaries
  let currentBgImage = page1CherryWalkway;
  let bgLabel = 'Page 1: Cherry Blossom Walkway';

  if (currentPath.startsWith('/destinations')) {
    currentBgImage = page2MountainRiver;
    bgLabel = 'Page 2: Alpine Mountain Reflection in River';
  } else if (currentPath.startsWith('/experiences')) {
    currentBgImage = page3TropicalBeach;
    bgLabel = 'Page 3: Tropical Sunset Beach';
  } else if (currentPath.startsWith('/planner')) {
    currentBgImage = page4WaterfallBoat;
    bgLabel = 'Page 4: Cascading Waterfall & Tour Boat';
  } else if (currentPath.startsWith('/journey')) {
    currentBgImage = page4WaterfallBoat;
    bgLabel = 'Page 5: Cascading Waterfall & Tour Boat';
  } else if (currentPath.startsWith('/stories')) {
    currentBgImage = angkorSunrise;
    bgLabel = 'Cultural Stories: Ancient Heritage Sanctuary';
  } else if (currentPath.startsWith('/about') || currentPath.startsWith('/quiz')) {
    currentBgImage = lastPageAlpineFlowers;
    bgLabel = 'Last Page: Alpine Wildflower Valley & Mountain Sunset';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !particlesEnabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color palettes for autumn cherry blossom petals and golden maple leaves
    const colors = [
      'rgba(244, 180, 194, 0.85)', // soft cherry blossom pink
      'rgba(255, 192, 203, 0.75)', // rose petal
      'rgba(251, 191, 36, 0.80)',  // autumn amber leaf
      'rgba(245, 158, 11, 0.70)',  // warm golden maple
      'rgba(217, 119, 6, 0.65)',   // deep autumn ochre
      'rgba(253, 230, 138, 0.80)', // pale sunlit blossom
    ];

    const count = Math.min(Math.floor(width / 32), 45);
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedX: Math.random() * 1.2 + 0.4,
        speedY: Math.random() * 1.5 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.5 + 0.45,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.45 ? 'blossom' : 'leaf',
        oscillationAmplitude: Math.random() * 2 + 1,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationAngle: Math.random() * Math.PI * 2,
      });
    }

    const drawParticle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      if (p.type === 'blossom') {
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size * 0.8, p.size * 0.5, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      } else {
        ctx.moveTo(0, -p.size * 1.1);
        ctx.quadraticCurveTo(p.size * 0.7, -p.size * 0.2, p.size * 0.6, p.size * 0.6);
        ctx.quadraticCurveTo(0, p.size * 1.2, 0, p.size * 1.2);
        ctx.quadraticCurveTo(0, p.size * 1.2, -p.size * 0.6, p.size * 0.6);
        ctx.quadraticCurveTo(-p.size * 0.7, -p.size * 0.2, 0, -p.size * 1.1);
      }
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.oscillationAngle += p.oscillationSpeed;
        p.x += p.speedX + Math.sin(p.oscillationAngle) * p.oscillationAmplitude;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        }

        drawParticle(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particlesEnabled]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* 1. Page-Specific Cinematic Backdrop Image - Clearly Visible, Bright & Vibrant (No dark blackout or heavy blur) */}
      <div className="absolute inset-0 z-0 transition-all duration-700">
        <img
          key={currentBgImage}
          src={currentBgImage}
          alt={bgLabel}
          className="w-full h-full object-cover object-center scale-100 opacity-90 transition-opacity duration-500"
        />
        {/* Minimal soft tint only (no blacking out, no heavy dark shade) so images are clearly visible */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* 2. Falling Autumn Leaves & Cherry Blossom Petals Canvas */}
      {particlesEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 w-full h-full pointer-events-none opacity-90"
        />
      )}

      {/* 3. Floating particle toggle in bottom left */}
      <button
        onClick={() => setParticlesEnabled(!particlesEnabled)}
        className="fixed bottom-6 left-6 z-30 pointer-events-auto p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-amber-300 hover:text-amber-200 transition-all text-[10px] flex items-center gap-1.5 focus:outline-none shadow-xl"
        title={particlesEnabled ? 'Pause falling autumn drift' : 'Resume falling autumn drift'}
        aria-label="Toggle autumn particles animation"
      >
        <Wind className={`w-3.5 h-3.5 ${particlesEnabled ? 'animate-spin duration-3000' : 'opacity-40'}`} />
        <span className="hidden sm:inline font-mono font-medium">
          {particlesEnabled ? 'Autumn Drift On' : 'Autumn Drift Paused'}
        </span>
      </button>
    </div>
  );
};
