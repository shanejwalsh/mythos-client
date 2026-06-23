import React, { Component } from 'react';
import CharacterDetails from '../components/CharacterDetails';
import { Container, Button, Icon, Confirm } from 'semantic-ui-react';
import AvatarBuilder from '../components/AvatarBuilder';
import { generateCSS } from '../lib/helper';
import { Link } from 'react-router-dom';
import { GRID_SIZE } from '../config/config';
import { getCharacterById, deleteCharacter } from '../api/API';
import PixelSkull from '../components/PixelSkull';

class CharacterDetailsContainer extends Component {
  state = {
    character: null,
    view: 'display',
    confirmingDelete: false,
    copiedCSS: false,
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

  handleCopyCSS = () => {
    const css = generateCSS({
      cellColors: this.state.character.sprite_data.split(','),
      cssFormat: true,
    });
    navigator.clipboard.writeText(css).then(() => {
      this.setState({ copiedCSS: true });
      setTimeout(() => this.setState({ copiedCSS: false }), 2000);
    });
  };

  render() {
    const viewMode = this.state.view;
    const { character, confirmingDelete, copiedCSS } = this.state;
    const editable =
      character && this.props.username === character.user.username;

    return (
      <Container>
        {viewMode === 'edit-avatar' && (
          <AvatarBuilder
            history={this.props.history}
            characterId={character.id}
            cellColors={character.sprite_data.split(',')}
            setDisplayMode={() => this.setState({ view: 'display' })}
          />
        )}

        {viewMode === 'display' && character && (
          <div className='ui stackable two column grid'>
            <div className='four wide column'>
              <Button as={Link} to={`/characters`} icon labelPosition='left'>
                <Icon name='arrow left' />
                All Characters
              </Button>
              <div style={{ height: GRID_SIZE * 13, width: GRID_SIZE * 13 }}>
                <div
                  style={generateCSS({
                    cellColors: character.sprite_data.split(','),
                    pixelSize: 12,
                    cssFormat: false
                  })}
                />
              </div>
              <Button
                fluid
                icon
                labelPosition='left'
                onClick={this.handleCopyCSS}
                color={copiedCSS ? 'green' : undefined}
                style={{ marginTop: '0.5em' }}
              >
                <Icon name={copiedCSS ? 'check' : 'code'} />
                {copiedCSS ? 'Copied!' : 'Copy CSS'}
              </Button>
            </div>
            <div className='tweleve wide column'>
              <CharacterDetails
                user_id={this.props.user_id}
                username={this.props.username}
                editable={editable}
                character={character}
                onDeleteRequest={this.handleDeleteRequest}
              />
            </div>
          </div>
        )}

        <Confirm
          open={confirmingDelete}
          header='Delete Character'
          content={
            <div style={{ textAlign: 'center', padding: '1.5em 1em 0.5em' }}>
              <PixelSkull />
              <p style={{ marginTop: '1em' }}>
                This cannot be undone. Are you sure you want to permanently delete this character?
              </p>
            </div>
          }
          confirmButton='Delete Forever'
          onCancel={this.handleDeleteCancel}
          onConfirm={this.handleDeleteConfirm}
        />
      </Container>
    );
  }
}

export default CharacterDetailsContainer;
