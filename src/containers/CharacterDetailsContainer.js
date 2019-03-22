import React, { Component } from 'react'
import CharacterDetails from '../components/CharacterDetails'
import API from '../adapters/API'
import CharacterAvatar from '../components/CharacterAvatar'
import { Container } from 'semantic-ui-react'

class CharacterDetailsContainer extends Component {
  state = { character: {} }

  componentDidMount = () =>
    API.getCharacterById(this.props.id).then(character =>
      this.setState({ character })
    )

  render() {
    return (
      <Container>
        <div className='ui stackable two column grid'>
          <div className='six wide column'>
            {/* Seed & Gender is random for now as placeholder */}
            <CharacterAvatar character={this.state.character} />
          </div>
          <div className='ten wide column'>
            <CharacterDetails character={this.state.character} />
          </div>
        </div>
      </Container>
    )
  }
}

export default CharacterDetailsContainer
