import { Trophy, Globe, Menu, Sun, Moon, User, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect, useCallback, useRef } from 'react';
import { LoginModal } from './LoginModal';
import { useAppContext } from '../App';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const navLinks = [
  { href: '#experience', label: 'Expérience' },
  { href: '#moments', label: 'Moments Forts' },
  { href: '#stats', label: 'Statistiques' },
  { href: '#community', label: 'Communauté' },
];

export function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, setIsDarkMode, isLoggedIn, setIsLoggedIn } = useAppContext();

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ['experience', 'moments', 'stats', 'community'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setIsProfileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success('Déconnexion réussie', {
        description: 'À bientôt sur World Cup 2026 !',
      });
    } catch (err: any) {
      console.error('Logout error:', err);
      toast.error('Erreur lors de la déconnexion', {
        description: err.message || 'Veuillez réessayer.',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? isDarkMode
            ? 'bg-[#0b0b0b]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'
          : isDarkMode
            ? 'bg-transparent'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
      }`}>
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#d72638] to-[#1b3c88] rounded-lg flex items-center justify-center transition-transform hover:scale-105">
              <Trophy className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>World Cup</div>
              <div className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>2026 Experience</div>
            </div>
          </div>

          {/* Menu central */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-2 transition-colors duration-300 ${
                    isActive
                      ? isDarkMode ? 'text-[#d72638]' : 'text-[#1b3c88]'
                      : isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-700 hover:text-[#1b3c88]'
                  }`}
                >
                  {link.label}
                  {/* Animated underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#d72638] to-[#1b3c88] rounded-full"
                    initial={false}
                    animate={{ width: isActive ? '100%' : '0%' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  />
                </a>
              );
            })}
          </div>

          {/* Actions droite */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? 'sun' : 'moon'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>

            <Button variant="ghost" size="icon" className={`${isDarkMode ? 'text-white/70 hover:text-white' : 'text-gray-600'} hover:scale-110 transition-transform`}>
              <Globe className="w-5 h-5" />
            </Button>

            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`flex items-center gap-2 rounded-full pl-1 pr-3 py-1 transition-all duration-300 hover:scale-105 ${
                    isDarkMode
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#d72638] to-[#1b3c88] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''} ${isDarkMode ? 'text-white/70' : 'text-gray-600'}`} />
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden z-50 ${
                        isDarkMode
                          ? 'bg-[#1a1a1a] border-white/10'
                          : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#d72638] to-[#1b3c88] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Fan connecté</div>
                            <div className="flex items-center gap-1.5">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                              <span className={`text-xs ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>En ligne</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            toast('Mon Profil', { description: 'Fonctionnalité disponible prochainement 🚀' });
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            isDarkMode
                              ? 'text-white/80 hover:bg-white/10'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <User className="w-4 h-4" />
                          Mon Profil
                        </button>

                        <div className={`mx-3 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`} />

                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-red-500 ${
                            isDarkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                          } disabled:opacity-50`}
                        >
                          <LogOut className={`w-4 h-4 ${isLoggingOut ? 'animate-spin' : ''}`} />
                          {isLoggingOut ? 'Déconnexion...' : 'Déconnexion'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="bg-[#1b3c88] hover:bg-[#152e6b] text-white rounded-full px-6 hover:scale-105 hover:shadow-lg hover:shadow-[#1b3c88]/30 transition-all duration-300"
              >
                Se connecter
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onSuccess={handleLoginSuccess} />
    </>
  );
}