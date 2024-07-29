import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('/api/flashcards'); // Make sure this URL is correct
        console.log('Fetched flashcards:', response.data); // Log fetched data
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const markIncorrect = (id) => {
    // Implement the logic to handle incorrect answer marking
    console.log(`Marked flashcard ${id} as incorrect`);
  };

  const markCorrect = (id) => {
    // Implement the logic to handle correct answer marking
    console.log(`Marked flashcard ${id} as correct`);
  };

  return (
    <div>
      <h2>Generated Flash Cards</h2>
      {flashcards.length === 0 ? (
        <p>No flashcards available.</p>
      ) : (
        flashcards.map(flashcard => (
          <Flashcard key={flashcard.FlashcardID} flashcard={flashcard} markIncorrect={markIncorrect} markCorrect={markCorrect} />
        ))
      )}
    </div>
  );
};

export default FlashcardList;
