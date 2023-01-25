import React from "react";
import './Chessboard.css'

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const horizontalAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export default function Chessboard() {
  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const square_number = j + i;

      // Made chessboard with all the 'useful' squares
      if (square_number % 2 === 0) {
        if ((i < 3 && j < 3) || (i >= 11 && j < 3) || (i >= 11 && j >= 11) || (i < 3 && j >= 11)) {
          board.push(
            <div className="tile useless"></div>
          )
        }
        else {
          board.push(
            <div className="tile dark-tile"></div>
          )
        }
      }
      else {
        if ((i < 3 && j < 3) || (i >= 11 && j < 3) || (i >= 11 && j >= 11) || (i < 3 && j >= 11)) {
          board.push(
            <div className="tile useless">[{horizontalAxis[i]}{verticalAxis[j]}]</div>
          )
        }
        else {
          board.push(
            <div className="tile light-tile"></div>
          )
        }
      }
    }
  }

  return (
    <div id="chessboard">{board}</div>
  )
}