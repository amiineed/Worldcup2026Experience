import { X, MessageCircle, Users, Globe, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommunityModal({ isOpen, onClose }: CommunityModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden"
          >
            <div className="relative bg-gradient-to-br from-[#0f4f30] to-[#1b3c88] text-white p-8">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8" />
                <h2 className="text-2xl">Fan Community</h2>
              </div>
              <p className="text-white/80 text-sm">L'espace de rencontre des supporters du monde entier</p>
            </div>

            <div className="p-8 space-y-5">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                <MessageCircle className="w-6 h-6 text-[#1b3c88] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Chat en direct</h3>
                  <p className="text-sm text-gray-600">Discutez en temps réel pendant les matchs avec des fans du monde entier.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl">
                <Globe className="w-6 h-6 text-[#0f4f30] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Forums par équipe</h3>
                  <p className="text-sm text-gray-600">Rejoignez les discussions dédiées à votre équipe favorite.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl">
                <Rocket className="w-6 h-6 text-[#e8b84b] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Bientôt disponible</h3>
                  <p className="text-sm text-gray-600">Ces fonctionnalités communautaires seront disponibles avant le coup d'envoi de la Coupe du Monde 2026.</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-[#1b3c88] hover:bg-[#152e6b] text-white py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                J'ai compris, tenez-moi informé
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
