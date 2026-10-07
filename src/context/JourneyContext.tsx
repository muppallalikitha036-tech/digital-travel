import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS, EXPERIENCES, Destination, Experience } from '../data/travelData';
import { play6SecRegionalSound, stopCurrentRegionalSound, RegionalSoundInfo } from '../utils/regionalAudio';

export interface PlannedTrip {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  durationDays: number;
  travelStyle: string;
  journeyType: string;
  createdAt: string;
  days: { day: string; title: string; desc: string; completed?: boolean }[];
  notes?: string;
}

interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
}

interface JourneyContextType {
  // Navigation / Route
  currentPath: string;
  navigate: (path: string) => void;

  // Saved items
  savedDestinationIds: string[];
  savedExperienceIds: string[];
  toggleSaveDestination: (id: string) => void;
  toggleSaveExperience: (id: string) => void;
  isDestinationSaved: (id: string) => boolean;
  isExperienceSaved: (id: string) => boolean;
  savedDestinations: Destination[];
  savedExperiences: Experience[];

  // Planned Trips
  plannedTrips: PlannedTrip[];
  savePlannedTrip: (trip: Omit<PlannedTrip, 'id' | 'createdAt'>) => string;
  removePlannedTrip: (id: string) => void;
  toggleTripDayComplete: (tripId: string, dayIndex: number) => void;

  // Global Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  // WanderAI Assistant
  isChatOpen: boolean;
  isChatMinimized: boolean;
  openChat: () => void;
  closeChat: () => void;
  minimizeChat: () => void;
  expandChat: () => void;
  chatContext: { destination?: Destination; experience?: Experience; pageName?: string } | null;
  setChatContext: (context: { destination?: Destination; experience?: Experience; pageName?: string } | null) => void;
  triggerChatWithPrompt: (prompt: string, context?: { destination?: Destination; experience?: Experience; pageName?: string }) => void;
  injectedPrompt: string | null;
  clearInjectedPrompt: () => void;

  // Regional 6-Second Soundscapes
  activeRegionalSound: RegionalSoundInfo | null;
  triggerRegionalSound: (destinationIdOrName: string, country?: string, region?: string) => void;
  stopRegionalSound: () => void;
  replayRegionalSound: () => void;

  // Custom Video Background & Animate to Video Modal
  customVideoBackgroundUrl: string | null;
  setCustomVideoBackgroundUrl: (url: string | null) => void;
  isAnimateModalOpen: boolean;
  animateModalInitialImage: string | null;
  openAnimateModal: (defaultImage?: string) => void;
  closeAnimateModal: () => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (text: string, type?: 'success' | 'info') => void;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

function resolveRouteFromWindow(): string {
  if (typeof window === 'undefined') return '/';

  // 1. Check GitHub Pages 404 redirect param (e.g. ?p=/destinations or ?/destinations)
  const search = window.location.search;
  if (search.startsWith('?/')) {
    const clean = search.slice(1);
    return clean.startsWith('/') ? clean : `/${clean}`;
  }
  if (search) {
    const params = new URLSearchParams(search);
    const queryPath = params.get('p') || params.get('path');
    if (queryPath) {
      return queryPath.startsWith('/') ? queryPath : `/${queryPath}`;
    }
  }

  // 2. Check hash route: e.g. #/destinations, #/experiences, #destinations
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const cleanHash = hash.replace(/^#\/?/, '/');
    if (cleanHash && cleanHash !== '/') {
      return cleanHash;
    }
  }

  // 3. Check pathname (handling potential repository subpath like /travel-reimagined/destinations)
  const pathname = window.location.pathname || '/';
  const knownPrefixes = [
    '/destinations',
    '/experiences',
    '/planner',
    '/journey',
    '/stories',
    '/quiz',
    '/about',
  ];

  for (const prefix of knownPrefixes) {
    const idx = pathname.indexOf(prefix);
    if (idx !== -1) {
      return pathname.slice(idx);
    }
  }

  return '/';
}

export const JourneyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize route from window.location (hash, query redirect, or pathname)
  const [currentPath, setCurrentPath] = useState<string>(() => resolveRouteFromWindow());

