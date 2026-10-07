import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import lastPageAlpineFlowers from '../assets/images/last_page_alpine_flowers_1791222007983.jpg';
import {
  TRAVEL_QUIZ_QUESTIONS,
  PERSONALITIES,
  DESTINATIONS,
} from '../data/travelData';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Heart,
  Compass,
} from 'lucide-react';

export const TravelQuizPage: React.FC = () => {
  const { navigate, toggleSaveDestination, isDestinationSaved } = useJourney();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = TRAVEL_QUIZ_QUESTIONS[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / TRAVEL_QUIZ_QUESTIONS.length) * 100;

  const handleSelectOption = (trait: string) => {
    const updated = [...answers, trait];
    setAnswers(updated);

    if (currentQuestionIndex + 1 < TRAVEL_QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate dominant personality trait
  const calculateResult = () => {
    const counts: Record<string, number> = { mountain: 0, ocean: 0, culture: 0, sacred: 0 };
    answers.forEach((trait) => {
      if (counts[trait] !== undefined) counts[trait]++;
    });

    let topTrait = 'sacred';
    let maxCount = -1;
    Object.entries(counts).forEach(([trait, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topTrait = trait;
      }
    });

    return (PERSONALITIES as any)[topTrait] || PERSONALITIES.sacred;
  };

  const result = isCompleted ? calculateResult() : null;
  const recommendedDestinations = result
    ? DESTINATIONS.filter((d) => result.recommendedDestinationIds.includes(d.id))
    : [];

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100">
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-display">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Harmonic Alignment Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase drop-shadow-md">
            FIND YOUR PERFECT DESTINATION
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed drop-shadow-sm">
            Travel resonates differently with each traveler&apos;s inner frequency. Answer 6 sensory inquiries to reveal your travel archetype.
          </p>
        </div>

        {!isCompleted ? (
          <div className="bg-[#090F1C]/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-slate-400">
                <span>
                  Question {currentQuestionIndex + 1} of {TRAVEL_QUIZ_QUESTIONS.length}
                </span>
                <span>{Math.round(progressPercent)}% Alignment</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Current Question */}
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white leading-snug">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.trait)}
                    className="w-full p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-amber-500/15 border border-white/5 hover:border-amber-400/50 text-left transition-all duration-200 flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <span className="text-xs sm:text-sm text-slate-200 group-hover:text-amber-200 font-medium">
                      {opt.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Back Button */}
            {currentQuestionIndex > 0 && (
              <div className="pt-2">
                <button
                  onClick={handleBack}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Question</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* RESULT VIEW */
          <div className="bg-[#0C1322] border border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-400">
            <div className="text-center space-y-3 border-b border-white/10 pb-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Your Travel Personality Alignment</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white uppercase tracking-tight">
                {result?.title}
              </h2>
              <p className="text-amber-300 font-display text-base sm:text-lg italic">
                “{result?.tagline}”
              </p>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                {result?.description}
              </p>
            </div>

            {/* Recommended Destinations Grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 font-display">
                Recommended Expeditions for Your Archetype
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recommendedDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className="group bg-[#070B12] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden shadow-lg transition-all flex flex-col"
                  >
                    <div
                      className="relative h-40 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/destinations/${dest.id}`)}
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
                        className="absolute top-2.5 right-2.5 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-rose-400 transition-colors"
                        aria-label={`Save ${dest.name}`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            isDestinationSaved(dest.id) ? 'fill-rose-500 text-rose-500' : ''
                          }`}
                        />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h4
                          onClick={() => navigate(`/destinations/${dest.id}`)}
                          className="font-display font-bold text-base text-white group-hover:text-amber-300 cursor-pointer"
                        >
                          {dest.name}
                        </h4>
                        <p className="text-xs text-slate-400">{dest.country}</p>
                      </div>

                      <button
                        onClick={() => navigate(`/destinations/${dest.id}`)}
                        className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1 pt-1"
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={() => navigate('/destinations')}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE MY MATCHES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
