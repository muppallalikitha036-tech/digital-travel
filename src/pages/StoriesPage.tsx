import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { TRAVEL_STORIES } from '../data/travelData';
import angkorSunrise from '../assets/images/angkor_wat_sunrise_1791214925554.jpg';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

export const StoriesPage: React.FC = () => {
  const { navigate } = useJourney();

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <BookOpen className="w-4 h-4" />
            <span>The Explorers' Gazette</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.08]">
            EVERY JOURNEY HAS A STORY.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Long-form essays, field notes, and photo journals authored by naturalists, alpinists, and cultural anthropologists from remote edges of the earth.
          </p>
        </div>

        {/* Flagship Featured Story */}
        {TRAVEL_STORIES[0] && (
          <div
            onClick={() => navigate(`/stories/${TRAVEL_STORIES[0].id}`)}
            className="group relative rounded-3xl overflow-hidden border border-white/10 hover:border-amber-400/40 bg-[#0C1322] cursor-pointer shadow-2xl transition-all duration-300 mb-14 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[340px] overflow-hidden">
              <img
                src={TRAVEL_STORIES[0].image}
                alt={TRAVEL_STORIES[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-transparent to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-amber-400 font-mono">
                  <span className="uppercase tracking-wider">Featured Dispatch</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {TRAVEL_STORIES[0].readTime}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                  {TRAVEL_STORIES[0].title}
                </h2>
                <p className="text-amber-300/90 text-sm font-medium">
                  {TRAVEL_STORIES[0].subtitle}
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {TRAVEL_STORIES[0].excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{TRAVEL_STORIES[0].author}</div>
                  <div className="text-[11px] text-slate-400">{TRAVEL_STORIES[0].authorRole}</div>
                </div>

                <span className="text-xs font-display font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                  <span>Read Full Essay</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Story Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRAVEL_STORIES.slice(1).map((story) => (
            <article
              key={story.id}
              onClick={() => navigate(`/stories/${story.id}`)}
              className="group bg-[#0A101E] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden shadow-xl cursor-pointer flex flex-col transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                  {story.readTime}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-amber-400 font-medium">
                    {story.subtitle}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {story.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span>By {story.author}</span>
                  <span className="text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read Dispatch <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
