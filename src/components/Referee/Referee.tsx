import Chessboard from '../Chessboard/Chessboard'
import { useEffect, useRef, useState } from 'react'
import { initialBoard } from '../../Constants'
import { PieceType, TeamType } from '../../Types'
import {
  bishopMove,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from '../../rules'
import { Piece, Position } from '../../models'
import { Board } from '../../models/Board'

export default function Referee() {
  const [board, setBoard] = useState<Board>(initialBoard)
  const [promotionPawn, setPromotionPawn] = useState<Piece>()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updatePossibleMoves()
  }, [])

  function updatePossibleMoves() {
    board.calculateAllMoves()
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
    if (playedPiece.possibleMoves === undefined) return false

    let playedMoveIsValid = false

    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    )

    if (!validMove) return false

    // playMove modifies the board state
    setBoard((previousBoard) => {
      // Playing a move
      playedMoveIsValid = board.playMove(validMove, playedPiece, destination)
      return board.clone()
    })

    // Checking if a pawn is promoted
    if (playedPiece.isPawn) {
      if (
        (playedPiece.team === TeamType.RED && destination.y === 7) ||
        (playedPiece.team === TeamType.YELLOW && destination.y === 6) ||
        (playedPiece.team === TeamType.BLUE && destination.x === 7) ||
        (playedPiece.team === TeamType.GREEN && destination.x === 6)
      ) {
        modalRef.current?.classList.remove('hidden')
        setPromotionPawn((previousPromotionPawn) => {
          const clonedPlayedPiece = playedPiece.clone()
          clonedPlayedPiece.position = destination.clone()
          return clonedPlayedPiece
        })
      }
    }
    return playedMoveIsValid
  }

  function isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType
  ) {
    let validMove = false
    switch (type) {
      case PieceType.PAWN:
        validMove = pawnMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.ROOK:
        validMove = rookMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
        break
      case PieceType.KING:
        validMove = kingMove(
          initialPosition,
          desiredPosition,
          team,
          board.pieces
        )
    }

    return validMove
  }

  // Function to promote a pawn to the desired piece
  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return
    }

    setBoard((previousBoard) => {
      const clonedBoard = board.clone()
      clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(promotionPawn)) {
          results.push(new Piece(piece.position.clone(), pieceType, piece.team))
        } else {
          results.push(piece)
        }
        return results
      }, [] as Piece[])
      clonedBoard.calculateAllMoves()

      return clonedBoard
    })

    // Toggling the modal
    modalRef.current?.classList.add('hidden')
  }

  // Deciding the type of color of the pieces when opening the modal
  function promotionTeamType() {
    if (promotionPawn?.team === TeamType.RED) {
      return 'r'
    } else if (promotionPawn?.team === TeamType.BLUE) {
      return 'b'
    } else if (promotionPawn?.team === TeamType.YELLOW) {
      return 'y'
    } else if (promotionPawn?.team === TeamType.GREEN) {
      return 'g'
    }
  }

  return (
    <>
      <div id='pawn-promotion-modal' className='hidden' ref={modalRef}>
        <div className='modal-body'>
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/${promotionTeamType()}R.png`}
            alt='Rook'
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/${promotionTeamType()}N.png`}
            alt='Knight'
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/${promotionTeamType()}B.png`}
            alt='Bishop'
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/${promotionTeamType()}Q.png`}
            alt='Queen'
          />
        </div>
      </div>
      <Chessboard playMove={playMove} pieces={board.pieces} />
    </>
  )
}
