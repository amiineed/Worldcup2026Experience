import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const goalNotifications = [
  '⚽ BUT ! Brésil marque à la 67\' !',
  '⚽ GOAAAAL ! Espagne égalise !',
  '⚽ BUT ! Neymar Jr. double la mise !',
];

export function GoalToast() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const msg = goalNotifications[Math.floor(Math.random() * goalNotifications.length)];
      setToast(msg);
      setTimeout(() => setToast(null), 4000);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className="fixed top-20 left-1/2 z-[80] bg-gradient-to-r from-[#d72638] to-[#1b3c88] text-white px-8 py-4 rounded-full shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-2xl"
            >
              ⚽
            </motion.span>
            <span className="text-lg">{toast}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
