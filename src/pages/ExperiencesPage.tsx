import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { EXPERIENCES } from '../data/travelData';
import { Compass, Heart, ArrowRight, Star, Clock, Zap, Volume2 } from 'lucide-react';

export const ExperiencesPage: React.FC = () => {
  const { navigate, toggleSaveExperience, isExperienceSaved, triggerRegionalSound } = useJourney();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const categories = [
    'all',
    'Pilgrimage',
    'Culture',
    'Adventure',
    'Nature',
    'Food',
    'Wellness',
    'Luxury',
    'Photography',
    'Road Trips',
  ];

  const filteredExperiences = EXPERIENCES.filter((exp) => {
    if (selectedCategory !== 'all' && exp.category !== selectedCategory) return false;
    if (selectedDifficulty !== 'all' && exp.difficulty !== selectedDifficulty) return false;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <Compass className="w-4 h-4" />
            <span>Curated Sensory Expeditions</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.08]">
            DON’T JUST VISIT.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
              EXPERIENCE.
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Move beyond passive sightseeing into high-fidelity encounters. Private aurora hunts, subterranean ice treks, ancient Zen tea masterclasses, and nomadic desert star vigils.
          </p>
        </div>

        {/* Category Controls Bar */}
        <div className="bg-[#0C1322] border border-white/10 rounded-2xl p-4 sm:p-5 mb-10 shadow-xl space-y-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display shrink-0 w-20">
              Category:
            </span>
            <div className="flex items-center gap-1.5">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors focus:outline-none ${
                      active
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {cat === 'all' ? 'All Experiences' : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Difficulty selector */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display shrink-0 w-20">
              Intensity:
            </span>
            <div className="flex items-center gap-1.5">
              {['all', 'Gentle', 'Moderate', 'Demanding'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-md text-xs transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-white text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff === 'all' ? 'Any Intensity' : diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image & Badges */}
              <div
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => {
                  triggerRegionalSound(exp.destinationId || exp.id, exp.country);
                  navigate(`/experiences/${exp.id}`);
                }}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-transparent to-black/30"></div>

                {/* Save Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSaveExperience(exp.id);
                  }}
                  aria-label={`Save ${exp.title}`}
                  className="absolute top-4 right-4 p-2.5 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-white hover:text-rose-400 transition-colors focus:outline-none"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isExperienceSaved(exp.id) ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>

                {/* 6s Regional Soundscape Trigger Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerRegionalSound(exp.destinationId || exp.id, exp.country);
                  }}
                  aria-label={`Play 6-second soundscape for ${exp.title}`}
                  className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-white/15 rounded-full text-[10px] font-mono backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md group-hover:scale-105"
                  title="Generate 6-second regional sound"
                >
                  <Volume2 className="w-3 h-3" />
                  <span className="font-semibold">6s Sound</span>
                </button>

                {/* Rating & Category Chips */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-mono text-amber-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{exp.rating}</span>
                    <span className="text-slate-400 font-normal">({exp.reviewsCount})</span>
                  </div>
                  <div className="text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    {exp.priceIndicator}
                  </div>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs text-amber-400/90 font-mono font-medium">
                    {exp.location} · {exp.country}
                  </div>

                  <h3
                    onClick={() => navigate(`/experiences/${exp.id}`)}
                    className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Clean unboxed metadata with bullet separators */}
                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.duration}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>{exp.difficulty}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{exp.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/experiences/${exp.id}`)}
                  className="w-full py-3 px-4 bg-white/5 group-hover:bg-amber-500 text-slate-200 group-hover:text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <span>Explore Experience</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
