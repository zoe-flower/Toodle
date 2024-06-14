import React from 'react';
import Letter from './Letter'; // Import the Letter component
import './styles.css'; // Import the CSS file

function Board({ attempts, inputValue, wordToGuess, getLetterStyle }) {
  return (
    <div className="board">
      {Array(5).fill().map((_, attemptIndex) => (
        <div className="board-row" key={attemptIndex}>
          {Array(5).fill().map((_, letterIndex) => (
            <Letter
              key={letterIndex}
              value={attempts[attemptIndex]?.[letterIndex] || (attemptIndex === attempts.length ? inputValue[letterIndex] || '' : '')}
              style={getLetterStyle(attempts[attemptIndex]?.[letterIndex], letterIndex, attemptIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
