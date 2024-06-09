import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function FlashcardForm({ addFlashcard, chapters }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [chapter, setChapter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFlashcard(question, answer, chapter);
    setQuestion('');
    setAnswer('');
    setChapter('');
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
      <Form.Group className="mt-3">
        <Form.Label>Chapter</Form.Label>
        <Form.Control as="select" value={chapter} onChange={(e) => setChapter(e.target.value)} required>
          <option value="">Select Chapter</option>
          {chapters.map((ch, index) => (
            <option key={index} value={ch}>{ch}</option>
          ))}
        </Form.Control>
      </Form.Group>
      <Button type="submit" className="mt-2">Add Flashcard</Button>
    </Form>
  );
}

export default FlashcardForm;
