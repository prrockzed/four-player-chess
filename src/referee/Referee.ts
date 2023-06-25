import { Piece, PieceType, TeamType, Position } from '../Constants'

import { pawnMove } from './rules/PawnRules'
import { knightMove } from './rules/KnightRules'
import { bishopMove } from './rules/BishopRules'
import { rookMove } from './rules/RookRules'
import { queenMove } from './rules/QueenRules'
import { kingMove } from './rules/KingRules'

export default class Referee {
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
        validMove = pawnMove(initialPosition, desiredPosition, team, boardState)
        break
      case PieceType.KNIGHT:
        validMove = knightMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.BISHOP:
        validMove = bishopMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.ROOK:
        validMove = rookMove(initialPosition, desiredPosition, team, boardState)
        break
      case PieceType.QUEEN:
        validMove = queenMove(
          initialPosition,
          desiredPosition,
          team,
          boardState
        )
        break
      case PieceType.KING:
        validMove = kingMove(initialPosition, desiredPosition, team, boardState)
        break
    }

    return validMove
  }
}
