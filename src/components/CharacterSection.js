import React from 'react';

import { CharacterIndex } from "./CharactersIndex";

import {
  Segment
} from "semantic-ui-react";


export function CharacterSection(props) {
  const {
    myCharacters,
    filterSpeciesOptions,
    filterStatusOptions,
    username
  } = props;

  return (
    <div className='ui stackable two column grid'>
      <div className='four wide column'>
        <Segment.Group>
          <Segment>
            <h1 style={{ color: "#54C8FF" }}>{`${username}`}</h1>
          </Segment>
          <Segment>
            <b>Joined </b>26/03/2019
          </Segment>
          <Segment>
            <b>Created Characters </b> {myCharacters.length}
          </Segment>
        </Segment.Group>
      </div>
      <div className='twelve wide column'>
        <h1>Your Characters</h1>
        <CharacterIndex
          gridSize='2'
          footerPrimary='created-date'
          characters={myCharacters}
          filterSpeciesOptions={filterSpeciesOptions}
          filterStatusOptions={filterStatusOptions}
        />
      </div>
    </div>
  );
};