import { samePosition, TeamType } from '../../Constants'
import { Piece, Position } from '../../models'

// Checking if the tile is occupied or not
export const tileIsOccupied = (
  position: Position,
  boardState: Piece[]
): boolean => {
  const piece = boardState.find((p) => samePosition(p.position, position))

  if (piece) {
    return true
  } else {
    return false
  }
}

// Checking if the tile is occupied by opponent or not
export const tileIsOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
): boolean => {
  const piece = boardState.find(
    (p) => samePosition(p.position, position) && p.team !== team
  )

  if (piece) {
    return true
  } else {
    return false
  }
}

// Checking if the tile is empty or occupied by an opponent
export const tileIsEmptyOrOccupiedByOpponent = (
  position: Position,
  boardState: Piece[],
  team: TeamType
) => {
  return (
    !tileIsOccupied(position, boardState) ||
    tileIsOccupiedByOpponent(position, boardState, team)
  )
}
