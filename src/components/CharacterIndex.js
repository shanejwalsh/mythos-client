import React, { Component, Fragment } from 'react'
import { placeholderGrid } from '../lib/placeholder'
import API from '../adapters/API'
import CharactersContainer from '../containers/CharactersContainer'
import { Container, Segment } from 'semantic-ui-react'
import CharactersMenuBar from './CharactersMenuBar'

class CharacterIndex extends Component {
  state = {
    allCharacters: [],
    loaded: false,
    searchTerm: '',
    filterSpecies: [],
    filterSpeciesOptions: [],
    filterStatus: [],
    filterStatusOptions: [],
    sortbyDate: true
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

  filterAndSortCharacters = () =>
    this.state.allCharacters
      .filter(character =>
        `${character.first_name} ${character.last_name} ${character.alias}`
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase())
      )
      .filter(character =>
        this.state.filterSpecies.length === 0
          ? true
          : this.state.filterSpecies.includes(character.species.toLowerCase())
      )
      .filter(character =>
        this.state.filterStatus.length === 0
          ? true
          : this.state.filterStatus.includes(character.status.toLowerCase())
      )
      .sort((a, b) => {
        debugger
        if (this.state.sortbyDate) {
          return b.created_at > a.created_at ? 1 : -1
        } else {
          return `${a.first_name} ${a.last_name}` >
            `${b.first_name} ${b.last_name}`
            ? 1
            : -1
        }
      })

  handleSortChange = (_, data) => {
    data.value === 'name'
      ? this.setState({ sortbyDate: false })
      : this.setState({ sortbyDate: true })
  }

  render() {
    return (
      <Container>
        <h1>Published Characters</h1>
        {this.state.loaded ? (
          <Fragment>
            <CharactersMenuBar
              statusOptions={this.state.filterStatusOptions}
              speciesOptions={this.state.filterSpeciesOptions}
              handleSortChange={this.handleSortChange}
              handleSearch={event => {
                this.setState({ searchTerm: event.target.value })
              }}
              handleSpeciesFilter={(_, data) =>
                this.setState({ filterSpecies: data.value })
              }
              handleStatusFilter={(_, data) =>
                this.setState({ filterStatus: data.value })
              }
              searchTerm={this.state.searchTerm}
            />

            <CharactersContainer characters={this.filterAndSortCharacters()} />
          </Fragment>
        ) : (
          <Fragment>
            <Segment />
            {placeholderGrid()}
          </Fragment>
        )}
      </Container>
    )
  }
}
export default CharacterIndex
