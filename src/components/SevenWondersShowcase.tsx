import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS } from '../data/travelData';
import {
  Landmark,
  ArrowRight,
  Volume2,
  Calendar,
  Sparkles,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const SevenWondersShowcase: React.FC = () => {
  const { navigate, triggerRegionalSound } = useJourney();

  // The New 7 Wonders of the World + Ancient Wonder of Giza
  const wonderIds = [
    'taj-mahal',
    'great-wall',
    'petra',
    'colosseum',
    'christ-redeemer',
    'machu-picchu',
    'chichen-itza',
    'giza',
  ];

  const wonders = DESTINATIONS.filter((d) => wonderIds.includes(d.id));
  const [activeWonderId, setActiveWonderId] = useState<string>('taj-mahal');

  const selectedWonder = wonders.find((w) => w.id === activeWonderId) || wonders[0];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5 relative">
      {/* Background atmospheric glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>Monumental Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
            THE SEVEN WONDERS OF THE WORLD
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            The pinnacle of human architectural ambition across continents. Explore all official New Seven Wonders—from India&apos;s ivory Taj Mahal to Rome&apos;s Colosseum—with live soundscapes, verified ₹ INR packages, and real-time weather.
          </p>
        </div>

        <button
          onClick={() => navigate('/destinations')}
          className="text-xs uppercase tracking-wider font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 shrink-0 self-start md:self-auto group"
        >
          <span>View All 30 Catalog Destinations</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Wonder Selector Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-white/10 relative z-10">
        {wonders.map((w) => {
          const isActive = w.id === activeWonderId;
          return (
            <button
              key={w.id}
              onClick={() => {
                setActiveWonderId(w.id);
                triggerRegionalSound(w.id, w.country, w.region);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-display tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              <Landmark className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
              <span>{w.name.split('(')[0].trim()}</span>
              {w.id === 'taj-mahal' && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-slate-900/40 text-slate-900' : 'bg-amber-400/20 text-amber-300 font-mono'}`}>
                  India
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Hero Spotlight Stage for Active Wonder */}
      {selectedWonder && (
        <div className="relative z-10 bg-[#0C1322] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left / Top Widescreen Visual */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[540px] overflow-hidden group">
            <img
              src={selectedWonder.image}
              alt={selectedWonder.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C1322] via-[#0C1322]/20 to-black/30" />

            {/* Badge overlay */}
            <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/90 text-slate-950 text-xs font-bold font-display tracking-wider uppercase rounded-full shadow-lg flex items-center gap-1.5">
                <Landmark className="w-3.5 h-3.5" />
                {selectedWonder.id === 'giza' ? 'Honorary Ancient Wonder' : 'New 7 Wonder of the World'}
              </span>
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-slate-200 text-xs font-mono rounded-full">
                {selectedWonder.country}
              </span>
            </div>

            {/* Audio soundscape pill */}
            <button
              onClick={() => triggerRegionalSound(selectedWonder.id, selectedWonder.country, selectedWonder.region)}
              className="absolute bottom-5 right-5 px-3 py-2 bg-black/70 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-white/20 rounded-full text-xs font-mono backdrop-blur-md flex items-center gap-2 transition-all shadow-xl hover:scale-105"
            >
              <Volume2 className="w-4 h-4" />
              <span className="font-semibold">Hear 6s Soundscape</span>
            </button>

            {/* Weather / Best Season indicator */}
            <div className="absolute bottom-5 left-5 text-xs font-mono text-slate-200 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{selectedWonder.bestSeason.split('(')[0].trim()}</span>
            </div>
          </div>

          {/* Right / Bottom Content & Logistics */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  {selectedWonder.region} Sector
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">
                  {selectedWonder.name}
                </h3>
                <p className="text-xs uppercase tracking-wider text-amber-300/80 font-medium mt-0.5">
                  {selectedWonder.headline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedWonder.overview}
              </p>

              {/* Verified Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                  Architectural Marvels
                </span>
                <div className="space-y-2">
                  {selectedWonder.highlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-medium">{h.title}:</strong>{' '}
                        <span className="text-slate-400">{h.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price in ₹ INR breakdown */}
              {selectedWonder.priceINR && selectedWonder.inrDetails && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-display">
                      Estimated Package (₹ INR)
                    </span>
                    <span className="text-lg font-mono font-bold text-amber-400">
                      {selectedWonder.priceINR}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p>• <strong className="text-slate-300">Flights:</strong> {selectedWonder.inrDetails.flightFromIndia}</p>
                    <p>• <strong className="text-slate-300">Stay:</strong> {selectedWonder.inrDetails.stayPerNight}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => navigate(`/destinations/${selectedWonder.id}`)}
                className="w-full sm:flex-1 py-3 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Full Itinerary & Live Weather</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/planner')}
                className="w-full sm:w-auto py-3 px-4 bg-white/5 hover:bg-white/10 text-slate-200 font-display font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors border border-white/10"
              >
                Plan Wonder Route
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of All 8 Wonders (Quick Cards) */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative z-10">
        {wonders.map((w) => {
          const isActive = w.id === activeWonderId;
          return (
            <div
              key={w.id}
              onClick={() => {
                setActiveWonderId(w.id);
                triggerRegionalSound(w.id, w.country, w.region);
              }}
              className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-200 bg-[#0A101E] flex flex-col ${
                isActive
                  ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-xl scale-[1.03]'
                  : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="relative h-24 w-full overflow-hidden">
                <img
                  src={w.image}
                  alt={w.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A101E] via-transparent to-transparent" />
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-display font-bold text-white group-hover:text-amber-300 line-clamp-1">
                    {w.name.split('(')[0].trim()}
                  </h4>
                  <p className="text-[10px] text-slate-400 line-clamp-1">{w.country}</p>
                </div>
                <div className="mt-1.5 text-[10px] font-mono text-amber-400 font-semibold">
                  {w.priceINR}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
