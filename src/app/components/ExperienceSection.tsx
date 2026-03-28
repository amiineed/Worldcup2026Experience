import { Tv, Users, Trophy } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollAnimationWrapper, StaggerContainer, StaggerItem } from './ScrollAnimations';
import { useAppContext } from '../App';

const experiences = [
  {
    icon: Tv,
    title: 'Suivi des matchs en direct',
    description: 'Suivez tous les matchs en temps réel avec des statistiques détaillées, des commentaires live et des notifications instantanées.',
    color: 'text-[#d72638]',
    bgColor: 'bg-[#d72638]/10',
    hoverGlow: 'hover:shadow-[#d72638]/20',
  },
  {
    icon: Users,
    title: 'Interaction entre fans',
    description: 'Connectez-vous avec des millions de supporters du monde entier. Débattez, partagez et célébrez ensemble chaque moment.',
    color: 'text-[#1b3c88]',
    bgColor: 'bg-[#1b3c88]/10',
    hoverGlow: 'hover:shadow-[#1b3c88]/20',
  },
  {
    icon: Trophy,
    title: 'Challenges & récompenses',
    description: 'Participez à des défis quotidiens, prédisez les résultats et gagnez des récompenses exclusives tout au long de la compétition.',
    color: 'text-[#d72638]',
    bgColor: 'bg-[#d72638]/10',
    hoverGlow: 'hover:shadow-[#d72638]/20',
  },
];

export function ExperienceSection() {
  const { isDarkMode } = useAppContext();

  return (
    <section id="experience" className={`py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#0b0b0b]' : 'bg-[#f4f2ee]'}`}>
      <div className="max-w-[1440px] mx-auto px-8">
        <ScrollAnimationWrapper className="text-center mb-16" direction="left">
          <div className="inline-block px-4 py-2 bg-[#1b3c88]/10 text-[#1b3c88] rounded-full mb-4 text-sm">
            Expérience Unique
          </div>
          <h2 className={`text-5xl mb-4 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
            Vivez la Coupe du Monde<br />comme jamais auparavant
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Une plateforme immersive qui transforme la façon dont vous vivez chaque match
          </p>
        </ScrollAnimationWrapper>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {experiences.map((exp, index) => (
            <StaggerItem key={index}>
              <Card className={`p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 hover:-translate-y-2 group ${exp.hoverGlow} ${
                isDarkMode ? 'bg-[#121212] hover:bg-[#1a1a1a]' : 'bg-white'
              }`}>
                <div className={`w-16 h-16 ${exp.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <exp.icon className={`w-8 h-8 ${exp.color}`} />
                </div>
                <h3 className={`text-2xl mb-4 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
                  {exp.title}
                </h3>
                <p className={`leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
                  {exp.description}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
