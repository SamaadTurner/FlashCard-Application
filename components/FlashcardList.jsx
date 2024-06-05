import React from 'react';
import Flashcard from './Flashcard';
import { CardGroup } from 'react-bootstrap';

function FlashcardList({ flashcards }) {
  return (
    <CardGroup>
      {flashcards.map(flashcard => (
        <Flashcard flashcard={flashcard} key={flashcard.id} />
      ))}
    </CardGroup>
  );
}

export default FlashcardList;
