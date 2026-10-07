import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS } from '../data/travelData';
import page4WaterfallBoat from '../assets/images/page4_waterfall_boat_1791218745015.jpg';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  CheckCircle2,
  BookmarkCheck,
  RotateCcw,
} from 'lucide-react';

export const TripPlannerPage: React.FC = () => {
  const { savePlannedTrip, navigate, triggerRegionalSound } = useJourney();

  // Step 1: Journey Type
  const [journeyType, setJourneyType] = useState<string>('Adventure');
  // Step 2: Destination
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('iceland');
  // Step 3: Duration
  const [duration, setDuration] = useState<string>('1 week');
  // Step 4: Travel Style
  const [travelStyle, setTravelStyle] = useState<string>('Premium');

  // Multi-step progress (1 to 4, then 5 is generated itinerary)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const journeyTypes = [
    { id: 'Adventure', icon: '🏔️', label: 'Adventure', desc: 'Glaciers, trails & active terrain' },
    { id: 'Relaxation', icon: '🌿', label: 'Relaxation', desc: 'Thermal spas & serene nature' },
    { id: 'Luxury', icon: '✨', label: 'Luxury', desc: 'Bespoke suites & private charters' },
    { id: 'Nature', icon: '🌲', label: 'Nature', desc: 'Fjords, wildlife & pristine skies' },
    { id: 'Culture', icon: '⛩️', label: 'Culture', desc: 'Centuries of heritage & temples' },
    { id: 'Food', icon: '🍷', label: 'Food & Wine', desc: 'Gastronomy & terroir tastings' },
    { id: 'Romance', icon: '🌅', label: 'Romance', desc: 'Caldera sunsets & candlelit intimacy' },
    { id: 'Solo', icon: '🧭', label: 'Solo Odyssey', desc: 'Mindful solitude & discovery' },
    { id: 'Road Trip', icon: '🚗', label: 'Road Trip', desc: 'Panoramic highways & epic vistas' },
  ];

  const durations = [
    { id: 'Weekend', label: 'Weekend Escape', days: 3 },
    { id: '3-5 days', label: '3–5 Days', days: 4 },
    { id: '1 week', label: '1 Week (7 Days)', days: 7 },
    { id: '2 weeks', label: '2 Weeks (14 Days)', days: 14 },
    { id: '1 month+', label: '1 Month+ Odyssey', days: 30 },
  ];

  const travelStyles = [
    { id: 'Budget', label: 'Value Conscious', desc: 'Authentic local stays & self-guided exploration' },
    { id: 'Comfortable', label: 'Comfortable', desc: 'Boutique lodges & hand-picked regional guides' },
    { id: 'Premium', label: 'Premium', desc: 'First-class transit, private guides & sublime views' },
    { id: 'Luxury', label: 'Ultra Luxury', desc: 'Exclusive villas, helicopter transfers & private chefs' },
  ];

  const targetDestination =
    DESTINATIONS.find((d) => d.id === selectedDestinationId) || DESTINATIONS[0];

  // Dynamic day generator tailored to selected destination and duration
  const generateItineraryDays = () => {
    const rawDays = targetDestination.suggestedItinerary;
    const count = duration === 'Weekend' ? 3 : duration === '3-5 days' ? 4 : 7;
    return rawDays.slice(0, count).map((item, idx) => ({
      day: `Day 0${idx + 1}`,
      title: item.title,
      desc: item.desc,
      completed: false,
    }));
  };

  const handleGenerate = () => {
    setIsGenerated(true);
    setCurrentStep(5);
  };

  const handleSaveJourney = () => {
    const days = generateItineraryDays();
    savePlannedTrip({
      destinationId: targetDestination.id,
      destinationName: targetDestination.name,
      title: `${duration} ${targetDestination.name} ${journeyType} Expedition`,
      durationDays: days.length,
      travelStyle,
      journeyType,
      days,
      notes: `Curated for ${travelStyle} travel style focusing on ${journeyType}.`,
    });
    setIsSaved(true);
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setIsGenerated(false);
    setIsSaved(false);
  };

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <Compass className="w-4 h-4" />
            <span>Generative Journey Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase">
            PLAN YOUR JOURNEY
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Answer four quick intuitive questions to synthesize a personalized, high-fidelity itinerary powered by our expedition intelligence.
          </p>
        </div>

        {/* Step Progression Bar (Micro-interaction) */}
        {!isGenerated && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
              <span>Step {currentStep} of 4</span>
              <span>
                {currentStep === 1
                  ? 'Theme'
                  : currentStep === 2
                  ? 'Destination'
                  : currentStep === 3
                  ? 'Duration'
                  : 'Travel Style'}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Interactive Step Content Container */}
        <div className="bg-[#0C1322] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* STEP 1: What kind of journey? */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400">Step 01</span>
                <h2 className="text-2xl font-display font-bold text-white">
                  What kind of journey are you dreaming about?
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {journeyTypes.map((item) => {
                  const isSelected = journeyType === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setJourneyType(item.id)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10'
                          : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div
                          className={`font-display font-bold text-sm ${
                            isSelected ? 'text-amber-300' : 'text-white'
                          }`}
                        >
                          {item.label}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
                >
                  <span>Next: Destination</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Where do you want to go? */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400">Step 02</span>
                <h2 className="text-2xl font-display font-bold text-white">
                  Where do you want to go?
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
                {DESTINATIONS.map((dest) => {
                  const isSelected = selectedDestinationId === dest.id;
                  return (
                    <div
                      key={dest.id}
                      onClick={() => {
                        setSelectedDestinationId(dest.id);
                        triggerRegionalSound(dest.id, dest.country, dest.region);
                      }}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 shadow-md'
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-display font-bold text-sm truncate ${
                            isSelected ? 'text-amber-300' : 'text-white'
                          }`}
                        >
                          {dest.name}
                        </div>
                        <div className="text-xs text-slate-400">{dest.country}</div>
                        <div className="text-[11px] text-amber-400/80 font-mono mt-0.5">
                          {dest.bestSeason.split('(')[0].trim()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-5 py-2.5 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
                >
                  <span>Next: Duration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: How long is your journey? */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400">Step 03</span>
                <h2 className="text-2xl font-display font-bold text-white">
                  How long is your journey?
                </h2>
              </div>

              <div className="space-y-3">
                {durations.map((dur) => {
                  const isSelected = duration === dur.id;
                  return (
                    <button
                      key={dur.id}
                      onClick={() => setDuration(dur.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400 text-white'
                          : 'bg-white/5 border-white/5 hover:border-white/20 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className={`w-5 h-5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                        <span className="font-display font-bold text-sm">{dur.label}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">~{dur.days} Days</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={() => setCurrentStep(4)}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
                >
                  <span>Next: Travel Style</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: What is your travel style? */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <span className="text-xs font-mono text-amber-400">Step 04</span>
                <h2 className="text-2xl font-display font-bold text-white">
                  What is your travel style?
                </h2>
              </div>

              <div className="space-y-3">
                {travelStyles.map((style) => {
                  const isSelected = travelStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      onClick={() => setTravelStyle(style.id)}
                      className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400'
                          : 'bg-white/5 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div
                          className={`font-display font-bold text-sm ${
                            isSelected ? 'text-amber-300' : 'text-white'
                          }`}
                        >
                          {style.label}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">{style.desc}</div>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {style.id === 'Budget' ? '$$' : style.id === 'Comfortable' ? '$$$' : style.id === 'Premium' ? '$$$$' : '$$$$$'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  onClick={handleGenerate}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider rounded-full shadow-xl shadow-amber-500/25 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>SYNTHESIZE ITINERARY</span>
                </button>
              </div>
            </div>
          )}

          {/* GENERATED ITINERARY VIEW */}
          {isGenerated && (
            <div className="space-y-8 animate-in zoom-in-95 duration-300">
              {/* Header result */}
              <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personalized Expedition Blueprint</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    YOUR {duration.toUpperCase()} {targetDestination.name.toUpperCase()} {journeyType.toUpperCase()} EXPEDITION
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <span>{targetDestination.country}</span>
                    <span>·</span>
                    <span>{travelStyle} Style</span>
                    <span>·</span>
                    <span>{targetDestination.bestSeason}</span>
                  </div>
                </div>

                <button
                  onClick={handleRestart}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs rounded-xl flex items-center gap-1.5 self-start sm:self-auto shrink-0 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Re-Plan</span>
                </button>
              </div>

              {/* Visual Timeline */}
              <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
                {generateItineraryDays().map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />
                    <div className="bg-[#0F172A] border border-white/10 hover:border-amber-400/40 p-4 rounded-2xl space-y-1 transition-colors">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-amber-400">{item.day}</span>
                        <span className="text-slate-600">·</span>
                        <h4 className="text-sm font-display font-bold text-white group-hover:text-amber-300">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Optimized for weather windows & daylight conservation</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleSaveJourney}
                    disabled={isSaved}
                    className={`w-full sm:w-auto px-6 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      isSaved
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                        : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
                    }`}
                  >
                    <BookmarkCheck className="w-4 h-4" />
                    <span>{isSaved ? 'SAVED TO MY JOURNEY' : 'SAVE MY JOURNEY'}</span>
                  </button>

                  {isSaved && (
                    <button
                      onClick={() => navigate('/journey')}
                      className="px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <span>View In Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
