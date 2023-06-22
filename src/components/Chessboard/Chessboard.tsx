import React, { useRef, useState } from 'react'
import Tile from '../Tile/Tile'
import './Chessboard.css'
import Referee from '../../referee/Referee'

const verticalAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const horizontalAxis = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export interface Piece {
  image: string
  x: number
  y: number
  type: PieceType
  team: TeamType
  enPassant?: boolean
}

export enum TeamType {
  RED,
  BLUE,
  YELLOW,
  GREEN,
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

// Pieces
const initialBoardState: Piece[] = []

for (let p = 0; p < 2; p++) {
  const teamType_yr = p === 0 ? TeamType.YELLOW : TeamType.RED
  const teamType_gb = p === 0 ? TeamType.GREEN : TeamType.BLUE
  const type_yr = teamType_yr === TeamType.YELLOW ? 'y' : 'r' // For yellow and red types
  const type_gb = teamType_gb === TeamType.GREEN ? 'g' : 'b' // For green and blue types
  const y = p === 0 ? 13 : 0
  const x = p === 0 ? 13 : 0

  // Red and Yellow Main Pieces
  // Rooks
  initialBoardState.push({
    image: `assets/images/${type_yr}R.png`,
    x: 3,
    y,
    type: PieceType.ROOK,
    team: teamType_yr,
  })
  initialBoardState.push({
    image: `assets/images/${type_yr}R.png`,
    x: 10,
    y,
    type: PieceType.ROOK,
    team: teamType_yr,
  })

  // Knights
  initialBoardState.push({
    image: `assets/images/${type_yr}N.png`,
    x: 4,
    y,
    type: PieceType.KNIGHT,
    team: teamType_yr,
  })
  initialBoardState.push({
    image: `assets/images/${type_yr}N.png`,
    x: 9,
    y,
    type: PieceType.KNIGHT,
    team: teamType_yr,
  })

  // Bishops
  initialBoardState.push({
    image: `assets/images/${type_yr}B.png`,
    x: 5,
    y,
    type: PieceType.BISHOP,
    team: teamType_yr,
  })
  initialBoardState.push({
    image: `assets/images/${type_yr}B.png`,
    x: 8,
    y,
    type: PieceType.BISHOP,
    team: teamType_yr,
  })

  // Kings and Queens
  if (type_yr === 'y') {
    initialBoardState.push({
      image: `assets/images/${type_yr}Q.png`,
      x: 7,
      y,
      type: PieceType.QUEEN,
      team: teamType_yr,
    })
    initialBoardState.push({
      image: `assets/images/${type_yr}K.png`,
      x: 6,
      y,
      type: PieceType.KING,
      team: teamType_yr,
    })
  } else {
    initialBoardState.push({
      image: `assets/images/${type_yr}Q.png`,
      x: 6,
      y,
      type: PieceType.QUEEN,
      team: teamType_yr,
    })
    initialBoardState.push({
      image: `assets/images/${type_yr}K.png`,
      x: 7,
      y,
      type: PieceType.KING,
      team: teamType_yr,
    })
  }

  // Blue and Green Main Pieces
  // Rooks
  initialBoardState.push({
    image: `assets/images/${type_gb}R.png`,
    x,
    y: 3,
    type: PieceType.ROOK,
    team: teamType_gb,
  })
  initialBoardState.push({
    image: `assets/images/${type_gb}R.png`,
    x,
    y: 10,
    type: PieceType.ROOK,
    team: teamType_gb,
  })

  // Knights
  initialBoardState.push({
    image: `assets/images/${type_gb}N.png`,
    x,
    y: 4,
    type: PieceType.KNIGHT,
    team: teamType_gb,
  })
  initialBoardState.push({
    image: `assets/images/${type_gb}N.png`,
    x,
    y: 9,
    type: PieceType.KNIGHT,
    team: teamType_gb,
  })

  // Bishops
  initialBoardState.push({
    image: `assets/images/${type_gb}B.png`,
    x,
    y: 5,
    type: PieceType.BISHOP,
    team: teamType_gb,
  })
  initialBoardState.push({
    image: `assets/images/${type_gb}B.png`,
    x,
    y: 8,
    type: PieceType.BISHOP,
    team: teamType_gb,
  })

  // Kings and Queens
  if (type_gb === 'g') {
    initialBoardState.push({
      image: `assets/images/${type_gb}Q.png`,
      x,
      y: 7,
      type: PieceType.QUEEN,
      team: teamType_gb,
    })
    initialBoardState.push({
      image: `assets/images/${type_gb}K.png`,
      x,
      y: 6,
      type: PieceType.KING,
      team: teamType_gb,
    })
  } else {
    initialBoardState.push({
      image: `assets/images/${type_gb}Q.png`,
      x,
      y: 6,
      type: PieceType.QUEEN,
      team: teamType_gb,
    })
    initialBoardState.push({
      image: `assets/images/${type_gb}K.png`,
      x,
      y: 7,
      type: PieceType.KING,
      team: teamType_gb,
    })
  }
}

// Pawns
for (let i = 3; i < 11; i++) {
  initialBoardState.push({
    image: 'assets/images/rP.png',
    x: i,
    y: 1,
    type: PieceType.PAWN,
    team: TeamType.RED,
  })
  initialBoardState.push({
    image: 'assets/images/yP.png',
    x: i,
    y: 12,
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  })
}
for (let j = 3; j < 11; j++) {
  initialBoardState.push({
    image: 'assets/images/bP.png',
    x: 1,
    y: j,
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  })
  initialBoardState.push({
    image: 'assets/images/gP.png',
    x: 12,
    y: j,
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  })
}

export default function Chessboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
  const [gridX, setGridX] = useState(0)
  const [gridY, setGridY] = useState(0)
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  const chessboardRef = useRef<HTMLDivElement>(null)
  const referee = new Referee()

