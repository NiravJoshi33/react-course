import { useState } from "react";
import "./App.css";

function Square({
  value,
  onSquareClick,
  i,
}: {
  value: string;
  onSquareClick: (i: number) => void;
  i: number;
}) {
  return (
    <>
      <button className="square" onClick={() => onSquareClick(i)}>
        {value}
      </button>
    </>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true); // For swapping turns of X and O
  const [squares, setSquares] = useState<string[]>(Array(9).fill("")); // For storing the state of the board

  function calculateWinner(squares: string[]): string | null {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] !== "" &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function isBoardFull(squares: string[]): boolean {
    return squares.every((square) => square !== "");
  }

  function handleClick(i: number): void {
    if (squares[i] !== "") return; // If the square is already filled, do nothing

    if (calculateWinner(squares)) return; // If the game is over, do nothing

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  let status: string;
  const winner = calculateWinner(squares);
  if (winner) {
    status = `${winner} wins!`;
  } else if (isBoardFull(squares)) {
    status = "It's a draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="tic-tac-toe">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={handleClick} i={0} />
          <Square value={squares[1]} onSquareClick={handleClick} i={1} />
          <Square value={squares[2]} onSquareClick={handleClick} i={2} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={handleClick} i={3} />
          <Square value={squares[4]} onSquareClick={handleClick} i={4} />
          <Square value={squares[5]} onSquareClick={handleClick} i={5} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={handleClick} i={6} />
          <Square value={squares[7]} onSquareClick={handleClick} i={7} />
          <Square value={squares[8]} onSquareClick={handleClick} i={8} />
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <h1>Tic Tac Toe</h1>

      <Board />
    </>
  );
}
