import React, { Component } from 'react';
import CharacterDetails from '../components/CharacterDetails';
import { Container, Button, Icon, Confirm } from 'semantic-ui-react';
import AvatarBuilder from '../components/AvatarBuilder';
import { generateCSS } from '../lib/helper';
import { Link } from 'react-router-dom';
import { GRID_SIZE } from '../config/config';
import { getCharacterById, deleteCharacter } from '../api/API';

class CharacterDetailsContainer extends Component {
  state = {
    character: null,
    view: 'display',
    confirmingDelete: false,
  };

  componentDidMount = () => {
    if (this.state.character !== null) return;
    getCharacterById(this.props.id).then(character => {
      this.setState({ character });
    });
  };

  handleDeleteRequest = () => this.setState({ confirmingDelete: true });
  handleDeleteCancel = () => this.setState({ confirmingDelete: false });
  handleDeleteConfirm = () => {
    deleteCharacter(this.state.character.id).then(() => {
      this.props.history.push('/characters');
    });
  };

  render() {
    const viewMode = this.state.view;
    const editable =
      this.state.character &&
      this.props.username === this.state.character.user.username;

    return (
      <Container>
        {viewMode === 'edit-avatar' && (
          <AvatarBuilder
            history={this.props.history}
            characterId={this.state.character.id}
            cellColors={this.state.character.sprite_data.split(',')}
            setDisplayMode={() => this.setState({ view: 'display' })}
          />
        )}

        {viewMode === 'display' && this.state.character && (
          <div className='ui stackable two column grid'>
            <div className='four wide column'>
              <Button as={Link} to={`/characters`} icon labelPosition='left'>
                <Icon name='arrow left' />
                All Characters
              </Button>
              <div style={{ height: GRID_SIZE * 13, width: GRID_SIZE * 13 }}>
                <div
                  style={generateCSS({
                    cellColors: this.state.character.sprite_data.split(','),
                    pixelSize: 12,
                    cssFormat: false
                  })}
                />
              </div>
            </div>
            <div className='tweleve wide column'>
              <CharacterDetails
                user_id={this.props.user_id}
                username={this.props.username}
                editable={editable}
                character={this.state.character}
                onDeleteRequest={this.handleDeleteRequest}
              />
            </div>
          </div>
        )}

        <Confirm
          open={this.state.confirmingDelete}
          header='Delete Character'
          content='This cannot be undone. Are you sure you want to permanently delete this character?'
          confirmButton='Delete Forever'
          onCancel={this.handleDeleteCancel}
          onConfirm={this.handleDeleteConfirm}
        />
      </Container>
    );
  }
}

export default CharacterDetailsContainer;
