import { Piece, Position, TeamType } from '../../Constants'
import { tileIsEmptyOrOccupiedByOpponent } from './GeneralRules'

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
