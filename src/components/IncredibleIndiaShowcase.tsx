import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS } from '../data/travelData';
import {
  Compass,
  ArrowRight,
  Volume2,
  Calendar,
  Sparkles,
  MapPin,
  Coffee,
  Trees,
  Waves,
  Sun,
  ShieldCheck,
  Utensils,
  Train,
  CheckCircle2,
} from 'lucide-react';

export const IncredibleIndiaShowcase: React.FC = () => {
  const { navigate, triggerRegionalSound, toggleSaveDestination, isDestinationSaved } = useJourney();

  // Highlight all Indian tourism spots with emphasis on requested spots:
  // Kerala, Araku, Ooty, Coorg, Manali, Pondicherry + Taj Mahal, Varanasi, Ladakh
  const indiaSpotIds = [
    'kerala',
    'araku',
    'ooty',
    'coorg',
    'manali',
    'pondy',
    'taj-mahal',
    'varanasi',
    'ladakh',
  ];

  const indiaDestinations = DESTINATIONS.filter((d) => indiaSpotIds.includes(d.id));

  // Category filter for Indian spots
  const [filterCategory, setFilterCategory] = useState<'all' | 'hills' | 'coastal' | 'heritage'>('all');

  const filteredSpots = indiaDestinations.filter((d) => {
    if (filterCategory === 'hills') {
      return ['araku', 'ooty', 'coorg', 'manali', 'ladakh'].includes(d.id);
    }
    if (filterCategory === 'coastal') {
      return ['kerala', 'pondy'].includes(d.id);
    }
    if (filterCategory === 'heritage') {
      return ['taj-mahal', 'varanasi', 'pondy', 'kerala'].includes(d.id);
    }
    return true;
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Background Indian saffron-emerald warm gradient aura */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Incredible India Expedition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            TOURISM SPOTS ACROSS INDIA
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From the tranquil backwaters of <strong className="text-white">Kerala</strong> and the emerald coffee hills of <strong className="text-white">Araku Valley</strong>, to the misty peaks of <strong className="text-white">Ooty</strong>, fragrant plantations of <strong className="text-white">Coorg</strong>, snowcapped adventures of <strong className="text-white">Manali</strong>, and French colonial shores of <strong className="text-white">Pondicherry</strong>.
          </p>
        </div>

        {/* Category switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl shrink-0 self-start md:self-auto">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCategory === 'all'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            All 9 Spots
          </button>
          <button
            onClick={() => setFilterCategory('hills')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCategory === 'hills'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Hill Stations (Ooty, Coorg, Manali, Araku)
          </button>
          <button
            onClick={() => setFilterCategory('coastal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCategory === 'coastal'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Backwaters & Coast (Kerala, Pondy)
          </button>
          <button
            onClick={() => setFilterCategory('heritage')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              filterCategory === 'heritage'
                ? 'bg-amber-500 text-slate-950 font-bold shadow'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Heritage & Wonders
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredSpots.map((dest) => (
          <div
            key={dest.id}
            className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Visual Thumbnail */}
            <div
              className="relative h-64 w-full overflow-hidden bg-slate-900 cursor-pointer"
              onClick={() => {
                triggerRegionalSound(dest.id, dest.country, dest.region);
                navigate(`/destinations/${dest.id}`);
              }}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-transparent to-black/30" />

              {/* State & Wonder Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-1 bg-amber-500/95 text-slate-950 text-[11px] font-bold font-display uppercase tracking-wider rounded-lg shadow-md">
                  🇮🇳 {dest.indianState || 'India'}
                </span>
                {dest.isWorldWonder && (
                  <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-mono rounded-md">
                    ★ World Wonder
                  </span>
                )}
              </div>

              {/* 6s Regional Soundscape Trigger Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  triggerRegionalSound(dest.id, dest.country, dest.region);
                }}
                aria-label={`Play 6-second regional sound for ${dest.name}`}
                className="absolute bottom-3 right-4 px-2.5 py-1 bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-white/15 rounded-full text-[10px] font-mono backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md group-hover:scale-105"
                title="Hear authentic acoustic soundscape"
              >
                <Volume2 className="w-3 h-3" />
                <span className="font-semibold">6s Sound</span>
              </button>

              {/* Best Season */}
              <div className="absolute bottom-3 left-4 text-xs font-mono text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                {dest.bestSeason.split('(')[0].trim()}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h3
                    onClick={() => navigate(`/destinations/${dest.id}`)}
                    className="text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {dest.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{dest.climateType}</span>
                </div>

                <p className="text-xs text-amber-300/80 uppercase tracking-wider font-medium line-clamp-1">
                  {dest.headline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {dest.shortDescription}
                </p>

                {/* Regional highlights pill-less line */}
                {dest.food && dest.food.length > 0 && (
                  <div className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                    <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="line-clamp-1">
                      <strong className="text-slate-300">Food:</strong> {dest.food[0].split('(')[0].trim()}
                    </span>
                  </div>
                )}

                {/* Price in INR */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="text-slate-400">Package Estimate:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {dest.priceINR}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/destinations/${dest.id}`)}
                className="w-full py-3 px-4 bg-white/5 group-hover:bg-amber-500 text-slate-200 group-hover:text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Explore Itinerary & Weather</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
