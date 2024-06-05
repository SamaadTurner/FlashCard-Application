import React, { useState } from 'react';
import PropTypes from 'prop-types';


export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div
      // This will add a class of 'card' for every flashcard and then it will have the class of flip if flip is true... otherwise it will have nothing extra. Good way to handle dynamic classes with default React in JS.
      className={`card ${flip ? 'flip' : ''}`}
      onClick={() => setFlip(!flip)}
    >
      <div className="front">
        {flashcard.question}
        <div className="flashcard-options">
          {flashcard.options.map((option, index) => (
            <div className="flashcard-option" key={index}>
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="back">
        {flashcard.answer}
      </div>
    </div>
  );
}

Flashcard.propTypes = {
  flashcard: PropTypes.shape({
    id: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
