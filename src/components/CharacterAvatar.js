import React from 'react'
import { Card } from 'semantic-ui-react'

const CharacterAvatar = props => {
  return (
    <Card
      header='Avatar'
      image={`https://avatars.dicebear.com/v2/${props.character.gender}/${
        props.character.id
      }.svg?`}
      description='GENERIC PLACEHOLDER'
    />
  )
}

export default CharacterAvatar
