import { Piece } from "./models/Piece";

// Axes
export const VERTICAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
export const HORIZONTAL_AXIS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// Grid Size
export const GRID_SIZE = 50

// Same Position
export function samePosition(p1: Position, p2: Position) {
  return p1.x === p2.x && p1.y === p2.y
}

// Position Interface
export interface Position {
  x: number
  y: number
}

// PieceType enum
export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
}

// TeamType enum
export enum TeamType {
  RED,
  BLUE,
  YELLOW,
  GREEN,
}

// InitialBoardState
export const initialBoardState: Piece[] = [
  // Red Pieces
  {
    image: `assets/images/rR.png`,
    position: { x: 3, y: 0 },
    type: PieceType.ROOK,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rN.png`,
    position: { x: 4, y: 0 },
    type: PieceType.KNIGHT,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rB.png`,
    position: { x: 5, y: 0 },
    type: PieceType.BISHOP,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rQ.png`,
    position: { x: 6, y: 0 },
    type: PieceType.QUEEN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rK.png`,
    position: { x: 7, y: 0 },
    type: PieceType.KING,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rB.png`,
    position: { x: 8, y: 0 },
    type: PieceType.BISHOP,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rN.png`,
    position: { x: 9, y: 0 },
    type: PieceType.KNIGHT,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rR.png`,
    position: { x: 10, y: 0 },
    type: PieceType.ROOK,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 3, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 4, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 5, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 6, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 7, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 8, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 9, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },
  {
    image: `assets/images/rP.png`,
    position: { x: 10, y: 1 },
    type: PieceType.PAWN,
    team: TeamType.RED,
  },

  // Yellow Pieces
  {
    image: `assets/images/yR.png`,
    position: { x: 3, y: 13 },
    type: PieceType.ROOK,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yN.png`,
    position: { x: 4, y: 13 },
    type: PieceType.KNIGHT,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yB.png`,
    position: { x: 5, y: 13 },
    type: PieceType.BISHOP,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yK.png`,
    position: { x: 6, y: 13 },
    type: PieceType.KING,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yQ.png`,
    position: { x: 7, y: 13 },
    type: PieceType.QUEEN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yB.png`,
    position: { x: 8, y: 13 },
    type: PieceType.BISHOP,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yN.png`,
    position: { x: 9, y: 13 },
    type: PieceType.KNIGHT,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yR.png`,
    position: { x: 10, y: 13 },
    type: PieceType.ROOK,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 3, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 4, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 5, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 6, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 7, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 8, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 9, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },
  {
    image: `assets/images/yP.png`,
    position: { x: 10, y: 12 },
    type: PieceType.PAWN,
    team: TeamType.YELLOW,
  },

  // BLUE Pieces
  {
    image: `assets/images/bR.png`,
    position: { x: 0, y: 3 },
    type: PieceType.ROOK,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bN.png`,
    position: { x: 0, y: 4 },
    type: PieceType.KNIGHT,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bB.png`,
    position: { x: 0, y: 5 },
    type: PieceType.BISHOP,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bQ.png`,
    position: { x: 0, y: 6 },
    type: PieceType.QUEEN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bK.png`,
    position: { x: 0, y: 7 },
    type: PieceType.KING,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bB.png`,
    position: { x: 0, y: 8 },
    type: PieceType.BISHOP,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bN.png`,
    position: { x: 0, y: 9 },
    type: PieceType.KNIGHT,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bR.png`,
    position: { x: 0, y: 10 },
    type: PieceType.ROOK,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 3 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 4 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 5 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 7 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 8 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 9 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },
  {
    image: `assets/images/bP.png`,
    position: { x: 1, y: 10 },
    type: PieceType.PAWN,
    team: TeamType.BLUE,
  },

  // Green Pieces
  {
    image: `assets/images/gR.png`,
    position: { x: 13, y: 3 },
    type: PieceType.ROOK,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gN.png`,
    position: { x: 13, y: 4 },
    type: PieceType.KNIGHT,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gB.png`,
    position: { x: 13, y: 5 },
    type: PieceType.BISHOP,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gK.png`,
    position: { x: 13, y: 6 },
    type: PieceType.KING,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gQ.png`,
    position: { x: 13, y: 7 },
    type: PieceType.QUEEN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gB.png`,
    position: { x: 13, y: 8 },
    type: PieceType.BISHOP,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gN.png`,
    position: { x: 13, y: 9 },
    type: PieceType.KNIGHT,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gR.png`,
    position: { x: 13, y: 10 },
    type: PieceType.ROOK,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 3 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 4 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 5 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 6 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 7 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 8 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 9 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
  {
    image: `assets/images/gP.png`,
    position: { x: 12, y: 10 },
    type: PieceType.PAWN,
    team: TeamType.GREEN,
  },
]
