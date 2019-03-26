import React, { Component } from 'react'
import { placeholderGrid } from '../lib/placeholder'
import API from '../adapters/API'
import { Container } from 'semantic-ui-react'
import CharacterIndex from '../components/CharactersIndex'

class AllCharactersContainer extends Component {
  state = {
    allCharacters: [],
    filterSpeciesOptions: [],
    filterStatusOptions: [],
    loaded: false
  }
  componentDidMount = () =>
    API.getAllCharacters().then(allCharacters =>
      this.setState({
        allCharacters,
        filterSpeciesOptions: [
          ...new Set(allCharacters.map(character => character.species).flat())
        ],
        filterStatusOptions: [
          ...new Set(allCharacters.map(character => character.status).flat())
        ],
        loaded: true
      })
    )

  render() {
    const {
      allCharacters,
      filterSpeciesOptions,
      filterStatusOptions
    } = this.state
    return (
      <Container>
        <h1>Published Characters</h1>
        {this.state.loaded ? (
          <CharacterIndex
            characters={allCharacters}
            filterSpeciesOptions={filterSpeciesOptions}
            filterStatusOptions={filterStatusOptions}
          />
        ) : (
          placeholderGrid()
        )}
      </Container>
    )
  }
}
export default AllCharactersContainer
