import React, { Component, Fragment } from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
  Container
} from 'semantic-ui-react'
import API from '../adapters/API'
import { placeholderGrid } from '../lib/placeholder'
import CharacterIndex from '../components/CharactersIndex'
import { Link } from 'react-router-dom'

class MyAccountContainer extends Component {
  state = {
    myCharacters: [],
    filterSpeciesOptions: [],
    filterStatusOptions: [],
    loaded: false
  }
  componentDidMount = () => {
    if (this.props.username !== '') {
      API.getMyCharacters().then(myCharacters =>
        this.setState({
          myCharacters,
          filterSpeciesOptions: [
            ...new Set(myCharacters.map(character => character.species).flat())
          ],
          filterStatusOptions: [
            ...new Set(myCharacters.map(character => character.status).flat())
          ],
          loaded: true
        })
      )
    }
  }
  emptyState = () => (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        Looks like you haven't created any characters yet!
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              <Icon name='grid layout' />
              Clone one from the library
            </Header>
            <Button as={Link} to='/characters/new' primary>
              Take Me There!
            </Button>
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon color='blue' name='add circle' />
              Create your own!
            </Header>
            <Button as={Link} to='/characters' secondary>
              Create
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )

  characterIndexLoader = () => {
    if (!this.state.loaded) return placeholderGrid()
    const {
      myCharacters,
      filterSpeciesOptions,
      filterStatusOptions
    } = this.state

    if (myCharacters.length > 0) {
      return (
        <Fragment>
          <h1> {`${this.props.username}'s`} Characters</h1>
          <CharacterIndex
            characters={myCharacters}
            filterSpeciesOptions={filterSpeciesOptions}
            filterStatusOptions={filterStatusOptions}
          />
        </Fragment>
      )
    } else {
      return this.emptyState()
    }
  }

  unathorisedState = () => (
    <Segment inverted textAlign='center' placeholder>
      <Header icon>
        <Icon size='massive' name='user close' />
        You need to be logged in to view your account!
      </Header>
      <p>It only takes 2 minutes to sign up and get started!</p>
      <Button as={Link} to='/login' inverted>
        Login
      </Button>
      or
      <Button as={Link} to='/signup' primary>
        Signup
      </Button>
    </Segment>
  )

  render() {
    debugger
    const username = this.props.username
    return (
      <Container>
        {username === ''
          ? this.unathorisedState()
          : this.characterIndexLoader()}
      </Container>
    )
  }
}
export default MyAccountContainer
