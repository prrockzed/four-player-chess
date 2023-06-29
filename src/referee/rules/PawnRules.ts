import { Piece, Position, TeamType } from '../../Constants'
import { tileIsOccupied, tileIsOccupiedByOpponent } from './GeneralRules'

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

export const getPossiblePawnMoves = (
  pawn: Piece,
  boardState: Piece[]
): Position[] => {
  const possibleMoves: Position[] = []

  const specialRow =
    pawn.team === TeamType.RED || pawn.team === TeamType.BLUE ? 1 : 12
  const pawnDirection =
    pawn.team === TeamType.RED || pawn.team === TeamType.BLUE ? 1 : -1

  if (pawn.team === TeamType.RED || pawn.team === TeamType.YELLOW) {
    if (
      !tileIsOccupied(
        { x: pawn.position.x, y: pawn.position.y + pawnDirection },
        boardState
      )
    ) {
      possibleMoves.push({
        x: pawn.position.x,
        y: pawn.position.y + pawnDirection,
      })

      if (
        pawn.position.y === specialRow &&
        !tileIsOccupied(
          { x: pawn.position.x, y: pawn.position.y + pawnDirection * 2 },
          boardState
        )
      ) {
        possibleMoves.push({
          x: pawn.position.x,
          y: pawn.position.y + pawnDirection * 2,
        })
      }
    }
  } else {
    if (
      !tileIsOccupied(
        { x: pawn.position.x + pawnDirection, y: pawn.position.y },
        boardState
      )
    ) {
      possibleMoves.push({
        x: pawn.position.x + pawnDirection,
        y: pawn.position.y,
      })

      if (
        pawn.position.x === specialRow &&
        !tileIsOccupied(
          { x: pawn.position.x + pawnDirection * 2, y: pawn.position.y },
          boardState
        )
      ) {
        possibleMoves.push({
          x: pawn.position.x + pawnDirection * 2,
          y: pawn.position.y,
        })
      }
    }
  }

  return possibleMoves
}
