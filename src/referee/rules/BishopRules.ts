import { Piece, Position, TeamType, samePosition } from '../../Constants'
import { tileIsOccupied, tileIsEmptyOrOccupiedByOpponent } from './GeneralRules'

export const bishopMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  // Movement and Attack Logic for Bishop
  for (let i = 1; i < 11; i++) {
    // Top right movement
    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y + i,
      }
      //Check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        //Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        //Dealing with passing tile
        if (tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }

    // Top left movement
    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y > initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y + i,
      }
      //Check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        //Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }

    // Bottom right movement
    if (
      desiredPosition.x > initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x + i,
        y: initialPosition.y - i,
      }
      //Check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        //Dealing with destination tile
        if (tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)) {
          return true
        }
      } else {
        if (tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }

    // Bottom left movement
    if (
      desiredPosition.x < initialPosition.x &&
      desiredPosition.y < initialPosition.y
    ) {
      let passedPosition: Position = {
        x: initialPosition.x - i,
        y: initialPosition.y - i,
      }
      //Check if the tile is the destination tile
      if (samePosition(passedPosition, desiredPosition)) {
        //Dealing with destination tile
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
