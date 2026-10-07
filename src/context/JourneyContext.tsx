import React, { createContext, useContext, useState, useEffect } from 'react';
import { DESTINATIONS, EXPERIENCES, Destination, Experience } from '../data/travelData';
import { play6SecRegionalSound, stopCurrentRegionalSound, RegionalSoundInfo } from '../utils/regionalAudio';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  db,
  doc,
  setDoc,
  deleteDoc,
  collection,
  onSnapshot,
  User,
} from '../firebase/config';

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
  // User Authentication & Isolated Multi-User Profiles
  currentUser: User | null;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;

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

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (text: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
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
      const icelandDest = DESTINATIONS.find((d) => d.id === 'iceland')!;
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
          days: icelandDest.suggestedItinerary.map((item) => ({
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

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);

      if (user) {
        // Create or update user profile document in /users/{user.uid}
        try {
          await setDoc(
            doc(db, 'users', user.uid),
            {
              id: user.uid,
              email: user.email || '',
              displayName: user.displayName || '',
              photoURL: user.photoURL || '',
              updatedAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.warn('Could not sync user profile to Firestore:', err);
        }
      } else {
        // When signed out, isolate session: load guest localStorage
        try {
          const storedDests = localStorage.getItem('tr_saved_destinations');
          setSavedDestinationIds(storedDests ? JSON.parse(storedDests) : ['iceland', 'kyoto']);
          const storedExps = localStorage.getItem('tr_saved_experiences');
          setSavedExperienceIds(storedExps ? JSON.parse(storedExps) : ['chase-the-northern-lights']);
          const storedTrips = localStorage.getItem('tr_planned_trips');
          setPlannedTrips(storedTrips ? JSON.parse(storedTrips) : []);
        } catch {
          // fallback
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time synchronization of private saved bookmarks for authenticated user
  useEffect(() => {
    if (!currentUser) return;

    const savedColRef = collection(db, 'users', currentUser.uid, 'savedItems');
    const unsubscribe = onSnapshot(
      savedColRef,
      (snapshot) => {
        const destIds: string[] = [];
        const expIds: string[] = [];

        snapshot.docs.forEach((d) => {
          const data = d.data();
          if (data.type === 'destination') {
            destIds.push(data.targetId);
          } else if (data.type === 'experience') {
            expIds.push(data.targetId);
          }
        });

        setSavedDestinationIds(destIds);
        setSavedExperienceIds(expIds);
      },
      (err) => {
        console.warn('Firestore snapshot error for saved items:', err);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  // Real-time synchronization of private planned trips for authenticated user
  useEffect(() => {
    if (!currentUser) return;

    const tripsColRef = collection(db, 'users', currentUser.uid, 'plannedTrips');
    const unsubscribe = onSnapshot(
      tripsColRef,
      (snapshot) => {
        const trips: PlannedTrip[] = [];
        snapshot.docs.forEach((d) => {
          trips.push(d.data() as PlannedTrip);
        });
        trips.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setPlannedTrips(trips);
      },
      (err) => {
        console.warn('Firestore snapshot error for planned trips:', err);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

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
      try {
        window.location.hash = targetPath;
      } catch {
        // fallback
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Google Login & Logout handlers
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      addToast(`Signed in as ${result.user.displayName || result.user.email}!`, 'success');
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        console.error('Google Sign-In error:', err);
        addToast('Sign-in cancelled or interrupted.', 'info');
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      addToast('Signed out successfully. Your journey data remains strictly private.', 'info');
    } catch (err) {
      console.error('Sign-out error:', err);
    }
  };

  // Save to guest localStorage when not logged in
  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem('tr_saved_destinations', JSON.stringify(savedDestinationIds));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [savedDestinationIds, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem('tr_saved_experiences', JSON.stringify(savedExperienceIds));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [savedExperienceIds, currentUser]);

  useEffect(() => {
    if (!currentUser) {
      try {
        localStorage.setItem('tr_planned_trips', JSON.stringify(plannedTrips));
      } catch (e) {
        console.warn(e);
      }
    }
  }, [plannedTrips, currentUser]);

  const toggleSaveDestination = async (id: string) => {
    const dest = DESTINATIONS.find((d) => d.id === id);
    const isCurrentlySaved = savedDestinationIds.includes(id);

    if (currentUser) {
      try {
        const itemDocRef = doc(db, 'users', currentUser.uid, 'savedItems', `dest-${id}`);
        if (isCurrentlySaved) {
          await deleteDoc(itemDocRef);
          addToast(`Removed ${dest?.name || 'Destination'} from your account`, 'info');
        } else {
          await setDoc(itemDocRef, {
            id: `dest-${id}`,
            userId: currentUser.uid,
            targetId: id,
            type: 'destination',
            title: dest?.name || 'Destination',
            savedAt: new Date().toISOString(),
          });
          addToast(`Saved ${dest?.name || 'Destination'} to your Google account!`, 'success');
        }
      } catch (err) {
        console.error('Error toggling destination in Firestore:', err);
      }
    } else {
      // Guest mode
      setSavedDestinationIds((prev) => {
        if (prev.includes(id)) {
          addToast(`Removed ${dest?.name || 'Destination'} from My Journey`, 'info');
          return prev.filter((item) => item !== id);
        } else {
          addToast(`Added ${dest?.name || 'Destination'} to My Journey! (Sign in to sync)`, 'success');
          return [...prev, id];
        }
      });
    }
  };

  const toggleSaveExperience = async (id: string) => {
    const exp = EXPERIENCES.find((e) => e.id === id);
    const isCurrentlySaved = savedExperienceIds.includes(id);

    if (currentUser) {
      try {
        const itemDocRef = doc(db, 'users', currentUser.uid, 'savedItems', `exp-${id}`);
        if (isCurrentlySaved) {
          await deleteDoc(itemDocRef);
          addToast(`Removed ${exp?.title || 'Experience'} from your account`, 'info');
        } else {
          await setDoc(itemDocRef, {
            id: `exp-${id}`,
            userId: currentUser.uid,
            targetId: id,
            type: 'experience',
            title: exp?.title || 'Experience',
            savedAt: new Date().toISOString(),
          });
          addToast(`Saved "${exp?.title || 'Experience'}" to your Google account!`, 'success');
        }
      } catch (err) {
        console.error('Error toggling experience in Firestore:', err);
      }
    } else {
      // Guest mode
      setSavedExperienceIds((prev) => {
        if (prev.includes(id)) {
          addToast(`Removed ${exp?.title || 'Experience'} from My Journey`, 'info');
          return prev.filter((item) => item !== id);
        } else {
          addToast(`Added "${exp?.title || 'Experience'}" to My Journey! (Sign in to sync)`, 'success');
          return [...prev, id];
        }
      });
    }
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

    if (currentUser) {
      try {
        setDoc(doc(db, 'users', currentUser.uid, 'plannedTrips', newId), {
          ...newTrip,
          userId: currentUser.uid,
        });
        addToast(`Saved itinerary "${newTrip.title}" to your Google account!`, 'success');
      } catch (err) {
        console.error('Error saving trip to Firestore:', err);
      }
    } else {
      setPlannedTrips((prev) => [newTrip, ...prev]);
      addToast(`Saved itinerary: ${newTrip.title}! (Sign in to sync)`, 'success');
    }
    return newId;
  };

  const removePlannedTrip = async (id: string) => {
    if (currentUser) {
      try {
        await deleteDoc(doc(db, 'users', currentUser.uid, 'plannedTrips', id));
        addToast('Removed itinerary from your Google account', 'info');
      } catch (err) {
        console.error('Error deleting trip from Firestore:', err);
      }
    } else {
      setPlannedTrips((prev) => prev.filter((t) => t.id !== id));
      addToast('Removed itinerary from My Journey', 'info');
    }
  };

  const toggleTripDayComplete = async (tripId: string, dayIndex: number) => {
    const updatedTrips = plannedTrips.map((t) => {
      if (t.id !== tripId) return t;
      const newDays = [...t.days];
      if (newDays[dayIndex]) {
        newDays[dayIndex] = {
          ...newDays[dayIndex],
          completed: !newDays[dayIndex].completed,
        };
      }
      return { ...t, days: newDays };
    });

    setPlannedTrips(updatedTrips);

    if (currentUser) {
      const trip = updatedTrips.find((t) => t.id === tripId);
      if (trip) {
        try {
          await setDoc(doc(db, 'users', currentUser.uid, 'plannedTrips', tripId), {
            ...trip,
            userId: currentUser.uid,
          }, { merge: true });
        } catch (err) {
          console.error('Error updating trip day in Firestore:', err);
        }
      }
    }
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
        currentUser,
        isAuthLoading,
        loginWithGoogle,
        logout,
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
