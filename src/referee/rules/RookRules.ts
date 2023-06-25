import { Piece, Position, TeamType, samePosition } from '../../Constants'
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules'

export const rookMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  // Vertical Movement
  if (initialPosition.x === desiredPosition.x) {
    for (let i = 1; i < 14; i++) {
      let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1

      let passedPosition: Position = {
        x: initialPosition.x,
        y: initialPosition.y + i * multiplier,
      }
      if (samePosition(passedPosition, desiredPosition)) {
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }
  }

  // Horizontal Movement
  if (initialPosition.y === desiredPosition.y) {
    for (let i = 1; i < 14; i++) {
      let multiplier = desiredPosition.x < initialPosition.x ? -1 : 1

      let passedPosition: Position = {
        x: initialPosition.x + i * multiplier,
        y: initialPosition.y,
      }
      if (samePosition(passedPosition, desiredPosition)) {
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }
  }

  return false
}
