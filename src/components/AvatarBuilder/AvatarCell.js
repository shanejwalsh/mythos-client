import React from 'react'
import styled from 'styled-components'

const Cell = styled.div`
  background-color: ${props => (props.color ? props.color : '#000000')};
  width: 6.25%;
  padding-bottom: 6.25%;
  border: solid;
  cursor: cell;
  font-size: 16px;
  line-height: 0px;
  float: left;
  border: 1px solid #585858;
  border-width: 0 1px 1px 0;
`

const AvatarCell = props => {
  return <Cell />
}

export default AvatarCell
