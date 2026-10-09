import React, { useState, useEffect, useRef } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS, EXPERIENCES } from '../data/travelData';
import { Search, X, MapPin, Compass, ArrowRight, Heart } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    closeSearch,
    navigate,
    toggleSaveDestination,
    isDestinationSaved,
    triggerRegionalSound,
  } = useJourney();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedDestinations = q
    ? DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.country.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          (d.indianState && d.indianState.toLowerCase().includes(q)) ||
          (d.wonderName && d.wonderName.toLowerCase().includes(q)) ||
          (q === 'india' && d.country.toLowerCase() === 'india') ||
          ((q.includes('wonder') || q.includes('wonders')) && (d.isWorldWonder || d.id === 'giza')) ||
          d.shortDescription.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q))
      )
    : DESTINATIONS.slice(0, 6);

  const matchedExperiences = q
    ? EXPERIENCES.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.destinationName.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    : EXPERIENCES.slice(0, 3);

  const handleSelect = (path: string) => {
    navigate(path);
    closeSearch();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeSearch}
    >
      <div
        className="w-full max-w-2xl bg-[#0D1525] border border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search destinations, experiences, moods (e.g. Iceland, Aurora, Kyoto)..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Search Chips */}
        {!query && (
          <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] uppercase font-semibold text-slate-500 font-display shrink-0">
              Popular:
            </span>
            {[
              'Seven Wonders',
              'Kerala',
              'Araku',
              'Ooty',
              'Coorg',
              'Manali',
              'Pondicherry',
              'Taj Mahal',
            ].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 text-[11px] whitespace-nowrap transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {/* Destinations */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5 px-2 font-display">
              {q ? 'Matching Destinations' : 'Suggested Destinations'}
            </div>
            {matchedDestinations.length === 0 ? (
              <p className="text-xs text-slate-500 px-2">No destinations found matching &quot;{query}&quot;.</p>
            ) : (
              <div className="space-y-1.5">
                {matchedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                    onClick={() => {
                      triggerRegionalSound(dest.id, dest.country, dest.region);
                      handleSelect(`/destinations/${dest.id}`);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                          <span>{dest.name}</span>
                          <span className="text-xs text-slate-400 font-normal">· {dest.country}</span>
                          {(dest.isWorldWonder || dest.id === 'giza') && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300">
                              Wonder
                            </span>
                          )}
                          {dest.isIndiaSpecial && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                              {dest.indianState}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5 line-clamp-1">
                          <MapPin className="w-3 h-3 text-amber-400/80 shrink-0" />
                          <span>{dest.region}</span>
                          <span>·</span>
                          {dest.priceINR && (
                            <>
                              <span className="text-amber-300 font-mono font-medium">{dest.priceINR}</span>
                              <span>·</span>
                            </>
                          )}
                          <span className="text-slate-500">{dest.bestSeason.split('(')[0].trim()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDestination(dest.id);
                        }}
                        aria-label="Save destination"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/10 transition-colors"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isDestinationSaved(dest.id) ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experiences */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2.5 px-2 font-display">
              {q ? 'Matching Experiences' : 'Curated Experiences'}
            </div>
            {matchedExperiences.length === 0 ? (
              <p className="text-xs text-slate-500 px-2">No experiences found matching &quot;{query}&quot;.</p>
            ) : (
              <div className="space-y-1.5">
                {matchedExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer"
                    onClick={() => {
                      triggerRegionalSound(exp.destinationId || exp.id, exp.country);
                      handleSelect(`/experiences/${exp.id}`);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                        <img
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                          {exp.title}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <Compass className="w-3 h-3 text-amber-400/80 shrink-0" />
                          <span>{exp.destinationName}</span>
                          <span>·</span>
                          <span>{exp.duration}</span>
                          <span>·</span>
                          <span className="text-amber-400 font-mono">★ {exp.rating}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search through all global journeys & expeditions</span>
          <button
            onClick={() => handleSelect('/destinations')}
            className="text-amber-400 hover:underline"
          >
            View all destinations →
          </button>
        </div>
      </div>
    </div>
  );
};
