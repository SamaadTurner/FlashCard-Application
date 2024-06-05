import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }) {
  return (
    <div className='card-grid'>
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </div>
  );
}

FlashcardList.propTypes = {
  flashcards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
};
