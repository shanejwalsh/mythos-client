import React, { Component } from 'react'
import API from '../adapters/API'
import CharactersContainer from '../containers/CharactersContainer'

class CharacterIndex extends Component {
  state = {
    allCharacters: []
  }

  componentDidMount = () =>
    API.getAllCharacters().then(allCharacters =>
      this.setState({ allCharacters })
    )

  render() {
    return <CharactersContainer characters={this.state.allCharacters} />
  }
}
export default CharacterIndex
