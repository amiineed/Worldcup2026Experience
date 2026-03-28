import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useAppContext } from '../App';
import { ScrollAnimationWrapper } from './ScrollAnimations';
import { useState } from 'react';
import { CommunityModal } from './CommunityModal';

export function CommunitySection() {
  const { isDarkMode } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="community" className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#0b0b0b]' : 'bg-[#f4f2ee]'}`}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollAnimationWrapper direction="left">
            <div className="inline-block px-4 py-2 bg-[#1b3c88]/10 text-[#1b3c88] rounded-full mb-6 text-sm">
              Communauté Mondiale
            </div>
            <h2 className={`text-5xl mb-6 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
              Rejoignez 10 millions<br />de fans connectés
            </h2>
            <p className={`text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
              De Tokyo à Rio, de Paris à Sydney, des millions de supporters partagent
              leur passion en temps réel. Faites partie de cette communauté mondiale
              qui vit et respire football.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { val: '195', label: 'Pays' },
                { val: '10M+', label: 'Fans actifs' },
                { val: '24/7', label: 'En ligne' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl text-[#d72638] mb-1">{s.val}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>{s.label}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-[#1b3c88] hover:bg-[#152e6b] text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Rejoindre la communauté
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper direction="right">
            <div className={`relative h-[500px] rounded-3xl shadow-2xl overflow-hidden p-8 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
              <img
                src="https://images.unsplash.com/photo-1742415105376-43d3a5fd03fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGRpZ2l0YWwlMjBuZXR3b3JrJTIwY29ubmVjdGlvbnxlbnwxfHx8fDE3NzQ3MDAyODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="World Map"
                className="w-full h-full object-cover opacity-20"
              />

              {[
                { top: '30%', left: '20%', color: '#d72638' },
                { top: '45%', left: '60%', color: '#1b3c88' },
                { top: '60%', left: '35%', color: '#d72638' },
                { top: '25%', left: '80%', color: '#1b3c88' },
                { top: '70%', left: '15%', color: '#0f4f30' },
              ].map((dot, i) => (
                <div key={i} className="absolute animate-pulse" style={{ top: dot.top, left: dot.left, animationDelay: `${i * 150}ms` }}>
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: dot.color }}></div>
                    <div className="absolute inset-0 w-4 h-4 rounded-full animate-ping" style={{ backgroundColor: dot.color }}></div>
                  </div>
                </div>
              ))}

              <div className={`absolute top-8 right-8 rounded-xl shadow-xl p-4 border-l-4 border-[#d72638] ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-[#d72638]" />
                  <div className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>En ce moment</div>
                </div>
                <div className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>124,587</div>
                <div className={`text-xs ${isDarkMode ? 'text-white/40' : 'text-gray-500'}`}>Fans en ligne</div>
              </div>

              <div className="absolute bottom-8 left-8 bg-gradient-to-r from-[#1b3c88] to-[#d72638] text-white rounded-xl shadow-xl px-6 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="text-xs text-white/80">Activité en direct</div>
                </div>
                <div className="text-lg">195 pays connectés</div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
      <CommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}