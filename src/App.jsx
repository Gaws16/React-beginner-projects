import { useState } from "react";
function Square({ handleClick, value }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  function handlePlay(squaresArray) {
    setXIsNext(!xIsNext);
    setHistory([...history, squaresArray]);
  }
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          handlePlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol></ol>
      </div>
    </div>
  );
}
function Board({ xIsNext, squares, handlePlay }) {
  let status = "";

  const winner = isWinner(squares);
  function handleClick(i) {
    const currentSquares = squares.slice();
    if (currentSquares[i] || winner) {
      return;
    }
    if (xIsNext) {
      currentSquares[i] = "X";
    } else {
      currentSquares[i] = "O";
    }
    handlePlay(currentSquares);
  }

  if (winner) {
    status = `The winner is ${winner}`;
  } else {
    status = `Current player is ${xIsNext ? "X" : "O"}`;
  }
  return (
    <div className="mainContainer">
      <h1>{status}</h1>
      <div className="firstRow">
        <Square handleClick={() => handleClick(0)} value={squares[0]} />
        <Square handleClick={() => handleClick(1)} value={squares[1]} />
        <Square handleClick={() => handleClick(2)} value={squares[2]} />
      </div>
      <div className="secondRow">
        <Square handleClick={() => handleClick(3)} value={squares[3]} />
        <Square handleClick={() => handleClick(4)} value={squares[4]} />
        <Square handleClick={() => handleClick(5)} value={squares[5]} />
      </div>
      <div className="thirdRow">
        <Square handleClick={() => handleClick(6)} value={squares[6]} />
        <Square handleClick={() => handleClick(7)} value={squares[7]} />
        <Square handleClick={() => handleClick(8)} value={squares[8]} />
      </div>
    </div>
  );
}
function isWinner(squares) {
  let winner = null;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  lines.forEach((line) => {
    const [a, b, c] = line;
    if (
      squares[a] === squares[b] &&
      squares[a] === squares[c] &&
      squares[a] !== null
    ) {
      winner = squares[a];
    }
  });
  return winner;
}
