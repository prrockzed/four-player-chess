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
    board.calculateAllMoves()
  }, [])

  function playMove(playedPiece: Piece, destination: Position): boolean {
    if (playedPiece.possibleMoves === undefined) return false

    if (playedPiece.team === TeamType.RED && board.totalTurns % 4 !== 1) {
      return false
    } else if (
      playedPiece.team === TeamType.BLUE &&
      board.totalTurns % 4 !== 2
    ) {
      return false
    } else if (
      playedPiece.team === TeamType.YELLOW &&
      board.totalTurns % 4 !== 3
    ) {
      return false
    } else if (
      playedPiece.team === TeamType.GREEN &&
      board.totalTurns % 4 !== 0
    ) {
      return false
    }

    let playedMoveIsValid = false

    const validMove = playedPiece.possibleMoves?.some((m) =>
      m.samePosition(destination)
    )

    if (!validMove) return false

    // playMove modifies the board state
    setBoard((previousBoard) => {
      const clonedBoard = board.clone()

      // Incrementing the totalTurns when the correct piece is played
      clonedBoard.totalTurns += 1

      // Playing a move
      playedMoveIsValid = clonedBoard.playMove(
        validMove,
        playedPiece,
        destination
      )

      return clonedBoard
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

  let teamTurn = ''
  if (board.totalTurns % 4 === 1) {
    teamTurn = "Now it's player RED turn"
  } else if (board.totalTurns % 4 === 2) {
    teamTurn = "Now it's player Blue turn"
  } else if (board.totalTurns % 4 === 3) {
    teamTurn = "Now it's player Yellow turn"
  } else if (board.totalTurns % 4 === 0) {
    teamTurn = "Now it's player Green turn"
  }

  return (
    <>
      <p style={{ color: 'white', fontSize: '12px' }}>{teamTurn}</p>
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
