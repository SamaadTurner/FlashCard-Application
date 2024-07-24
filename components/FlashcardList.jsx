import React, { useState, useEffect } from 'react';
import FlashcardForm from './FlashcardForm';
import FlashcardList from './FlashcardList';
import { fetchFlashcards } from './api';

const App = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const getFlashcards = async () => {
      try {
        const flashcards = await fetchFlashcards();
        setFlashcards(flashcards);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    getFlashcards();
  }, []);

  const addFlashcard = (flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  return (
    <div>
      <h1>Flashcard App</h1>
      <FlashcardForm onAdd={addFlashcard} />
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default App;
