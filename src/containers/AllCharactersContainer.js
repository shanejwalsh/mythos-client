import React, { Component } from 'react';
import { PlaceholderGrid } from '../lib/placeholder';

import { Container } from 'semantic-ui-react';
import { CharacterIndex } from '../components/CharactersIndex';
import { getAllCharacters } from '../api/API';

class AllCharactersContainer extends Component {
  state = {
    allCharacters: [],
    filterSpeciesOptions: [],
    filterStatusOptions: [],
    loaded: false
  };
  componentDidMount = () =>
    getAllCharacters().then(allCharacters =>
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
    );

  render() {
    const {
      allCharacters,
      filterSpeciesOptions,
      filterStatusOptions
    } = this.state;
    return (
      <Container>
        <h1>Published Characters</h1>
        {this.state.loaded ? (
          <CharacterIndex
            gridSize='4'
            footerPrimary='user'
            characters={allCharacters}
            filterSpeciesOptions={filterSpeciesOptions}
            filterStatusOptions={filterStatusOptions}
          />
        ) : (
          <PlaceholderGrid />
        )}
      </Container>
    );
  }
}
export default AllCharactersContainer;
