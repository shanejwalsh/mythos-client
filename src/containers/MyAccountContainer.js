import React from "react";
import {
  Container
} from "semantic-ui-react";

import { PlaceholderGrid } from "../lib/placeholder";
import { getMyCharacters } from "../api/API";
import { EmptyAccount } from "../components/EmptyAccount";
import { CharacterSection } from "../components/CharacterSection";

export class MyAccountContainer extends React.Component {
  state = {
    myCharacters: [],
    filterSpeciesOptions: [],
    filterStatusOptions: [],
    isLoading: false
  };
  componentDidMount = () => {
    this.setState({ isLoading: true });

    if (this.props.username !== "") {
      getMyCharacters().then(myCharacters => {
        if (myCharacters === {}) return;
        this.setState({
          myCharacters,
          filterSpeciesOptions: [
            ...new Set(myCharacters.map(character => character.species).flat())
          ],
          filterStatusOptions: [
            ...new Set(myCharacters.map(character => character.status).flat())
          ],
          isLoading: false
        });
      });
    }
  };

  render() {
    const username = this.props.username;

    if (this.state.isLoading) {
      return <PlaceholderGrid />;
    }


    return (
      <Container>
        {!this.state.myCharacters.length
          ? <EmptyAccount />
          : <CharacterSection
            myCharacters={this.state.myCharacters}
            filterSpeciesOptions={this.state.filterSpeciesOptions}
            filterStatusOptions={this.state.filterStatusOptions}
            username={username}
          />}
      </Container>
    );
  }
}
