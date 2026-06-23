import React, { Component } from 'react';
import { Container, Button, Icon } from 'semantic-ui-react';
import { titleCase } from '../lib/helper';
import { Link } from 'react-router-dom';
import { cloneCharacter } from '../api/API';

class CharacterDetails extends Component {
  handleClone = () => {
    cloneCharacter(this.props.character.id, this.props.user_id).then((data) => {
      if (data.error) {
        return alert('Something went wrong during cloning');
      } else {
        alert('Character Cloned to your library!!');
      }
    });
  };

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
      species,
      traits_positive,
      traits_negative,
      user,
    } = this.props.character;

    return (
      <Container>
        <h1>
          {first_name} {last_name}
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

        {this.props.user_id && this.props.username !== user.username && (
          <Button
            onClick={this.handleClone}
            content="Clone To My Account"
            icon="copy"
            fluid
            color="violet"
          />
        )}

        {!this.props.user_id && (
          <Button
            content="Clone To My Account"
            icon="copy"
            fluid
            color="violet"
            label={{
              basic: true,
              color: 'red',
              pointing: 'left',
              content: 'create an account / sign in to clone characters',
            }}
            disabled
          />
        )}

        {this.props.editable && (
          <Button.Group widths={2} style={{ marginTop: '1em' }}>
            <Button as={Link} to={`/characters/${id}/edit`} icon labelPosition='left'>
              <Icon name='edit outline' />
              Edit Character
            </Button>
            <Button
              negative
              icon
              labelPosition='left'
              onClick={this.props.onDeleteRequest}
            >
              <Icon name='trash alternate outline' />
              Delete
            </Button>
          </Button.Group>
        )}
      </Container>
    );
  }
}

export default CharacterDetails;