  function grabPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    const element = e.target as HTMLElement
    if (element.classList.contains('chess-piece') && chessboard) {
      setGridX(Math.floor((e.clientX - chessboard.offsetLeft) / 50))
      setGridY(
        Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 700) / 50))
      )
      const x = e.clientX - 25
      const y = e.clientY - 25
      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`
      setActivePiece(element)
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if (activePiece && chessboard) {
      const leftX = chessboard.offsetLeft - 4
      const midleftX =
        chessboard.offsetLeft + (chessboard.clientWidth / 14) * 3 - 4
      const topY = chessboard.offsetTop - 4
      const midtopY =
        chessboard.offsetTop + (chessboard.clientHeight / 14) * 3 - 4
      const rightX = chessboard.offsetLeft + chessboard.clientWidth - 46
      const midrightX =
        chessboard.offsetLeft -
        (chessboard.clientWidth / 14) * 3 +
        chessboard.clientWidth -
        46
      const bottomY = chessboard.offsetTop + chessboard.clientHeight - 46
      const midbottomY =
        chessboard.offsetTop -
        (chessboard.clientHeight / 14) * 3 +
        chessboard.clientHeight -
        46
      const x = e.clientX - 25
      const y = e.clientY - 25
      activePiece.style.position = 'absolute'

      // Restricting the x position
      if (x < leftX) {
        activePiece.style.left = `${leftX}px`
      } else if (x > rightX) {
        activePiece.style.left = `${rightX}px`
      } else {
        activePiece.style.left = `${x}px`
      }

      // Restricting the y position
      if (y < topY) {
        activePiece.style.top = `${topY}px`
      } else if (y > bottomY) {
        activePiece.style.top = `${bottomY}px`
      } else {
        activePiece.style.top = `${y}px`
      }

      if ((x < midleftX && y > midbottomY) || (x < midleftX && y < midtopY)) {
        activePiece.style.left = `${midleftX}px`
      } else if (
        (x > midrightX && y > midbottomY) ||
        (x > midrightX && y < midtopY)
      ) {
        activePiece.style.left = `${midrightX}px`
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current
    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / 50)
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 700) / 50)
      )

      const currentPiece = pieces.find((p) => p.x === gridX && p.y === gridY)
      // const attackedPiece = pieces.find((p) => p.x === x && p.y === y)

      if (currentPiece) {
        const validMove = referee.isValidMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        )

        const isEnPassantMove = referee.isEnPassantMove(
          gridX,
          gridY,
          x,
          y,
          currentPiece.type,
          currentPiece.team,
          pieces
        )

        const pawnDirection = currentPiece.team === TeamType.RED ? 1 : -1

        if (isEnPassantMove) {
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.enPassant = false
              piece.x = x
              piece.y = y
              results.push(piece)
            } else if (!(piece.x === x && piece.y === y - pawnDirection)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false
              }
              results.push(piece)
            }

            return results
          }, [] as Piece[])

          setPieces(updatedPieces)
        } else if (validMove) {
          // Updating the position of the piece
          // If a piece is attacked then remove it
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              if (Math.abs(gridY - y) === 2 && piece.type === PieceType.PAWN) {
                // Special Pawn
                piece.enPassant = true
              } else {
                piece.enPassant = false
              }
              piece.x = x
              piece.y = y
              results.push(piece)
            } else if (!(piece.x === x && piece.y === y)) {
              if (piece.type === PieceType.PAWN) {
                piece.enPassant = false
              }
              results.push(piece)
            }
            return results
          }, [] as Piece[])

          setPieces(updatedPieces)
        } else {
          // Resets the piece position
          activePiece.style.position = 'relative'
          activePiece.style.removeProperty('top')
          activePiece.style.removeProperty('left')
        }
      }
      setActivePiece(null)
    }
  }

  let board = []

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const num_i = i
      const num_j = j
      let image = undefined

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image
        }
      })

      // Made chessboard with all the 'useful' squares
      board.push(
        <Tile key={`${i},${j}`} num_i={num_i} num_j={num_j} image={image} />
      )
    }
  }

  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grabPiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id='chessboard'
      ref={chessboardRef}
    >
      {board}
    </div>
  )
}
