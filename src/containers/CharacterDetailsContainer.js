import React, { Component } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import API from '../adapters/API'
import { Container, Button, Icon } from 'semantic-ui-react'
import AvatarBuilder from '../components/AvatarBuilder'
import { generateCSS } from '../lib/helper'
import { Link } from 'react-router-dom'
import { GRID_SIZE } from '../config/config'

class CharacterDetailsContainer extends Component {
  state = {
    character: null,
    view: 'display' //default to display mode when viewing a Character
  }

  componentDidMount = () =>
    API.getCharacterById(this.props.id).then(character =>
      this.setState({ character })
    )

  render() {
    const viewMode = this.state.view
    return (
      <Container>
        {viewMode === 'edit-avatar' && (
          <AvatarBuilder
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

              <div
                style={generateCSS({
                  cellColors: this.state.character.sprite_data.split(','),
                  pixelSize: 12,
                  cssFormat: false
                })}
              />

              <Button
                style={{ float: 'right', marginTop: GRID_SIZE * 13 }}
                onClick={() => this.setState({ view: 'edit-avatar' })}
                icon
                labelPosition='left'
              >
                <Icon name='edit outline' />
                Edit Avatar
              </Button>
            </div>
            <div className='ten wide column'>
              <CharacterDetails character={this.state.character} />
            </div>
          </div>
        )}
      </Container>
    )
  }
}

export default CharacterDetailsContainer
