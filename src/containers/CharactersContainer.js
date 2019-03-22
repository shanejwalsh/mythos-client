import React from 'react'
import CharacterCard from '../components/CharacterCard'
import { Card, Container } from 'semantic-ui-react'

const CharactersContainer = props => {
  return (
    <Container>
      <h1>All Characters:</h1>
      <Card.Group itemsPerRow={4}>
        {props.characters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </Card.Group>
    </Container>
  )
}

export default CharactersContainer
