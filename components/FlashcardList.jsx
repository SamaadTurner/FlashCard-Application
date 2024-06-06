import React from 'react';
import Flashcard from './Flashcard';
import { CardGroup } from 'react-bootstrap';

function FlashcardList({ flashcards, markIncorrect }) {
  return (
    <CardGroup>
      {flashcards.map(flashcard => (
        <Flashcard
          flashcard={flashcard}
          key={flashcard.id}
          markIncorrect={markIncorrect}
        />
      ))}
    </CardGroup>
  );
}

export default FlashcardList;
