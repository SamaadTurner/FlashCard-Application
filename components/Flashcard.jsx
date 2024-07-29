import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styling/App.css';

function Flashcard({ flashcard, markIncorrect, markCorrect }) {
  const [flip, setFlip] = useState(false);

  const handleIncorrect = (e) => {
    e.stopPropagation();
    markIncorrect(flashcard.FlashcardID);
  };

  const handleCorrect = (e) => {
    e.stopPropagation();
    markCorrect(flashcard.FlashcardID);
  };

  return (
    <Card onClick={() => setFlip(!flip)} style={{ cursor: 'pointer', margin: '1rem', maxWidth: '400px' }}>
      <Card.Body className="d-flex justify-content-center align-items-center flex-column">
        <Card.Text>
          {flip ? `A: ${flashcard.AnswerText}` : `Q: ${flashcard.QuestionText}`}
        </Card.Text>
        {flip && (
          <div className="mt-2">
            <Button variant="danger" onClick={handleIncorrect} className="me-2">
              Incorrect
            </Button>
            <Button variant="success" onClick={handleCorrect}>
              Correct
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default Flashcard;
