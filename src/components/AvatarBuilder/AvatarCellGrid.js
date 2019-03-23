import React from 'react'
import AvatarCell from './AvatarCell'

const AvatarCellGrid = props => {
  return (
    <div style={{ display: 'block' }}>
      {props.cells.map((color, index) => (
        <AvatarCell
          handleClick={props.handleCellClick}
          id={index}
          key={index}
          color={color}
        />
      ))}
    </div>
  )
}

export default AvatarCellGrid
