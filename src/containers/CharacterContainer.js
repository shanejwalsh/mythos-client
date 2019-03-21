import React, { Component } from 'react'
import CharacterCard from '../components/CharacterCard'
import { Card, Container } from 'semantic-ui-react'

class CharacterContainer extends Component {
  render() {
    return (
      <Container>
        <Card.Group itemsPerRow={4}>
          {this.props.characters.map(character => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </Card.Group>
      </Container>
    )
  }
}
export default CharacterContainer
