import { VocabularyWord, GrammarQuestion } from './types';

export const TARGET_SCORE = 500;

export const VOCAB_LIST: VocabularyWord[] = [
  { id: '1', word: 'Environment', definition: 'The surroundings or conditions in which a person, animal, or plant lives.', category: 'Nature' },
  { id: '2', word: 'Conversation', definition: 'A talk, especially an informal one, between two or more people.', category: 'Communication' },
  { id: '3', word: 'Adventure', definition: 'An unusual and exciting or daring experience.', category: 'General' },
  { id: '4', word: 'Sustainable', definition: 'Able to be maintained at a certain rate or level.', category: 'Environment' },
  { id: '5', word: 'Technology', definition: 'The application of scientific knowledge for practical purposes.', category: 'Science' },
  { id: '6', word: 'Fragile', definition: 'Easily broken or damaged.', category: 'Adjectives' },
  { id: '7', word: 'Brave', definition: 'Ready to face and endure danger or pain; showing courage.', category: 'Personality' },
  { id: '8', word: 'Journey', definition: 'An act of travelling from one place to another.', category: 'Travel' },
];

export const GRAMMAR_QUESTIONS: GrammarQuestion[] = [
  {
    id: '1',
    sentence: 'If I ______ enough money, I would buy a new bike.',
    options: ['have', 'had', 'has', 'having'],
    correctAnswer: 'had',
    explanation: 'This is the second conditional (If + past simple, would + infinitive).'
  },
  {
    id: '2',
    sentence: 'I have ______ my homework already.',
    options: ['finish', 'finishing', 'finished', 'finishes'],
    correctAnswer: 'finished',
    explanation: 'Present perfect uses "have/has + past participle".'
  },
  {
    id: '3',
    sentence: 'While they ______ football, it started to rain.',
    options: ['play', 'played', 'were playing', 'are playing'],
    correctAnswer: 'were playing',
    explanation: 'Use past continuous for an action that was in progress when another action happened.'
  },
  {
    id: '4',
    sentence: 'He spoke ______ so that everyone could hear him.',
    options: ['clear', 'clearly', 'clearing', 'clearest'],
    correctAnswer: 'clearly',
    explanation: 'We use adverbs to describe how an action is done.'
  }
];

export const PRIZES = [
  "🍦 Ice Cream Voucher!",
  "🎮 30 Mins Extra Game Time!",
  "🍿 Movie Night Choice!",
  "🎁 Mystery Treasure!"
];
