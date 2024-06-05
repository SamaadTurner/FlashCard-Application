import React from 'react';
import PropTypes from 'prop-types';

export default function Flashcard({ flashcard }) {
  return (
    <div>
      {flashcard.question}
    </div>
  )
}