import { Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../App';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const { isDarkMode } = useAppContext();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1705593973313-75de7bf95b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMGN1cCUyMHN0YWRpdW0lMjBjcm93ZCUyMGF0bW9zcGhlcmV8ZW58MXx8fHwxNzc0NzAwMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="World Cup Stadium"
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#d72638]/40 via-[#1b3c88]/60 to-[#0f4f30]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-8 max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-3 text-white"
        >
          <div className="h-px w-12 bg-white/60"></div>
          <Trophy className="w-6 h-6" />
          <div className="h-px w-12 bg-white/60"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-7xl text-white mb-6 max-w-4xl leading-tight"
        >
          Unite the World <br />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="bg-gradient-to-r from-[#d72638] to-[#1b3c88] bg-clip-text text-transparent"
          >
            Through Football
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xl text-white/90 mb-10 max-w-2xl"
        >
          Rejoignez des millions de fans à travers le globe. Vivez chaque match,
          partagez chaque émotion, célébrez chaque victoire ensemble.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <Button
            size="lg"
            className="relative bg-[#1b3c88] hover:bg-[#152e6b] text-white px-10 py-6 text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[#1b3c88]/50 group overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></span>
            <span className="relative">Rejoindre l'expérience</span>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="absolute bottom-12 left-0 right-0 flex justify-center gap-16"
        >
          {[
            { value: '195+', label: 'Pays Connectés' },
            { value: '10M+', label: 'Fans Actifs' },
            { value: '64', label: 'Matchs Live' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
