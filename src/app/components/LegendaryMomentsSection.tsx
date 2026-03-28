import { Flame, Star, Trophy, Zap } from 'lucide-react';
import { Card } from './ui/card';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScrollAnimationWrapper } from './ScrollAnimations';

const legendaryMoments = [
  { year: '1930', country: 'Uruguay', title: 'Le tout premier but', description: "Lucien Laurent inscrit le premier but de l'histoire de la Coupe du Monde", image: 'https://images.unsplash.com/photo-1725531142453-1d6e504730ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwxOTMwcyUyMHZpbnRhZ2UlMjBmb290YmFsbCUyMHNvY2NlciUyMGhpc3RvcmljfGVufDF8fHx8MTc3NDcwNzgxMXww&ixlib=rb-4.1.0&q=80&w=1080', icon: Star, iconic: false, size: 'normal', era: 'ancient' },
  { year: '1950', country: 'Brésil', title: 'Le Maracanazo', description: "Uruguay bat le Brésil devant 200 000 spectateurs dans le plus grand choc de l'histoire", image: 'https://images.unsplash.com/photo-1705668417201-3b220daa1aa1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc3RhZGl1bSUyMGZvb3RiYWxsJTIwaGlzdG9yaWMlMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc3NDcwNzgxM3ww&ixlib=rb-4.1.0&q=80&w=1080', icon: Flame, iconic: true, size: 'large', era: 'ancient' },
  { year: '1958', country: 'Suède', title: 'La révélation de Pelé', description: 'À 17 ans, Pelé devient le plus jeune vainqueur et inscrit un doublé en finale', image: 'https://images.unsplash.com/photo-1681913298807-9eb962501bf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQZWxlJTIwQnJhemlsJTIwMTk1OCUyMHdvcmxkJTIwY3VwJTIwc29jY2VyfGVufDF8fHx8MTc3NDcwNzgxMXww&ixlib=rb-4.1.0&q=80&w=1080', icon: Star, iconic: true, size: 'normal', era: 'ancient' },
  { year: '1966', country: 'Angleterre', title: 'Le but fantôme', description: "Le but controversé de Geoff Hurst qui offre le titre à l'Angleterre", image: 'https://images.unsplash.com/photo-1572296231939-e160c3814236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB3b3JsZCUyMGN1cCUyMGhpc3RvcmljJTIwY2VsZWJyYXRpb24lMjBmYW5zfGVufDF8fHx8MTc3NDcwNzgxNnww&ixlib=rb-4.1.0&q=80&w=1080', icon: Zap, iconic: false, size: 'normal', era: 'ancient' },
  { year: '1970', country: 'Mexique', title: 'Le Brésil légendaire', description: 'La Seleção de Pelé, considérée comme la plus grande équipe de tous les temps', image: 'https://images.unsplash.com/photo-1632184671104-f1808ac46352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmF6aWwlMjBmb290YmFsbCUyMHRlYW0lMjB5ZWxsb3clMjBqZXJzZXklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzQ3MDc4MTd8MA&ixlib=rb-4.1.0&q=80&w=1080', icon: Trophy, iconic: true, size: 'large', era: 'modern' },
  { year: '1986', country: 'Mexique', title: 'Maradona et le but du siècle', description: 'De "La Main de Dieu" au plus beau but de l\'histoire en quelques minutes', image: 'https://images.unsplash.com/photo-1762805026672-7fca71270a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEaWVnbyUyME1hcmFkb25hJTIwQXJnZW50aW5hJTIwZm9vdGJhbGwlMjBsZWdlbmR8ZW58MXx8fHwxNzc0NzA3ODEyfDA&ixlib=rb-4.1.0&q=80&w=1080', icon: Flame, iconic: true, size: 'featured', era: 'modern' },
  { year: '1998', country: 'France', title: 'Les Bleus champions du monde', description: 'Zidane et ses deux buts en finale offrent le premier titre à la France', image: 'https://images.unsplash.com/photo-1572296231939-e160c3814236?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB3b3JsZCUyMGN1cCUyMGhpc3RvcmljJTIwY2VsZWJyYXRpb24lMjBmYW5zfGVufDF8fHx8MTc3NDcwNzgxNnww&ixlib=rb-4.1.0&q=80&w=1080', icon: Star, iconic: true, size: 'normal', era: 'modern' },
  { year: '2006', country: 'Allemagne', title: 'Le coup de tête de Zidane', description: 'Le moment iconique et controversé de la dernière finale de Zidane', image: 'https://images.unsplash.com/photo-1759447946445-397b1c034768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHZXJtYW55JTIwZm9vdGJhbGwlMjB0ZWFtJTIwd29ybGQlMjBjdXB8ZW58MXx8fHwxNzc0NzA3ODE4fDA&ixlib=rb-4.1.0&q=80&w=1080', icon: Zap, iconic: false, size: 'normal', era: 'current' },
  { year: '2014', country: 'Brésil', title: "L'humiliation historique", description: "Allemagne 7-1 Brésil : le score le plus improbable de l'histoire", image: 'https://images.unsplash.com/photo-1759447946445-397b1c034768?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHZXJtYW55JTIwZm9vdGJhbGwlMjB0ZWFtJTIwd29ybGQlMjBjdXB8ZW58MXx8fHwxNzc0NzA3ODE4fDA&ixlib=rb-4.1.0&q=80&w=1080', icon: Flame, iconic: true, size: 'large', era: 'current' },
  { year: '2022', country: 'Qatar', title: 'Le sacre de Messi', description: 'Après une finale épique, Lionel Messi réalise enfin son rêve ultime', image: 'https://images.unsplash.com/photo-1671016233693-53162078ca1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMaW9uZWwlMjBNZXNzaSUyMEFyZ2VudGluYSUyMHdvcmxkJTIwY3VwJTIwdHJvcGh5JTIwMjAyMnxlbnwxfHx8fDE3NzQ3MDc4MTN8MA&ixlib=rb-4.1.0&q=80&w=1080', icon: Trophy, iconic: true, size: 'featured', era: 'current' },
];

