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
  getCastlingMoves,
} from '../rules'

// Exporting the board class
export class Board {
  pieces: Piece[]
  totalTurns: number
  losingTeam?: TeamType

  // Defining the constructor
  constructor(pieces: Piece[], totalTurns: number) {
    this.pieces = pieces
    this.totalTurns = totalTurns
  }

  // Getting the current playing team
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

    // Calculate castling moves
    for (const king of this.pieces.filter((p) => p.isKing)) {
      if (king.possibleMoves === undefined) continue

      king.possibleMoves = [
        ...king.possibleMoves,
        ...getCastlingMoves(king, this.pieces),
      ]
    }

    // Checking if the moves of king are valid
    this.checkCurrentTeamMoves()

    // Removing the possible moves of the team
    //that does not have its chance at the moment
    for (const piece of this.pieces.filter(
      (p) => p.team !== this.currentTeam
    )) {
      piece.possibleMoves = []
    }

    //Checking if the playing team still has moves left, else checkmate
    if (
      this.pieces
        .filter((p) => p.team === this.currentTeam)
        .some(
          (p) => p.possibleMoves !== undefined && p.possibleMoves.length > 0
        )
    )
      return

    this.losingTeam = this.currentTeam
  }

  checkCurrentTeamMoves() {
    // Looping through all the current team's pieces
    for (const piece of this.pieces.filter(
      (p) => p.team === this.currentTeam
    )) {
      if (piece.possibleMoves === undefined) continue

      // Simulate all the piece moves
      for (const move of piece.possibleMoves) {
        const simulatedBoard = this.clone()

        // Remove the piece at the destination position
        simulatedBoard.pieces = simulatedBoard.pieces.filter(
          (p) => !p.samePosition(move)
        )

        // Get the pieces of the cloned board
        const clonedPiece = simulatedBoard.pieces.find((p) =>
          p.samePiecePosition(piece)
        )!
        clonedPiece.position = move.clone()

        // Get the king of the cloned board
        const clonedKing = simulatedBoard.pieces.find(
          (p) => p.isKing && p.team === simulatedBoard.currentTeam
        )!

        // Loop through all enemy pieces, update their possible moves
        // And check if the current team's king will be in danger
        for (const enemy of simulatedBoard.pieces.filter(
          (p) => p.team !== simulatedBoard.currentTeam
        )) {
          enemy.possibleMoves = simulatedBoard.getValidMoves(
            enemy,
            simulatedBoard.pieces
          )

          if (enemy.isPawn) {
            if (
              enemy.possibleMoves.some(
                (m) =>
                  m.x !== enemy.position.x &&
                  m.samePosition(clonedKing.position)
              )
            ) {
              piece.possibleMoves = piece.possibleMoves?.filter(
                (m) => !m.samePosition(move)
              )
            }
          } else {
            if (
              enemy.possibleMoves.some((m) =>
                m.samePosition(clonedKing.position)
              )
            ) {
              piece.possibleMoves = piece.possibleMoves?.filter(
                (m) => !m.samePosition(move)
              )
            }
          }
        }
      }
    }
  }

  // Getting the valid moves of the pieces which is being played
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
    const destinationPiece = this.pieces.find((p) =>
      p.samePosition(destination)
    )

    // If castling is played
    if (
      playedPiece.isKing &&
      destinationPiece?.isRook &&
      destinationPiece.team === playedPiece.team
    ) {
      // Deciding the direction of castling for different players
      const direction =
        destinationPiece.team === TeamType.RED ||
        playedPiece.team === TeamType.YELLOW
          ? destinationPiece.position.x - playedPiece.position.x > 0
            ? 1
            : -1
          : destinationPiece.position.y - playedPiece.position.y > 0
          ? 1
          : -1

      // Implementing the direction of castling
      if (
        playedPiece.team === TeamType.RED ||
        playedPiece.team === TeamType.YELLOW
      ) {
        const newKingXPosition = playedPiece.position.x + direction * 2
        this.pieces = this.pieces.map((p) => {
          if (p.samePiecePosition(playedPiece)) {
            p.position.x = newKingXPosition
          } else if (p.samePiecePosition(destinationPiece)) {
            p.position.x = newKingXPosition - direction
          }

          return p
        })
      } else {
        const newKingYPosition = playedPiece.position.y + direction * 2
        this.pieces = this.pieces.map((p) => {
          if (p.samePiecePosition(playedPiece)) {
            p.position.y = newKingYPosition
          } else if (p.samePiecePosition(destinationPiece)) {
            p.position.y = newKingYPosition - direction
          }

          return p
        })
      }

      this.calculateAllMoves()
      return true
    }

    // If it is a valid move
    if (validMove) {
      // Updated the pieces position
      // And if a piece is attacked, removes it
      this.pieces = this.pieces.reduce((results, piece) => {
        // Piece that we are currently playing
        if (piece.samePiecePosition(playedPiece)) {
          piece.position.x = destination.x
          piece.position.y = destination.y
          piece.hasMoved = true

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

  // Clone function of the board
  clone(): Board {
    return new Board(
      this.pieces.map((p) => p.clone()),
      this.totalTurns
    )
  }
}
