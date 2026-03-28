import { motion } from 'motion/react';

export function FootballLoader() {
  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-[#d72638] via-[#1b3c88] to-[#0f4f30] flex items-center justify-center">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-24 h-24 rounded-full border-4 border-white border-t-transparent"
        />

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.89-8.9L12 6l-.89 5.1L6 12l5.11.9L12 18l.89-5.1L18 12l-5.11-.9z" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
        >
          <p className="text-white text-lg">Chargement...</p>
        </motion.div>
      </div>
    </div>
  );
}