function getEraColor(era: string) {
  switch (era) {
    case 'ancient': return '#0f4f30';
    case 'modern': return '#1b3c88';
    case 'current': return '#d72638';
    default: return '#1b3c88';
  }
}

export function LegendaryMomentsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(Math.max((viewportHeight - rect.top) / (sectionHeight + viewportHeight), 0), 1);
      setLineProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-[#1b3c88] via-[#0f4f30] to-[#1b3c88] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-32 w-96 h-96 border-4 border-white rounded-full"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 relative">
        <ScrollAnimationWrapper className="text-center mb-20">
          <div className="inline-block px-4 py-2 bg-white/10 text-white rounded-full mb-6 text-sm backdrop-blur-sm">
            Histoire du football
          </div>
          <h2 className="text-6xl text-white mb-6 leading-tight">
            Les moments qui ont<br />
            <span className="text-white">marqué l'histoire</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Des exploits légendaires aux finales mythiques, revivez la Coupe du Monde à travers le temps
          </p>
        </ScrollAnimationWrapper>

        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 transform -translate-x-1/2 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[#0f4f30] via-[#1b3c88] to-[#d72638] rounded-full"
              style={{ height: `${lineProgress * 100}%` }}
            />
          </div>

          <div className="space-y-16">
            {legendaryMoments.map((moment, index) => {
              const isLeft = index % 2 === 0;
              const IconComponent = moment.icon;
              const eraColor = getEraColor(moment.era);

              return (
                <ScrollAnimationWrapper
                  key={index}
                  direction={isLeft ? 'left' : 'right'}
                  delay={0.1}
                >
                  <div className={`relative flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col gap-8`}>
                    <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-5 h-5 rounded-full ${moment.iconic ? 'ring-4 animate-pulse' : ''}`}
                        style={{
                          backgroundColor: moment.iconic ? eraColor : 'rgba(255,255,255,0.4)',
                          boxShadow: moment.iconic ? `0 0 20px ${eraColor}50` : 'none',
                          ringColor: `${eraColor}40`,
                        }}
                      ></div>
                    </div>

                    <div className="hidden lg:block flex-1"></div>

                    <Card
                      className={`flex-1 bg-white/5 backdrop-blur-md border-0 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl ${
                        moment.size === 'featured' ? 'lg:scale-110 shadow-2xl' : moment.size === 'large' ? 'lg:scale-105 shadow-xl' : 'shadow-lg'
                      } ${moment.iconic ? 'ring-2' : ''}`}
                      style={{ ringColor: moment.iconic ? `${eraColor}40` : 'transparent' }}
                      data-year={moment.year === '2022' ? '2022' : undefined}
                    >
                      <div className="relative h-64">
                        <img
                          src={moment.image}
                          alt={moment.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                        {moment.iconic && (
                          <div
                            className="absolute top-4 right-4 px-4 py-2 text-white rounded-full text-sm flex items-center gap-2 shadow-lg"
                            style={{ backgroundColor: eraColor }}
                          >
                            <Flame className="w-4 h-4" />
                            <span>Moment iconique</span>
                          </div>
                        )}

                        <div
                          className="absolute bottom-4 left-4 w-12 h-12 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${eraColor}dd` }}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div style={{ color: eraColor }} className="text-3xl">{moment.year}</div>
                          <div className="h-6 w-px bg-white/20"></div>
                          <div className="text-white/70">{moment.country}</div>
                        </div>
                        <h3 className="text-2xl text-white mb-3 group-hover:text-[#d72638] transition-colors">
                          {moment.title}
                        </h3>
                        <p className="text-white/80 leading-relaxed">{moment.description}</p>
                      </div>
                    </Card>
                  </div>
                </ScrollAnimationWrapper>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-20">
          <button className="px-10 py-4 bg-[#d72638] hover:bg-[#b81e2e] text-white rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl hover:shadow-[#d72638]/30">
            Découvrir toute l'histoire
          </button>
        </div>
      </div>
    </section>
  );
}