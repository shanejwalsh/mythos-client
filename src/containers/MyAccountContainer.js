import React, { Component } from 'react'
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
  Container
} from 'semantic-ui-react'

class MyAccountContainer extends Component {
  state = {
    myChars: []
  }

  componentDidMount = () => {}
  emptyState = () => (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        Looks like you haven't created any characters yet!
        <Divider vertical>Or</Divider>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              <Icon name='search' />
              Find Country
            </Header>

            <Search placeholder='Search countries...' />
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name='world' />
              Add New Country
            </Header>
            <Button primary>Create</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )

  render() {
    return <Container />
  }
}
export default MyAccountContainer
