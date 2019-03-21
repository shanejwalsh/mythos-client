import React, { Component, Fragment } from 'react'
import API from '../adapters/API'
import CharacterCard from '../components/CharacterCard'

class CharacterContainer extends Component {
  state = {
    allCharacters: []
  }

  componentDidMount = () =>
    API.getAllCharacters().then(allCharacters =>
      this.setState({ allCharacters })
    )

  render() {
    return (
      <Fragment>
        <h1>All Characters:</h1>
        {this.state.allCharacters.map(character => (
          <CharacterCard key={character.id} {...character} />
        ))}
      </Fragment>
    )
  }
}

export default CharacterContainer
