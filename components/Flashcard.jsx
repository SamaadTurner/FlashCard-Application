import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);
  return (
    <div onClick={() => setFlip(!flip)}>
      {/* If flip is true, display the answer, otherwise display the question */} 
      {flip ? flashcard.answer : flashcard.question}
    </div>
  )
}