import React from "react";
import { Container } from "semantic-ui-react";

import { PlaceholderGrid } from "../components/PlaceholderGrid";
import { getMyCharacters } from "../api/API";
import { EmptyAccount } from "../components/EmptyAccount";
import { CharacterSection } from "../components/CharacterSection";

export class MyAccountContainer extends React.Component {
  state = {
    myCharacters: [],
    filterSpeciesOptions: [],
    filterStatusOptions: [],
    isLoading: false,
  };
  componentDidMount = () => {
    if (this.props.username === "") return;

    this.setState({ isLoading: true });
    getMyCharacters()
      .then((myCharacters) => {
        const characters = Array.isArray(myCharacters) ? myCharacters : [];
        this.setState({
          myCharacters: characters,
          filterSpeciesOptions: [
            ...new Set(characters.map((character) => character.species)),
          ],
          filterStatusOptions: [
            ...new Set(characters.map((character) => character.status)),
          ],
          isLoading: false,
        });
      })
      .catch(() => this.setState({ isLoading: false }));
  };

  render() {
    const { username, createdAt } = this.props;

    if (this.state.isLoading) {
      return <PlaceholderGrid />;
    }

    return (
      <Container>
        {!this.state.myCharacters.length ? (
          <EmptyAccount />
        ) : (
          <CharacterSection
            myCharacters={this.state.myCharacters}
            filterSpeciesOptions={this.state.filterSpeciesOptions}
            filterStatusOptions={this.state.filterStatusOptions}
            username={username}
            createdAt={createdAt}
          />
        )}
      </Container>
    );
  }
}
