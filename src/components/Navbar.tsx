import React, { useState, useEffect, useRef } from 'react';
import { useJourney } from '../context/JourneyContext';
import {
  Compass,
  Search,
  Heart,
  Sparkles,
  Menu,
  X,
  ArrowUpRight,
  Clapperboard,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Presentation,
} from 'lucide-react';
import { PresentationGuideModal } from './PresentationGuideModal';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    savedDestinationIds,
    savedExperienceIds,
    openSearch,
    openChat,
    openAnimateModal,
    currentUser,
    isAuthLoading,
    loginWithGoogle,
    logout,
  } = useJourney();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [presentationOpen, setPresentationOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement | null>(null);

  const totalSavedCount = savedDestinationIds.length + savedExperienceIds.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

            {/* Presentation Guide Modal Trigger */}
            <button
              onClick={() => setPresentationOpen(true)}
              aria-label="Open Project Presentation Guide"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 hover:border-amber-400/60 rounded-full text-xs font-semibold text-amber-300 transition-all shadow-sm active:scale-95 whitespace-nowrap"
              title="Open simple presentation guide with talking points & demo script"
            >
              <Presentation className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Presentation Guide</span>
              <span className="sm:hidden">Guide</span>
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

            {/* Google Account Authentication & Multi-User Profile */}
            <div className="relative" ref={accountMenuRef}>
              {currentUser ? (
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-2 p-1 pl-2.5 pr-1 bg-black/60 hover:bg-black/80 border border-white/20 hover:border-amber-400/50 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group shadow-md"
                  aria-label="Account Settings"
                >
                  <span className="hidden xl:inline text-xs font-semibold text-slate-200 group-hover:text-amber-300 max-w-[120px] truncate">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-amber-400/40"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                </button>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  disabled={isAuthLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-amber-400/50 rounded-full text-xs font-semibold text-white transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 whitespace-nowrap active:scale-95"
                  title="Link your Gmail / Google account"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Google Sign In</span>
                  <span className="sm:hidden">Sign In</span>
                </button>
              )}

              {/* Account Dropdown Modal */}
              {currentUser && accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-[#0C1322] border border-amber-400/30 p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    {currentUser.photoURL ? (
                      <img
                        src={currentUser.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-400/50"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold flex items-center justify-center text-sm">
                        {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <div className="text-sm font-display font-bold text-white truncate">
                        {currentUser.displayName || 'Google Traveler'}
                      </div>
                      <div className="text-xs text-amber-300/90 font-mono truncate">
                        {currentUser.email}
                      </div>
                    </div>
                  </div>

                  <div className="py-3 space-y-2 text-xs text-slate-300">
                    <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
                      <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">
                        <strong>Private Account Sync</strong>: Your saved destinations and itineraries are isolated strictly to this Google account. Other users cannot see your data.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        handleNavClick('/journey');
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold hover:underline"
                    >
                      View My Trips ({totalSavedCount})
                    </button>
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 hover:text-rose-300 text-xs text-slate-300 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

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
          {/* Mobile User Profile Section */}
          <div className="mb-6 p-3 rounded-2xl bg-white/5 border border-white/10">
            {currentUser ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-amber-400/40"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold text-xs flex items-center justify-center">
                      {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-white truncate">
                      {currentUser.displayName || 'Google User'}
                    </div>
                    <div className="text-[10px] text-amber-300/80 font-mono truncate">
                      {currentUser.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-300 hover:text-rose-400"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  loginWithGoogle();
                }}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl text-xs font-semibold text-white"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
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

      {/* Presentation Guide Modal */}
      <PresentationGuideModal
        isOpen={presentationOpen}
        onClose={() => setPresentationOpen(false)}
      />
    </>
  );
};
