import { PieceType, TeamType } from '../components/Chessboard/Chessboard'

export default class Referee {
  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType
  ) {
    console.log('Referee is checking the move...')
    console.log(`Previous location: (${px},${py})`)
    console.log(`Current location: (${x},${y})`)
    console.log(`Piece type: ${type}`)
    console.log(`Team: ${team}`)

    if (type === PieceType.PAWN) {
      if (team === TeamType.RED) {
        if (py === 1) {
          if (px === x && (y - py === 1 || y - py === 2)) {
            return true
          }
        } else {
          if (px === x && y - py === 1) {
            return true
          }
        }
      } else if (team === TeamType.YELLOW) {
        if (py === 12) {
          if (px === x && (y - py === -1 || y - py === -2)) {
            return true
          }
        } else {
          if (px === x && y - py === -1) {
            return true
          }
        }
      } else if (team === TeamType.BLUE) {
        if (px === 1) {
          if (py === y && (x - px === 1 || x - px === 2)) {
            return true
          }
        } else {
          if (py === y && x - px === 1) {
            return true
          }
        }
      } else {
        if (px === 12) {
          if (py === y && (x - px === -1 || x - px === -2)) {
            return true
          }
        } else {
          if (py === y && x - px === -1) {
            return true
          }
        }
      }
    }
    return false
  }
}
