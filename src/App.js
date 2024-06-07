import { generate } from "random-words";
import React, { useState, useEffect as setWord } from 'react';

function Letter({ value, style }) {
  return (
    <button className="square" style={style}>
      {value}
    </button>
  );
}

function Keyboard({ usedLetters, onLetterClick }) {
  const qwerty = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    'zxcvbnm'.split('')
  ];

  const getLetterStyle = (letter) => {
    if (usedLetters.correct.includes(letter)) {
      return { backgroundColor: 'green', color: 'white' };
    } else if (usedLetters.incorrectPosition.includes(letter)) {
      return { backgroundColor: 'yellow', color: 'black' };
    } else if (usedLetters.incorrect.includes(letter)) {
      return { backgroundColor: 'grey', color: 'white' };
    } else {
      return { backgroundColor: 'white', color: 'black' };
    }
  };

  return (
    <div className="keyboard">
      {qwerty.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((letter, index) => (
            <span
            key={index}
            className="keyboard-letter"
            style={getLetterStyle(letter)}
            onClick={() => onLetterClick(letter)}
          >
            {letter.toUpperCase()}
          </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Toodle() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [message, setMessage] = useState('');
  const [usedLetters, setUsedLetters] = useState({
    correct: [],
    incorrectPosition: [],
    incorrect: [],
  });

  setWord(() => {
    const generatedWord = generate({ minLength: 5, maxLength: 5 });
    setWordToGuess(generatedWord);
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (inputValue.length !== 5) {
        setMessage('Word must be 5 letters');
        return;
      }
      if (!isValidWord(inputValue)) {
        setMessage('Not a valid word');
        return;
      }
      setAttempts([...attempts, inputValue]);
      console.log(wordToGuess);
      updateUsedLetters(inputValue);
      setInputValue('');
      setMessage('');
    }
  };

  const handleLetterClick = (letter) => {
    if (inputValue.length < 5) {
      setInputValue(inputValue + letter);
    }
  };


  const isValidWord = (word) => {
    // Replace this with a dictionary check if necessary
    return true;
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

  const getLetterStyle = (letter, index) => {
    if (attempts.length === 0) return {};
    const currentWord = attempts[attempts.length - 1];
    if (wordToGuess[index] === letter) {
      return { backgroundColor: 'green' };
    } else if (wordToGuess.includes(letter)) {
      return { backgroundColor: 'yellow' };
    } else {
      return { backgroundColor: 'grey' };
    }
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <div className="board">
        {Array(6).fill().map((_, attemptIndex) => (
          <div className="board-row" key={attemptIndex}>
            {Array(5).fill().map((_, letterIndex) => (
              <Letter
                key={letterIndex}
                value={attempts[attemptIndex]?.[letterIndex] || ''}
                style={getLetterStyle(attempts[attemptIndex]?.[letterIndex], letterIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      {/* <div className="input-display">
        {inputValue.split('').map((letter, index) => (
          <Letter key={index} value={letter} />
        ))}
        {Array(5 - inputValue.length).fill().map((_, index) => (
          <Letter key={inputValue.length + index} value="" />
        ))}
      </div> */}
      <Keyboard usedLetters={usedLetters} onLetterClick={handleLetterClick} />
      <div>{message}</div>
    </>
  );
}
