import { useRef, useState } from 'react'
import PlayerName from '../PlayerName/PlayerName'
import Tile from '../Tile/Tile'
import './Chessboard.css'
import Referee from '../../referee/Referee'
import {
  VERTICAL_AXIS,
  HORIZONTAL_AXIS,
  GRID_SIZE,
  Piece,
  initialBoardState,
  Position,
  PieceType,
  TeamType,
  samePosition,
} from '../../Constants'

export default function Chessboard() {
  // Declaring Constants
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null)
  const [promotionPawn, setPromotionPawn] = useState<Piece>()
  const [grabPosition, setGrabPosition] = useState<Position>({ x: -1, y: -1 })
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState)
  const chessboardRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const referee = new Referee()

  // Updating Valid Moves
  function updateValidMoves() {
    setPieces((currentPieces) => {
      return currentPieces.map((p) => {
        p.possibleMoves = referee.getValidMoves(p, currentPieces)
        return p
      })
    })
  }

  // Function when player grabs a  piece
  function grabPiece(e: React.MouseEvent) {
    // Updating valid moves for previewing
    updateValidMoves()

    // Grabbing the pieces off the chessboard
    const chessboard = chessboardRef.current
    const element = e.target as HTMLElement

    if (element.classList.contains('chess-piece') && chessboard) {
      const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
      const grabY = Math.abs(
        Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 700) / GRID_SIZE)
        )
      )
      setGrabPosition({ x: grabX, y: grabY })

      const x = e.clientX - GRID_SIZE / 2
      const y = e.clientY - GRID_SIZE / 2

      element.style.position = 'absolute'
      element.style.left = `${x}px`
      element.style.top = `${y}px`

      setActivePiece(element)
    }
  }

  // Function when player tries to move a piece
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current

    if (activePiece && chessboard) {
      const leftX = chessboard.offsetLeft - 4
      const midleftX =
        chessboard.offsetLeft + (chessboard.clientWidth / 14) * 3 - 4
      const topY = chessboard.offsetTop - 4
      const midtopY =
        chessboard.offsetTop + (chessboard.clientHeight / 14) * 3 - 4
      const rightX = chessboard.offsetLeft + chessboard.clientWidth - 46
      const midrightX =
        chessboard.offsetLeft -
        (chessboard.clientWidth / 14) * 3 +
        chessboard.clientWidth -
        46
      const bottomY = chessboard.offsetTop + chessboard.clientHeight - 46
      const midbottomY =
        chessboard.offsetTop -
        (chessboard.clientHeight / 14) * 3 +
        chessboard.clientHeight -
        46
      const x = e.clientX - GRID_SIZE / 2
      const y = e.clientY - GRID_SIZE / 2
      activePiece.style.position = 'absolute'

      // Restricting the x position
      if (x < leftX) {
        activePiece.style.left = `${leftX}px`
      } else if (x > rightX) {
        activePiece.style.left = `${rightX}px`
      } else {
        activePiece.style.left = `${x}px`
      }

      // Restricting the y position
      if (y < topY) {
        activePiece.style.top = `${topY}px`
      } else if (y > bottomY) {
        activePiece.style.top = `${bottomY}px`
      } else {
        activePiece.style.top = `${y}px`
      }

      if ((x < midleftX && y > midbottomY) || (x < midleftX && y < midtopY)) {
        activePiece.style.left = `${midleftX}px`
      } else if (
        (x > midrightX && y > midbottomY) ||
        (x > midrightX && y < midtopY)
      ) {
        activePiece.style.left = `${midrightX}px`
      }
    }
  }

  // Function when player drops a piece
  function dropPiece(e: React.MouseEvent) {
    // Dropping the pieces on the right grid
    const chessboard = chessboardRef.current

    if (activePiece && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE)
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 700) / GRID_SIZE)
      )

      const currentPiece = pieces.find((p) =>
        samePosition(p.position, grabPosition)
      )

      // Checking the validity of the move made by player
      if (currentPiece) {
        const validMove = referee.isValidMove(
          grabPosition,
          { x, y },
          currentPiece.type,
          currentPiece.team,
          pieces
        )

        if (validMove) {
          // Updating the position of the piece
          // If a piece is attacked then remove it
          const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, grabPosition)) {
              piece.position.x = x
              piece.position.y = y

              // Checking if a pawn is promoted
              if (piece.type === PieceType.PAWN) {
                if (piece.team === TeamType.RED && y === 7) {
                  modalRef.current?.classList.remove('hidden')
                  setPromotionPawn(piece)
                } else if (piece.team === TeamType.YELLOW && y === 6) {
                  modalRef.current?.classList.remove('hidden')
                  setPromotionPawn(piece)
                } else if (piece.team === TeamType.BLUE && x === 7) {
                  modalRef.current?.classList.remove('hidden')
                  setPromotionPawn(piece)
                } else if (piece.team === TeamType.GREEN && x === 6) {
                  modalRef.current?.classList.remove('hidden')
                  setPromotionPawn(piece)
                }
              }

              results.push(piece)
            } else if (!samePosition(piece.position, { x, y })) {
              results.push(piece)
            }
            return results
          }, [] as Piece[])

          setPieces(updatedPieces)
        } else {
          // Resets the piece position
          activePiece.style.position = 'relative'
          activePiece.style.removeProperty('top')
          activePiece.style.removeProperty('left')
        }
      }

      setActivePiece(null)
    }
  }

  // Function to promote a pawn to the desired piece
  function promotePawn(pieceType: PieceType) {
    if (promotionPawn === undefined) {
      return
    }

    const updatedPieces = pieces.reduce((results, piece) => {
      if (samePosition(piece.position, promotionPawn.position)) {
        piece.type = pieceType

        // Deciding team type
        let teamType = ''
        if (piece.team === TeamType.RED) {
          teamType = 'r'
        } else if (piece.team === TeamType.BLUE) {
          teamType = 'b'
        } else if (piece.team === TeamType.YELLOW) {
          teamType = 'y'
        } else if (piece.team === TeamType.GREEN) {
          teamType = 'g'
        }

        // Deciding piece type
        let image = ''
        switch (pieceType) {
          case PieceType.ROOK:
            image = 'R'
            break
          case PieceType.KNIGHT:
            image = 'N'
            break
          case PieceType.BISHOP:
            image = 'B'
            break
          case PieceType.QUEEN:
            image = 'Q'
            break
        }

        piece.image = `assets/images/${teamType}${image}.png`
      }

      results.push(piece)
      return results
    }, [] as Piece[])

    // Updating current piece and toggling the modal
    setPieces(updatedPieces)
    modalRef.current?.classList.add('hidden')
  }

  // Deciding the type of color of the pieces when opening the modal
  function promotionTeamType() {
    if (promotionPawn?.team === TeamType.RED) {
      return 'r'
    } else if (promotionPawn?.team === TeamType.BLUE) {
      return 'b'
    } else if (promotionPawn?.team === TeamType.YELLOW) {
      return 'y'
    } else if (promotionPawn?.team === TeamType.GREEN) {
      return 'g'
    }
  }

  // Setting the four player chessboard
  let board = []

  for (let j = VERTICAL_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < HORIZONTAL_AXIS.length; i++) {
      const num_i = i
      const num_j = j
      const piece = pieces.find((p) => samePosition(p.position, { x: i, y: j }))
      let image = piece ? piece.image : undefined

      let currentPiece =
        activePiece != null
          ? pieces.find((p) => samePosition(p.position, grabPosition))
          : undefined
      let highlight = currentPiece?.possibleMoves
        ? currentPiece.possibleMoves.some((p) =>
            samePosition(p, { x: i, y: j })
          )
        : false

      // Made chessboard with all the 'useful' squares
      board.push(
        <Tile
          key={`${i},${j}`}
          num_i={num_i}
          num_j={num_j}
          image={image}
          highlight={highlight}
        />
      )
    }
  }

  return (
    <>
      <div id='pawn-promotion-modal' className='hidden' ref={modalRef}>
        <div className='modal-body'>
          <img
            onClick={() => promotePawn(PieceType.ROOK)}
            src={`/assets/images/${promotionTeamType()}R.png`}
            alt='Rook'
          />
          <img
            onClick={() => promotePawn(PieceType.KNIGHT)}
            src={`/assets/images/${promotionTeamType()}N.png`}
            alt='Knight'
          />
          <img
            onClick={() => promotePawn(PieceType.BISHOP)}
            src={`/assets/images/${promotionTeamType()}B.png`}
            alt='Bishop'
          />
          <img
            onClick={() => promotePawn(PieceType.QUEEN)}
            src={`/assets/images/${promotionTeamType()}Q.png`}
            alt='Queen'
          />
        </div>
      </div>
      <div
        onMouseMove={(e) => movePiece(e)}
        onMouseDown={(e) => grabPiece(e)}
        onMouseUp={(e) => dropPiece(e)}
        id='chessboard'
        ref={chessboardRef}
      >
        {board}
        <PlayerName />
      </div>
    </>
  )
}