  // Handle browser back/forward buttons & hash navigation across static hosting environments
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(resolveRouteFromWindow());
    };
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  const navigate = (path: string) => {
    const targetPath = path.startsWith('/') ? path : `/${path}`;
    if (targetPath !== currentPath) {
      setCurrentPath(targetPath);
      // Synchronize hash for reliable static hosting & GitHub Pages reload without server rewrites
      try {
        window.location.hash = targetPath;
      } catch {
        // fallback
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Saved Destinations
  const [savedDestinationIds, setSavedDestinationIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tr_saved_destinations');
      return stored ? JSON.parse(stored) : ['iceland', 'kyoto'];
    } catch {
      return ['iceland', 'kyoto'];
    }
  });

  // Saved Experiences
  const [savedExperienceIds, setSavedExperienceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('tr_saved_experiences');
      return stored ? JSON.parse(stored) : ['chase-the-northern-lights'];
    } catch {
      return ['chase-the-northern-lights'];
    }
  });

  // Planned Trips
  const [plannedTrips, setPlannedTrips] = useState<PlannedTrip[]>(() => {
    try {
      const stored = localStorage.getItem('tr_planned_trips');
      if (stored) return JSON.parse(stored);
      // Pre-seed an inspirational default planned trip
      const icelandDest = DESTINATIONS.find(d => d.id === 'iceland')!;
      return [
        {
          id: 'trip-iceland-initial',
          destinationId: 'iceland',
          destinationName: 'Iceland',
          title: '7-Day Iceland Fire & Ice Expedition',
          durationDays: 7,
          travelStyle: 'Premium',
          journeyType: 'Adventure',
          createdAt: new Date().toISOString(),
          days: icelandDest.suggestedItinerary.map(item => ({
            day: item.day,
            title: item.title,
            desc: item.desc,
            completed: false,
          })),
          notes: 'Remember GORE-TEX windbreaker and reserve Blue Lagoon at sunset.',
        },
      ];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tr_saved_destinations', JSON.stringify(savedDestinationIds));
    } catch (e) {
      console.warn(e);
    }
  }, [savedDestinationIds]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_saved_experiences', JSON.stringify(savedExperienceIds));
    } catch (e) {
      console.warn(e);
    }
  }, [savedExperienceIds]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_planned_trips', JSON.stringify(plannedTrips));
    } catch (e) {
      console.warn(e);
    }
  }, [plannedTrips]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const toggleSaveDestination = (id: string) => {
    const dest = DESTINATIONS.find((d) => d.id === id);
    setSavedDestinationIds((prev) => {
      if (prev.includes(id)) {
        addToast(`Removed ${dest?.name || 'Destination'} from My Journey`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast(`Added ${dest?.name || 'Destination'} to My Journey!`, 'success');
        return [...prev, id];
      }
    });
  };

  const toggleSaveExperience = (id: string) => {
    const exp = EXPERIENCES.find((e) => e.id === id);
    setSavedExperienceIds((prev) => {
      if (prev.includes(id)) {
        addToast(`Removed ${exp?.title || 'Experience'} from My Journey`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        addToast(`Added "${exp?.title || 'Experience'}" to My Journey!`, 'success');
        return [...prev, id];
      }
    });
  };

  const isDestinationSaved = (id: string) => savedDestinationIds.includes(id);
  const isExperienceSaved = (id: string) => savedExperienceIds.includes(id);

  const savedDestinations = DESTINATIONS.filter((d) => savedDestinationIds.includes(d.id));
  const savedExperiences = EXPERIENCES.filter((e) => savedExperienceIds.includes(e.id));

  const savePlannedTrip = (tripData: Omit<PlannedTrip, 'id' | 'createdAt'>) => {
    const newId = `trip-${Date.now()}`;
    const newTrip: PlannedTrip = {
      ...tripData,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    setPlannedTrips((prev) => [newTrip, ...prev]);
    addToast(`Saved itinerary: ${newTrip.title}!`, 'success');
    return newId;
  };

  const removePlannedTrip = (id: string) => {
    setPlannedTrips((prev) => prev.filter((t) => t.id !== id));
    addToast('Removed itinerary from My Journey', 'info');
  };

  const toggleTripDayComplete = (tripId: string, dayIndex: number) => {
    setPlannedTrips((prev) =>
      prev.map((t) => {
        if (t.id !== tripId) return t;
        const newDays = [...t.days];
        if (newDays[dayIndex]) {
          newDays[dayIndex] = {
            ...newDays[dayIndex],
            completed: !newDays[dayIndex].completed,
          };
        }
        return { ...t, days: newDays };
      })
    );
  };

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // WanderAI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [chatContext, setChatContext] = useState<{ destination?: Destination; experience?: Experience; pageName?: string } | null>(null);
  const [injectedPrompt, setInjectedPrompt] = useState<string | null>(null);

  const openChat = () => {
    setIsChatOpen(true);
    setIsChatMinimized(false);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const minimizeChat = () => {
    setIsChatMinimized(true);
  };

  const expandChat = () => {
    setIsChatMinimized(false);
    setIsChatOpen(true);
  };

  const triggerChatWithPrompt = (prompt: string, context?: { destination?: Destination; experience?: Experience; pageName?: string }) => {
    if (context) setChatContext(context);
    setInjectedPrompt(prompt);
    setIsChatOpen(true);
    setIsChatMinimized(false);
  };

  const clearInjectedPrompt = () => {
    setInjectedPrompt(null);
  };

  // Regional 6-Second Soundscapes
  const [activeRegionalSound, setActiveRegionalSound] = useState<RegionalSoundInfo | null>(null);

  const triggerRegionalSound = (destinationIdOrName: string, country?: string, region?: string) => {
    const info = play6SecRegionalSound(destinationIdOrName, country, region);
    setActiveRegionalSound(info);
    addToast(`🔊 Playing 6s soundscape: ${info.placeName}`, 'info');
  };

  const stopRegionalSound = () => {
    stopCurrentRegionalSound();
    setActiveRegionalSound(null);
  };

  const replayRegionalSound = () => {
    if (activeRegionalSound) {
      triggerRegionalSound(
        activeRegionalSound.placeId || activeRegionalSound.placeName,
        activeRegionalSound.country,
        activeRegionalSound.region
      );
    }
  };

  // Custom Background Video & Veo Video Generation Modal
  const [customVideoBackgroundUrl, setCustomVideoBackgroundUrl] = useState<string | null>(null);
  const [isAnimateModalOpen, setIsAnimateModalOpen] = useState<boolean>(false);
  const [animateModalInitialImage, setAnimateModalInitialImage] = useState<string | null>(null);

  const openAnimateModal = (defaultImage?: string) => {
    setAnimateModalInitialImage(defaultImage || null);
    setIsAnimateModalOpen(true);
  };

  const closeAnimateModal = () => {
    setIsAnimateModalOpen(false);
  };

  return (
    <JourneyContext.Provider
      value={{
        currentPath,
        navigate,
        savedDestinationIds,
        savedExperienceIds,
        toggleSaveDestination,
        toggleSaveExperience,
        isDestinationSaved,
        isExperienceSaved,
        savedDestinations,
        savedExperiences,
        plannedTrips,
        savePlannedTrip,
        removePlannedTrip,
        toggleTripDayComplete,
        isSearchOpen,
        openSearch,
        closeSearch,
        isChatOpen,
        isChatMinimized,
        openChat,
        closeChat,
        minimizeChat,
        expandChat,
        chatContext,
        setChatContext,
        triggerChatWithPrompt,
        injectedPrompt,
        clearInjectedPrompt,
        activeRegionalSound,
        triggerRegionalSound,
        stopRegionalSound,
        replayRegionalSound,
        customVideoBackgroundUrl,
        setCustomVideoBackgroundUrl,
        isAnimateModalOpen,
        animateModalInitialImage,
        openAnimateModal,
        closeAnimateModal,
        toasts,
        addToast,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
};

export const useJourney = () => {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
};
