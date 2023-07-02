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
    let playedMoveIsValid = false

    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    )

    // playMove modifies the board state
    setBoard((previousBoard) => {
      // Playing a move
      playedMoveIsValid = board.playMove(validMove, playedPiece, destination)
      return board.clone()
    })

    // Checking if a pawn is promoted
    if (playedPiece.isPawn) {
      if (playedPiece.team === TeamType.RED && destination.y === 7) {
        modalRef.current?.classList.remove('hidden')
        setPromotionPawn(playedPiece)
      } else if (playedPiece.team === TeamType.YELLOW && destination.y === 6) {
        modalRef.current?.classList.remove('hidden')
        setPromotionPawn(playedPiece)
      } else if (playedPiece.team === TeamType.BLUE && destination.x === 7) {
        modalRef.current?.classList.remove('hidden')
        setPromotionPawn(playedPiece)
      } else if (playedPiece.team === TeamType.GREEN && destination.x === 6) {
        modalRef.current?.classList.remove('hidden')
        setPromotionPawn(playedPiece)
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

    board.pieces = board.pieces.reduce((results, piece) => {
      if (piece.samePiecePosition(promotionPawn)) {
        piece.type = pieceType

        // Deciding team type
        let teamType = ''
        if (piece.team === TeamType.RED) {
          teamType = 'r'
        } else if (piece.team === TeamType.BLUE) {
          teamType = 'b'
        } else if (piece.team === TeamType.YELLOW) {
          teamType = 'y'
        } else if (piece.team === TeamType.GREEN) {
          teamType = 'g'
        }

        // Deciding piece type
        let image = ''
        switch (pieceType) {
          case PieceType.ROOK:
            image = 'R'
            break
          case PieceType.KNIGHT:
            image = 'N'
            break
          case PieceType.BISHOP:
            image = 'B'
            break
          case PieceType.QUEEN:
            image = 'Q'
            break
        }

        piece.image = `assets/images/${teamType}${image}.png`
      }

      results.push(piece)
      return results
    }, [] as Piece[])

    // Updating current piece and toggling the modal
    updatePossibleMoves()
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
