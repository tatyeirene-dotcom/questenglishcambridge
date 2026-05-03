import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GRAMMAR_QUESTIONS } from '../../constants';
import { Undo2, Lightbulb, Trophy } from 'lucide-react';

interface GrammarBridgeProps {
  onWin: (points: number) => void;
  onExit: () => void;
}

export const GrammarBridge: React.FC<GrammarBridgeProps> = ({ onWin, onExit }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = GRAMMAR_QUESTIONS[currentIdx];

  const handleOptionClick = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
    
    if (option === currentQuestion.correctAnswer) {
      setFeedback('correct');
      onWin(40);
      setTimeout(() => {
        if (currentIdx < GRAMMAR_QUESTIONS.length - 1) {
          nextQuestion();
        } else {
          setIsFinished(true);
        }
      }, 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1000);
    }
  };

  const nextQuestion = () => {
    setCurrentIdx(prev => prev + 1);
    setFeedback(null);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="flex flex-col items-center max-w-3xl mx-auto p-6 bg-white/60 rounded-3xl border-4 border-slate-900 shadow-2xl relative min-h-[500px]">
      <button 
        onClick={onExit}
        className="absolute -top-4 -left-4 bg-brand-primary text-white p-3 rounded-2xl border-4 border-slate-900 shadow-comic hover:scale-110 transition-transform"
      >
        <Undo2 size={24} />
      </button>

      <div className="flex items-center gap-3 mb-10 mt-2">
        <h2 className="text-3xl text-slate-800">Grammar Bridge 🏗️</h2>
      </div>

      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div 
            key={currentIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            <div className="mb-8 p-8 bg-slate-800 text-white rounded-3xl border-4 border-slate-900 text-2xl text-center italic w-full">
              {currentQuestion.sentence.split('______').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className={`mx-2 underline decoration-brand-accent decoration-4 ${feedback === 'correct' ? 'text-brand-secondary' : 'text-brand-accent'}`}>
                      {selectedOption && feedback === 'correct' ? selectedOption : '______'}
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              {currentQuestion.options.map((opt) => (
                <button
                  key={opt}
                  disabled={feedback === 'correct'}
                  onClick={() => handleOptionClick(opt)}
                  className={`p-5 rounded-2xl border-4 text-xl font-bold transition-all
                    ${selectedOption === opt && feedback === 'correct' ? 'bg-brand-secondary border-slate-900 text-white scale-105' : 
                      selectedOption === opt && feedback === 'wrong' ? 'bg-brand-primary border-slate-900 text-white animate-shake' : 
                      'bg-white border-slate-900 hover:bg-slate-50'}`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowExplanation(!showExplanation)}
              className="mt-10 flex items-center gap-2 text-slate-600 hover:text-brand-secondary transition-colors"
            >
              <Lightbulb size={20} />
              <span className="font-medium underline">Need a hint?</span>
            </button>

            {showExplanation && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 p-4 bg-brand-accent/30 rounded-xl border-2 border-brand-accent text-slate-700 italic text-center"
              >
                {currentQuestion.explanation}
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6 p-10 bg-white border-4 border-slate-900 rounded-3xl shadow-comic"
          >
            <Trophy size={80} className="text-yellow-500" />
            <h3 className="text-4xl text-center">Grammar Master!</h3>
            <p className="text-xl text-center text-slate-600">You built all the bridges correctly!</p>
            <button onClick={onExit} className="btn-primary text-xl px-12">
              Back to Map
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
