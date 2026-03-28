import { Target, Award, Medal, ChevronRight, Crown, Star } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useAppContext } from '../App';
import { ScrollAnimationWrapper } from './ScrollAnimations';

const predictions = [
  { matchId: 1, teamA: 'Angleterre', flagA: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', teamB: 'Pays-Bas', flagB: '🇳🇱', time: "Aujourd'hui à 20:00", reward: 50 },
  { matchId: 2, teamA: 'Italie', flagA: '🇮🇹', teamB: 'Belgique', flagB: '🇧🇪', time: 'Demain à 18:00', reward: 75 },
];

const challenges = [
  { title: 'Score exact du match', description: 'Devinez le score exact de France vs Argentine', difficulty: 'Expert', reward: 200, icon: Target, color: 'bg-[#d72638]' },
  { title: 'Prochain buteur', description: 'Qui marquera le prochain but ?', difficulty: 'Moyen', reward: 100, icon: Award, color: 'bg-[#1b3c88]' },
  { title: 'Meilleur joueur du match', description: 'Prédisez le MVP du jour', difficulty: 'Facile', reward: 50, icon: Medal, color: 'bg-[#0f4f30]' },
];

const leaderboard = [
  { rank: 1, username: 'FootballKing_FR', points: 12450, badge: '👑', level: 'Légende' },
  { rank: 2, username: 'GoalMaster2024', points: 11280, badge: '🏆', level: 'Expert' },
  { rank: 3, username: 'FanUltime', points: 10950, badge: '⭐', level: 'Expert' },
  { rank: 4, username: 'PredictionPro', points: 9870, badge: '🎯', level: 'Avancé' },
  { rank: 5, username: 'WorldCupFan', points: 8990, badge: '⚽', level: 'Avancé' },
];

export function PredictionsSection() {
  const { isDarkMode } = useAppContext();

  return (
    <section id="predictions" className={`py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#0b0b0b]' : 'bg-[#f4f2ee]'}`}>
      <div className="max-w-[1440px] mx-auto px-8">
        <ScrollAnimationWrapper className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#d72638]/10 text-[#d72638] rounded-full mb-4 text-sm">
            Engagement Fan
          </div>
          <h2 className={`text-5xl mb-4 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
            Faites vos prédictions
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Testez vos connaissances et gagnez des récompenses exclusives
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <h3 className={`text-2xl mb-6 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
              Prochains matchs à prédire
            </h3>

            {predictions.map((pred) => (
              <Card key={pred.matchId} className={`p-8 rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-500'}`}>{pred.time}</div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#d72638]/10 text-[#d72638] rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span>+{pred.reward} points</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="flex-1 text-center">
                      <div className="text-6xl mb-3">{pred.flagA}</div>
                      <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>{pred.teamA}</div>
                    </div>
                    <div className={`text-3xl ${isDarkMode ? 'text-white/20' : 'text-gray-300'}`}>VS</div>
                    <div className="flex-1 text-center">
                      <div className="text-6xl mb-3">{pred.flagB}</div>
                      <div className={`text-xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>{pred.teamB}</div>
                    </div>
                  </div>
                </div>

                <div className={`mb-4 text-center text-lg ${isDarkMode ? 'text-white/70' : 'text-gray-700'}`}>
                  Qui va gagner ce match ?
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button className={`py-4 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-[#1b3c88] hover:bg-[#1b3c88] hover:text-white ${isDarkMode ? 'bg-white/5 text-white' : 'bg-[#1b3c88]/10 text-[#1b3c88]'}`}>
                    <div className="text-2xl mb-1">{pred.flagA}</div>
                    <div className="text-sm">{pred.teamA}</div>
                  </button>
                  <button className={`py-4 rounded-xl transition-all duration-300 ${isDarkMode ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <div className="text-2xl mb-1">🤝</div>
                    <div className="text-sm">Match nul</div>
                  </button>
                  <button className={`py-4 rounded-xl transition-all duration-300 border-2 border-transparent hover:border-[#d72638] hover:bg-[#d72638] hover:text-white ${isDarkMode ? 'bg-white/5 text-white' : 'bg-[#d72638]/10 text-[#d72638]'}`}>
                    <div className="text-2xl mb-1">{pred.flagB}</div>
                    <div className="text-sm">{pred.teamB}</div>
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-br from-[#1b3c88] to-[#0f4f30] p-8 rounded-2xl border-0 shadow-xl h-fit sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-[#d72638]" />
              <h3 className="text-2xl text-white">Classement</h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div key={index} className={`p-4 rounded-xl transition-all duration-300 ${
                  index === 0 ? 'bg-[#d72638]/30 border-2 border-[#d72638]' : 'bg-white/10 hover:bg-white/15'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                      index === 0 ? 'bg-[#d72638] text-white' : 'bg-white/20 text-white'
                    }`}>
                      {index === 0 ? user.badge : user.rank}
                    </div>
                    <div className="flex-1">
                      <div className="text-white flex items-center gap-2">
                        <span>{user.username}</span>
                        {index < 3 && <span>{user.badge}</span>}
                      </div>
                      <div className="text-xs text-white/60">{user.level}</div>
                    </div>
                    <div className="text-[#d72638]">{user.points.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-[#d72638] hover:bg-[#b81e2e] text-white rounded-full">
              Voir le classement complet
            </Button>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>Défis du jour</h3>
            <button className="text-[#d72638] hover:text-[#b81e2e] transition-colors flex items-center gap-2">
              Voir tous les défis
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {challenges.map((challenge, index) => (
              <Card key={index} className={`p-6 rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer ${isDarkMode ? 'bg-[#121212] hover:bg-[#1a1a1a]' : 'bg-white'}`}>
                <div className={`w-14 h-14 ${challenge.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <challenge.icon className="w-7 h-7 text-white" />
                </div>

                <div className="mb-4">
                  <h4 className={`text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>{challenge.title}</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>{challenge.description}</p>
                </div>

                <div className={`flex items-center justify-between pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                  <span className={`px-3 py-1 rounded-full text-xs ${
                    challenge.difficulty === 'Expert' ? 'bg-[#d72638]/10 text-[#d72638]'
                      : challenge.difficulty === 'Moyen' ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-[#d72638]">
                    <Star className="w-4 h-4 fill-current" />
                    <span>+{challenge.reward}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="mt-12 bg-gradient-to-r from-[#1b3c88] to-[#d72638] p-8 rounded-2xl border-0 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-2xl text-white mb-1">Votre progression</div>
              <div className="text-white/70">Niveau 12 - Expert</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl text-white">8,450</div>
                <div className="text-sm text-white/70">points</div>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">🏆</div>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between text-sm text-white/80">
            <span>1,550 points jusqu'au niveau 13</span>
            <span>85%</span>
          </div>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white/40 w-[85%] rounded-full"></div>
          </div>
        </Card>
      </div>
    </section>
  );
}
