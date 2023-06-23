import './Tile.css'

interface Props {
  image?: string
  num_i: number
  num_j: number
}

export default function Tile({ num_i, num_j, image }: Props) {
  // Useless tiles are those tiles which are at the corners of the 'squared' chess board

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
    }
  }
}
