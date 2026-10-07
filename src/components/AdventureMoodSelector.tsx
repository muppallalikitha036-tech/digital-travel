import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { ADVENTURE_MOODS, DESTINATIONS } from '../data/travelData';
import { Sparkles, ArrowRight, Heart, Volume2 } from 'lucide-react';

export const AdventureMoodSelector: React.FC = () => {
  const { navigate, toggleSaveDestination, isDestinationSaved, triggerRegionalSound } = useJourney();
  const [selectedMoodId, setSelectedMoodId] = useState<string>('conquer');

  const currentMood = ADVENTURE_MOODS.find((m) => m.id === selectedMoodId) || ADVENTURE_MOODS[0];

  const matchedDestinations = DESTINATIONS.filter((d) =>
    currentMood.matchedDestinations.includes(d.id)
  );

  return (
    <section className="py-20 bg-gradient-to-b from-[#070B12] via-[#0B1220] to-[#070B12] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resonant Frequency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            HOW DO YOU WANT TO FEEL?
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Travel begins with an emotional intention. Select an experiential vibration to manifest your next geographic alignment.
          </p>
        </div>

        {/* Mood Selection Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {ADVENTURE_MOODS.map((mood) => {
            const isSelected = selectedMoodId === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMoodId(mood.id)}
                className={`group relative p-4 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isSelected
                    ? 'bg-white/10 border-amber-400 shadow-xl shadow-amber-500/15 scale-105'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]'
                }`}
              >
                <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-110">
                  {mood.emoji}
                </span>
                <span className="font-display font-bold text-xs tracking-wider uppercase text-white">
                  {mood.label}
                </span>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Mood Atmosphere Strip */}
        <div className="text-center mb-10">
          <p className="text-amber-300 font-display text-lg sm:text-xl italic">
            “{currentMood.tagline}”
          </p>
        </div>

        {/* Dynamic Matched Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-[#0D1525] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 flex flex-col"
            >
              <div
                className="relative h-48 overflow-hidden cursor-pointer"
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1525] via-transparent to-transparent"></div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveDestination(dest.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white hover:text-rose-400 transition-colors"
                  aria-label={`Save ${dest.name}`}
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
                  className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-white/15 rounded-full text-[10px] font-mono backdrop-blur-md flex items-center gap-1 transition-all shadow-md group-hover:scale-105"
                  title="Generate 6-second regional sound"
                >
                  <Volume2 className="w-3 h-3" />
                  <span className="font-semibold">6s Sound</span>
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3
                      onClick={() => navigate(`/destinations/${dest.id}`)}
                      className="font-display font-bold text-lg text-white group-hover:text-amber-300 cursor-pointer"
                    >
                      {dest.name}
                    </h3>
                    <span className="text-xs text-slate-400">{dest.country}</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {dest.shortDescription}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-amber-400/90 font-mono">
                    {dest.bestSeason.split('(')[0].trim()}
                  </span>
                  <button
                    onClick={() => navigate(`/destinations/${dest.id}`)}
                    className="text-xs text-slate-200 group-hover:text-amber-400 font-semibold flex items-center gap-1"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
