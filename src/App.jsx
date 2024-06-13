import React, { useState, useEffect } from 'react';
import Flashcard from '../components/Flashcard';
import FlashcardForm from '../components/FlashcardForm';
import { Button, Alert, Tabs, Tab, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [reviewMessage, setReviewMessage] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [filter, setFilter] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [correctCards, setCorrectCards] = useState([]);
  const [incorrectCards, setIncorrectCards] = useState([]);
  const [showEndMessage, setShowEndMessage] = useState(false);

  const chapters = [
    'Chapter 1',
    'Chapter 2',
    'Chapter 3',
    'Chapter 4',
    'Chapter 5',
    'Chapter 6',
    'Chapter 7',
    'Chapter 8'
  ];

  const addFlashcard = (question, answer, chapter) => {
    const newFlashcard = {
      id: flashcards.length + 1,
      question,
      answer,
      chapter,
      gotWrong: null,
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  const markIncorrect = (id) => {
    setFlashcards(flashcards.map(flashcard =>
      flashcard.id === id ? { ...flashcard, gotWrong: true } : flashcard
    ));
    setIncorrectCards([...incorrectCards, flashcards.find(card => card.id === id)]);
    setFeedbackMessage('Marked as incorrect.');
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
    goToNextCard();
  };

  const markCorrect = (id) => {
    setCorrectCards([...correctCards, flashcards.find(card => card.id === id)]);
    setFeedbackMessage('Got it correct!');
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
    goToNextCard();
  };

  const handleFilter = (filterValue) => {
    setFilter(filterValue);
    resetCards();
  };

  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
    resetCards();
  };

  const filteredFlashcards = flashcards.filter(flashcard =>
    (!selectedChapter || flashcard.chapter === selectedChapter) &&
    (!filter || flashcard.gotWrong)
  );

  const goToNextCard = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowEndMessage(true);
    }
  };

  const resetCards = () => {
    setCurrentIndex(0);
    setShowEndMessage(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
    setShowEndMessage(false);
    setFlashcards(flashcards.map(card => ({ ...card, gotWrong: null })));
  };

  const handleReviewIncorrect = () => {
    setCurrentIndex(0);
    setShowEndMessage(false);
    setFilter(true);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setShowEndMessage(false);
  }, [selectedChapter, filter]);

  return (
    <Container className="mt-5">
      <h1>Flash Card Generator For Jocelyn</h1>
      <Tabs defaultActiveKey="add" id="flashcard-tabs" className="mb-3">
        <Tab eventKey="add" title="Add Flashcard">
          <FlashcardForm addFlashcard={addFlashcard} chapters={chapters} />
        </Tab>
        <Tab eventKey="view" title="View Flashcards">
          {reviewMessage && (
            <Alert variant="warning" className="mt-3">
              {reviewMessage}
            </Alert>
          )}
          {feedbackMessage && (
            <Alert variant="info" className="mt-3">
              {feedbackMessage}
            </Alert>
          )}
          <Form.Group controlId="chapterFilter" className="mt-3">
            <Form.Label>Filter by Chapter</Form.Label>
            <Form.Control as="select" value={selectedChapter} onChange={handleChapterChange}>
              <option value="">All Chapters</option>
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter}>{chapter}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant={filter ? 'secondary' : 'primary'} className="mt-3" onClick={() => handleFilter(!filter)}>
            {filter ? 'Show All Cards' : 'Show Incorrect Cards'}
          </Button>
          <h2 className="mt-4">Generated Flash Cards</h2>
          <div className="flashcard-container">
            {filteredFlashcards.length > 0 ? (
              showEndMessage ? (
                <div className="mt-5">
                  <h3>No more flashcards to review.</h3>
                  <Button variant="primary" onClick={handleReviewIncorrect} className="m-2">
                    Review Incorrect Cards
                  </Button>
                  <Button variant="secondary" onClick={handleRestart} className="m-2">
                    Restart
                  </Button>
                </div>
              ) : (
                <Flashcard
                  flashcard={filteredFlashcards[currentIndex]}
                  markIncorrect={markIncorrect}
                  markCorrect={markCorrect}
                />
              )
            ) : (
              <p>No flashcards available.</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default App;
