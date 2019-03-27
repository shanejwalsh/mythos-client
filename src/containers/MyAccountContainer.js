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
      API.getMyCharacters().then(myCharacters => {
        if (myCharacters === {}) return
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
      })
    }
  }
  emptyState = () => (
    <Fragment>
      <h1 style={{ textAlign: 'center' }}>
        Looks like you haven't created any characters yet!
      </h1>
      <Segment placeholder>
        <Grid columns={2} stackable textAlign='center'>
          <Divider vertical>Or</Divider>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column>
              <Header icon>
                <Icon name='grid layout' />
                Clone one from the library
              </Header>
              <Button as={Link} to='/characters' primary>
                Take Me There!
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon color='blue' name='add circle' />
                Create your own!
              </Header>
              <Button as={Link} to='/characters/new' secondary>
                Create
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Fragment>
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
        <div className='ui stackable two column grid'>
          <div className='four wide column'>
            <Segment.Group>
              <Segment>
                <h1 style={{ color: '#54C8FF' }}>{`${this.props.username}`}</h1>
              </Segment>
              <Segment>
                <b>Joined </b>26/03/2019
              </Segment>
              <Segment>
                <b>Created </b> {this.state.myCharacters.length} Characters
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
