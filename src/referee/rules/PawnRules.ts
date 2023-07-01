import { TeamType } from '../../Constants'
import { Piece, Position } from '../../models'
import { tileIsOccupied, tileIsOccupiedByOpponent } from './GeneralRules'

// Rules to move the Pawns
export const pawnMove = (
  initialPosition: Position,
  desiredPosition: Position,
  team: TeamType,
  boardState: Piece[]
): boolean => {
  const specialRow = team === TeamType.RED || team === TeamType.BLUE ? 1 : 12
  const pawnDirection = team === TeamType.RED || team === TeamType.BLUE ? 1 : -1

  // Red and Yellow Pawn
  if (team === TeamType.RED || team === TeamType.YELLOW) {
    // Movement Logic
    if (
      initialPosition.x === desiredPosition.x &&
      initialPosition.y === specialRow &&
      desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
      if (
        !tileIsOccupied(desiredPosition, boardState) &&
        !tileIsOccupied(
          { x: desiredPosition.x, y: desiredPosition.y - pawnDirection },
          boardState
        )
      ) {
        return true
      }
    } else if (
      initialPosition.x === desiredPosition.x &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      if (!tileIsOccupied(desiredPosition, boardState)) {
        return true
      }
    }
    // Attack Logic
    else if (
      desiredPosition.x - initialPosition.x === -1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      // Attack in Upper or Bottom Left Corner
      if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
        return true
      }
    } else if (
      desiredPosition.x - initialPosition.x === 1 &&
      desiredPosition.y - initialPosition.y === pawnDirection
    ) {
      // Attack in Upper or Bottom Right Corner
      if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
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
        !tileIsOccupied(desiredPosition, boardState) &&
        !tileIsOccupied(
          { x: desiredPosition.x - pawnDirection, y: desiredPosition.y },
          boardState
        )
      ) {
        return true
      }
    } else if (
      initialPosition.y === desiredPosition.y &&
      desiredPosition.x - initialPosition.x === pawnDirection
    ) {
      if (!tileIsOccupied(desiredPosition, boardState)) {
        return true
      }
    }
    // Attack Logic
    else if (
      desiredPosition.y - initialPosition.y === -1 &&
      desiredPosition.x - initialPosition.x === pawnDirection
    ) {
      // Attack in Right or Left Bottom Corner
      if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
        return true
      }
    } else if (
      desiredPosition.y - initialPosition.y === 1 &&
      desiredPosition.x - initialPosition.x === pawnDirection
    ) {
      // Attack in Right or Left Upper Corner
      if (tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
        return true
      }
    }
  }

  return false
}

// Checking possible moves for the Pawns to highlight the grids
export const getPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = []

  const specialRow =
    pawn.team === TeamType.RED || pawn.team === TeamType.BLUE ? 1 : 12
  const pawnDirection =
    pawn.team === TeamType.RED || pawn.team === TeamType.BLUE ? 1 : -1

  let normalMove: Position = { x: -1, y: -1 }
  let specialMove: Position = { x: -1, y: -1 }
  let upperLeftAttack: Position = { x: -1, y: -1 }
  let upperRightAttack: Position = { x: -1, y: -1 }

  // For red and yellow pawns
  if (pawn.team === TeamType.RED || pawn.team === TeamType.YELLOW) {
    normalMove = {
      x: pawn.position.x,
      y: pawn.position.y + pawnDirection,
    }
    specialMove = {
      x: normalMove.x,
      y: normalMove.y + pawnDirection,
    }
    upperLeftAttack = {
      x: pawn.position.x - 1,
      y: pawn.position.y + pawnDirection,
    }
    upperRightAttack = {
      x: pawn.position.x + 1,
      y: pawn.position.y + pawnDirection,
    }
  }

  // For green and blue pawns
  else {
    normalMove = {
      x: pawn.position.x + pawnDirection,
      y: pawn.position.y,
    }
    specialMove = {
      x: normalMove.x + pawnDirection,
      y: normalMove.y,
    }
    upperLeftAttack = {
      x: pawn.position.x + pawnDirection,
      y: pawn.position.y - 1,
    }
    upperRightAttack = {
      x: pawn.position.x + pawnDirection,
      y: pawn.position.y + 1,
    }
  }

  // Checking for possible moves
  if (!tileIsOccupied(normalMove, boardState)) {
    possibleMoves.push(normalMove)

    if (
      (pawn.position.y === specialRow || pawn.position.x === specialRow) &&
      !tileIsOccupied(specialMove, boardState)
    ) {
      possibleMoves.push(specialMove)
    }
  }

  if (tileIsOccupiedByOpponent(upperLeftAttack, boardState, pawn.team)) {
    possibleMoves.push(upperLeftAttack)
  }

  if (tileIsOccupiedByOpponent(upperRightAttack, boardState, pawn.team)) {
    possibleMoves.push(upperRightAttack)
  }

  return possibleMoves
}
