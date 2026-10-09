import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS } from '../data/travelData';
import { Globe, MapPin, ArrowRight, Heart, Volume2 } from 'lucide-react';

export const InteractiveGlobe: React.FC = () => {
  const { navigate, toggleSaveDestination, isDestinationSaved, triggerRegionalSound } = useJourney();
  const [selectedRegion, setSelectedRegion] = useState<string>('Asia');

  const regions = [
    { id: 'Asia', label: 'Asia', coords: '25°N 82°E', count: 6, highlight: 'Sacred Ganges ghats, Himalayan monasteries, Zen temples & Angkor spires' },
    { id: 'Europe', label: 'Europe', coords: '48°N 15°E', count: 3, highlight: 'Alpine summits, volcanic calderas & Arctic auroras' },
    { id: 'Africa', label: 'Africa', coords: '1°S 37°E', count: 2, highlight: 'Serengeti Great Migration & 4,500-year-old Great Pyramids of Giza' },
    { id: 'North America', label: 'North America', coords: '51°N 115°W', count: 1, highlight: 'Banff turquoise glacial lakes & towering Canadian Rocky summits' },
    { id: 'South America', label: 'South America', coords: '13°S 72°W', count: 2, highlight: 'Machu Picchu Inca cloud citadel & Patagonian granite spires' },
    { id: 'Oceania', label: 'Oceania', coords: '16°S 145°E', count: 2, highlight: 'Great Barrier Reef living corals & New Zealand glacial fjords' },
    { id: 'Antarctica', label: 'Antarctica', coords: '64°S 62°W', count: 1, highlight: 'Seventh Continent: Lemaire Channel, calving icebergs & gentoo penguins' },
  ];

  const filteredDestinations = DESTINATIONS.filter(
    (d) => selectedRegion === 'all' || d.region === selectedRegion
  );

  return (
    <div className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
          <Globe className="w-4 h-4" />
          <span>Planetary Cartography</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
          THE WORLD, AT YOUR FINGERTIPS.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Navigate continents through our interactive digital coordinates. Select a region to reveal signature expeditions and remote geological frontiers.
        </p>
      </div>

      {/* Stylized Interactive Map Projection Canvas */}
      <div className="relative bg-[#0A101D] border border-white/10 rounded-3xl p-6 lg:p-10 overflow-hidden shadow-2xl">
        {/* Subtle background coordinate grid */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]"></div>

        {/* Region Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 relative z-10">
          {regions.map((reg) => {
            const isSelected = selectedRegion === reg.id;
            return (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{reg.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-slate-950 text-amber-300' : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {reg.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Region Synopsis Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 mb-8 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-display font-semibold text-sm flex items-center gap-2">
                <span>{selectedRegion} Sector</span>
                <span className="text-xs font-mono text-amber-400/80">
                  {regions.find((r) => r.id === selectedRegion)?.coords}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {regions.find((r) => r.id === selectedRegion)?.highlight}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/destinations')}
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 shrink-0"
          >
            <span>Explore All Coordinates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Dynamic Destinations Grid for Selected Region */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative bg-[#0F172A]/70 hover:bg-[#131E35] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Subtle Zoom */}
              <div
                className="relative h-52 w-full overflow-hidden bg-slate-900 cursor-pointer"
                onClick={() => {
                  triggerRegionalSound(dest.id, dest.country, dest.region);
                  navigate(`/destinations/${dest.id}`);
                }}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent"></div>

                {/* Save Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveDestination(dest.id);
                  }}
                  aria-label={`Save ${dest.name}`}
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white hover:text-rose-400 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isDestinationSaved(dest.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>

                {/* 6s Regional Soundscape Trigger Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerRegionalSound(dest.id, dest.country, dest.region);
                  }}
                  aria-label={`Play 6-second soundscape for ${dest.name}`}
                  className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-white/15 rounded-full text-[10px] font-mono backdrop-blur-md flex items-center gap-1 transition-all shadow-md group-hover:scale-105"
                  title="Generate 6-second regional sound"
                >
                  <Volume2 className="w-3 h-3" />
                  <span className="font-semibold">6s Sound</span>
                </button>

                {/* Best Season Tagline */}
                <div className="absolute bottom-3 left-4 text-xs font-mono text-amber-300/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  {dest.bestSeason.split('(')[0].trim()}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <h3
                      onClick={() => navigate(`/destinations/${dest.id}`)}
                      className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      {dest.name}
                    </h3>
                    <span className="text-xs text-slate-400">{dest.country}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {dest.shortDescription}
                  </p>

                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <span>{dest.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-300 font-mono font-semibold">{dest.priceINR}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-amber-400/90">{dest.tags[0]}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-200 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 group-hover:bg-amber-500 group-hover:text-slate-950"
                >
                  <span>Explore Destination</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
