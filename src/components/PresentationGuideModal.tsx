import React, { useState } from 'react';
import {
  Presentation,
  X,
  Sparkles,
  Compass,
  Globe2,
  Volume2,
  IndianRupee,
  CloudSun,
  Bot,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Play,
  ArrowRight,
  Code2,
} from 'lucide-react';

interface PresentationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationGuideModal: React.FC<PresentationGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'pitch' | 'demo' | 'tech'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A101D] border border-amber-400/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="presentation-modal-title"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E1626]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h2 id="presentation-modal-title" className="text-base sm:text-lg font-display font-bold text-white tracking-wide flex items-center gap-2">
                <span>PROJECT PRESENTATION GUIDE</span>
                <span className="text-[10px] font-mono font-extrabold uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full">
                  Simple & Clear
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Ready-to-use talking points, core pillars, live demo sequence & architecture summary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close presentation guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-black/40 border-b border-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: '1. What It Is (Simple)', icon: Compass },
            { id: 'features', label: '2. Key Features', icon: Sparkles },
            { id: 'pitch', label: '3. 2-Min Pitch Script', icon: Play },
            { id: 'demo', label: '4. Live Demo Flow', icon: ArrowRight },
            { id: 'tech', label: '5. Architecture & Security', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-amber-200">
                <p className="font-semibold text-sm sm:text-base text-white mb-1">
                  💡 The One-Sentence Elevator Pitch:
                </p>
                <p className="italic text-slate-200">
                  "Travel Reimagined is a cinematic, full-stack travel intelligence platform that combines realistic scenery across all 7 continents with procedural Web Audio soundscapes, real Indian Rupee (₹ INR) pricing, real-time live weather widgets, and an AI travel companion powered by Retrieval-Augmented Generation (RAG)."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-amber-400 font-bold text-xs uppercase tracking-wider font-display">
                    Problem It Solves
                  </span>
                  <p className="text-xs text-slate-300">
                    Existing travel platforms use repetitive, generic stock photos, display confusing foreign currencies, hide real trip costs from Indian travelers, and lack sensory immersion or accurate intelligence for niche questions (like altitude sickness or dietary needs).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="text-emerald-400 font-bold text-xs uppercase tracking-wider font-display">
                    Our Solution
                  </span>
                  <p className="text-xs text-slate-300">
                    A multi-sensory web app featuring curated tourism spots across all 7 continents, real transparent INR costs (flights, stays, packages), instant atmospheric sound on hover, live meteorology, and authenticated private journeys.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Core Features to Highlight during your Presentation:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-xl bg-white/5 border border-amber-400/30 flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">The Seven Wonders of the World</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Complete interactive showcase for all New 7 Wonders (Taj Mahal, Great Wall, Petra, Colosseum, Christ the Redeemer, Machu Picchu, Chichén Itzá) plus Egypt&apos;s Giza Pyramids with live soundscapes and ₹ INR packages.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-emerald-400/30 flex items-start gap-3">
                  <Compass className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Incredible India Tourism Spots</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Special curated spotlight on Kerala backwaters, Araku Valley coffee hills & Borra Caves, Ooty Nilgiris toy train, Coorg plantations, Manali snow peaks, Pondicherry French Quarter, Varanasi, and Ladakh.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Globe2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">All 7 Continents Covered</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Asia, Europe, Africa, North America, South America, Oceania, and Antarctica with 100% unique scenery thumbnails.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Web Audio 6-Second Soundscapes</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Hovering or clicking on region & wonder thumbnails plays authentic synthesized audio (Ganges bells, bamboo flutes, alpine breeze, polar winds).
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <IndianRupee className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Real Indian Currency (₹ INR)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Every destination displays realistic prices in ₹ INR, including round-trip flights from DEL/BOM, nightly stays, and complete expedition packages.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <CloudSun className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Real-Time Weather Widget</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Live Open-Meteo public API integration fetching current temperature, WMO weather condition icons, wind speeds, humidity, and 5-day forecasts by coordinates.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <Bot className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">WanderAI with RAG Knowledge Engine</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Retrieval-Augmented Generation indexes deep travel knowledge: visa rules, altitude safety (Diamox protocol), pure veg/Jain food, and out-of-the-box queries.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs">Firebase Google Auth & Multi-User Privacy</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Multi-user isolation: users sign in with their Gmail, and saved trips/bookmarks are stored in private user Firestore sub-collections without leaking data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pitch' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Simple 2-Minute Speech Script (Read this out loud):
              </h3>

              <div className="space-y-3 bg-black/40 p-4 rounded-2xl border border-white/10">
                <p>
                  <strong className="text-amber-300">"Good morning everyone.</strong> Today I am proud to present <span className="text-white font-bold">Travel Reimagined</span>, a modern web application built for the next generation of global travelers."
                </p>
                <p>
                  <strong className="text-amber-300">1. The Vision:</strong> "Most travel portals today are dry and transactional. We wanted to build something experiential that combines visual depth, authentic sound, transparent pricing in Indian Rupees, and artificial intelligence."
                </p>
                <p>
                  <strong className="text-amber-300">2. Global Scope:</strong> "Our platform covers iconic tourism spots across all 7 continents—from Varanasi and Kyoto in Asia to the Matterhorn in Europe, the Serengeti and Giza Pyramids in Africa, Banff in North America, Machu Picchu in South America, the Great Barrier Reef in Oceania, and all the way to Antarctica."
                </p>
                <p>
                  <strong className="text-amber-300">3. Multi-Sensory Design:</strong> "When a user hovers over any region thumbnail, our custom Web Audio engine synthesizes a 6-second authentic regional soundscape. We also display real, transparent costs in Indian Rupees (₹ INR) for flights, stays, and tour packages."
                </p>
                <p>
                  <strong className="text-amber-300">4. Live Weather & RAG AI:</strong> "Each destination detail page integrates a live real-time weather widget powered by meteorological APIs. And our WanderAI assistant uses Retrieval-Augmented Generation to provide verified answers about visa requirements, altitude safety, and dietary guidance."
                </p>
                <p>
                  <strong className="text-amber-300">5. Multi-User Security:</strong> "Finally, with Firebase Authentication and Firestore security rules, multiple users can sign in with their personal Google accounts, keeping their saved itineraries completely private."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'demo' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Recommended Live Demo Walkthrough (1 to 2 Minutes):
              </h3>

              <div className="space-y-3">
                {[
                  {
                    step: 'Step 1: Homepage & Aesthetics',
                    desc: 'Scroll down from the cinematic video hero to the "Explore by Regions" section. Mention the aesthetic layout and real Indian currency indicators.',
                  },
                  {
                    step: 'Step 2: Hover for 6-Second Soundscapes',
                    desc: 'Hover over the Asia, Europe, Africa, or Antarctica thumbnails to demonstrate the live audio feedback and distinct scenery imagery.',
                  },
                  {
                    step: 'Step 3: Filter by 7 Continents',
                    desc: 'Click on "Destinations" or the Interactive Globe. Toggle between Asia, Europe, Africa, North America, South America, Oceania, and Antarctica.',
                  },
                  {
                    step: 'Step 4: Live Weather Widget in Destination Page',
                    desc: 'Click on a destination (e.g. Banff or Antarctica). Point out the real-time weather widget displaying live temperature and conditions via Open-Meteo.',
                  },
                  {
                    step: 'Step 5: Ask WanderAI Out-of-the-Box Questions',
                    desc: 'Open WanderAI (bottom right or navbar). Type: "What is the real cost in INR for a trip to Bali?" or "How can I prevent altitude sickness in Ladakh?". Show the RAG citation badges.',
                  },
                  {
                    step: 'Step 6: User Isolation & Google Sign-In',
                    desc: 'Click the "Google Sign In" button in the navbar to show multi-user authentication with isolated bookmarks in "My Journey".',
                  },
                ].map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs">{s.step}</h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="space-y-4">
              <h3 className="font-display font-bold text-base text-white">
                Technical Stack & Architectural Highlights:
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold">Frontend Framework</span>
                  <p className="text-slate-300">React 18 + TypeScript + Vite + Tailwind CSS</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold">Sound Synthesis</span>
                  <p className="text-slate-300">Web Audio API (Procedural oscillators, bandpass noise filters & biquad resonance)</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold">Backend & AI</span>
                  <p className="text-slate-300">Express + Node.js + Google GenAI (Gemini) + In-memory RAG chunk index</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold">Database & Auth</span>
                  <p className="text-slate-300">Firebase Firestore + Google OAuth (Multi-user strict collection isolation)</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold">Weather API</span>
                  <p className="text-slate-300">Open-Meteo public weather API (Real-time temperature, WMO codes, forecasts)</p>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-amber-400 font-bold">Video Generation</span>
                  <p className="text-slate-300">Google Veo (Video Generation API model: veo-3.1-fast-generate-001)</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-[#0E1626] flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-slate-300">Esc</kbd> or click Close to return.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Got It, Ready to Present!
          </button>
        </div>
      </div>
    </div>
  );
};
