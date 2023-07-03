import { Piece } from './Piece'
import { Position } from './Position'
import { PieceType, TeamType } from '../Types'
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
  totalTurns: number

  constructor(pieces: Piece[], totalTurns: number) {
    this.pieces = pieces
    this.totalTurns = totalTurns
  }

  get currentTeam(): TeamType {
    if (this.totalTurns % 4 === 1) {
      return TeamType.RED
    } else if (this.totalTurns % 4 === 2) {
      return TeamType.BLUE
    } else if (this.totalTurns % 4 === 3) {
      return TeamType.YELLOW
    } else {
      return TeamType.GREEN
    }
  }

  calculateAllMoves() {
    // For each piece, calculate the possible moves
    for (const piece of this.pieces) {
      piece.possibleMoves = this.getValidMoves(piece, this.pieces)
    }

    // Checking if the moves of king are valid
    this.checkKingMoves()

    // Remove the possible moves of the team
    //that does not have its chance at the moment
    for (const piece of this.pieces.filter(
      (p) => p.team !== this.currentTeam
    )) {
      piece.possibleMoves = []
    }
  }

  checkKingMoves() {
    // King of current team
    const king = this.pieces.find(
      (p) => p.isKing && p.team === this.currentTeam
    )

    if (king?.possibleMoves === undefined) return

    // Simulate king moves
    for (const move of king.possibleMoves) {
      const simulatedBoard = this.clone()

      const pieceAtDestination = simulatedBoard.pieces.find((p) =>
        p.samePosition(move)
      )

      // If there is a piece at the destination remove it
      if (pieceAtDestination !== undefined) {
        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move)
        )
      }

      // We tell the compiler that the simulated king is always present
      const simulatedKing = simulatedBoard.pieces.find(
        (p) => p.isKing && p.team === simulatedBoard.currentTeam
      )
      simulatedKing!.position = move

      for (const enemy of simulatedBoard.pieces.filter(
        (p) => p.team !== simulatedBoard.currentTeam
      )) {
        enemy.possibleMoves = simulatedBoard.getValidMoves(
          enemy,
          simulatedBoard.pieces
        )
      }

      let safe = true

      // Determine if the move is safe
      for (const p of simulatedBoard.pieces) {
        if (p.team === simulatedBoard.currentTeam) continue

        if (p.isPawn) {
          const possiblePawnMoves = simulatedBoard.getValidMoves(
            p,
            simulatedBoard.pieces
          )

          if (
            possiblePawnMoves?.some(
              (ppm) => ppm.x !== p.position.x && ppm.samePosition(move)
            )
          ) {
            safe = false
            break
          }
        } else if (p.possibleMoves?.some((p) => p.samePosition(move))) {
          safe = false
          break
        }
      }

      // Remove the move from possibleMoves
      if (!safe) {
        king.possibleMoves = king.possibleMoves?.filter(
          (m) => !m.samePosition(move)
        )
      }
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
    return new Board(
      this.pieces.map((p) => p.clone()),
      this.totalTurns
    )
  }
}
