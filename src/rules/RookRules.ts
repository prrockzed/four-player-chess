import { TeamType } from '../Types'
import { Piece, Position } from '../models'
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

      let passedPosition = new Position(
        initialPosition.x,
        initialPosition.y + i * multiplier
      )
      if (passedPosition.samePosition(desiredPosition)) {
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

      let passedPosition = new Position(
        initialPosition.x + i * multiplier,
        initialPosition.y
      )
      if (passedPosition.samePosition(desiredPosition)) {
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
    const destination = new Position(rook.position.x, rook.position.y + i)

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
    const destination = new Position(rook.position.x, rook.position.y - i)

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
    const destination = new Position(rook.position.x - i, rook.position.y)

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
    const destination = new Position(rook.position.x + i, rook.position.y)

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
