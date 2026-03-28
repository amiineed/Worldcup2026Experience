import { X, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setTimeout(() => {
      onSuccess?.();
      setStatus('idle');
      setEmail('');
      setPassword('');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] overflow-hidden"
          >
            <div className="relative bg-gradient-to-br from-[#d72638] to-[#1b3c88] text-white p-8 pb-12">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 border-4 border-white rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border-4 border-white rounded-full translate-y-8 -translate-x-8"></div>
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative">
                <h2 className="text-3xl mb-2">Connexion</h2>
                <p className="text-white/80">Accédez à votre espace fan</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">Adresse email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1b3c88] focus:outline-none focus:ring-2 focus:ring-[#1b3c88]/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-gray-700 mb-2">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#1b3c88] focus:outline-none focus:ring-2 focus:ring-[#1b3c88]/20 transition-all"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">Veuillez remplir tous les champs</span>
                  </motion.div>
                )}
                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">Connexion réussie !</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-right">
                <a href="#" className="text-sm text-[#1b3c88] hover:text-[#d72638] transition-colors">Mot de passe oublié ?</a>
              </div>

              <button
                type="submit"
                disabled={status === 'success'}
                className="w-full bg-[#1b3c88] hover:bg-[#152e6b] text-white py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'success' ? 'Connexion en cours...' : 'Se connecter'}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">ou</span></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-lg hover:border-[#1b3c88] hover:bg-[#1b3c88]/5 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" fill="#1877F2" />
                  </svg>
                  <span className="text-sm text-gray-700">Facebook</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-3 border-2 border-gray-200 rounded-lg hover:border-[#d72638] hover:bg-[#d72638]/5 transition-all">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-sm text-gray-700">Google</span>
                </button>
              </div>

              <div className="text-center pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-600">Vous n'avez pas de compte ? </span>
                <a href="#" className="text-sm text-[#1b3c88] hover:text-[#d72638] transition-colors">Créer un compte</a>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
