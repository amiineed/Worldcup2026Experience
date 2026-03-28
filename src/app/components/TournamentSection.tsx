import { Trophy, Circle } from 'lucide-react';
import { Card } from './ui/card';
import { useAppContext } from '../App';
import { ScrollAnimationWrapper } from './ScrollAnimations';

const groupStandings = [
  { rank: 1, team: 'France', flag: '🇫🇷', played: 3, points: 7, goalDiff: '+5', qualified: true },
  { rank: 2, team: 'Argentine', flag: '🇦🇷', played: 3, points: 6, goalDiff: '+3', qualified: true },
  { rank: 3, team: 'Allemagne', flag: '🇩🇪', played: 3, points: 4, goalDiff: '+1', qualified: false },
  { rank: 4, team: 'Australie', flag: '🇦🇺', played: 3, points: 0, goalDiff: '-9', qualified: false },
];

const liveMatches = [
  { teamA: 'Brésil', flagA: '🇧🇷', teamB: 'Croatie', flagB: '🇭🇷', scoreA: 2, scoreB: 1, minute: 67, status: 'LIVE' },
  { teamA: 'Espagne', flagA: '🇪🇸', teamB: 'Portugal', flagB: '🇵🇹', scoreA: 1, scoreB: 1, minute: 82, status: 'LIVE' },
];

const keyMoments = [
  { time: "67'", type: 'goal', team: 'Brésil', player: 'Neymar Jr.', icon: '⚽' },
  { time: "64'", type: 'card', team: 'Croatie', player: 'Modrić', icon: '🟨' },
  { time: "58'", type: 'goal', team: 'Espagne', player: 'Morata', icon: '⚽' },
  { time: "45'", type: 'card', team: 'Portugal', player: 'Fernandes', icon: '🟥' },
];

export function TournamentSection() {
  const { isDarkMode } = useAppContext();

  return (
    <section id="tournament" className={`py-24 transition-colors duration-500 ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="max-w-[1440px] mx-auto px-8">
        <ScrollAnimationWrapper className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#1b3c88]/10 text-[#1b3c88] rounded-full mb-4 text-sm">
            En temps réel
          </div>
          <h2 className={`text-5xl mb-4 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
            Suivez le tournoi en direct
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-white/60' : 'text-gray-600'}`}>
            Classements, scores et moments clés en temps réel
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className={`lg:col-span-2 p-8 rounded-2xl border-0 shadow-lg ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#f4f2ee]'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>
                Classement - Groupe A
              </h3>
              <Trophy className="w-6 h-6 text-[#d72638]" />
            </div>

            <div className={`rounded-xl overflow-hidden shadow-sm ${isDarkMode ? 'bg-[#0b0b0b]' : 'bg-white'}`}>
              <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#1b3c88] text-white text-sm">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Équipe</div>
                <div className="col-span-2 text-center">MJ</div>
                <div className="col-span-2 text-center">Diff.</div>
                <div className="col-span-2 text-center">Pts</div>
              </div>

              {groupStandings.map((team) => (
                <div
                  key={team.rank}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 border-b transition-colors ${
                    isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-100 hover:bg-[#f4f2ee]'
                  } ${team.qualified ? `${isDarkMode ? 'bg-[#1b3c88]/10' : 'bg-[#1b3c88]/5'} border-l-4 border-l-[#1b3c88]` : ''}`}
                >
                  <div className={`col-span-1 ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>{team.rank}</div>
                  <div className="col-span-5 flex items-center gap-3">
                    <span className="text-3xl">{team.flag}</span>
                    <span className={isDarkMode ? 'text-white' : 'text-[#1b3c88]'}>{team.team}</span>
                    {team.qualified && (
                      <span className="px-2 py-1 bg-[#1b3c88] text-white text-xs rounded-full">Qualifié</span>
                    )}
                  </div>
                  <div className={`col-span-2 text-center ${isDarkMode ? 'text-white/50' : 'text-gray-600'}`}>{team.played}</div>
                  <div className={`col-span-2 text-center ${team.goalDiff.startsWith('+') ? 'text-green-500' : 'text-[#d72638]'}`}>
                    {team.goalDiff}
                  </div>
                  <div className={`col-span-2 text-center ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>{team.points}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#1b3c88] to-[#0f4f30] p-8 rounded-2xl border-0 shadow-lg text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl">Moments forts</h3>
              <div className="w-3 h-3 bg-[#d72638] rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-4">
              {keyMoments.map((moment, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-2xl">
                    {moment.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#d72638]">{moment.time}</span>
                      <span className="text-xs text-white/60">•</span>
                      <span className="text-sm text-white/80">{moment.team}</span>
                    </div>
                    <div className="text-white/90">{moment.player}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 bg-[#d72638] hover:bg-[#b81e2e] text-white py-3 rounded-full transition-colors">
              Voir tous les événements
            </button>
          </Card>
        </div>

        <div className="mt-8">
          <h3 className={`text-2xl mb-6 ${isDarkMode ? 'text-white' : 'text-[#1b3c88]'}`}>Matchs en direct</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveMatches.map((match, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-[#1b3c88] to-[#0f4f30] p-6 rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#d72638] text-white rounded-full text-sm">
                    <Circle className="w-3 h-3 fill-current animate-pulse" />
                    <span>LIVE</span>
                  </div>
                  <div className="text-[#d72638] text-lg">{match.minute}'</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-4xl">{match.flagA}</span>
                      <span className="text-xl text-white">{match.teamA}</span>
                    </div>
                    <div className="text-4xl text-white">{match.scoreA}</div>
                  </div>
                  <div className="h-px bg-white/20"></div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-4xl">{match.flagB}</span>
                      <span className="text-xl text-white">{match.teamB}</span>
                    </div>
                    <div className="text-4xl text-white">{match.scoreB}</div>
                  </div>
                </div>

                <button className="w-full mt-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-3 rounded-full transition-colors border border-white/20">
                  Voir le match en détail
                </button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
