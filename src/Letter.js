import React from 'react';
import './styles.css'; // Import the CSS file

function Letter({ value, style }) {
  return (
    <button className="square" style={style}>
      {value}
    </button>
  );
}

export default Letter;
