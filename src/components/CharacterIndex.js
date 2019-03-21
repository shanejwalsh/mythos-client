import React, { Component, Fragment } from 'react'
import API from '../adapters/API'
import CharacterContainer from '../containers/CharacterContainer'

class CharacterIndex extends Component {
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
        <CharacterContainer characters={this.state.allCharacters} />
      </Fragment>
    )
  }
}
export default CharacterIndex
