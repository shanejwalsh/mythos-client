import React, { Component } from 'react'
import { Container, Button, Icon } from 'semantic-ui-react'
import { titleCase } from '../lib/helper'
import { Link } from 'react-router-dom'

class CharacterDetails extends Component {
  render() {
    const {
      id,
      first_name,
      last_name,
      alias,
      motto,
      bio,
      alignment,
      age,
      status,
      gender,
      species,
      traits_positive,
      traits_negative
    } = this.props.character

    return (
      <Container>
        <h1>
          {first_name} {last_name} ({gender})
        </h1>
        <p>
          <b>Also known as:</b> {alias} <br />
          <b>Motto:</b> {motto} <br />
          <b>Species: </b> {titleCase(species)} <br />
          <b>Age: </b> {age} <br />
          <b>Status: </b> {status} <br />
          <b>Alignment: </b> {titleCase(alignment)} <br />
          <br />
          <b>Bio: </b> {bio} <br />
          <br />
          <b>Positive Traits: </b>
          {traits_positive}
          <br />
          <b>Negative Traits: </b>
          {traits_negative}
          <br />
        </p>
        {this.props.editable ? (
          <Button as={Link} to={`/characters/${id}/edit`}>
            <Icon name='edit outline' />
            Edit Character
          </Button>
        ) : (
          <Button
            content='Clone To My Account'
            icon='copy'
            fluid
            color='violet'
          />
        )}
      </Container>
    )
  }
}

export default CharacterDetails
