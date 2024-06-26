import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react'; 
import Flashcard from './Flashcard'; 
import FlashcardForm from './FlashcardForm'; 
import { Button, Alert, Tabs, Tab, Container, Form } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/App.css';
import api from '../api'; 

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0(); // Auth0 functions and states
  const [flashcards, setFlashcards] = useState([]); 
  const [reviewMessage, setReviewMessage] = useState(''); 
  const [selectedChapter, setSelectedChapter] = useState(''); 
  const [filter, setFilter] = useState(false);  
  const [currentIndex, setCurrentIndex] = useState(0);  
  const [feedbackMessage, setFeedbackMessage] = useState(''); 
  const [correctCards, setCorrectCards] = useState([]);  
  const [incorrectCards, setIncorrectCards] = useState([]); 
  const [showEndMessage, setShowEndMessage] = useState(false);  

  // Need to make this dynamic *****************************************
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

  // Fetch flashcards from the backend when component mounts
  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await api.get('/flashcards');
        setFlashcards(response.data); // Set flashcards state with response data
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  // Function to add a new flashcard
  const addFlashcard = async (question, answer, chapter) => {
    const newFlashcard = {
      question,
      answer,
      chapter,
      gotWrong: null, // Initial value indicating the card hasn't been marked incorrect
    };
    try {
      const response = await api.post('/flashcards', newFlashcard);
      setFlashcards([...flashcards, response.data]); // Append the new flashcard to the existing list
    } catch (error) {
      console.error('Error adding flashcard:', error);
    }
  };

  // Function to update an existing flashcard
  const updateFlashcard = async (id, updates) => {
    try {
      const response = await api.put(`/flashcards/${id}`, updates);
      setFlashcards(flashcards.map(f => (f.id === id ? response.data : f))); // Will update the flashcard in state
    } catch (error) {
      console.error('Error updating flashcard:', error);
    }
  };

  // Function to delete a flashcard
  const deleteFlashcard = async (id) => {
    try {
      await api.delete(`/flashcards/${id}`);
      setFlashcards(flashcards.filter(f => f.id !== id)); // Will remoove the flashcard from state
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  // Mark a flashcard as incorrect
  const markIncorrect = (id) => {
    const card = flashcards.find(f => f.id === id);
    updateFlashcard(id, { ...card, gotWrong: true }); // Update the card's `gotWrong` property
    setIncorrectCards([...incorrectCards, card]); // Adds to the incorrect cards list
    setFeedbackMessage('Marked as incorrect.');
    setTimeout(() => {
      setFeedbackMessage(''); // Clear feedback message after 3 seconds
    }, 3000);
    goToNextCard(); // Will move on to next card
  };

  // Mark a flashcard as correct
  const markCorrect = (id) => {
    const card = flashcards.find(f => f.id === id);
    setCorrectCards([...correctCards, card]); // Add to the correct cards list
    setFeedbackMessage('Got it correct!');
    setTimeout(() => {
      setFeedbackMessage(''); 
    }, 3000);
    goToNextCard();
  };

  // Toggle filter for incorrect flashcards
  const handleFilter = (filterValue) => {
    setFilter(filterValue);
    resetCards(); // Reset the current card index
  };

  // Handle chapter filter change
  const handleChapterChange = (e) => {
    setSelectedChapter(e.target.value);
    resetCards(); // Reset the current card index
  };

  // Filter flashcards based on selected chapter and incorrect status
  const filteredFlashcards = flashcards.filter(flashcard =>
    (!selectedChapter || flashcard.chapter === selectedChapter) &&
    (!filter || flashcard.gotWrong)
  );

  // Function that will move to the next flashcard
  const goToNextCard = () => {
    if (currentIndex < filteredFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowEndMessage(true); // Show end message indicating no more cards to review
    }
  };

  // Function to reset flashcard view to start
  const resetCards = () => {
    setCurrentIndex(0);
    setShowEndMessage(false);
  };

  // Restart review process
  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCards([]);
    setIncorrectCards([]);
    setShowEndMessage(false);
    setFlashcards(flashcards.map(card => ({ ...card, gotWrong: null }))); // Reset `gotWrong` status
  };

  // Review only incorrect flashcards
  const handleReviewIncorrect = () => {
    setCurrentIndex(0);
    setShowEndMessage(false);
    setFilter(true);
  };

  // Reset current index when chapter filter or filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setShowEndMessage(false);
  }, [selectedChapter, filter]);

  return (
    <Container className="mt-5">
      <h1>Flash Card Generator For {isAuthenticated ? user.name : ''}</h1>
      <div className="auth-buttons">
        {!isAuthenticated && (
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        )}
        {isAuthenticated && (
          <Button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</Button>
        )}
      </div>
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
