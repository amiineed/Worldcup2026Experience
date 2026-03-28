import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

export function MessiEasterEgg() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const legendarySection = document.querySelector('[data-year="2022"]');
      if (legendarySection && !hasTriggered) {
        const rect = legendarySection.getBoundingClientRect();
        const isInView = rect.top >= 0 && rect.top <= window.innerHeight / 2;
        if (isInView) {
          setIsVisible(true);
          setHasTriggered(true);
          const duration = 3000;
          const animationEnd = Date.now() + duration;
          const colors = ['#d72638', '#1b3c88', '#0f4f30', '#ffffff'];
          const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
          const interval = setInterval(() => {
            if (Date.now() > animationEnd) {
              clearInterval(interval);
              setTimeout(() => setIsVisible(false), 2000);
              return;
            }
            confetti({
              particleCount: 3,
              angle: randomInRange(55, 125),
              spread: randomInRange(50, 70),
              origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 },
              colors,
              startVelocity: 30,
              gravity: 0.8,
            });
          }, 50);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasTriggered]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-[60] pointer-events-none"
    >
      <div className="bg-gradient-to-r from-[#d72638] to-[#1b3c88] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3">
        <span className="text-3xl">🏆</span>
        <div>
          <div className="text-lg">Le moment Messi !</div>
          <div className="text-sm opacity-80">Une légende qui s'écrit</div>
        </div>
      </div>
    </motion.div>
  );
}
