import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import {
  Compass,
  Heart,
  Trash2,
  Share2,
  Calendar,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  Volume2,
} from 'lucide-react';

export const MyJourneyPage: React.FC = () => {
  const {
    savedDestinations,
    savedExperiences,
    plannedTrips,
    toggleSaveDestination,
    toggleSaveExperience,
    removePlannedTrip,
    toggleTripDayComplete,
    navigate,
    addToast,
    triggerRegionalSound,
  } = useJourney();

  const [activeTab, setActiveTab] = useState<'trips' | 'destinations' | 'experiences'>('trips');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    addToast('Expedition link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Share Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
              <Compass className="w-4 h-4" />
              <span>Personal Traveler Sanctuary</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight uppercase">
              YOUR JOURNEY
            </h1>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl">
              Your centralized expedition hub. Access your bespoke itineraries, saved geological horizons, and queued sensory experiences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShareModalOpen(true)}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-slate-200 hover:text-white flex items-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Share Journey</span>
            </button>

            <button
              onClick={() => navigate('/planner')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Plan New Trip</span>
            </button>
          </div>
        </div>

        {/* Dashboard Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('trips')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'trips'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Planned Itineraries</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === 'trips' ? 'bg-slate-950 text-amber-300' : 'bg-white/10 text-slate-400'
              }`}
            >
              {plannedTrips.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('destinations')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'destinations'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Saved Destinations</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === 'destinations' ? 'bg-slate-950 text-amber-300' : 'bg-white/10 text-slate-400'
              }`}
            >
              {savedDestinations.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('experiences')}
            className={`px-4 py-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider transition-colors flex items-center gap-2 ${
              activeTab === 'experiences'
                ? 'bg-amber-500 text-slate-950'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>Saved Experiences</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === 'experiences' ? 'bg-slate-950 text-amber-300' : 'bg-white/10 text-slate-400'
              }`}
            >
              {savedExperiences.length}
            </span>
          </button>
        </div>

        {/* TAB 1: PLANNED TRIPS */}
        {activeTab === 'trips' && (
          <div className="space-y-8">
            {plannedTrips.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4">
                <Calendar className="w-10 h-10 text-amber-400 mx-auto opacity-50" />
                <h3 className="text-xl font-display font-bold text-white">
                  No planned trips saved yet
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Use our interactive trip planner to synthesize custom timelines tailored to your rhythm and travel style.
                </p>
                <button
                  onClick={() => navigate('/planner')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all"
                >
                  Synthesize My First Journey
                </button>
              </div>
            ) : (
              plannedTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-[#0C1322] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                        <span>{trip.journeyType}</span>
                        <span>·</span>
                        <span>{trip.travelStyle} Style</span>
                        <span>·</span>
                        <span>{trip.durationDays} Days</span>
                      </div>
                      <h2 className="text-2xl font-display font-bold text-white">{trip.title}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/destinations/${trip.destinationId}`)}
                        className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-xs text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        <span>Destination Guide</span>
                        <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                      <button
                        onClick={() => removePlannedTrip(trip.id)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors"
                        title="Remove Trip"
                        aria-label="Remove trip"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Visual Journey Corridor Route Summary */}
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 font-display block mb-2">
                      Route Flow
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-200">
                      {trip.days.map((d, idx) => (
                        <React.Fragment key={idx}>
                          <span className="bg-[#111A2D] px-2.5 py-1 rounded-md border border-white/10">
                            {d.title.split('&')[0].trim()}
                          </span>
                          {idx < trip.days.length - 1 && (
                            <ArrowRight className="w-3 h-3 text-amber-400/70 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Day Checklist & Notes */}
                  <div className="space-y-3">
                    <span className="text-xs font-display font-bold text-slate-300">
                      Daily Timeline Checklist (Click to track progress)
                    </span>
                    <div className="space-y-2">
                      {trip.days.map((day, idx) => (
                        <div
                          key={idx}
                          onClick={() => toggleTripDayComplete(trip.id, idx)}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                            day.completed
                              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200 opacity-70'
                              : 'bg-[#10192A] border-white/5 hover:border-amber-400/30'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 text-amber-400 hover:text-amber-300 focus:outline-none"
                            aria-label={day.completed ? 'Mark day incomplete' : 'Mark day complete'}
                          >
                            {day.completed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-500" />
                            )}
                          </button>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-amber-400">
                                {day.day}
                              </span>
                              <span className="text-sm font-semibold text-white">
                                {day.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                              {day.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED DESTINATIONS */}
        {activeTab === 'destinations' && (
          <div>
            {savedDestinations.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4">
                <Heart className="w-10 h-10 text-rose-400 mx-auto opacity-50" />
                <h3 className="text-xl font-display font-bold text-white">
                  No saved destinations
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Explore our world portfolio and tap the heart icon on any destination to curate your personalized dream list.
                </p>
                <button
                  onClick={() => navigate('/destinations')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all"
                >
                  Browse Destinations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col"
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveDestination(dest.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-rose-400 hover:text-white transition-colors"
                        title="Remove from saved"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
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
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-baseline justify-between">
                          <h3
                            onClick={() => navigate(`/destinations/${dest.id}`)}
                            className="font-display font-bold text-lg text-white group-hover:text-amber-300 cursor-pointer"
                          >
                            {dest.name}
                          </h3>
                          <span className="text-xs text-slate-400">{dest.country}</span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {dest.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <span className="text-amber-400 font-mono">
                          {dest.bestSeason.split('(')[0].trim()}
                        </span>
                        <button
                          onClick={() => navigate(`/destinations/${dest.id}`)}
                          className="text-amber-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Open Guide</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED EXPERIENCES */}
        {activeTab === 'experiences' && (
          <div>
            {savedExperiences.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl p-8 space-y-4">
                <Compass className="w-10 h-10 text-amber-400 mx-auto opacity-50" />
                <h3 className="text-xl font-display font-bold text-white">
                  No saved experiences
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Browse our experience marketplace to discover high-fidelity adventures, aurora chases, and cultural deep dives.
                </p>
                <button
                  onClick={() => navigate('/experiences')}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all"
                >
                  Browse Experiences
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedExperiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col"
                  >
                    <div
                      className="relative h-48 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/experiences/${exp.id}`)}
                    >
                      <img
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveExperience(exp.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded-full text-rose-400 hover:text-white transition-colors"
                        title="Remove from saved"
                      >
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                      </button>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-xs text-amber-400 font-mono">{exp.destinationName}</div>
                        <h3
                          onClick={() => navigate(`/experiences/${exp.id}`)}
                          className="font-display font-bold text-lg text-white group-hover:text-amber-300 cursor-pointer"
                        >
                          {exp.title}
                        </h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                          {exp.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <span className="text-slate-400">{exp.duration}</span>
                        <button
                          onClick={() => navigate(`/experiences/${exp.id}`)}
                          className="text-amber-400 font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>View Experience</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setShareModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-[#0D1525] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Expedition Dispatch
              </span>
              <h3 className="text-xl font-display font-bold text-white">
                Share Your Journey Portfolio
              </h3>
              <p className="text-xs text-slate-400">
                Share this unique itinerary link with travel partners, companions, or concierge organizers.
              </p>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-2 text-xs font-mono text-slate-300">
              <span className="truncate">{window.location.href}</span>
              <button
                onClick={handleCopyShareLink}
                className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shrink-0"
                aria-label="Copy link"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShareModalOpen(false)}
                className="px-5 py-2.5 bg-white/10 text-slate-200 hover:text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
