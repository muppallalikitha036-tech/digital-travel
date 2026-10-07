import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS } from '../data/travelData';
import { Search, Heart, ArrowRight, SlidersHorizontal, RotateCcw, Volume2 } from 'lucide-react';

export const DestinationsPage: React.FC = () => {
  const { navigate, toggleSaveDestination, isDestinationSaved, triggerRegionalSound } = useJourney();

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const regions = ['all', 'Europe', 'Asia', 'South America', 'Oceania'];
  const tags = ['all', 'Pilgrimage', 'Culture', 'Adventure', 'Nature', 'Luxury', 'Photography', 'Road Trips', 'Wellness'];
  const budgets = ['all', 'Comfortable', 'Premium', 'Luxury'];
  const seasons = ['all', 'Winter', 'Spring', 'Summer', 'Autumn'];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }

    // Region
    if (selectedRegion !== 'all' && d.region !== selectedRegion) return false;

    // Tag (Adventure, Luxury, Nature, Culture, etc.)
    if (selectedTag !== 'all' && !d.tags.includes(selectedTag)) return false;

    // Budget
    if (selectedBudget !== 'all' && d.budgetLevel !== selectedBudget) return false;

    // Season
    if (selectedSeason !== 'all') {
      const s = selectedSeason.toLowerCase();
      if (!d.bestSeason.toLowerCase().includes(s)) return false;
    }

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('all');
    setSelectedTag('all');
    setSelectedBudget('all');
    setSelectedSeason('all');
  };

  const hasActiveFilters =
    searchQuery ||
    selectedRegion !== 'all' ||
    selectedTag !== 'all' ||
    selectedBudget !== 'all' ||
    selectedSeason !== 'all';

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <span>Global Portfolios</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
            WHERE WILL YOU GO NEXT?
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Filter through planetary sectors, terrain moods, and seasonal windows. Each destination has been curated for aesthetic depth and cultural resonance.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#0C1322] border border-white/10 rounded-3xl p-5 sm:p-6 mb-10 shadow-xl space-y-5">
          {/* Top Search Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by destination name, country, or landscape..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/80 transition-colors"
              />
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Interactive Tag & Category Selectors */}
          <div className="space-y-3 pt-2 border-t border-white/5">
            {/* Experience / Mood Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display shrink-0 w-16">
                Vibe:
              </span>
              <div className="flex items-center gap-1.5">
                {tags.map((t) => {
                  const active = selectedTag === t;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTag(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors focus:outline-none ${
                        active
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {t === 'all' ? 'All Vibes' : t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display shrink-0 w-16">
                Region:
              </span>
              <div className="flex items-center gap-1.5">
                {regions.map((r) => {
                  const active = selectedRegion === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setSelectedRegion(r)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus:outline-none ${
                        active
                          ? 'bg-white text-slate-950 font-bold shadow-sm'
                          : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {r === 'all' ? 'All Regions' : r}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Row: Budget & Season */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                  Budget Level:
                </span>
                <select
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  className="bg-[#10192A] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">Any Budget Tier</option>
                  <option value="Comfortable">Comfortable</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Ultra Luxury</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                  Ideal Season:
                </span>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="bg-[#10192A] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="all">Any Season</option>
                  <option value="Winter">Winter (Auroras & Snow)</option>
                  <option value="Spring">Spring (Cherry Blossoms & Thaw)</option>
                  <option value="Summer">Summer (Midnight Sun & Warmth)</option>
                  <option value="Autumn">Autumn (Foliage & Golden Hour)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>
            Showing <strong className="text-white font-mono">{filteredDestinations.length}</strong> of {DESTINATIONS.length} curated destinations
          </span>
        </div>

        {/* Dynamic Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4">
            <SlidersHorizontal className="w-8 h-8 text-amber-400 mx-auto opacity-60" />
            <h3 className="text-lg font-display font-bold text-white">
              No matching destinations found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try loosening your filters or resetting your parameters to explore our full global catalog.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-semibold text-xs rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
              >
                <div
                  className="relative h-64 overflow-hidden cursor-pointer"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-transparent to-transparent"></div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveDestination(dest.id);
                    }}
                    aria-label={`Save ${dest.name}`}
                    className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-white hover:text-rose-400 transition-colors focus:outline-none"
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
                    className="absolute bottom-3 right-4 px-2.5 py-1 bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-white/15 rounded-full text-[10px] font-mono backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md group-hover:scale-105"
                    title="Generate 6-second regional sound"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span className="font-semibold">6s Sound</span>
                  </button>

                  <div className="absolute bottom-3 left-4 text-xs font-mono text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                    {dest.bestSeason.split('(')[0].trim()}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h3
                        onClick={() => navigate(`/destinations/${dest.id}`)}
                        className="text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        {dest.name}
                      </h3>
                      <span className="text-xs text-slate-400">{dest.country}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {dest.shortDescription}
                    </p>

                    {/* Clean unboxed metadata with bullet separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                      <span>{dest.region}</span>
                      <span aria-hidden="true">·</span>
                      <span>{dest.budgetLevel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-400/90">{dest.tags[0]}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/destinations/${dest.id}`)}
                    className="w-full py-3 px-4 bg-white/5 group-hover:bg-amber-500 text-slate-200 group-hover:text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
