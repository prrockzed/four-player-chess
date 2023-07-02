import { PieceType, TeamType } from '../Types'
import { Position } from './Position'

export class Piece {
  image: string
  position: Position
  type: PieceType
  team: TeamType
  possibleMoves?: Position[]

  constructor(position: Position, type: PieceType, team: TeamType) {
    this.image = `assets/images/${team}${type}.png`
    this.position = position
    this.type = type
    this.team = team
  }

  samePiecePosition(otherPiece: Piece): boolean {
    return this.position.samePosition(otherPiece.position)
  }

  samePosition(otherPosition: Position): boolean {
    return this.position.samePosition(otherPosition)
  }
}
