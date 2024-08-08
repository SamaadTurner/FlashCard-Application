import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('/api/flashcards');
        const data = response.data;
        console.log('Fetched flashcards:', data);
        setFlashcards(data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const markIncorrect = (id) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.FlashcardID === id ? { ...flashcard, GotWrong: true } : flashcard
      )
    );
  };

  const markCorrect = (id) => {
    setFlashcards((prevFlashcards) =>
      prevFlashcards.map((flashcard) =>
        flashcard.FlashcardID === id ? { ...flashcard, GotWrong: false } : flashcard
      )
    );
  };

  console.log('Rendering FlashcardList with flashcards:', flashcards);

  return (
    <div>
      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (
        flashcards.map((flashcard) => {
          console.log('Rendering flashcard in list:', flashcard);
          return (
            <Flashcard
              key={flashcard.FlashcardID}
              flashcard={flashcard}
              markIncorrect={markIncorrect}
              markCorrect={markCorrect}
            />
          );
        })
      )}
    </div>
  );
};

export default FlashcardList;
