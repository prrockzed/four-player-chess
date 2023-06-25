import {
  Piece,
  PieceType,
  TeamType,
  Position,
  samePosition,
} from '../Constants'

export default class Referee {
  // Checking if the tile is empty or occupied by an opponent
  tileIsEmptyOrOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ) {
    return (
      !this.tileIsOccupied(position, boardState) ||
      this.tileIsOccupiedByOpponent(position, boardState, team)
    )
  }

  // Checking if the tile is occupied or not
  tileIsOccupied(position: Position, boardState: Piece[]): boolean {
    const piece = boardState.find((p) => samePosition(p.position, position))

    if (piece) {
      return true
    } else {
      return false
    }
  }

  // Checking if the tile is occupied by opponent or not
  tileIsOccupiedByOpponent(
    position: Position,
    boardState: Piece[],
    team: TeamType
  ): boolean {
    const piece = boardState.find(
      (p) => samePosition(p.position, position) && p.team !== team
    )

    if (piece) {
      return true
    } else {
      return false
    }
  }

  // Pawn Movement
  pawnMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    const specialRow = team === TeamType.RED || team === TeamType.BLUE ? 1 : 12
    const pawnDirection =
      team === TeamType.RED || team === TeamType.BLUE ? 1 : -1

    // Red and Yellow Pawn
    if (team === TeamType.RED || team === TeamType.YELLOW) {
      // Movement Logic
      if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
      ) {
        if (
          !this.tileIsOccupied(desiredPosition, boardState) &&
          !this.tileIsOccupied(
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
        if (!this.tileIsOccupied(desiredPosition, boardState)) {
          return true
        }
      }
      // Attack Logic
      else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // Attack in Upper or Bottom Left Corner
        if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
          return true
        }
      } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
      ) {
        // Attack in Upper or Bottom Right Corner
        if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
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
          !this.tileIsOccupied(desiredPosition, boardState) &&
          !this.tileIsOccupied(
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
        if (!this.tileIsOccupied(desiredPosition, boardState)) {
          return true
        }
      }
      // Attack Logic
      else if (
        desiredPosition.y - initialPosition.y === -1 &&
        desiredPosition.x - initialPosition.x === pawnDirection
      ) {
        // Attack in Right or Left Bottom Corner
        if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
          return true
        }
      } else if (
        desiredPosition.y - initialPosition.y === 1 &&
        desiredPosition.x - initialPosition.x === pawnDirection
      ) {
        // Attack in Right or Left Upper Corner
        if (this.tileIsOccupiedByOpponent(desiredPosition, boardState, team)) {
          return true
        }
      }
    }

    return false
  }

  // KNIGHT Movement
  knightMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    // Movement and Attack Logic for Knight
    for (let i = -1; i < 2; i += 2) {
      for (let j = -1; j < 2; j += 2) {
        // Top and Bottom Side Movement
        if (desiredPosition.y - initialPosition.y === 2 * i) {
          if (desiredPosition.x - initialPosition.x === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true
            }
          }
        }

        // Right and Left Side Movement
        if (desiredPosition.x - initialPosition.x === 2 * i) {
          if (desiredPosition.y - initialPosition.y === j) {
            if (
              this.tileIsEmptyOrOccupiedByOpponent(
                desiredPosition,
                boardState,
                team
              )
            ) {
              return true
            }
          }
        }
      }
    }

    return false
  }

  // BISHOP Movement
  bishopMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
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
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true
          }
        } else {
          //Dealing with passing tile
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
    }

    return false
  }

  // ROOK Movement
  rookMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    // Vertical Movement
    if (initialPosition.x === desiredPosition.x) {
      for (let i = 1; i < 14; i++) {
        let multiplier = desiredPosition.y < initialPosition.y ? -1 : 1

        let passedPosition: Position = {
          x: initialPosition.x,
          y: initialPosition.y + i * multiplier,
        }
        if (samePosition(passedPosition, desiredPosition)) {
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
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
          if (
            this.tileIsEmptyOrOccupiedByOpponent(
              passedPosition,
              boardState,
              team
            )
          ) {
            return true
          }
        } else {
          if (this.tileIsOccupied(passedPosition, boardState)) {
            break
          }
        }
      }
    }

    return false
  }

  // QUEEN Movement
  queenMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 14; i++) {
      let multiplierX =
        desiredPosition.x < initialPosition.x
          ? -1
          : desiredPosition.x > initialPosition.x
          ? 1
          : 0
      let multiplierY =
        desiredPosition.y < initialPosition.y
          ? -1
          : desiredPosition.y > initialPosition.y
          ? 1
          : 0

      let passedPosition: Position = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      }

      if (samePosition(passedPosition, desiredPosition)) {
        if (
          this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true
        }
      } else {
        if (this.tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }

    return false
  }

  // KING Movement
  kingMove(
    initialPosition: Position,
    desiredPosition: Position,
    team: TeamType,
    boardState: Piece[]
  ): boolean {
    for (let i = 1; i < 2; i++) {
      let multiplierX =
        desiredPosition.x < initialPosition.x
          ? -1
          : desiredPosition.x > initialPosition.x
          ? 1
          : 0
      let multiplierY =
        desiredPosition.y < initialPosition.y
          ? -1
          : desiredPosition.y > initialPosition.y
          ? 1
          : 0

      let passedPosition: Position = {
        x: initialPosition.x + i * multiplierX,
        y: initialPosition.y + i * multiplierY,
      }

      if (samePosition(passedPosition, desiredPosition)) {
        if (
          this.tileIsEmptyOrOccupiedByOpponent(passedPosition, boardState, team)
        ) {
          return true
        }
      } else {
        if (this.tileIsOccupied(passedPosition, boardState)) {
          break
        }
      }
    }

    return false
  }

  // checking if the move made is valid or not
  isValidMove(
    initialPosition: Position,
    desiredPosition: Position,
    type: PieceType,
    team: TeamType,
    boardState: Piece[]
  ) {
    let validMove = false

    switch (type) {
      case PieceType.PAWN:
        validMove = this.pawnMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.KNIGHT:
        validMove = this.knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.BISHOP:
        validMove = this.bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.ROOK:
        validMove = this.rookMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.QUEEN:
        validMove = this.queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.KING:
        validMove = this.kingMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
    }

    return validMove
  }
}
