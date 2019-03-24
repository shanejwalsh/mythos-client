import React, { Component } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import API from '../adapters/API'
import CharacterAvatar from '../components/CharacterAvatar'
import { Container } from 'semantic-ui-react'
import AvatarBuilder from '../components/AvatarBuilder'

class CharacterDetailsContainer extends Component {
  state = {
    character: null,
    view: 'display' //hard coded for now
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
            <div className='six wide column'>
              <CharacterAvatar
                handleClick={() => this.setState({ view: 'edit-avatar' })}
                character={this.state.character}
              />
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
