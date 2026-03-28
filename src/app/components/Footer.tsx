import { Trophy, Mail, Shield } from 'lucide-react';
import { useAppContext } from '../App';

export function Footer() {
  const { isDarkMode } = useAppContext();

  return (
    <footer className={`pt-16 pb-8 transition-colors duration-500 ${isDarkMode ? 'bg-[#0b0b0b] text-white' : 'bg-[#1b3c88] text-white'}`}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3 max-w-fit mx-auto">
            <Shield className="w-4 h-4 text-white/60" />
            <span className="text-sm text-white/60">
              Prototype conceptuel – non affilié à la FIFA
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#d72638] to-[#1b3c88] rounded-lg flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-xl">World Cup</div>
                <div className="text-xs text-white/60">2026 Experience</div>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Une expérience digitale conceptuelle pour vivre l'émotion de la Coupe du Monde et connecter les fans à travers le monde.
            </p>
          </div>

          <div>
            <h3 className="text-lg mb-4">Expérience</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Matchs en direct</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Calendrier</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Classements</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Équipes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4">Communauté</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Forum</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Challenges</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Récompenses</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Leaderboard</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-white/70">
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#d72638] transition-colors">Partenaires</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-xl">
            <h3 className="text-xl mb-3">Restez informé</h3>
            <p className="text-white/70 mb-4">Recevez les dernières actualités et offres exclusives</p>
            <div className="flex gap-3">
              <div className="flex-1 flex items-center bg-white/10 rounded-full px-5 py-3">
                <Mail className="w-5 h-5 text-white/60 mr-3" />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40"
                />
              </div>
              <button className="bg-[#d72638] hover:bg-[#b81e2e] text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div>Amine</div>
          <div className="text-xs">Prototype conceptuel – non affilié à la FIFA</div>
        </div>
      </div>
    </footer>
  );
}
