import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Undo2, BookOpen, Send } from 'lucide-react';

interface ReadingQuestProps {
  onWin: (points: number) => void;
  onExit: () => void;
}

const STORY = {
  title: "The Great Green Mission",
  text: "Deep in the Whispering Woods, a robot named Pip was on a mission. Unlike other robots, Pip didn't consume oil or coal. He was powered by the sun! Every morning, Pip would open his solar panels and charge up. One day, Pip noticed that the river was full of plastic bottles. 'Oh no!' Pip chirped. 'The fish cannot swim comfortably!' Pip decided to gather his friends and organize a cleanup journey. They worked all day until the river sparkled like a diamond again.",
  questions: [
    {
      q: "What powers Pip the Robot?",
      options: ["Coal", "Oil", "The Sun", "Wind"],
      ans: "The Sun"
    },
    {
      q: "Where was Pip's mission located?",
      options: ["The Sandy Desert", "The Whispering Woods", "The Metal City", "The Ocean"],
      ans: "The Whispering Woods"
    },
    {
      q: "Why was Pip sad about the river?",
      options: ["It was too cold", "It was full of plastic bottles", "It had no water", "The boat was broken"],
      ans: "It was full of plastic bottles"
    }
  ]
};

export const ReadingQuest: React.FC<ReadingQuestProps> = ({ onWin, onExit }) => {
  const [currentStep, setCurrentStep] = useState<'read' | 'quiz'>('read');
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (opt: string) => {
    if (opt === STORY.questions[qIdx].ans) {
      setScore(s => s + 1);
      onWin(50);
    }

    if (qIdx < STORY.questions.length - 1) {
      setQIdx(i => i + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-6 bg-blue-50 rounded-3xl border-4 border-slate-900 shadow-2xl relative min-h-[600px]">
      <button 
        onClick={onExit}
        className="absolute -top-4 -left-4 bg-brand-primary text-white p-3 rounded-2xl border-4 border-slate-900 shadow-comic hover:scale-110 transition-transform"
      >
        <Undo2 size={24} />
      </button>

      <div className="flex items-center gap-3 mb-8 mt-2">
        <BookOpen className="text-blue-500" size={32} />
        <h2 className="text-2xl text-slate-800">Reading Quest 📖</h2>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 'read' ? (
          <motion.div 
            key="read"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center"
          >
            <h3 className="text-3xl mb-6 text-blue-700">{STORY.title}</h3>
            <div className="bg-white p-8 rounded-3xl border-4 border-slate-900 shadow-inner text-xl leading-relaxed text-slate-700 mb-8 max-h-[400px] overflow-y-auto">
              {STORY.text}
            </div>
            <button 
              onClick={() => setCurrentStep('quiz')}
              className="btn-secondary text-2xl flex items-center gap-2 px-12"
            >
              Take the Quiz! <Send size={24} />
            </button>
          </motion.div>
        ) : !finished ? (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full"
          >
            <div className="bg-white p-8 rounded-3xl border-4 border-slate-900 mb-8">
              <span className="text-blue-500 font-bold mb-2 block">Question {qIdx + 1} of {STORY.questions.length}</span>
              <h3 className="text-2xl text-slate-800">{STORY.questions[qIdx].q}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STORY.questions[qIdx].options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="bg-white border-4 border-slate-900 p-6 rounded-2xl text-xl font-bold hover:bg-blue-100 hover:-translate-y-1 transition-all active:translate-y-0"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finish"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-6 p-10 bg-white border-4 border-slate-900 rounded-3xl shadow-comic"
          >
            <div className="text-6xl">🏆</div>
            <h3 className="text-4xl text-center">Adventure Complete!</h3>
            <p className="text-2xl text-center">You got <b>{score}/{STORY.questions.length}</b> questions right!</p>
            <button onClick={onExit} className="btn-primary text-xl px-12 mt-4">
              Explore More!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
