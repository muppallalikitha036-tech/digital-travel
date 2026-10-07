import React, { useState, useEffect } from 'react';
import { useJourney } from '../context/JourneyContext';
import { Compass, Search, Heart, Sparkles, Menu, X, ArrowUpRight, Clapperboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    savedDestinationIds,
    savedExperienceIds,
    openSearch,
    openChat,
    openAnimateModal,
  } = useJourney();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalSavedCount = savedDestinationIds.length + savedExperienceIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Discover', path: '/' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Experiences', path: '/experiences' },
    { label: 'Plan Your Journey', path: '/planner' },
    { label: 'My Journey', path: '/journey' },
    { label: 'Stories', path: '/stories' },
    { label: 'About', path: '/about' },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070B12]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3.5'
            : 'bg-gradient-to-b from-[#070B12]/90 via-[#070B12]/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => handleNavClick('/')}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
            aria-label="Travel Reimagined Home"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4 text-slate-950" />
            </span>
            <span className="font-display text-lg tracking-wider font-extrabold text-white group-hover:text-amber-300 transition-colors">
              TRAVEL REIMAGINED
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative text-xs tracking-wider uppercase font-medium transition-colors py-1 focus:outline-none whitespace-nowrap ${
                    active ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-200 rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions & Affordances */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={openSearch}
              aria-label="Search destinations and experiences"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] font-mono text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </button>

            {/* Saved / Favorites Heart Button */}
            <button
              onClick={() => handleNavClick('/journey')}
              aria-label={`Saved Journey items: ${totalSavedCount}`}
              className="relative p-2 text-slate-300 hover:text-rose-400 hover:bg-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  totalSavedCount > 0 ? 'text-rose-400 fill-rose-500/30' : ''
                }`}
              />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-mono font-bold rounded-full flex items-center justify-center shadow-lg">
                  {totalSavedCount}
                </span>
              )}
            </button>

            {/* Animate Images into Video (Veo) */}
            <button
              onClick={() => openAnimateModal()}
              aria-label="Animate images into video with Veo"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/50 rounded-full text-xs font-semibold text-slate-200 hover:text-amber-300 transition-all shadow-sm"
              title="Animate images into video using Veo 3.1 Fast"
            >
              <Clapperboard className="w-3.5 h-3.5 text-amber-400" />
              <span>Animate to Video</span>
            </button>

            {/* WanderAI Trigger Button */}
            <button
              onClick={openChat}
              aria-label="Open WanderAI travel companion"
              className="relative hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-amber-500/15 to-amber-600/20 hover:from-amber-500/25 hover:to-amber-600/35 border border-amber-400/30 hover:border-amber-400/60 rounded-full text-xs font-medium text-amber-200 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap shadow-sm shadow-amber-500/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask WanderAI</span>
            </button>

            {/* Primary Action Button: Plan Your Journey */}
            <button
              onClick={() => handleNavClick('/planner')}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs tracking-wider uppercase rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
            >
              <span>Build Journey</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden bg-[#070B12]/95 backdrop-blur-2xl flex flex-col pt-24 px-6 pb-8 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-4">
            {navLinks.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left text-lg font-display tracking-wide py-2 border-b border-white/5 transition-colors ${
                    active ? 'text-amber-400 font-bold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500/15 border border-amber-400/30 rounded-xl text-amber-200 font-medium text-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Ask WanderAI Companion
            </button>

            <button
              onClick={() => handleNavClick('/planner')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-slate-950 font-bold text-sm tracking-wider uppercase shadow-lg shadow-amber-500/20"
            >
              Build My Journey
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
