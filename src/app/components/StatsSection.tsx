import { TrendingUp, Flag, Users } from 'lucide-react';
import { Card } from './ui/card';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const stats = [
  {
    icon: TrendingUp,
    value: 127,
    label: 'Buts marqués',
    sublabel: 'Meilleur buteur',
    player: 'Lionel Messi',
    trend: '+12',
    color: 'bg-[#d72638]',
  },
  {
    icon: Flag,
    value: 64,
    label: 'Matchs joués',
    sublabel: 'Phase finale',
    player: 'Sur 8 stades',
    trend: '100%',
    color: 'bg-[#1b3c88]',
  },
  {
    icon: Users,
    value: 32,
    label: 'Équipes qualifiées',
    sublabel: 'Représentant',
    player: '5 continents',
    trend: 'Globe',
    color: 'bg-[#d72638]',
  },
];

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return <>{count}</>;
}

export function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="stats" className="py-24 bg-gradient-to-br from-[#1b3c88] to-[#0f4f30] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 border-4 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-white rounded-full"></div>
      </div>

      <div ref={ref} className="max-w-[1440px] mx-auto px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 text-white rounded-full mb-4 text-sm">
            Données en temps réel
          </div>
          <h2 className="text-5xl text-white mb-4">
            Les chiffres de la compétition
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Toutes les statistiques clés mises à jour en direct
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 hover:-translate-y-2">
                <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mb-6`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <div className="text-6xl text-white">
                      <AnimatedCounter value={stat.value} inView={inView} />
                    </div>
                    <div className="px-3 py-1 bg-[#d72638]/30 text-[#d72638] rounded-full text-sm">
                      {stat.trend}
                    </div>
                  </div>
                  <div className="text-xl text-white/90">{stat.label}</div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="text-sm text-white/60 mb-1">{stat.sublabel}</div>
                  <div className="text-lg text-white">{stat.player}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-2xl text-white mb-1">Progression du tournoi</div>
              <div className="text-white/70">Phase finale en cours</div>
            </div>
            <div className="text-4xl text-[#d72638]">78%</div>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#d72638] to-[#1b3c88] rounded-full"
              initial={{ width: 0 }}
              animate={inView ? { width: '78%' } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
