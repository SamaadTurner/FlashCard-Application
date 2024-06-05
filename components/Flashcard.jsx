import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import '../styling/App.css';

function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false);

  return (
    <div className="card-container" onClick={() => setFlip(!flip)}>
      <div className={`card ${flip ? 'flip' : ''}`}>
        <div className="front">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <Card.Text>Question: {flashcard.question}</Card.Text>
          </Card.Body>
        </div>
        <div className="back">
          <Card.Body className="d-flex justify-content-center align-items-center">
            <Card.Text>Answer: {flashcard.answer}</Card.Text>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}

export default Flashcard;
