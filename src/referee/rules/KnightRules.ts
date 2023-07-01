import { Piece, Position } from '../../models'
import { TeamType } from '../../Constants'
import { tileIsEmptyOrOccupiedByOpponent } from './GeneralRules'

// Rules to move the Knights
export const knightMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  // Movement and Attack Logic for Knight
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      // Top and Bottom Side Movement
      if (desiredPosition.y - initialPosition.y === 2 * i) {
        if (desiredPosition.x - initialPosition.x === j) {
          if (
            tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true
          }
        }
      }

      // Right and Left Side Movement
      if (desiredPosition.x - initialPosition.x === 2 * i) {
        if (desiredPosition.y - initialPosition.y === j) {
          if (
            tileIsEmptyOrOccupiedByOpponent(desiredPosition, boardState, team)
          ) {
            return true
          }
        }
      }
    }
  }

  return false
}

// Checking possible moves for the Knights to highlight the grids
export const getPossibleKnightMoves = (
  knight: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = []

  // Movement and Attack Logic for Knight
  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      const verticalMove = new Position(
        knight.position.x + j,
        knight.position.y + i * 2
      )
      const horizontalMove = new Position(
        knight.position.x + i * 2,
        knight.position.y + j
      )

      if (
        tileIsEmptyOrOccupiedByOpponent(verticalMove, boardState, knight.team)
      ) {
        possibleMoves.push(verticalMove)
      }

      if (
        tileIsEmptyOrOccupiedByOpponent(horizontalMove, boardState, knight.team)
      ) {
        possibleMoves.push(horizontalMove)
      }
    }
  }

  return possibleMoves
}
