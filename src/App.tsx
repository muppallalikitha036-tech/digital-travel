import React from 'react';
import { JourneyProvider, useJourney } from './context/JourneyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { WanderAIChat } from './components/WanderAIChat';
import { CinematicVideoBackground } from './components/CinematicVideoBackground';
import { RegionalSoundVisualizer } from './components/RegionalSoundVisualizer';
import { AnimateImageModal } from './components/AnimateImageModal';

// Pages
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationDetailPage } from './pages/DestinationDetailPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { TripPlannerPage } from './pages/TripPlannerPage';
import { MyJourneyPage } from './pages/MyJourneyPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { TravelQuizPage } from './pages/TravelQuizPage';
import { AboutPage } from './pages/AboutPage';

const AppContent: React.FC = () => {
  const { currentPath, toasts } = useJourney();

  // Route matching logic
  const renderCurrentView = () => {
    // Exact paths
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/destinations') {
      return <DestinationsPage />;
    }
    if (currentPath.startsWith('/destinations/')) {
      const destinationId = currentPath.replace('/destinations/', '').split('/')[0];
      return <DestinationDetailPage destinationId={destinationId} />;
    }
    if (currentPath === '/experiences') {
      return <ExperiencesPage />;
    }
    if (currentPath.startsWith('/experiences/')) {
      const experienceId = currentPath.replace('/experiences/', '').split('/')[0];
      return <ExperienceDetailPage experienceId={experienceId} />;
    }
    if (currentPath === '/planner') {
      return <TripPlannerPage />;
    }
    if (currentPath === '/journey') {
      return <MyJourneyPage />;
    }
    if (currentPath === '/stories') {
      return <StoriesPage />;
    }
    if (currentPath.startsWith('/stories/')) {
      const storyId = currentPath.replace('/stories/', '').split('/')[0];
      return <StoryDetailPage storyId={storyId} />;
    }
    if (currentPath === '/quiz') {
      return <TravelQuizPage />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }

    // Default fallback
    return <HomePage />;
  };

  return (
    <div className="relative min-h-screen bg-[#070B12] text-slate-100 flex flex-col font-sans">
      {/* Living 4K Cinematic Video Background for ALL Pages */}
      <CinematicVideoBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 relative z-10">{renderCurrentView()}</main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <SearchModal />
      <WanderAIChat />
      <RegionalSoundVisualizer />
      <AnimateImageModal />

      {/* Toast Notification Container */}
      <div
        aria-live="polite"
        className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold backdrop-blur-xl border flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'info'
                ? 'bg-[#0E1526]/90 border-white/10 text-slate-200'
                : 'bg-[#0E1526]/90 border-amber-400/40 text-amber-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>{toast.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <JourneyProvider>
      <AppContent />
    </JourneyProvider>
  );
}
