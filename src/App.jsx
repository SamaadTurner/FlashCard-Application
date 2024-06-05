import React, { useState } from 'react';
import './App.css';
import FlashcardList from '../components/FlashcardList';

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'What is 3 * 3?',
    answer: '9',
    options: [
      '3',
      '6',
      '9',
      '12'
    ]
  },
];

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS); 
  return (
    <>
      <h1> Flash Card Generator For Jocelyn</h1>
      <FlashcardList flashcards={flashcards} />
    </>
  );
}

export default App;