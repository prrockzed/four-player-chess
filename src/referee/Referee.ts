import { Piece, PieceType, TeamType, Position } from '../Constants'

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    const piece = boardState.find(
      (p) => p.position.x === x && p.position.y === y
    )

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
      (p) => p.position.x === x && p.position.y === y && p.team !== team
    )

    if (piece) {
      return true
    } else {
      return false
    }
  }

  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
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
        // Movement Logic
        if (
          initialPosition.x === desiredPosition.x &&
          initialPosition.y === specialRow &&
          desiredPosition.y - initialPosition.y === 2 * pawnDirection
        ) {
          if (
            !this.tileIsOccupied(
              desiredPosition.x,
              desiredPosition.y,
              boardState
            ) &&
            !this.tileIsOccupied(
              desiredPosition.x,
              desiredPosition.y - pawnDirection,
              boardState
            )
          ) {
            return true
          }
        } else if (
          initialPosition.x === desiredPosition.x &&
          desiredPosition.y - initialPosition.y === pawnDirection
        ) {
          if (
            !this.tileIsOccupied(
              desiredPosition.x,
              desiredPosition.y,
              boardState
            )
          ) {
            return true
          }
        }
        // Attack Logic
        else if (
          desiredPosition.x - initialPosition.x === -1 &&
          desiredPosition.y - initialPosition.y === pawnDirection
        ) {
          // Attack in Upper or Bottom Left Corner
          if (
            this.tileIsOccupiedByOpponent(
              desiredPosition.x,
              desiredPosition.y,
              boardState,
              team
            )
          ) {
            return true
          }
        } else if (
          desiredPosition.x - initialPosition.x === 1 &&
          desiredPosition.y - initialPosition.y === pawnDirection
        ) {
          // Attack in Upper or Bottom Right Corner
          if (
            this.tileIsOccupiedByOpponent(
              desiredPosition.x,
              desiredPosition.y,
              boardState,
              team
            )
          ) {
            return true
          }
        }
      }
      // Green and Blue Pawn
      else {
        // Movement Logic
        if (
          initialPosition.y === desiredPosition.y &&
          initialPosition.x === specialRow &&
          desiredPosition.x - initialPosition.x === 2 * pawnDirection
        ) {
          if (
            !this.tileIsOccupied(
              desiredPosition.x,
              desiredPosition.y,
              boardState
            ) &&
            !this.tileIsOccupied(
              desiredPosition.x - pawnDirection,
              desiredPosition.y,
              boardState
            )
          ) {
            return true
          }
        } else if (
          initialPosition.y === desiredPosition.y &&
          desiredPosition.x - initialPosition.x === pawnDirection
        ) {
          if (
            !this.tileIsOccupied(
              desiredPosition.x,
              desiredPosition.y,
              boardState
            )
          ) {
            return true
          }
        }
        // Attack Logic
        else if (
          desiredPosition.y - initialPosition.y === -1 &&
          desiredPosition.x - initialPosition.x === pawnDirection
        ) {
          // Attack in Right or Left Bottom Corner
          if (
            this.tileIsOccupiedByOpponent(
              desiredPosition.x,
              desiredPosition.y,
              boardState,
              team
            )
          ) {
            return true
          }
        } else if (
          desiredPosition.y - initialPosition.y === 1 &&
          desiredPosition.x - initialPosition.x === pawnDirection
        ) {
          // Attack in Right or Left Upper Corner
          if (
            this.tileIsOccupiedByOpponent(
              desiredPosition.x,
              desiredPosition.y,
              boardState,
              team
            )
          ) {
            return true
          }
        }
      }
    }

    return false
  }
}
