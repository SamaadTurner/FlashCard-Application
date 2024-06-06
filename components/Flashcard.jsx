import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import '../styling/App.css';

function Flashcard({ flashcard, markIncorrect }) {
  const [flip, setFlip] = useState(false);
  const handleIncorrect = (e) => {
    e.stopPropagation(); // this took me awhile to figure out. This prevents card from flipping when incorrect button is clicked
    markIncorrect(flashcard.id);
  };

  return (
    <Card onClick={() => setFlip(!flip)} style={{ cursor: 'pointer', margin: '1rem' }}>
      <Card.Body className="d-flex justify-content-center align-items-center flex-column">
        <Card.Text>
          {flip ? `A: ${flashcard.answer}` : `Q: ${flashcard.question}`}
        </Card.Text>
        {flip && (
          <Button variant="danger" className="mt-2" onClick={handleIncorrect}>
            Incorrect?
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Flashcard;
