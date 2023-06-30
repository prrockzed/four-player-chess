import { Piece, Position, TeamType, samePosition } from '../../Constants'
import {
  tileIsOccupied,
  tileIsOccupiedByOpponent,
  tileIsEmptyOrOccupiedByOpponent,
} from './GeneralRules'

// Rules to move the Rooks
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

// Checking possible moves for the Rooks to highlight the grids
export const getPossibleRookMoves = (
  rook: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = []

  // Top movement
  for (let i = 1; i < 14; i++) {
    const destination: Position = { x: rook.position.x, y: rook.position.y + i }

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }

  // Bottom movement
  for (let i = 1; i < 14; i++) {
    const destination: Position = { x: rook.position.x, y: rook.position.y - i }

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }

  // Left movement
  for (let i = 1; i < 14; i++) {
    const destination: Position = { x: rook.position.x - i, y: rook.position.y }

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }

  // Right movement
  for (let i = 1; i < 14; i++) {
    const destination: Position = { x: rook.position.x + i, y: rook.position.y }

    if (!tileIsOccupied(destination, boardState)) {
      possibleMoves.push(destination)
    } else if (tileIsOccupiedByOpponent(destination, boardState, rook.team)) {
      possibleMoves.push(destination)
      break
    } else {
      break
    }
  }

  return possibleMoves
}
