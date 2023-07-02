import { Piece } from './Piece'
import { Position } from './Position'
import { PieceType, TeamType } from '../Types'

export class Board {
  pieces: Piece[]

  constructor(pieces: Piece[]) {
    this.pieces = pieces
  }

  calculateAllMoves() {
    for (const piece of this.pieces) {
      piece.possibleMoves = []
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
        if (piece.samePiecePosition(playedPiece)) {
          piece.position.x = destination.x
          piece.position.y = destination.y

          results.push(piece)
        } else if (
          !piece.samePosition(new Position(destination.x, destination.y))
        ) {
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
}
