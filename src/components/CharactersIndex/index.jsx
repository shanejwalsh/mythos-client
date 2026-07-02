import React, { Component } from "react";
import CharactersContainer from "./CharactersGrid";
import { Container } from "semantic-ui-react";
import CharactersMenuBar from "./CharactersMenuBar";

export class CharacterIndex extends Component {
  state = {
    characters: [],
    searchTerm: "",
    filterSpecies: [],
    filterSpeciesOptions: [],
    filterStatus: [],
    filterStatusOptions: [],
    sortbyDate: true,
    loaded: false,
  };
  componentDidMount = () => {
    const { characters, filterSpeciesOptions, filterStatusOptions } =
      this.props;
    this.setState({
      characters,
      filterSpeciesOptions,
      filterStatusOptions,
      loaded: true,
    });
  };

  filterAndSortCharacters = () =>
    this.state.characters
      .filter((character) =>
        `${character.first_name} ${character.last_name} ${character.alias}`
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase()),
      )
      .filter(
        (character) =>
          this.state.filterSpecies.length === 0 ||
          this.state.filterSpecies.includes(character.species.toLowerCase()),
      )
      .filter(
        (character) =>
          this.state.filterStatus.length === 0 ||
          this.state.filterStatus.includes(character.status.toLowerCase()),
      )
      .sort((a, b) => {
        if (this.state.sortbyDate) {
          return b.created_at > a.created_at ? 1 : -1;
        }
        return `${a.first_name} ${a.last_name}` >
          `${b.first_name} ${b.last_name}`
          ? 1
          : -1;
      });

  handleSortChange = (_, data) => {
    this.setState({ sortbyDate: data.value !== "name" });
  };

  render() {
    return (
      this.state.loaded && (
        <Container>
          <CharactersMenuBar
            statusOptions={this.state.filterStatusOptions}
            speciesOptions={this.state.filterSpeciesOptions}
            handleSortChange={this.handleSortChange}
            handleSearch={(event) => {
              this.setState({ searchTerm: event.target.value });
            }}
            handleSpeciesFilter={(_, data) =>
              this.setState({ filterSpecies: data.value })
            }
            handleStatusFilter={(_, data) =>
              this.setState({ filterStatus: data.value })
            }
            searchTerm={this.state.searchTerm}
          />

          <CharactersContainer
            gridSize={this.props.gridSize}
            footerPrimary={this.props.footerPrimary}
            characters={this.filterAndSortCharacters()}
          />
        </Container>
      )
    );
  }
}
// export default CharacterIndex
