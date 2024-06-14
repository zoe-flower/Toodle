import { generate } from "random-words";
import React, { useState, useEffect } from 'react';
import Keyboard from './Keyboard'; // Import Keyboard component
import Board from './Board'; // Import Board component
import Letter from './Letter'; // Import Letter component

function Toodle() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState({
    correct: [],
    incorrectPosition: [],
    incorrect: [],
  });
  const [validWords, setValidWords] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const generatedWord = generate({ minLength: 5, maxLength: 5 });
    setWordToGuess(generatedWord);
  }, []);

  useEffect(() => {
    fetch('/sgb-words.txt')
      .then(response => response.text())
      .then(text => {
        const wordsArray = text.split('\n').map(word => word.trim().toLowerCase());
        setValidWords(new Set(wordsArray));
      });
  }, []);

  useEffect(() => {
    if (attempts.length > 0) {
      const lastAttempt = attempts[attempts.length - 1];
      if (lastAttempt === wordToGuess) {
        setGameOver(true);
        alert(`Congratulations! You guessed the word in ${attempts.length} attempts.`);
        resetGame();
      } else if (attempts.length === 5) {
        setGameOver(true);
        alert(`Better luck tomorrow! The word was "${wordToGuess}"`);
        resetGame();
      }
    }
  }, [attempts, wordToGuess]);

  const resetGame = () => {
    const generatedWord = generate({ minLength: 5, maxLength: 5 });
    setWordToGuess(generatedWord);
    setAttempts([]);
    setUsedLetters({
      correct: [],
      incorrectPosition: [],
      incorrect: [],
    });
    setInputValue('');
    setMessage('');
    setGameOver(false);
  };
  

  const handleKeyPress = (event) => {
    if (gameOver) return;

    const letter = event.key.toLowerCase();
    if (/^[a-z]$/.test(letter)) {
      if (inputValue.length < 5) {
        setInputValue(inputValue + letter);
      }
    } else if (event.key === 'Enter') {
      if (inputValue.length !== 5) {
        setMessage('Word must be 5 letters');
        return;
      }
      if (!validWords.has(inputValue)) {
        setMessage('Not a valid word');
        return;
      }
      setAttempts([...attempts, inputValue]);
      updateUsedLetters(inputValue);
      setInputValue('');
      setMessage('');
    } else if (event.key === 'Backspace') {
      setInputValue(inputValue.slice(0, -1));
    }
  };

  const handleLetterClick = (letter) => {
    if (gameOver) return;

    if (inputValue.length < 5) {
      setInputValue(inputValue + letter);
    }
  };

  const updateUsedLetters = (word) => {
    let newUsedLetters = { ...usedLetters };

    word.split('').forEach((letter, index) => {
      if (wordToGuess[index] === letter) {
        if (!newUsedLetters.correct.includes(letter)) {
          newUsedLetters.correct.push(letter);
        }
      } else if (wordToGuess.includes(letter)) {
        if (!newUsedLetters.incorrectPosition.includes(letter)) {
          newUsedLetters.incorrectPosition.push(letter);
        }
      } else {
        if (!newUsedLetters.incorrect.includes(letter)) {
          newUsedLetters.incorrect.push(letter);
        }
      }
    });

    setUsedLetters(newUsedLetters);
  };

  const getLetterStyle = (letter, index, attemptIndex) => {
    if (attemptIndex >= attempts.length) return {};
    const currentWord = attempts[attemptIndex];
    if (wordToGuess[index] === letter) {
      return { backgroundColor: 'green', color: 'white' };
    } else if (wordToGuess.includes(letter)) {
      return { backgroundColor: 'yellow', color: 'black' };
    } else {
      return { backgroundColor: 'grey', color: 'white' };
    }
  };

  return (
    <div className="toodle-container" tabIndex="0" onKeyDown={handleKeyPress} style={{ outline: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Board
        attempts={attempts}
        inputValue={inputValue}
        wordToGuess={wordToGuess}
        getLetterStyle={getLetterStyle}
      />
      <Keyboard
        usedLetters={usedLetters}
        onLetterClick={handleLetterClick}
      />
      <div>{message}</div>
    </div>
  );
}

export default Toodle;
