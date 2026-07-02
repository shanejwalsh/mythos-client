import React from 'react'

const AvatarCell = props => {
  const cellsStyle = {
    backgroundColor: `${props.color}`,
    width: '6.25%',
    paddingBottom: '6.25%',
    border: '0.5px solid #d9e3f0',
    cursor: 'pointer',
    float: 'left'
  }
  return <div onClick={() => props.handleClick(props.id)} style={cellsStyle} />
}

export default AvatarCell
