import React, { Component } from 'react'
import AvatarCell from './AvatarCell'

class AvatarCellGrid extends Component {
  render() {
    return (
      <div style={{ display: 'block' }}>
        {this.props.cells.map((color, index) => (
          <AvatarCell key={index} color={color} />
        ))}
      </div>
    )
  }
}

export default AvatarCellGrid
