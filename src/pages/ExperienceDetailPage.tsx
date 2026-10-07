import React, { useEffect } from 'react';
import { useJourney } from '../context/JourneyContext';
import { EXPERIENCES, DESTINATIONS } from '../data/travelData';
import {
  Heart,
  Sparkles,
  Clock,
  Zap,
  Calendar,
  MapPin,
  Star,
  CheckCircle2,
  Backpack,
  ArrowLeft,
  ArrowRight,
  Volume2,
} from 'lucide-react';

interface ExperienceDetailPageProps {
  experienceId: string;
}

export const ExperienceDetailPage: React.FC<ExperienceDetailPageProps> = ({ experienceId }) => {
  const {
    navigate,
    toggleSaveExperience,
    isExperienceSaved,
    setChatContext,
    triggerChatWithPrompt,
    triggerRegionalSound,
  } = useJourney();

  const experience =
    EXPERIENCES.find((e) => e.id === experienceId) || EXPERIENCES[0];

  const parentDestination = DESTINATIONS.find((d) => d.id === experience.destinationId);

  // Set chat context when entering this experience
  useEffect(() => {
    setChatContext({
      experience,
      destination: parentDestination,
      pageName: `Experience: ${experience.title}`,
    });
    return () => setChatContext(null);
  }, [experience, parentDestination]);

  const isSaved = isExperienceSaved(experience.id);

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100">
      {/* 1. Cinematic Hero */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src={experience.image}
            alt={experience.title}
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B12]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <button
            onClick={() => navigate('/experiences')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-amber-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Experiences</span>
          </button>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-display font-semibold uppercase tracking-widest">
                {experience.category}
              </span>
              <span className="text-xs text-slate-300 font-mono flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {experience.location}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-amber-400 font-mono flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {experience.rating} ({experience.reviewsCount} reviews)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.08]">
              {experience.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-light">
              {experience.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => toggleSaveExperience(experience.id)}
                className={`px-6 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 focus:outline-none ${
                  isSaved
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                <span>{isSaved ? 'EXPERIENCE SAVED IN MY JOURNEY' : 'ADD EXPERIENCE TO MY JOURNEY'}</span>
              </button>

              <button
                onClick={() => triggerRegionalSound(experience.destinationId || experience.id, experience.country)}
                className="px-5 py-3.5 bg-black/60 hover:bg-black/90 border border-amber-400/40 text-amber-300 rounded-full font-display font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 hover:scale-105 shadow-xl"
                title="Play 6-second regional soundscape"
              >
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Play 6s Soundscape</span>
              </button>

              <button
                onClick={() =>
                  triggerChatWithPrompt(
                    `Give me the full breakdown for "${experience.title}" in ${experience.destinationName}. What should I know before going?`,
                    { experience, destination: parentDestination }
                  )
                }
                className="px-6 py-3.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-200 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>ASK AI ABOUT THIS EXPERIENCE</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="border-y border-white/10 bg-[#0B1220] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Duration
              </div>
              <div className="text-xs text-white font-medium">{experience.duration}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Intensity
              </div>
              <div className="text-xs text-white font-medium">{experience.difficulty}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Optimal Window
              </div>
              <div className="text-xs text-white font-medium">{experience.bestSeason}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Base Camp
              </div>
              <div className="text-xs text-white font-medium">{experience.country}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What You'll Experience & Recommended Gear */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* What You'll Experience */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
                The Program
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                WHAT YOU WILL EXPERIENCE
              </h2>
            </div>

            <div className="space-y-4">
              {experience.whatYouWillExperience.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0D1525] border border-white/5"
                >
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Equipment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
                Expedition Prep
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight flex items-center gap-2">
                <Backpack className="w-6 h-6 text-amber-400" />
                <span>REQUIRED GEAR</span>
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-[#0C1322] border border-white/10 space-y-3">
              <p className="text-xs text-slate-400 mb-4">
                Our expedition leaders verify all gear prior to departure to ensure safety in unpredictable frontier weather.
              </p>
              <ul className="space-y-2.5">
                {experience.recommendedEquipment.map((eq, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Suggested Itinerary / Timeline */}
      <section className="py-20 bg-[#0A101E] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
              Chronological Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              EXPEDITION TIMELINE
            </h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8 max-w-3xl">
            {experience.suggestedItinerary.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />
                <div className="bg-[#0C1322] border border-white/10 p-4 rounded-xl space-y-1">
                  <div className="text-xs font-mono font-bold text-amber-400">{step.time}</div>
                  <p className="text-xs sm:text-sm text-slate-200">{step.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Parent Destination Reference */}
      {parentDestination && (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0E1526] to-[#121B2F] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Host Destination
              </span>
              <h3 className="text-2xl font-display font-bold text-white">
                Part of the {parentDestination.name} Expedition
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                Explore the complete regional guide for {parentDestination.name}, including local food, multi-day routes, and climate intelligence.
              </p>
            </div>

            <button
              onClick={() => navigate(`/destinations/${parentDestination.id}`)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shrink-0 transition-all"
            >
              <span>View {parentDestination.name} Guide</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
