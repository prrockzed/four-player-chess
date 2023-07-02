import Chessboard from '../Chessboard/Chessboard'
import { useEffect, useRef, useState } from 'react'
import { initialBoardState } from '../../Constants'
import { PieceType, TeamType } from '../../Types'
import {
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
  bishopMove,
  kingMove,
  knightMove,
  pawnMove,
  queenMove,
  rookMove,
} from '../../rules'
import { Piece, Position } from '../../models'

export default function Referee() {
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  const [promotionPawn, setPromotionPawn] = useState<Piece>()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    updatePossibleMoves()
  }, [])

  function updatePossibleMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = getValidMoves(p, currentPieces)
        return p
      })
    })
  }

  function playMove(playedPiece: Piece, destination: Position): boolean {
    const validMove = isValidMove(
      playedPiece.position,
      destination,
      playedPiece.type,
      playedPiece.team
    )

    if (validMove) {
      //UPDATES THE PIECE POSITION
      //AND IF A PIECE IS ATTACKED, REMOVES IT
      const updatedPieces = pieces.reduce((results, piece) => {
        if (piece.samePiecePosition(playedPiece)) {
          piece.position.x = destination.x
          piece.position.y = destination.y

          // Checking if a pawn is promoted
          if (piece.type === PieceType.PAWN) {
            if (piece.team === TeamType.RED && destination.y === 7) {
              modalRef.current?.classList.remove('hidden')
              setPromotionPawn(piece)
            } else if (piece.team === TeamType.YELLOW && destination.y === 6) {
              modalRef.current?.classList.remove('hidden')
              setPromotionPawn(piece)
            } else if (piece.team === TeamType.BLUE && destination.x === 7) {
              modalRef.current?.classList.remove('hidden')
              setPromotionPawn(piece)
            } else if (piece.team === TeamType.GREEN && destination.x === 6) {
              modalRef.current?.classList.remove('hidden')
              setPromotionPawn(piece)
            }
          }

          results.push(piece)
        } else if (
          !piece.samePosition(new Position(destination.x, destination.y))
        ) {
          results.push(piece)
        }

        return results
      }, [] as Piece[])

      updatePossibleMoves()
      setPieces(updatedPieces)
    } else {
      return false
    }
    return true
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
        validMove = pawnMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.KNIGHT:
        validMove = knightMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.BISHOP:
        validMove = bishopMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.QUEEN:
        validMove = queenMove(initialPosition, desiredPosition, team, pieces)
        break
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, pieces)
    }

    return validMove
  }

  function getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
    switch (piece.type) {
      case PieceType.PAWN:
        return getPossiblePawnMoves(piece, boardState)
      case PieceType.KNIGHT:
        return getPossibleKnightMoves(piece, boardState)
      case PieceType.BISHOP:
        return getPossibleBishopMoves(piece, boardState)
      case PieceType.ROOK:
        return getPossibleRookMoves(piece, boardState)
      case PieceType.QUEEN:
        return getPossibleQueenMoves(piece, boardState)
      case PieceType.KING:
        return getPossibleKingMoves(piece, boardState)
      default:
        return []
    }
  }

  // Function to promote a pawn to the desired piece
  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return
    }

    const updatedPieces = pieces.reduce((results, piece) => {
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
    setPieces(updatedPieces)
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
      <Chessboard playMove={playMove} pieces={pieces} />
    </>
  )
}
