import React, { Component, Fragment } from 'react'
import API from '../adapters/API'
import CharactersContainer from '../containers/CharactersContainer'

class CharacterIndex extends Component {
  state = {
    allCharacters: [],
    loaded: false
  }

  componentDidMount = () =>
    API.getAllCharacters()
      .then(allCharacters => this.setState({ allCharacters }))
      .then(this.setState({ loaded: true }))

  render() {
    return (
      <Fragment>
        {this.state.loaded ? (
          <CharactersContainer characters={this.state.allCharacters} />
        ) : (
          'loading'
        )}
      </Fragment>
    )
  }
}
export default CharacterIndex
