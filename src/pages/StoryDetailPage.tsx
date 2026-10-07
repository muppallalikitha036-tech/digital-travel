import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { TRAVEL_STORIES, DESTINATIONS } from '../data/travelData';
import { ArrowLeft, Clock, Calendar, ArrowRight, Compass } from 'lucide-react';

interface StoryDetailPageProps {
  storyId: string;
}

export const StoryDetailPage: React.FC<StoryDetailPageProps> = ({ storyId }) => {
  const { navigate } = useJourney();

  const story =
    TRAVEL_STORIES.find((s) => s.id === storyId) || TRAVEL_STORIES[0];

  const destination = DESTINATIONS.find((d) => d.id === story.destinationId);

  return (
    <article className="min-h-screen bg-[#070B12] text-slate-100 pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/stories')}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-amber-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Dispatches</span>
        </button>

        {/* Story Header */}
        <header className="space-y-4 mb-10">
          <div className="flex items-center gap-3 text-xs text-amber-400 font-mono">
            <span>{story.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {story.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1]">
            {story.title}
          </h1>

          <p className="text-lg sm:text-xl text-amber-200/90 font-medium leading-relaxed">
            {story.subtitle}
          </p>

          <div className="pt-4 flex items-center gap-3 text-xs text-slate-400 border-t border-white/10">
            <div>
              <span className="text-white font-semibold">{story.author}</span>
              <span className="text-slate-500"> — {story.authorRole}</span>
            </div>
          </div>
        </header>

        {/* Cinematic Lead Image */}
        <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl border border-white/10 max-h-[500px]">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Editorial Body Content */}
        <div className="prose prose-invert max-w-none space-y-10 text-slate-300 text-base sm:text-lg leading-relaxed font-light">
          {story.content.map((sec, idx) => (
            <div key={idx} className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white pt-2">
                {sec.heading}
              </h2>

              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}

              {sec.quote && (
                <blockquote className="my-8 pl-6 border-l-2 border-amber-400 font-display text-xl sm:text-2xl text-amber-200 italic leading-snug">
                  “{sec.quote}”
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {/* Associated Destination Card */}
        {destination && (
          <div className="mt-16 p-8 rounded-3xl bg-[#0D1525] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Featured Territory</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Experience {destination.name}
              </h3>
              <p className="text-xs text-slate-400 max-w-lg">
                Inspired by this dispatch? Access our complete expedition guide, regional routes, and seasonal forecasts.
              </p>
            </div>

            <button
              onClick={() => navigate(`/destinations/${destination.id}`)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full flex items-center gap-2 shrink-0 transition-all shadow-lg shadow-amber-500/20"
            >
              <span>Explore {destination.name}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
