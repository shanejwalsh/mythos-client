import React from 'react'
import { Form, Button, Input, Container } from 'semantic-ui-react'
import API from '../adapters/API'

export default class CharacterDetailsForm extends React.Component {
  state = {
    id: '',
    first_name: '',
    last_name: '',
    alias: '',
    motto: '',
    species: '',
    bio: '',
    alignment: '',
    traits_positive: '',
    traits_negative: '',
    age: '',
    status: '',
    feats: '',
    edit: true
  }

  handleSubmit = () => {
    if (this.state.edit) {
      API.updateCharacter(this.state)
    } else {
      API.createCharacter(this.state)
      alert('char created BOIIIIIIII!')
    }
  }

  componentDidMount = () => {
    if (this.props.match.path.includes('edit')) {
      API.getCharacterById(this.props.match.params.id).then(character =>
        this.setState({ ...character })
      )
    } else {
      this.setState({ edit: false })
      this.randomizeAll()
    }
  }

  randomizeAll = () =>
    API.generateNewCharacter().then(character =>
      this.setState({ ...character })
    )

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <Container>
        <h1>{this.state.edit ? 'Edit Character ' : 'Create Character'}</h1>
        {!this.state.edit ? (
          <Button
            onClick={this.randomizeAll}
            content='Randomize'
            icon='random'
            color='violet'
          />
        ) : null}
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <Input
            fluid
            label='First Name'
            onChange={this.handleChange}
            name='first_name'
            value={this.state.first_name}
          />
          <Input
            fluid
            label='Last Name'
            onChange={this.handleChange}
            name='last_name'
            value={this.state.last_name}
          />
          <Input
            fluid
            label='Species'
            onChange={this.handleChange}
            name='species'
            value={this.state.species}
          />
          <Input
            fluid
            label='Alias'
            onChange={this.handleChange}
            name='alias'
            value={this.state.alias}
          />
          <Input
            fluid
            label='Motto'
            onChange={this.handleChange}
            name='motto'
            value={this.state.motto}
          />
          <Input
            fluid
            type='textarea'
            label='Bio'
            onChange={this.handleChange}
            name='bio'
            value={this.state.bio}
          />
          <Input
            fluid
            label='Alignment'
            onChange={this.handleChange}
            name='alignment'
            value={this.state.alignment}
          />
          <Input
            fluid
            label='Positive Traits'
            onChange={this.handleChange}
            name='traits_positive'
            value={this.state.traits_positive}
          />
          <Input
            fluid
            label='Negativde Traits'
            onChange={this.handleChange}
            name='traits_negative'
            value={this.state.traits_negative}
          />
          <Input
            fluid
            label='Age'
            onChange={this.handleChange}
            name='age'
            value={this.state.age}
          />
          <Input
            fluid
            label='Status'
            onChange={this.handleChange}
            name='status'
            value={this.state.status}
          />
          <Input
            fluid
            label='Gender'
            onChange={this.handleChange}
            name='gender'
            value={this.state.gender}
          />
          <Input
            fluid
            label='Feats'
            onChange={this.handleChange}
            name='feats'
            value={this.state.feats}
          />
          <hr />
          <Button color='green' fluid>
            {this.state.edit ? 'Update Character' : 'Create Character'}
          </Button>
        </Form>
      </Container>
    )
  }
}
