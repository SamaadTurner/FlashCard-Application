import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FlashcardForm({ addFlashcard }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlashcard(question, answer);
    setQuestion('');
    setAnswer('');
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4">
      <Form.Group>
        <Form.Label>Question</Form.Label>
        <Form.Control
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Answer</Form.Label>
        <Form.Control
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" className="mt-2">Add Flashcard</Button>
    </Form>
  );
}

export default FlashcardForm;
