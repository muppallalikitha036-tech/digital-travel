import React from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS, TRAVEL_STORIES } from '../data/travelData';
import { InteractiveGlobe } from '../components/InteractiveGlobe';
import { AdventureMoodSelector } from '../components/AdventureMoodSelector';
import { AutumnBlossomVideoHero } from '../components/AutumnBlossomVideoHero';
import { Compass, ArrowRight, Heart, Sparkles, BookOpen, ShieldCheck, Star, Volume2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate, toggleSaveDestination, isDestinationSaved, triggerRegionalSound } = useJourney();

  const featuredDestinations = DESTINATIONS.slice(0, 6);

  return (
    <div className="min-h-screen bg-transparent text-slate-100 selection:bg-amber-400/20">
      {/* 1. Cinematic Hero Section with Autumn Cherry Blossom Leaves Falling Video Background */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Autumn Cherry Blossom Trees & Falling Foliage Video Atmosphere */}
        <AutumnBlossomVideoHero />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6 animate-in fade-in slide-in-from-top-4 duration-500 font-display">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Travel Reimagined · 2026 Edition</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase max-w-4xl text-balance leading-[1.08] mb-6">
            THE WORLD IS WAITING.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              REIMAGINE HOW YOU EXPLORE IT.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl text-balance leading-relaxed mb-10 font-normal">
            Discover destinations differently. Experience journeys digitally. Create adventures that feel uniquely yours.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/destinations')}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-display font-extrabold text-xs tracking-wider uppercase rounded-full shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>EXPLORE THE WORLD</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/planner')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-display font-bold text-xs tracking-wider uppercase rounded-full hover:border-amber-400/50 transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>BUILD MY JOURNEY</span>
            </button>
          </div>

          {/* Subtle Animated Scroll Indicator */}
          <div className="mt-16 flex flex-col items-center gap-2 text-slate-400 text-xs tracking-widest font-mono uppercase animate-bounce">
            <span>SCROLL TO EXPLORE ↓</span>
          </div>
        </div>
      </section>

      {/* 2. Immersive Discover Section: "YOUR NEXT ADVENTURE IS CLOSER THAN YOU THINK" */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
              Curated Expeditions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
              YOUR NEXT ADVENTURE IS CLOSER THAN YOU THINK.
            </h2>
          </div>
          <button
            onClick={() => navigate('/destinations')}
            className="text-xs uppercase tracking-wider font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 shrink-0 self-start md:self-auto"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image & Badges */}
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-transparent to-black/30"></div>

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

                {/* Best Season */}
                <div className="absolute bottom-3 left-4 text-xs font-mono text-amber-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                  {dest.bestSeason.split('(')[0].trim()}
                </div>
              </div>

              {/* Card Details */}
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

                  {/* Clean unboxed metadata with typographic bullet separators (Zero-Pill rule) */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 pt-1">
                    <span>{dest.region}</span>
                    <span aria-hidden="true">·</span>
                    <span>{dest.budgetLevel}</span>
                    <span aria-hidden="true">·</span>
                    {dest.tags.slice(0, 2).map((t, idx) => (
                      <React.Fragment key={t}>
                        <span className="text-amber-400/90">{t}</span>
                        {idx === 0 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Explore Button */}
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
      </section>

      {/* 3. "HOW DO YOU WANT TO FEEL?" Section */}
      <AdventureMoodSelector />

      {/* 4. "THE WORLD, AT YOUR FINGERTIPS." Section */}
      <InteractiveGlobe />

      {/* 5. Editorial Stories Section: "EVERY JOURNEY HAS A STORY" */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
              Editorial Dispatches
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight text-balance">
              EVERY JOURNEY HAS A STORY.
            </h2>
          </div>
          <button
            onClick={() => navigate('/stories')}
            className="text-xs uppercase tracking-wider font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 shrink-0 self-start md:self-auto"
          >
            <span>Read All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TRAVEL_STORIES.map((story) => (
            <article
              key={story.id}
              onClick={() => navigate(`/stories/${story.id}`)}
              className="group bg-[#0A101E] border border-white/10 hover:border-amber-400/40 rounded-3xl overflow-hidden shadow-xl cursor-pointer flex flex-col transition-all duration-300"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A101E] via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                  {story.readTime}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium">
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
      </section>

      {/* 6. Travel Quiz Banner Section: "FIND YOUR PERFECT DESTINATION" */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#111A2E] via-[#0E1526] to-[#18233C] border border-amber-400/30 p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
              <BookOpen className="w-4 h-4" />
              <span>Interactive Travel Alignment</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              FIND YOUR PERFECT DESTINATION.
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Take our 6-question intuitive travel personality quiz. Our engine evaluates your preferred horizons, sensory rhythms, and sanctuary aesthetics to pinpoint your optimal coordinates.
            </p>
          </div>

          <button
            onClick={() => navigate('/quiz')}
            className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display font-extrabold text-xs tracking-wider uppercase rounded-full shadow-xl shadow-amber-500/25 shrink-0 hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>BEGIN TRAVEL QUIZ</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 7. Proof & Regenerative Travel Standards (Claim-to-Proof Adjacency) */}
      <section className="py-20 border-t border-white/10 bg-[#070B12]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-white">
                100% Regenerative Footprint
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every booked expedition invests 5% directly into local conservation reserves, wildlife corridors, and indigenous alpine stewardship programs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-white">
                Adaptive AI Co-Pilot
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                WanderAI updates packing checklists, seasonal meteorological radars, and daylight solar windows in real time throughout your journey.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-white">
                98.4% Exceptional Rating
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Validated by over 2,400 independent luxury and expedition travelers across 14 high-latitude and tropical destinations in 2025–2026.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
