import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { ExperienceSection } from './ExperienceSection';
import { MomentsSection } from './MomentsSection';
import { TournamentSection } from './TournamentSection';
import { LegendaryMomentsSection } from './LegendaryMomentsSection';
import { StatsSection } from './StatsSection';
import { PredictionsSection } from './PredictionsSection';
import { CommunitySection } from './CommunitySection';
import { FanInteractionSection } from './FanInteractionSection';
import { Footer } from './Footer';
import { MessiEasterEgg } from './MessiEasterEgg';
import { GoalToast } from './GoalToast';
import { useAppContext } from '../App';

export function HomePage() {
  const { isDarkMode, isLoggedIn } = useAppContext();

  return (
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
  );
}
