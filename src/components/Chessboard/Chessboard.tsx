import React, { useRef } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css'


const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const horizontalAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]


interface Piece {
  image: string
  x: number
  y: number
}

// Pieces
const pieces: Piece[] = [];

// Red and Yellow Main Pieces
for (let p = 0; p < 2; p++) {
  const type = ((p === 0) ? "y" : "r");
  const y = ((p === 0) ? 13 : 0);

  // Rooks
  pieces.push({ image: `assets/images/${type}R.png`, x: 3, y })
  pieces.push({ image: `assets/images/${type}R.png`, x: 10, y })

  // Knights
  pieces.push({ image: `assets/images/${type}N.png`, x: 4, y })
  pieces.push({ image: `assets/images/${type}N.png`, x: 9, y })

  // Bishops
  pieces.push({ image: `assets/images/${type}B.png`, x: 5, y })
  pieces.push({ image: `assets/images/${type}B.png`, x: 8, y })

  // Kings and Queens
  pieces.push({ image: `assets/images/${type}Q.png`, x: 6, y })
  pieces.push({ image: `assets/images/${type}K.png`, x: 7, y })
  if (type === 'y') {
    pieces.push({ image: `assets/images/${type}Q.png`, x: 7, y })
    pieces.push({ image: `assets/images/${type}K.png`, x: 6, y })
  }
}

// Blue and Green Main Pieces
for (let p = 0; p < 2; p++) {
  const type = ((p === 0) ? "g" : "b");
  const x = ((p === 0) ? 13 : 0);

  // Rooks
  pieces.push({ image: `assets/images/${type}R.png`, x, y: 3 })
  pieces.push({ image: `assets/images/${type}R.png`, x, y: 10 })

  // Knights
  pieces.push({ image: `assets/images/${type}N.png`, x, y: 4 })
  pieces.push({ image: `assets/images/${type}N.png`, x, y: 9 })

  // Bishops
  pieces.push({ image: `assets/images/${type}B.png`, x, y: 5 })
  pieces.push({ image: `assets/images/${type}B.png`, x, y: 8 })

  // Kings and Queens
  pieces.push({ image: `assets/images/${type}Q.png`, x, y: 6 })
  pieces.push({ image: `assets/images/${type}K.png`, x, y: 7 })
  if (type === 'g') {
    pieces.push({ image: `assets/images/${type}Q.png`, x, y: 7 })
    pieces.push({ image: `assets/images/${type}K.png`, x, y: 6 })
  }
}

// Pawns
for (let i = 3; i < 11; i++) {
  pieces.push({ image: "assets/images/rP.png", x: i, y: 1 })
}
for (let i = 3; i < 11; i++) {
  pieces.push({ image: "assets/images/yP.png", x: i, y: 12 })
}
for (let j = 3; j < 11; j++) {
  pieces.push({ image: "assets/images/bP.png", x: 1, y: j })
}
for (let j = 3; j < 11; j++) {
  pieces.push({ image: "assets/images/gP.png", x: 12, y: j })
}


export default function Chessboard() {
  const chessboardRef = useRef<HTMLDivElement>(null);

  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;

    if (element.classList.contains("chess-piece")) {
      const x = e.clientX - 25;
      const y = e.clientY - 25;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const leftX = chessboard.offsetLeft - 4;
      const midleftX = chessboard.offsetLeft + ((chessboard.clientWidth / 14) * 3) - 4;
      const topY = chessboard.offsetTop - 4;
      const midtopY = chessboard.offsetTop + ((chessboard.clientHeight / 14) * 3) - 4;
      const rightX = chessboard.offsetLeft + chessboard.clientWidth - 46;
      const midrightX = chessboard.offsetLeft - ((chessboard.clientWidth / 14) * 3) + chessboard.clientWidth - 46;
      const bottomY = chessboard.offsetTop + chessboard.clientHeight - 46;
      const midbottomY = chessboard.offsetTop - ((chessboard.clientHeight / 14) * 3) + chessboard.clientHeight - 46;
      const x = e.clientX - 25;
      const y = e.clientY - 25;
      activePiece.style.position = "absolute";

      // Restricting the x position
      if (x < leftX) {
        activePiece.style.left = `${leftX}px`;
      }
      else if (x > rightX) {
        activePiece.style.left = `${rightX}px`;
      }
      else {
        activePiece.style.left = `${x}px`;
      }

      // Restricting the y position
      if (y < topY) {
        activePiece.style.top = `${topY}px`;
      }
      else if (y > bottomY) {
        activePiece.style.top = `${bottomY}px`;
      }
      else {
        activePiece.style.top = `${y}px`;
      }

      if ((x < midleftX && y > midbottomY) || (x < midleftX && y < midtopY)) {
        activePiece.style.left = `${midleftX}px`
      }
      else if ((x > midrightX && y > midbottomY) || (x > midrightX && y < midtopY)) {
        activePiece.style.left = `${midrightX}px`
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const num_i = i;
      const num_j = j;
      let image = undefined;

      pieces.forEach(p => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      })

      // Made chessboard with all the 'useful' squares
      board.push(<Tile key={`${i},${j}`} num_i={num_i} num_j={num_j} image={image} />)
    }
  }

  return (
    <div
      onMouseMove={e => movePiece(e)}
      onMouseDown={e => grabPiece(e)}
      onMouseUp={e => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  )
}