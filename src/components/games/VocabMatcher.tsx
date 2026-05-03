import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCAB_LIST } from '../../constants';
import { VocabularyWord } from '../../types';
import { Check, X, Undo2, BrainCircuit } from 'lucide-react';

interface VocabMatcherProps {
  onWin: (points: number) => void;
  onExit: () => void;
}

export const VocabMatcher: React.FC<VocabMatcherProps> = ({ onWin, onExit }) => {
  const [words, setWords] = useState<VocabularyWord[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [selectedDef, setSelectedDef] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [definitions, setDefinitions] = useState<{ id: string; definition: string }[]>([]);
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);

  useEffect(() => {
    const shuffledWords = [...VOCAB_LIST].sort(() => Math.random() - 0.5).slice(0, 4);
    const shuffledDefs = shuffledWords
      .map(w => ({ id: w.id, definition: w.definition }))
      .sort(() => Math.random() - 0.5);
    
    setWords(shuffledWords);
    setDefinitions(shuffledDefs);
  }, []);

  useEffect(() => {
    if (selectedWord && selectedDef) {
      if (selectedWord === selectedDef) {
        setMatchedIds(prev => [...prev, selectedWord]);
        onWin(25);
        setSelectedWord(null);
        setSelectedDef(null);
      } else {
        setWrongMatch(true);
        setTimeout(() => {
          setWrongMatch(false);
          setSelectedWord(null);
          setSelectedDef(null);
        }, 1000);
      }
    }
  }, [selectedWord, selectedDef, onWin]);

  const isComplete = matchedIds.length === words.length && words.length > 0;

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-4 bg-white/50 rounded-3xl border-4 border-slate-900 shadow-2xl relative">
      <button 
        onClick={onExit}
        className="absolute -top-4 -left-4 bg-brand-primary text-white p-3 rounded-2xl border-4 border-slate-900 shadow-comic hover:scale-110 transition-transform"
      >
        <Undo2 size={24} />
      </button>

      <div className="flex items-center gap-3 mb-8 mt-4">
        <BrainCircuit className="text-brand-secondary" size={40} />
        <h2 className="text-3xl text-slate-800">Vocab Match-Up!</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full p-4">
        {/* Words Column */}
        <div className="space-y-4">
          <h3 className="text-center text-xl text-slate-600 mb-2">Words</h3>
          {words.map((item) => (
            <motion.button
              key={item.id}
              disabled={matchedIds.includes(item.id) || wrongMatch}
              onClick={() => setSelectedWord(item.id)}
              className={`w-full p-4 text-left rounded-2xl border-4 font-bold text-lg transition-all
                ${matchedIds.includes(item.id) ? 'bg-green-100 border-green-500 text-green-700 opacity-50' : 
                  selectedWord === item.id ? 'bg-brand-secondary border-slate-900 text-white scale-105 shadow-xl' : 
                  'bg-white border-slate-900 hover:bg-slate-50'}`}
            >
              <div className="flex justify-between items-center">
                {item.word}
                {matchedIds.includes(item.id) && <Check size={20} />}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Definitions Column */}
        <div className="space-y-4">
          <h3 className="text-center text-xl text-slate-600 mb-2">Definitions</h3>
          {definitions.map((item) => (
            <motion.button
              key={`def-${item.id}`}
              disabled={matchedIds.includes(item.id) || wrongMatch}
              onClick={() => setSelectedDef(item.id)}
              className={`w-full p-4 text-left rounded-2xl border-4 transition-all min-h-[5rem]
                ${matchedIds.includes(item.id) ? 'bg-green-100 border-green-500 text-green-700 opacity-50' : 
                  selectedDef === item.id ? 'bg-brand-accent border-slate-900 text-slate-800 scale-105 shadow-xl' : 
                  'bg-white border-slate-900 hover:bg-slate-50'}`}
            >
              <p className="text-sm italic">{item.definition}</p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-8 flex flex-col items-center gap-4 p-8 bg-brand-accent rounded-3xl border-4 border-slate-900 shadow-comic"
          >
            <h3 className="text-3xl text-slate-900">GREAT JOB!</h3>
            <p className="text-xl font-medium">You matched them all perfectly!</p>
            <button onClick={onExit} className="btn-primary">
              Play More Games!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wrongMatch && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-brand-primary border-4 border-slate-900 p-6 rounded-full shadow-2xl">
              <X className="text-white" size={80} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
