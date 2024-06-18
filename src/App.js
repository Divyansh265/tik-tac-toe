
import { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';
// import Box from './components/Box';
import ScoreBoard from './components/ScoreBoard';
import RestButton from './components/RestButton';

function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [xPlaying, setXPlaying] = useState(true)
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, SetGameOver] = useState(false)

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]


  const handleBoxClick = (boxIdx) => {
    const uodateBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying === true ? "X" : "O"
      }
      else {
        return value
      }
    })
    const winner = checkWinner(uodateBoard)
    if (winner) {
      if (winner === "O") {
        let { oScore } = scores
        oScore += 1
        setScores({ ...scores, oScore })
      } else {
        let { xScore } = scores
        xScore += 1
        setScores({ ...scores, xScore })
      }
    }

    // console.log(scores);
    setBoard(uodateBoard)
    setXPlaying(!xPlaying)
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i]
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        // console.log(board[x]);
        SetGameOver(true)
        return board[x]
      }
    }
  }

  const resetBoard = () => {
    SetGameOver(false)
    setBoard(Array(9).fill(null))
  }



  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem('scorecard'));

    if (storedScore) {
      setScores(storedScore);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('scorecard', JSON.stringify(scores));
  }, [scores]);



  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <RestButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
