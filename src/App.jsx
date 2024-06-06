import React, { useState } from 'react';
import FlashcardList from '../components/FlashcardList';
import FlashcardForm from '../components/FlashcardForm';
import { Button, ButtonGroup, Alert, Tabs, Tab, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/App.css';

function App() {
  // State to store the list of flashcards
  const [flashcards, setFlashcards] = useState([]);
  // State to store the message displayed when a card is marked for review
  const [reviewMessage, setReviewMessage] = useState('');
  // State to toggle the filter for showing only review cards
  const [filter, setFilter] = useState(false);  
  // function to add a new flashcard 
  const addFlashcard = (question, answer) => {
    // creates a new flashcard object with the below properties
    const newFlashcard = {
      id: flashcards.length + 1,
      question,
      answer,
      gotWrong: null,
    };
    // Adds that new card into the state
    setFlashcards([...flashcards, newFlashcard]);
  };
  // Function to mark a flashcard as incorrect
  const markIncorrect = (id) => {
     // Update the gotWrong property of the flashcard with the given id to true
    setFlashcards(flashcards.map(flashcard => 
      flashcard.id === id ? { ...flashcard, gotWrong: true } : flashcard
    ));
    setReviewMessage('Please review this card again.');
    setTimeout(() => {
      setReviewMessage('');
      // clear in 3 secs 
    }, 3000); 
  };
  // Function to toggle the filter for showing only review cards
  const handleFilter = (filterValue) => {
    setFilter(filterValue);
  };
  // filters flashcards based on the filter state
  const filteredFlashcards = flashcards.filter(flashcard => !filter || flashcard.gotWrong);

  return (
    <Container className="mt-5">
      <h1>Flash Card Generator For Jocelyn</h1>
      <Tabs defaultActiveKey="add" id="flashcard-tabs" className="mb-3">
        <Tab eventKey="add" title="Add Flashcard">
          <FlashcardForm addFlashcard={addFlashcard} />
        </Tab>
        <Tab eventKey="view" title="View Flashcards">
          {reviewMessage && (
            <Alert variant="warning" className="mt-3">
              {reviewMessage}
            </Alert>
          )}
          <ButtonGroup className="mt-3">
            <Button variant={filter ? 'secondary' : 'primary'} onClick={handleFilter}>
              {filter ? 'Show All Cards' : 'Show Review Cards'}
            </Button>
          </ButtonGroup>
          <h2 className="mt-4">Generated Flash Cards</h2>
          <FlashcardList flashcards={filteredFlashcards} markIncorrect={markIncorrect} />
        </Tab>
      </Tabs>
    </Container>
  );
}


export default App;
