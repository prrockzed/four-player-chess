import { Piece } from './models/Piece'
import { Position } from './models/Position'

// Axes
export const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export const HORIZONTAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// Grid Size
export const GRID_SIZE = 50

// Same Position
export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y
}

// PieceType enum
export enum PieceType {
  PAWN = 'P',
  BISHOP = 'B',
  KNIGHT = 'N',
  ROOK = 'R',
  QUEEN = 'Q',
  KING = 'K',
}

// TeamType enum
export enum TeamType {
  RED = 'r',
  BLUE = 'b',
  YELLOW = 'y',
  GREEN = 'g',
}

// InitialBoardState
export const initialBoardState: Piece[] = [
  // Red Pieces
  new Piece({ x: 3, y: 0 }, PieceType.ROOK, TeamType.RED),
  new Piece({ x: 4, y: 0 }, PieceType.KNIGHT, TeamType.RED),
  new Piece({ x: 5, y: 0 }, PieceType.BISHOP, TeamType.RED),
  new Piece({ x: 6, y: 0 }, PieceType.QUEEN, TeamType.RED),
  new Piece({ x: 7, y: 0 }, PieceType.KING, TeamType.RED),
  new Piece({ x: 8, y: 0 }, PieceType.BISHOP, TeamType.RED),
  new Piece({ x: 9, y: 0 }, PieceType.KNIGHT, TeamType.RED),
  new Piece({ x: 10, y: 0 }, PieceType.ROOK, TeamType.RED),
  // Pawns
  new Piece({ x: 3, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 4, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 5, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 6, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 7, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 8, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 9, y: 1 }, PieceType.PAWN, TeamType.RED),
  new Piece({ x: 10, y: 1 }, PieceType.PAWN, TeamType.RED),

  // Yellow Pieces
  new Piece({ x: 3, y: 13 }, PieceType.ROOK, TeamType.YELLOW),
  new Piece({ x: 4, y: 13 }, PieceType.KNIGHT, TeamType.YELLOW),
  new Piece({ x: 5, y: 13 }, PieceType.BISHOP, TeamType.YELLOW),
  new Piece({ x: 6, y: 13 }, PieceType.KING, TeamType.YELLOW),
  new Piece({ x: 7, y: 13 }, PieceType.QUEEN, TeamType.YELLOW),
  new Piece({ x: 8, y: 13 }, PieceType.BISHOP, TeamType.YELLOW),
  new Piece({ x: 9, y: 13 }, PieceType.KNIGHT, TeamType.YELLOW),
  new Piece({ x: 10, y: 13 }, PieceType.ROOK, TeamType.YELLOW),
  // Pawns
  new Piece({ x: 3, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 4, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 5, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 6, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 7, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 8, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 9, y: 12 }, PieceType.PAWN, TeamType.YELLOW),
  new Piece({ x: 10, y: 12 }, PieceType.PAWN, TeamType.YELLOW),

  // BLUE Pieces
  new Piece({ x: 0, y: 3 }, PieceType.ROOK, TeamType.BLUE),
  new Piece({ x: 0, y: 4 }, PieceType.KNIGHT, TeamType.BLUE),
  new Piece({ x: 0, y: 5 }, PieceType.BISHOP, TeamType.BLUE),
  new Piece({ x: 0, y: 6 }, PieceType.QUEEN, TeamType.BLUE),
  new Piece({ x: 0, y: 7 }, PieceType.KING, TeamType.BLUE),
  new Piece({ x: 0, y: 8 }, PieceType.BISHOP, TeamType.BLUE),
  new Piece({ x: 0, y: 9 }, PieceType.KNIGHT, TeamType.BLUE),
  new Piece({ x: 0, y: 10 }, PieceType.ROOK, TeamType.BLUE),
  // Pawns
  new Piece({ x: 1, y: 3 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 4 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 5 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 6 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 7 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 8 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 9 }, PieceType.PAWN, TeamType.BLUE),
  new Piece({ x: 1, y: 10 }, PieceType.PAWN, TeamType.BLUE),

  // Green Pieces
  new Piece({ x: 13, y: 3 }, PieceType.ROOK, TeamType.GREEN),
  new Piece({ x: 13, y: 4 }, PieceType.KNIGHT, TeamType.GREEN),
  new Piece({ x: 13, y: 5 }, PieceType.BISHOP, TeamType.GREEN),
  new Piece({ x: 13, y: 6 }, PieceType.KING, TeamType.GREEN),
  new Piece({ x: 13, y: 7 }, PieceType.QUEEN, TeamType.GREEN),
  new Piece({ x: 13, y: 8 }, PieceType.BISHOP, TeamType.GREEN),
  new Piece({ x: 13, y: 9 }, PieceType.KNIGHT, TeamType.GREEN),
  new Piece({ x: 13, y: 10 }, PieceType.ROOK, TeamType.GREEN),
  // Pawns
  new Piece({ x: 12, y: 3 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 4 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 5 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 6 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 7 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 8 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 9 }, PieceType.PAWN, TeamType.GREEN),
  new Piece({ x: 12, y: 10 }, PieceType.PAWN, TeamType.GREEN),
]
