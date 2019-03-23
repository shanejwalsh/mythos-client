import React from 'react'
import { Button } from 'semantic-ui-react'

const AvatarBuilderHeader = props => {
  return (
    <span style={{ textAlign: 'center' }}>
      <Button
        onClick={props.handleClick}
        style={{ display: 'block', float: 'left' }}
      >
        Go Back
      </Button>
      <h1>Edit Your Avatar</h1>
    </span>
  )
}

export default AvatarBuilderHeader
