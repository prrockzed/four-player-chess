import React, { useRef, useState } from 'react'
import Tile from '../Tile/Tile'
import './Chessboard.css'
import Referee from '../../referee/Referee'
import {
  verticalAxis,
  horizontalAxis,
  Piece,
  PieceType,
  TeamType,
  initialBoardState,
} from '../../Constants'

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

        const pawnDirection =
          currentPiece.team === TeamType.RED ||
          currentPiece.team === TeamType.BLUE
            ? 1
            : -1

        if (validMove) {
          // Updating the position of the piece
          // If a piece is attacked then remove it
          const updatedPieces = pieces.reduce((results, piece) => {
            if (piece.x === gridX && piece.y === gridY) {
              piece.x = x
              piece.y = y
              results.push(piece)
            } else if (!(piece.x === x && piece.y === y)) {
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
