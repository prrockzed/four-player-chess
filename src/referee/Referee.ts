import { PieceType, TeamType, Piece } from '../components/Chessboard/Chessboard'

export default class Referee {
  tileIsOccupied(x: number, y: number, boardState: Piece[]): boolean {
    console.log('Checking if tile is occupied')

    const piece = boardState.find((p) => p.x === x && p.y === y)

    if (piece) {
      return true
    } else {
      return false
    }
  }

  isValidMove(
    px: number,
    py: number,
    x: number,
    y: number,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    // console.log('Referee is checking the move...')
    // console.log(`Previous location: (${px},${py})`)
    // console.log(`Current location: (${x},${y})`)
    // console.log(`Piece type: ${type}`)
    // console.log(`Team: ${team}`)

    if (type === PieceType.PAWN) {
      const specialRow =
        team === TeamType.RED || team === TeamType.BLUE ? 1 : 12
      const pawnDirection =
        team === TeamType.RED || team === TeamType.BLUE ? 1 : -1

      if (px === x && py === specialRow && y - py === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true
        }
      } else if (px === x && y - py === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true
        }
      }

      if (py === y && px === specialRow && x - px === 2 * pawnDirection) {
        if (
          !this.tileIsOccupied(x, y, boardState) &&
          !this.tileIsOccupied(x, y - pawnDirection, boardState)
        ) {
          return true
        }
      } else if (py === y && x - px === pawnDirection) {
        if (!this.tileIsOccupied(x, y, boardState)) {
          return true
        }
      }
    }

    // if (type === PieceType.PAWN) {
    //   if (team === TeamType.RED) {
    //     if (py === 1) {
    //       if (px === x && y - py === 1) {
    //         if (!this.tileIsOccupied(x, y, boardState)) {
    //           return true
    //         }
    //       } else if (px === x && y - py === 2) {
    //         if (
    //           !this.tileIsOccupied(x, y, boardState) &&
    //           !this.tileIsOccupied(x, y - 1, boardState)
    //         ) {
    //           return true
    //         }
    //       }
    //     } else {
    //       if (px === x && y - py === 1) {
    //         if (!this.tileIsOccupied(x, y, boardState)) {
    //           return true
    //         }
    //       }
    //     }
    //   } else if (team === TeamType.YELLOW) {
    //     if (py === 12) {
    //       if (px === x && (y - py === -1 || y - py === -2)) {
    //         return true
    //       }
    //     } else {
    //       if (px === x && y - py === -1) {
    //         return true
    //       }
    //     }
    //   } else if (team === TeamType.BLUE) {
    //     if (px === 1) {
    //       if (py === y && (x - px === 1 || x - px === 2)) {
    //         return true
    //       }
    //     } else {
    //       if (py === y && x - px === 1) {
    //         return true
    //       }
    //     }
    //   } else {
    //     if (px === 12) {
    //       if (py === y && (x - px === -1 || x - px === -2)) {
    //         return true
    //       }
    //     } else {
    //       if (py === y && x - px === -1) {
    //         return true
    //       }
    //     }
    //   }
    // }
    return false
  }
}
