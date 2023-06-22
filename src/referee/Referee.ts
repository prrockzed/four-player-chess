import { PieceType, TeamType, Piece } from '../components/Chessboard/Chessboard'

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => p.x === x && p.y === y)

    if (piece) {
      return true
    } else {
      return false
    }
  }

  tileIsOccupiedByOpponent(
    x: number,
    y: number,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => p.x === x && p.y === y && p.team !== team
    )

    if (piece) {
      return true
    } else {
      return false
    }
  }

  isEnPassantMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    const pawnDirection = team === TeamType.RED ? 1 : -1

    if (type === PieceType.PAWN) {
      if ((x - px === -1 || x - px === 1) && y - py === pawnDirection) {
        const piece = boardState.find(
          (p) => p.x === x && p.y === y - pawnDirection && p.enPassant
        )
        if (piece) {
          return true
        }
      }
    }

    // if the attacking piece is pawn DONE
    // upper left/upper right OR bottom left/bottom right DONE
    // if a piece is under/above the attacked tile DONE
    // if the attacked piece has made an en passant move in the previous turn DONE

    // Put the attacking piece in correct position
    // Remove the en passanted piece

    return false
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    if (type === PieceType.PAWN) {
      const specialRow =
        team === TeamType.RED || team === TeamType.BLUE ? 1 : 12
      const pawnDirection =
        team === TeamType.RED || team === TeamType.BLUE ? 1 : -1

      // Red and Yellow Pawn
      if (team === TeamType.RED || team === TeamType.YELLOW) {
        if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
          // Movement Logic
          if (
            !this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupied(x, y - pawnDirection, boardState)
          ) {
            return true
          }
        } else if (px === x && y - py === pawnDirection) {
          if (!this.tileIsOccupied(x, y, boardState)) {
            return true
          }
        }
        // Attack Logic
        else if (x - px === -1 && y - py === pawnDirection) {
          // Attack in Upper or Bottom Left Corner
          console.log('upper/bottom left')
          if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
            return true
          }
        } else if (x - px === 1 && y - py === pawnDirection) {
          // Attack in Upper or Bottom Right Corner
          console.log('upper/bottom right')
          if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
            return true
          }
        }
      }
      // Green and Blue Pawn
      else {
        // Movement Logic
        if (py === y && px === specialRow && x - px === 2 * pawnDirection) {
          if (
            !this.tileIsOccupied(x, y, boardState) &&
            !this.tileIsOccupied(x - pawnDirection, y, boardState)
          ) {
            return true
          }
        } else if (py === y && x - px === pawnDirection) {
          if (!this.tileIsOccupied(x, y, boardState)) {
            return true
          }
        }
        // Attack Logic
        else if (y - py === -1 && x - px === pawnDirection) {
          // Attack in Right or Left Bottom Corner
          console.log('right/left bottom')
          if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
            return true
          }
        } else if (y - py === 1 && x - px === pawnDirection) {
          // Attack in Right or Left Upper Corner
          console.log('right/left upper')
          if (this.tileIsOccupiedByOpponent(x, y, boardState, team)) {
            return true
          }
        }
      }
    }

    return false
  }
}
