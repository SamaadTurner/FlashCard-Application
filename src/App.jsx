import React, { useState } from 'react';
import FlashcardList from '../components/FlashcardList';
import FlashcardForm from '../components/FlashcardForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styling/App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  const addFlashcard = (question, answer) => {
    const newFlashcard = {
      id: flashcards.length + 1,
      question,
      answer,
    };
    setFlashcards([...flashcards, newFlashcard]);
  };

  return (
    <div className="container mt-5">
      <section>
        <h2>
          Welcome to the Flashcard Generator! You can add flashcards by entering a question and an answer in the form below.
          Clicking on a flashcard will flip it and that will reveal the answer.
        </h2>
      <FlashcardForm addFlashcard={addFlashcard} />
      </section>
      <section>
        <h2>Generated Flashcards</h2>
        {flashcards.length > 0 ? (
          <FlashcardList flashcards={flashcards} />
        ) : (
          <p>No flashcards generated yet. Please add a new flashcard.</p>
        )}
      </section>
    </div>
  );
}

export default App;
