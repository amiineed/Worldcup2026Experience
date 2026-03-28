import { useState, useEffect, createContext, useContext } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { MomentsSection } from './components/MomentsSection';
import { TournamentSection } from './components/TournamentSection';
import { LegendaryMomentsSection } from './components/LegendaryMomentsSection';
import { StatsSection } from './components/StatsSection';
import { PredictionsSection } from './components/PredictionsSection';
import { CommunitySection } from './components/CommunitySection';
import { FanInteractionSection } from './components/FanInteractionSection';
import { Footer } from './components/Footer';
import { FootballLoader } from './components/UIEnhancements';
import { MessiEasterEgg } from './components/MessiEasterEgg';
import { GoalToast } from './components/GoalToast';

interface AppContextType {
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export const useAppContext = () => useContext(AppContext);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return <FootballLoader />;
  }

  return (
    <AppContext.Provider value={{ isDarkMode, setIsDarkMode, isLoggedIn, setIsLoggedIn }}>
      <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-[#0b0b0b] text-white' : 'bg-white text-gray-900'}`}>
        <Navbar />
        <main className="pt-[72px]">
          <HeroSection />
          <ExperienceSection />
          <MomentsSection />
          <TournamentSection />
          <LegendaryMomentsSection />
          <StatsSection />
          <PredictionsSection />
          <CommunitySection />
          {isLoggedIn && <FanInteractionSection />}
        </main>
        <Footer />
        <MessiEasterEgg />
        <GoalToast />
      </div>
    </AppContext.Provider>
  );
}