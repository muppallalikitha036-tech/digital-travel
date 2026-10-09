import React, { useEffect } from 'react';
import { useJourney } from '../context/JourneyContext';
import { DESTINATIONS } from '../data/travelData';
import {
  Heart,
  Compass,
  ArrowRight,
  Sun,
  CloudSun,
  Calendar,
  Sparkles,
  MapPin,
  Utensils,
  Landmark,
  ShieldAlert,
  ArrowLeft,
  Volume2,
  Plane,
  Building,
  CheckCircle2,
} from 'lucide-react';
import { DestinationWeatherWidget } from '../components/DestinationWeatherWidget';

interface DestinationDetailPageProps {
  destinationId: string;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({ destinationId }) => {
  const {
    navigate,
    toggleSaveDestination,
    isDestinationSaved,
    setChatContext,
    triggerChatWithPrompt,
    triggerRegionalSound,
  } = useJourney();

  const destination =
    DESTINATIONS.find((d) => d.id === destinationId) ||
    DESTINATIONS.find((d) => d.id === 'iceland')!;

  // Sync WanderAI context with this destination
  useEffect(() => {
    setChatContext({
      destination,
      pageName: `Destination: ${destination.name}`,
    });
    return () => setChatContext(null);
  }, [destination]);

  const isSaved = isDestinationSaved(destination.id);

  const nearbyDestinations = DESTINATIONS.filter((d) =>
    destination.nearbyDestinationIds?.includes(d.id)
  );

  return (
    <div className="min-h-screen bg-[#070B12] text-slate-100">
      {/* 1. Cinematic Full-Screen Hero */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12] via-[#070B12]/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B12]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Back button */}
          <button
            onClick={() => navigate('/destinations')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-amber-400 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Destinations</span>
          </button>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-display font-semibold uppercase tracking-widest">
                {destination.country}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                {destination.region} Sector
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-mono">
                {destination.climateType}
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.08]">
              {destination.headline}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-light">
              {destination.overview}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => toggleSaveDestination(destination.id)}
                className={`px-6 py-3.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 focus:outline-none ${
                  isSaved
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25'
                }`}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                <span>{isSaved ? 'SAVED IN MY JOURNEY' : 'ADD TO MY JOURNEY'}</span>
              </button>

              <button
                onClick={() => triggerRegionalSound(destination.id, destination.country, destination.region)}
                className="px-5 py-3.5 bg-black/60 hover:bg-black/90 border border-amber-400/40 text-amber-300 rounded-full font-display font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2 hover:scale-105 shadow-xl"
                title="Play 6-second regional soundscape"
              >
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Play 6s Soundscape</span>
              </button>

              <button
                onClick={() => navigate('/experiences')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full font-display font-bold text-xs uppercase tracking-wider hover:border-amber-400/50 transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>EXPLORE EXPERIENCES</span>
              </button>

              <button
                onClick={() =>
                  triggerChatWithPrompt(
                    `Tell me insider tips and best seasonal conditions for ${destination.name}.`,
                    { destination }
                  )
                }
                className="px-5 py-3.5 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full font-display font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI About {destination.name}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Atmospheric Data Bar */}
      <section className="border-y border-white/10 bg-[#0B1220] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Best Window
              </div>
              <div className="text-xs text-white font-medium line-clamp-1">
                {destination.bestSeason}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Weather Climate
              </div>
              <div className="text-xs text-white font-medium line-clamp-1">
                {destination.weatherOverview}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Atmosphere Tier
              </div>
              <div className="text-xs text-white font-medium line-clamp-1">
                {destination.budgetLevel} Luxury
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 font-display">
                Coordinates
              </div>
              <div className="text-xs text-white font-mono">
                {destination.coordinates.lat.toFixed(2)}°, {destination.coordinates.lng.toFixed(2)}°
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Real-Time Satellite Weather & Expedition Pricing HUD */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Real-Time Live Weather Widget Component */}
        <DestinationWeatherWidget
          destinationName={destination.name}
          country={destination.country}
          coordinates={destination.coordinates}
          bestSeason={destination.bestSeason}
        />

        {/* Real Indian Rupee (₹ INR) Logistics & Pricing Box if available */}
        {destination.priceINR && (
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-black/40 border border-amber-400/30 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/25 text-amber-300 text-xs font-mono font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Verified Expedition Pricing (Departures from India)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Starting Package: <span className="text-amber-400 font-extrabold">{destination.priceINR}</span>{' '}
                <span className="text-xs text-slate-400 font-normal">/ person</span>
              </h3>
              {destination.inrDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Plane className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Flights: {destination.inrDetails.flightFromIndia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Stay: {destination.inrDetails.stayPerNight}</span>
                  </div>
                  <div className="sm:col-span-2 text-slate-400 text-[11px] pt-1 border-t border-white/5">
                    ✦ {destination.inrDetails.packageTotal}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/planner')}
              className="px-7 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-display font-extrabold text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 flex items-center justify-center gap-2"
            >
              <span>CUSTOMIZE IN TRIP PLANNER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 3. Interactive Highlights */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            Signature Wonders
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            INTERACTIVE HIGHLIGHTS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destination.highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0D1525] border border-white/10 hover:border-amber-400/40 transition-colors space-y-2 group"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-amber-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-9">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Local Experiences, Food & Culture */}
      <section className="py-20 bg-[#0A101E] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Local Experiences */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-display font-bold text-lg">
                <Compass className="w-5 h-5" />
                <h3>Local Immersion</h3>
              </div>
              <ul className="space-y-3">
                {destination.localExperiences.map((exp, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="text-amber-400 mt-1">✦</span>
                    <span>{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Food & Gastronomy */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-display font-bold text-lg">
                <Utensils className="w-5 h-5" />
                <h3>Culinary Philosophy</h3>
              </div>
              <ul className="space-y-3">
                {destination.food.map((dish, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="text-amber-400 mt-1">✦</span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Culture & Heritage */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 font-display font-bold text-lg">
                <Landmark className="w-5 h-5" />
                <h3>Cultural Codes</h3>
              </div>
              <ul className="space-y-3">
                {destination.culture.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <span className="text-amber-400 mt-1">✦</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Suggested 7-Day Curated Itinerary */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
            Day-by-Day Masterplan
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            SUGGESTED 7-DAY EXPEDITION
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Curated by our expedition cartographers to balance high-sensory activity with restorative reflection.
          </p>
        </div>

        {/* Visual Timeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-10">
          {destination.suggestedItinerary.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Dot on timeline */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              <div className="bg-[#0C1322] border border-white/10 hover:border-amber-400/40 p-5 rounded-2xl transition-colors space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {item.day}
                  </span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <h4 className="text-base font-display font-bold text-white group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Travel Tips & Gear Guidance */}
      <section className="py-16 bg-[#0A101E] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6 text-amber-400">
            <ShieldAlert className="w-5 h-5" />
            <h3 className="font-display font-bold text-lg text-white">
              Expedition Protocol & Practical Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {destination.travelTips.map((tip, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <span className="text-xs font-mono text-amber-400">Tip 0{idx + 1}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Nearby Destinations */}
      {nearbyDestinations.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-display">
              Extended Corridors
            </span>
            <h3 className="text-2xl font-display font-bold text-white">
              Nearby & Complementary Destinations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {nearbyDestinations.map((near) => (
              <div
                key={near.id}
                onClick={() => {
                  triggerRegionalSound(near.id, near.country, near.region);
                  navigate(`/destinations/${near.id}`);
                }}
                className="group bg-[#0C1322] border border-white/10 hover:border-amber-400/40 rounded-2xl overflow-hidden cursor-pointer p-4 flex items-center gap-4 transition-all"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 shrink-0">
                  <img
                    src={near.image}
                    alt={near.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white group-hover:text-amber-300">
                    {near.name}
                  </h4>
                  <p className="text-xs text-slate-400">{near.country}</p>
                  <span className="text-[11px] text-amber-400 font-mono">
                    {near.bestSeason.split('(')[0].trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
