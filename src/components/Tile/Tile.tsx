import './Tile.css'

interface Props {
  image?: string
  num_i: number
  num_j: number
  highlight: boolean
}

export default function Tile({ num_i, num_j, image, highlight }: Props) {
  // Useless tiles are those tiles which are at the corners of the 'squared' chess board
  // Also highlighting the valid moves of the players

  // Dark Tiles
  if ((num_i + num_j) % 2 === 0) {
    if (
      (num_i < 3 && num_j < 3) ||
      (num_i >= 11 && num_j < 3) ||
      (num_i >= 11 && num_j >= 11) ||
      (num_i < 3 && num_j >= 11)
    ) {
      return <div className='tile useless'></div>
    } else {
      if (highlight === false) {
        return (
          <div className='tile dark-tile'>
            {image && (
              <div
                style={{ backgroundImage: `url(${image})` }}
                className='chess-piece'
              ></div>
            )}
          </div>
        )
      } else {
        return (
          <div className='tile dark-tile tile-highlight'>
            {image && (
              <div
                style={{ backgroundImage: `url(${image})` }}
                className='chess-piece'
              ></div>
            )}
          </div>
        )
      }
    }
  }

  // Light Tiles
  else {
    if (
      (num_i < 3 && num_j < 3) ||
      (num_i >= 11 && num_j < 3) ||
      (num_i >= 11 && num_j >= 11) ||
      (num_i < 3 && num_j >= 11)
    ) {
      return <div className='tile useless'></div>
    } else {
      if (highlight === false) {
        return (
          <div className='tile light-tile'>
            {image && (
              <div
                style={{ backgroundImage: `url(${image})` }}
                className='chess-piece'
              ></div>
            )}
          </div>
        )
      } else {
        return (
          <div className='tile light-tile tile-highlight'>
            {image && (
              <div
                style={{ backgroundImage: `url(${image})` }}
                className='chess-piece'
              ></div>
            )}
          </div>
        )
      }
    }
  }
}
