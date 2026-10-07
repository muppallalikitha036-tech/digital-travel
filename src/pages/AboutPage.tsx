import React from 'react';
import { useJourney } from '../context/JourneyContext';
import lastPageAlpineFlowers from '../assets/images/last_page_alpine_flowers_1791222007983.jpg';
import { Compass, Sparkles, Shield, Leaf, Globe, ArrowRight, Eye } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useJourney();

  const pillars = [
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: 'Digital Innovation & AI Co-Piloting',
      desc: 'Adaptive machine intelligence that understands weather micro-climates, personal stamina, and seasonal daylight to generate resilient, fluid itineraries.',
    },
    {
      icon: <Leaf className="w-5 h-5 text-emerald-400" />,
      title: 'Regenerative Planetary Stewardship',
      desc: '5% of all expedition revenues are directly allocated to high-latitude glaciology monitoring, native forest restoration, and sub-arctic dark sky sanctuaries.',
    },
    {
      icon: <Globe className="w-5 h-5 text-cyan-400" />,
      title: 'Hyper-Curated Frontiers',
      desc: 'We decline 92% of tourist routes in favor of private concessions, indigenous-led trail masterclasses, and silent astronomical sanctuaries.',
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-400" />,
      title: 'Discerning Expedition Ethics',
      desc: 'Fair compensation covenants with local Sherpas, Andean gauchos, and Arctic navigators. Zero crowds, zero exploitation, absolute respect.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-transparent pt-28 pb-24 text-slate-100">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-amber-300 font-display">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>The Reimagined Manifesto · Final Horizon</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-[1.08] drop-shadow-md">
            REIMAGINING HOW HUMANITY EXPLORES THE WORLD.
          </h1>
          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal drop-shadow-sm max-w-2xl">
            Founded on the principle that modern travel should transcend passive tourism. We unite cinematic digital storytelling, generative intelligence, and regenerative stewardship into seamless real-world odysseys.
          </p>
        </div>

        {/* Vision Statement Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-[#090F1C]/75 backdrop-blur-xl border border-white/15 shadow-2xl mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            “Travel isn’t just about where you go. It’s about how the journey makes you feel.”
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            In an era of mass algorithmic sameness, authentic exploration has become precious. TRAVEL REIMAGINED designs digital portals where prospective journeys are visualized in high fidelity before feet ever touch foreign soil—enabling intentional, mindful exploration of earth&apos;s wildest landscapes.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-amber-300 font-display mb-8 drop-shadow">
            Our Architectural Foundations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#0A1120]/75 hover:bg-[#0E172B]/85 backdrop-blur-xl border border-white/15 hover:border-amber-400/40 transition-all duration-300 shadow-xl space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-display font-bold text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quantitative Proof Section */}
        <div className="border-t border-white/15 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center sm:text-left bg-[#0A1120]/65 backdrop-blur-xl border rounded-3xl p-8 shadow-xl">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-amber-400 font-mono">
              100%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Regenerative Offsets
            </div>
            <p className="text-[11px] text-slate-400">Every mile certified & compensated</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-amber-400 font-mono">
              14
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Global Corridors
            </div>
            <p className="text-[11px] text-slate-400">Sub-arctic, Alpine & Oceanic</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-amber-400 font-mono">
              2,400+
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Journeys Synthesized
            </div>
            <p className="text-[11px] text-slate-400">Across 6 planetary continents</p>
          </div>

          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-display font-extrabold text-amber-400 font-mono">
              24/7
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              WanderAI Co-Pilot
            </div>
            <p className="text-[11px] text-slate-400">Meteorology, gear & route updates</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-[#090F1C]/80 backdrop-blur-xl border border-white/15 rounded-3xl p-10 space-y-4 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Ready to Reimagine Your Next Journey?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
            Step into our digital journey planner or consult with WanderAI to begin crafting your bespoke expedition.
          </p>
          <div className="pt-2 flex justify-center">
            <button
              onClick={() => navigate('/planner')}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all hover:scale-105"
            >
              <span>Build My Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
