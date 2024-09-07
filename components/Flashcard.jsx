import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styling/App.css';

function Flashcard({ flashcard, markIncorrect, markCorrect }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleIncorrect = (e) => {
    e.stopPropagation();
    markIncorrect(flashcard.FlashcardID);
    setShowAnswer(false);
  };

  const handleCorrect = (e) => {
    e.stopPropagation();
    markCorrect(flashcard.FlashcardID);
    setShowAnswer(false);
  };

  console.log('Rendering Flashcard component:', flashcard);

  return (
    <Card onClick={() => setShowAnswer(!showAnswer)} style={{ cursor: 'pointer', margin: '1rem', maxWidth: '400px' }}>
      <Card.Body className="d-flex justify-content-center align-items-center flex-column">
        <Card.Text>
          {showAnswer ? `A: ${flashcard.AnswerText}` : `Q: ${flashcard.QuestionText}`}
        </Card.Text>
        {showAnswer && (
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
