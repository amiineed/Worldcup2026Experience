import { Send, Flame, MessageCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollAnimationWrapper } from './ScrollAnimations';

interface Message {
  id: number;
  user: string;
  avatar: string;
  text: string;
  isOwn: boolean;
  time: string;
}

const initialMessages: Message[] = [
  { id: 1, user: 'Maria', avatar: '🇧🇷', text: 'Quel match incroyable ! Le Brésil est en feu 🔥', isOwn: false, time: '14:32' },
  { id: 2, user: 'Ahmed', avatar: '🇲🇦', text: 'Le Maroc va tous les surprendre cette année !', isOwn: false, time: '14:33' },
  { id: 3, user: 'Vous', avatar: '⚽', text: 'Je suis tellement excité pour la finale !', isOwn: true, time: '14:34' },
  { id: 4, user: 'John', avatar: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', text: 'England is coming home cette fois 🏆', isOwn: false, time: '14:35' },
  { id: 5, user: 'Yuki', avatar: '🇯🇵', text: 'Le Japon a montré un football magnifique', isOwn: false, time: '14:36' },
];

const liveActivities = [
  { id: 1, emoji: '🔥', user: 'John', action: 'vient de prédire un score', time: 'Il y a 2min' },
  { id: 2, emoji: '⚽', user: 'Maria', action: 'célèbre un but', time: 'Il y a 5min' },
  { id: 3, emoji: '💬', user: 'Ahmed', action: 'a rejoint la discussion', time: 'Il y a 8min' },
  { id: 4, emoji: '🏆', user: 'Sophie', action: 'a gagné un défi', time: 'Il y a 12min' },
  { id: 5, emoji: '🎯', user: 'Carlos', action: 'a fait une prédiction parfaite', time: 'Il y a 15min' },
];

export function FanInteractionSection() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: messages.length + 1,
      user: 'Vous',
      avatar: '⚽',
      text: newMessage,
      isOwn: true,
      time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <section className="py-24 bg-gradient-to-br from-[#1b3c88]/95 to-[#d72638]/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 border-4 border-white rounded-full"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 relative">
        <ScrollAnimationWrapper className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-white/10 text-white rounded-full mb-4 text-sm backdrop-blur-sm">
            <MessageCircle className="w-4 h-4 inline mr-2" />
            Espace Fan
          </div>
          <h2 className="text-5xl text-white mb-4">
            Interaction entre fans
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Connectez-vous avec des millions de supporters du monde entier. Débattez, partagez et célébrez ensemble chaque moment.
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat */}
          <ScrollAnimationWrapper direction="left">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#1b3c88] to-[#d72638] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Flame className="w-5 h-5 text-white" />
                  <span className="text-white">Chat Global</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white text-sm">1,247 en ligne</span>
                </div>
              </div>

              <div ref={chatRef} className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gray-50">
                <AnimatePresence>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${msg.isOwn ? 'order-1' : ''}`}>
                        {!msg.isOwn && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{msg.avatar}</span>
                            <span className="text-sm text-gray-500">{msg.user}</span>
                            <span className="text-xs text-gray-400">{msg.time}</span>
                          </div>
                        )}
                        <div className={`px-4 py-3 rounded-2xl ${
                          msg.isOwn
                            ? 'bg-[#1b3c88] text-white rounded-br-md'
                            : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
                        }`}>
                          {msg.text}
                        </div>
                        {msg.isOwn && (
                          <div className="text-right text-xs text-gray-400 mt-1">{msg.time}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Écrire un message..."
                    className="flex-1 px-4 py-3 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-[#1b3c88]/30 transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-12 h-12 bg-[#1b3c88] hover:bg-[#152e6b] text-white rounded-full flex items-center justify-center hover:scale-105 transition-all"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>

          {/* Live Activity Feed */}
          <ScrollAnimationWrapper direction="right">
            <div className="space-y-4">
              <h3 className="text-2xl text-white mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-[#d72638] rounded-full animate-pulse" />
                Activité en direct
              </h3>

              {liveActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 hover:bg-white/15 transition-all duration-300 border border-white/10"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                    {activity.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-white">
                      <span className="text-[#d72638]">{activity.user}</span> {activity.action}
                    </div>
                    <div className="text-white/50 text-sm">{activity.time}</div>
                  </div>
                </motion.div>
              ))}

              {/* Online users count */}
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center mt-6">
                <div className="text-4xl text-white mb-2">🌍</div>
                <div className="text-2xl text-white mb-1">12,847</div>
                <div className="text-white/60 text-sm">Fans connectés maintenant</div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}
