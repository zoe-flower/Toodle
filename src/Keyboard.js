import React from 'react';

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

export default Keyboard;
