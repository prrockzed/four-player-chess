import { PieceType, Position, TeamType } from '../Constants'

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
}
