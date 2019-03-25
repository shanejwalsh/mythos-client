import React from 'react'
import CharacterCard from '../components/CharacterCard'
import { Card } from 'semantic-ui-react'

const CharactersContainer = props => {
  return (
    <Card.Group itemsPerRow={4}>
      {props.characters.map(character => (
        <CharacterCard key={character.id} {...character} />
      ))}
    </Card.Group>
  )
}

export default CharactersContainer
