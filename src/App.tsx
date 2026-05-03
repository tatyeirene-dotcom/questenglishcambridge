import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Brain, Sword, Trophy, Sparkles, PartyPopper, Github } from 'lucide-react';
import { RewardBar } from './components/RewardBar';
import { VocabMatcher } from './components/games/VocabMatcher';
import { GrammarBridge } from './components/games/GrammarBridge';
import { ReadingQuest } from './components/games/ReadingQuest';
import { View } from './types';
import { PRIZES } from './constants';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [prizesUnlocked, setPrizesUnlocked] = useState(false);

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  useEffect(() => {
    if (score >= 500 && !prizesUnlocked) {
      setPrizesUnlocked(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [score, prizesUnlocked]);

  const renderContent = () => {
    switch (view) {
      case 'vocab':
        return <VocabMatcher onWin={addScore} onExit={() => setView('home')} />;
      case 'grammar':
        return <GrammarBridge onWin={addScore} onExit={() => setView('home')} />;
      case 'reading':
        return <ReadingQuest onWin={addScore} onExit={() => setView('home')} />;
      case 'home':
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
            <GameCard 
              title="Vocab Venture" 
              desc="Master 20 new Cambridge context words!" 
              icon="🏝️" 
              color="bg-brand-primary"
              shadowClass="shadow-card-primary text-brand-primary"
              onClick={() => setView('vocab')}
            />
            <GameCard 
              title="Tense Trek" 
              desc="Past, Present, and Future missions." 
              icon="🚀" 
              color="bg-brand-secondary"
              shadowClass="shadow-card-secondary text-brand-secondary"
              onClick={() => setView('grammar')}
            />
            <GameCard 
              title="Echo Escape" 
              desc="Listen to the clues to find the key." 
              icon="🎧" 
              color="bg-brand-purple"
              shadowClass="shadow-card-purple text-brand-purple"
              onClick={() => setView('reading')} // Reusing reading quest as a placeholder for echo escape
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center bg-brand-bg select-none" id="app-container">
      <div className="w-full max-w-5xl flex flex-col min-h-[90vh]">
        
        {/* Header Section */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-chunky border-4 border-brand-dark"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl border-4 border-brand-dark flex items-center justify-center text-3xl">🦁</div>
            <div>
              <h1 className="text-3xl font-black text-brand-dark tracking-tight">Cambridge Quest <span className="text-brand-secondary">G6</span></h1>
              <p className="text-slate-500 font-bold">Welcome back, Explorer! Ready to level up?</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs font-black text-brand-dark uppercase mb-1">Current Streak</div>
            <div className="flex gap-1 justify-center md:justify-end">
              <span className="text-2xl">🔥</span>
              <span className="text-2xl font-black">12 DAYS</span>
            </div>
          </div>
        </motion.header>

        {/* Reward Bar Section */}
        <RewardBar score={score} />

        <main className="flex-grow flex flex-col justify-center py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer Navigation */}
        <footer className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl border-4 border-brand-dark flex items-center gap-3 shadow-chunky transition-transform hover:-translate-y-1 cursor-pointer">
              <span className="text-2xl">🏆</span>
              <span className="font-black text-brand-dark uppercase text-sm">Hall of Fame</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border-4 border-brand-dark flex items-center gap-3 shadow-chunky transition-transform hover:-translate-y-1 cursor-pointer">
              <span className="text-2xl">🎁</span>
              <span className="font-black text-brand-dark uppercase text-sm">My Rewards</span>
            </div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-dark px-6 py-3 rounded-2xl border-4 border-brand-dark flex items-center gap-3 shadow-chunky transition-transform hover:-translate-y-1 text-white"
            >
              <Github size={20} />
              <span className="font-black uppercase text-sm">Build on GitHub</span>
            </a>
          </div>
          <div className="bg-brand-accent border-4 border-brand-dark p-4 rounded-2xl flex items-center gap-4 shadow-chunky">
            <div className="font-black text-brand-dark italic text-sm">"You're smashing it! Keep going!"</div>
            <div className="text-3xl">😎</div>
          </div>
        </footer>
      </div>

      {/* Rewards Overlay */}
      <AnimatePresence>
        {prizesUnlocked && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-brand-accent border-4 border-brand-dark rounded-3xl p-8 shadow-chunky z-40 mx-4"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border-4 border-brand-dark p-4 rounded-full shadow-lg">
              <Trophy className="text-yellow-500" size={40} />
            </div>
            <h2 className="text-center text-3xl mb-8">PRIZE VAULT UNLOCKED!</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRIZES.map((prize, idx) => (
                <div key={idx} className="bg-white/80 p-4 rounded-2xl border-2 border-brand-dark text-center font-bold text-slate-700 shadow-md">
                  {prize}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-brand-primary/20 backdrop-blur-sm"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <PartyPopper size={120} className="text-white mx-auto shadow-black" />
              </motion.div>
              <h2 className="text-white text-7xl font-display uppercase drop-shadow-2xl">Legendary!</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function GameCard({ title, desc, icon, color, shadowClass, onClick }: { title: string, desc: string, icon: string, color: string, shadowClass: string, onClick: () => void }) {
  return (
    <div className={`game-card-base ${color} ${shadowClass.split(' ')[0]} h-full`}>
      <div className="flex flex-col flex-grow">
        <div className="w-20 h-20 bg-white rounded-2xl border-4 border-brand-dark flex items-center justify-center text-4xl mb-6 shadow-btn">
          {icon}
        </div>
        <h3 className="text-2xl font-black text-white uppercase leading-tight mb-3">
          {title.split(' ')[0]}<br />{title.split(' ')[1]}
        </h3>
        <p className="text-white/80 font-bold mb-6">{desc}</p>
      </div>
      <button 
        onClick={onClick}
        className="w-full bg-white py-3 rounded-xl border-4 border-brand-dark font-black uppercase shadow-btn active:translate-y-1 active:shadow-none hover:-translate-y-1 transition-all"
        style={{ color: 'inherit' }}
      >
        <span className={shadowClass.split(' ')[1]}>Play Now</span>
      </button>
    </div>
  );
}


