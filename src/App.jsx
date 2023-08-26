import { useState } from "react";
function Square({ handleClick, value }) {
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squres, move) => {
    let description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <h4 className="glow-on-hover" onClick={() => jumpTo(move)}>
          {description}
        </h4>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul style={{ listStyle: "none" }}>{moves}</ul>
      </div>
    </div>
  );
}
function Board({ xIsNext, squares, onPlay }) {
  let status = "";

  const winner = isWinner(squares);
  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }
    const currentSquares = squares.slice();
    if (xIsNext) {
      currentSquares[i] = "X";
    } else {
      currentSquares[i] = "O";
    }
    onPlay(currentSquares);
  }

  if (winner) {
    status = `The winner is ${winner}`;
  } else {
    status = `Current player is ${xIsNext ? "X" : "O"}`;
  }
  const renderBoard = Array(9)
    .fill(null)
    .map((squres, i) => {
      let counter = -1; //because im dumb
      let renderSquares = Array(3)
        .fill(null)
        .map((square) => {
          i === 0 ? counter++ : (counter *= i);
          console.log(counter);
          return (
            <Square
              key={counter}
              handleClick={() => handleClick(counter)}
              value={squares[counter]}
            />
          );
        });

      return <div key={i}>{renderSquares}</div>;
    });
  return (
    <div className="mainContainer">
      <h1>{status}</h1>
      {renderBoard}
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
