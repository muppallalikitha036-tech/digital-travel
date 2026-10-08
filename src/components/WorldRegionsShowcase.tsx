import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { REGIONS_DATA, RegionInfo } from '../data/travelData';
import {
  Compass,
  Volume2,
  Sparkles,
  ArrowRight,
  Plane,
  Building,
  MapPin,
  Calendar,
  CheckCircle2,
  Info,
} from 'lucide-react';

export const WorldRegionsShowcase: React.FC = () => {
  const { navigate, triggerRegionalSound, activeRegionalSound } = useJourney();
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [selectedCurrencyHint, setSelectedCurrencyHint] = useState<string>('INR');

  const handleMouseEnter = (region: RegionInfo) => {
    setHoveredRegionId(region.id);
    // Play authentic 6-second regional sound effect on mouse hover
    triggerRegionalSound(region.audioId, region.country, region.name);
  };

  const handleMouseLeave = () => {
    setHoveredRegionId(null);
  };

  const handleExploreRegion = (region: RegionInfo) => {
    triggerRegionalSound(region.audioId, region.country, region.name);
    navigate(`/destinations?region=${encodeURIComponent(region.id)}`);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="relative text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-semibold uppercase tracking-widest font-display">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Regional Expeditions & Live Soundscapes</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight uppercase text-balance">
          EXPLORE BY REGIONS ·{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
            REAL INDIAN CURRENCY
          </span>
        </h2>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Hover over any region thumbnail to hear its <span className="text-amber-300 font-semibold">authentic 6-second environmental soundscape</span>. Real transparent package and flight estimates in Indian Rupees (<span className="text-amber-300 font-semibold font-mono">₹ INR</span>) for travelers departing from India.
        </p>

        {/* Live Audio & Currency Indicator HUD */}
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md text-xs font-mono text-slate-300 mt-2">
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>Hover Thumbnail = Instant Audio</span>
          </div>
          <span className="text-white/20">|</span>
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Currency: Indian Rupee (₹ INR)</span>
          </div>
        </div>
      </div>

      {/* Regional Thumbnails Grid - 6 Distinct Regions with Unique Scenery & Audio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {REGIONS_DATA.map((region) => {
          const isHovered = hoveredRegionId === region.id;
          const isAudioPlaying = activeRegionalSound?.placeId === region.audioId;

          return (
            <div
              key={region.id}
              onMouseEnter={() => handleMouseEnter(region)}
              onMouseLeave={handleMouseLeave}
              className={`group relative bg-[#0B111E] border rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
                isHovered
                  ? 'border-amber-400/60 shadow-amber-500/15 -translate-y-1.5 scale-[1.01]'
                  : 'border-white/10 hover:border-amber-400/40 shadow-black/60'
              }`}
            >
              {/* Distinct Scenery Thumbnail Container */}
              <div
                className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => handleExploreRegion(region)}
              >
                {/* 100% Unique Scenery Image */}
                <img
                  src={region.sceneryImage}
                  alt={`${region.name} - ${region.scenerySiteName}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                {/* Dark Vignette & Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B111E] via-[#0B111E]/30 to-black/40" />

                {/* Top Badge: Region Name & Edition Tag */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white font-display text-xs font-bold tracking-wider uppercase">
                    {region.name}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-mono text-[10px] font-extrabold uppercase shadow-sm">
                    {region.badge}
                  </span>
                </div>

                {/* Top Right: Sound Effect Active Visualizer Badge */}
                <div
                  className={`absolute top-3.5 right-3.5 px-3 py-1 rounded-full backdrop-blur-md border text-xs font-mono flex items-center gap-1.5 transition-all ${
                    isAudioPlaying
                      ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold shadow-lg shadow-amber-500/40 scale-105'
                      : 'bg-black/60 text-amber-300 border-white/20 hover:bg-black/80'
                  }`}
                  title="Hover to hear authentic 6-second regional soundscape"
                >
                  <Volume2
                    className={`w-3.5 h-3.5 ${
                      isAudioPlaying ? 'animate-bounce text-slate-950' : 'text-amber-400'
                    }`}
                  />
                  <span>{isAudioPlaying ? 'Playing Audio' : '6s Sound'}</span>
                  {isAudioPlaying && (
                    <span className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 h-3 bg-slate-950 rounded-full animate-pulse" />
                      <span className="w-1 h-2 bg-slate-950 rounded-full animate-ping" />
                      <span className="w-1 h-3.5 bg-slate-950 rounded-full animate-pulse" />
                    </span>
                  )}
                </div>

                {/* Scenery Site Tag on Thumbnail */}
                <div className="absolute bottom-20 left-3.5 right-3.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[11px] text-amber-200 font-mono font-medium truncate max-w-full">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{region.scenerySiteName}</span>
                  </div>
                </div>

                {/* REAL INDIAN CURRENCY PRICE BADGE - Boldly on the Thumbnail */}
                <div className="absolute bottom-3 left-3.5 right-3.5 p-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-amber-400/40 shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-medium">
                      Real Starting Price
                    </div>
                    <div className="text-xl sm:text-2xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                      {region.priceINR}
                      <span className="text-xs text-slate-300 font-normal ml-1">/ person</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                      <span>₹ INR Matrix</span>
                    </span>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {region.destinationCount} Signature Sites
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Headline & Countries */}
                  <div>
                    <h3
                      onClick={() => handleExploreRegion(region)}
                      className="text-lg font-display font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      {region.headline}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {region.country}
                    </p>
                  </div>

                  {/* Real Indian Rupee Breakdown Box */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Plane className="w-3.5 h-3.5 text-amber-400" />
                        <span>Round-trip flights:</span>
                      </span>
                      <span className="text-amber-300 font-semibold">{region.flightEstimateINR}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Building className="w-3.5 h-3.5 text-amber-400" />
                        <span>Daily stay & dining:</span>
                      </span>
                      <span className="text-slate-200">{region.dailyExpenseINR}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-white/5 text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>Best weather:</span>
                      </span>
                      <span className="text-slate-300">{region.bestMonths}</span>
                    </div>
                  </div>

                  {/* Signature Destinations Pills */}
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                      Signature Sanctuaries:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {region.signatureDestinations.map((dest) => (
                        <span
                          key={dest}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-slate-300 font-medium"
                        >
                          {dest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action: Explore Region */}
                <div className="pt-2">
                  <button
                    onClick={() => handleExploreRegion(region)}
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500/15 via-amber-500/25 to-amber-500/15 hover:from-amber-500 hover:to-amber-400 border border-amber-400/40 hover:border-amber-400 text-amber-300 hover:text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-md active:scale-98"
                  >
                    <span>EXPLORE {region.name.toUpperCase()} SANCTUARIES</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
