import { Piece } from './Piece'
import { Position } from './Position'
import { PieceType } from '../Types'
import {
  getPossibleBishopMoves,
  getPossibleKingMoves,
  getPossibleKnightMoves,
  getPossiblePawnMoves,
  getPossibleQueenMoves,
  getPossibleRookMoves,
} from '../rules'

export class Board {
  pieces: Piece[]

  constructor(pieces: Piece[]) {
    this.pieces = pieces
  }

  calculateAllMoves() {
    for (const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces)
    }
  }

  getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
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

  playMove(
    validMove: boolean,
    playedPiece: Piece,
    destination: Position
  ): boolean {
    if (validMove) {
      // Updated the pieces position
      // And if a piece is attacked, removes it
      this.pieces = this.pieces.reduce((results, piece) => {
        // Piece that we are currently playing
        if (piece.samePiecePosition(playedPiece)) {
          piece.position.x = destination.x
          piece.position.y = destination.y

          results.push(piece)
        } else if (!piece.samePosition(destination)) {
          results.push(piece)
        }

        return results
      }, [] as Piece[])

      this.calculateAllMoves()
    } else {
      return false
    }

    return true
  }

  clone(): Board {
    return new Board(this.pieces.map((p) => p.clone()))
  }
}
