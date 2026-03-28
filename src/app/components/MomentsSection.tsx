import { Play, Star } from 'lucide-react';
import { Card } from './ui/card';
import { ScrollAnimationWrapper, StaggerContainer, StaggerItem } from './ScrollAnimations';
import { useAppContext } from '../App';

const moments = [
  {
    image: 'https://images.unsplash.com/photo-1764438344341-d4700ad674f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXIlMjBjZWxlYnJhdGlvbiUyMGdvYWx8ZW58MXx8fHwxNzc0NzAwMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Le but du siècle',
    subtitle: 'Finale 2022',
    highlight: true,
  },
  {
    image: 'https://images.unsplash.com/photo-1735588024511-bea738d2ce30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGZhbnMlMjBjZWxlYnJhdGluZyUyMHN0YWRpdW18ZW58MXx8fHwxNzc0NzAwMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'La passion des supporters',
    subtitle: 'Ambiance inoubliable',
    highlight: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1765130729366-b54d7b2c8ea2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBtYXRjaCUyMG5pZ2h0JTIwc3RhZGl1bSUyMGxpZ2h0c3xlbnwxfHx8fDE3NzQ3MDAyODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Match sous les étoiles',
    subtitle: 'Demi-finale épique',
    highlight: false,
  },
  {
    image: 'https://images.unsplash.com/photo-1561580726-1bd7aed04eb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHRyb3BoeSUyMGdvbGQlMjBjdXB8ZW58MXx8fHwxNzc0NzAwMjg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Le trophée tant convoité',
    subtitle: 'Le rêve ultime',
    highlight: false,
  },
];

export function MomentsSection() {
  const { isDarkMode } = useAppContext();

  return (
    <section id="moments" className={`py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-block px-4 py-2 bg-[#d72638]/10 text-[#d72638] rounded-full mb-4 text-sm">
              Instants Iconiques
            </div>
            <h2 className={`text-5xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
              Revivez les moments forts
            </h2>
          </div>
          <button className="text-[#d72638] hover:text-[#b81e2e] transition-colors flex items-center gap-2">
            Voir tout
            <span className="text-xl">→</span>
          </button>
        </div>

        <ScrollAnimationWrapper>
          <StaggerContainer>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {moments.map((moment, index) => (
                <StaggerItem key={index}>
                  <Card
                    className={`group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                      index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <div className={`relative ${index === 0 ? 'h-[500px]' : 'h-[240px]'}`}>
                      <img
                        src={moment.image}
                        alt={moment.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                      {moment.highlight && (
                        <div className="absolute top-4 right-4 bg-[#d72638] text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 fill-current" />
                          <span>Favori des fans</span>
                        </div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 text-[#1b3c88] fill-current ml-1" />
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-[#d72638] text-sm mb-1">{moment.subtitle}</div>
                        <h3 className={`text-white ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                          {moment.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}
