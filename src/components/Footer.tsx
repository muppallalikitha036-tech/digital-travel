import React, { useState } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Compass, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useJourney();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  const navLinks = [
    { label: 'Discover', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Plan Your Journey', path: '/planner' },
    { label: 'My Journey', path: '/journey' },
    { label: 'Travel Stories', path: '/stories' },
    { label: 'Travel Quiz', path: '/quiz' },
    { label: 'About', path: '/about' },
  ];

  return (
    <footer className="bg-[#05080E] border-t border-white/10 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/5">
          {/* Brand & Philosophy */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold">
                <Compass className="w-4 h-4 text-slate-950" />
              </span>
              <span className="font-display text-lg tracking-wider font-extrabold text-white">
                TRAVEL REIMAGINED
              </span>
            </div>
            <p className="text-slate-300 font-display text-base italic leading-relaxed max-w-md">
              “Travel isn’t just about where you go. It’s about how the journey makes you feel.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An innovative digital travel platform pioneering cinematic exploration, personalized generative itineraries, and regenerative planetary stewardship.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Expedition Catalog
            </h4>
            <ul className="space-y-2.5 text-xs">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="hover:text-amber-400 transition-colors text-left focus:outline-none"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated Gazette Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-display">
              Private Expedition Gazette
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive monthly dispatches featuring private seasonal openings, astronomical calendars, and curated flight corridors.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400/80 transition-colors pr-24"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Join</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </form>

            {isSubscribed && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>You have been added to the private gazette list.</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-6">
            <span>© 2026 Travel Reimagined.</span>
            <span>·</span>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
              Privacy & Ethics
            </button>
            <span>·</span>
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">
              Regenerative Footprint
            </button>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors tracking-wide text-xs"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors tracking-wide text-xs"
              aria-label="YouTube"
            >
              YouTube
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors tracking-wide text-xs"
              aria-label="Pinterest"
            >
              Pinterest
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition-colors tracking-wide text-xs"
              aria-label="X"
            >
              X (Twitter)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
