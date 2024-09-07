import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Flashcard from './Flashcard';
import FlashcardForm from './FlashcardForm';
import { Button, Alert, Tabs, Tab, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/App.css';

const api = axios.create({
  baseURL: 'http://localhost:5173/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
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

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await api.get('/flashcards');
        setFlashcards(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  // Define addFlashcard function
  const addFlashcard = async (flashcard) => {
    try {
      const response = await api.post('/flashcards', flashcard);
      setFlashcards([...flashcards, response.data]);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  // Update an existing flashcard
  const updateFlashcard = async (id, updates) => {
    try {
      const response = await api.put(`/flashcards/${id}`, updates);
      setFlashcards(flashcards.map(f => (f.id === id ? response.data : f)));
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  // Delete a flashcard
  const deleteFlashcard = async (id) => {
    try {
      await api.delete(`/flashcards/${id}`);
      setFlashcards(flashcards.filter(f => f.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const markIncorrect = (id) => {
    const card = flashcards.find(f => f.id === id);
    updateFlashcard(id, { ...card, gotWrong: true });
    setIncorrectCards([...incorrectCards, card]);
    setFeedbackMessage('Marked as incorrect.');
    setTimeout(() => {
      setFeedbackMessage('');
    }, 3000);
    goToNextCard();
  };

  const markCorrect = (id) => {
    const card = flashcards.find(f => f.id === id);
    setCorrectCards([...correctCards, card]);
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
    console.log('Current Index before update:', currentIndex);
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      console.log('Current Index after update:', currentIndex + 1);
    } else {
      setShowEndMessage(true);
      console.log('No more flashcards to show.');
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
      <h1>Flash Card Generator For {isAuthenticated ? user.name : ''}</h1>
      {/* Other components and UI elements */}
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
            <>
              <Flashcard
                flashcard={filteredFlashcards[currentIndex]}
                markIncorrect={markIncorrect}
                markCorrect={markCorrect}
              />
              <p>Current Index: {currentIndex}</p> {/* Show the current index in the UI */}
            </>
          )
        ) : (
          <p>No flashcards available.</p>
        )}
      </div>
    </Container>
  );
}

export default App;
