import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculatorWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [9, 10, 11],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winner = calculatorWinner(current.squares);

  let status;
  if (winner) {
    status = `Winner is ${winner}`;
  } else {
    status = `Next player ${xIsNext ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newcurrent = newHistory[newHistory.length - 1];
    const newSquares = current.squares.slice();
    if (calculatorWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }]);
    setXIsNext((prev) => !prev);

    setStepNumber(newHistory.length);
  };

  const moves = history.map((step, move) => {
    const desc = move ? 'GO to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button className='move-button' onClick={() => jumpTO(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const jumpTO = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setHistory([...history]);
  };
  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className='game-info'></div>
      <div className='status'>{status}</div>
      <ol style={{ listStyle: 'none' }}>{moves}</ol>
    </div>
  );
}

export default App;
