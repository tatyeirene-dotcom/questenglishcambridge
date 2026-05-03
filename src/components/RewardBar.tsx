import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Star } from 'lucide-react';
import { TARGET_SCORE } from '../constants';

interface RewardBarProps {
  score: number;
}

export const RewardBar: React.FC<RewardBarProps> = ({ score }) => {
  const percentage = Math.min((score / TARGET_SCORE) * 100, 100);
  const isTargetReached = score >= TARGET_SCORE;

  return (
    <div className="w-full bg-white p-6 rounded-3xl mb-8 shadow-chunky border-4 border-brand-dark" id="reward-bar-section">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-4 gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-brand-accent px-4 py-1 rounded-full border-2 border-brand-dark font-black text-sm uppercase shadow-sm">
            Star Meter
          </span>
          <span className="font-black text-brand-dark text-lg">
            {score} / {TARGET_SCORE} XP
          </span>
        </div>
        <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-sm md:text-base">
          <span>
            {isTargetReached 
              ? "Goal Reached! Mystery Gift Time! 🎁" 
              : `GOAL: ${TARGET_SCORE - score} MORE FOR A MYSTERY GIFT!`}
          </span>
          {!isTargetReached && <span className="text-2xl animate-bounce">🎁</span>}
        </div>
      </div>
      
      <div className="reward-bar-container relative h-10 border-4">
        <motion.div 
          className="reward-bar-fill h-full bg-linear-to-r from-brand-secondary to-[#45B7AF] border-r-4 border-brand-dark"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        />
        
        {/* Decorative divider lines from design */}
        <div className="absolute inset-0 flex justify-around items-center opacity-10 pointer-events-none">
          <div className="w-1 h-full bg-brand-dark"></div>
          <div className="w-1 h-full bg-brand-dark"></div>
          <div className="w-1 h-full bg-brand-dark"></div>
          <div className="w-1 h-full bg-brand-dark"></div>
        </div>
        
        {isTargetReached && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-2 -top-6 bg-brand-accent border-4 border-brand-dark p-2 rounded-full shadow-lg rotate-12 z-10"
          >
            <Trophy className="text-brand-dark" size={28} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

