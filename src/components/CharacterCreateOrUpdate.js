import React from 'react'
import {
  Form,
  Button,
  Input,
  Container,
  TextArea,
  Label,
  Message
} from 'semantic-ui-react'
import API from '../adapters/API'
import { GRID_SIZE } from '../config/config'
import { generateCSS } from '../lib/helper'

const getInitialState = () => {
  return {
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
    gender: '',
    status: '',
    feats: '',
    sprite_data: [],
    edit: false,
    unlockedAttributes: [
      'first_name',
      'last_name',
      'alias',
      'motto',
      'species',
      'bio',
      'alignment',
      'traits_positive',
      'traits_negative',
      'age',
      'status',
      'feats',
      'gender',
      'sprite_data'
    ]
  }
}

class CharacterCreateOrUpdate extends React.Component {
  state = getInitialState()
  validate = () => {
    debugger
    if (this.state.first_name.length === 0) return false
    if (this.state.last_name.length === 0) return false
    if (this.state.alias.length === 0) return false
    if (this.state.motto.length === 0) return false
    if (this.state.species.length === 0) return false
    if (this.state.bio.length === 0) return false
    if (this.state.alignment.length === 0) return false
    if (this.state.traits_positive.length === 0) return false
    if (this.state.traits_negative.length === 0) return false
    if (this.state.age.length === 0) return false
    if (this.state.gender.length === 0) return false
    if (this.state.status.length === 0) return false
    if (this.state.feats.length === 0) return false
    if (this.state.sprite_data.length === 0) return false
    return true
  }

  handleSubmit = () => {
    if (this.validate()) {
      if (this.state.edit) {
        API.updateCharacter(this.state).then(data => {
          if (data.error) {
            return alert('something went wrong, character not updated')
          } else {
            alert('character updated!!')
          }
        })
      } else {
        API.createCharacter(this.state).then(data => {
          if (data.error) {
            return alert('Something went wrong, character not created')
          } else {
            alert('Character Created!!')
          }
        })
      }
      this.setState(getInitialState())
    } else {
      alert('no fields can be left empty')
    }
  }

  componentDidMount = () => {
    if (this.props.user_id) {
      this.setState({ user_id: this.props.user_id })
    } else {
      this.setState({ user_id: 1 }) // If not signed in create as guest
    }

    if (this.props.match.path.includes('edit')) {
      API.getCharacterById(this.props.match.params.id).then(character =>
        this.setState({ ...character, edit: true })
      )
    } else {
      this.randomizeUnlockedAttributes()
      this.setState({ edit: false })
    }
  }

  randomizeUnlockedAttributes = () =>
    API.generateNewCharacter().then(character =>
      Object.keys(character).map(attribute =>
        this.state.unlockedAttributes.includes(attribute)
          ? this.setState({ [attribute]: character[attribute] })
          : null
      )
    )

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleRandomAttribute = event => {
    event.persist()
    API.generateAttribute(event.target.id).then(attribute =>
      this.setState({ ...attribute })
    )
  }

  handleLockAttribute = event => {
    event.persist()
    if (!this.state.unlockedAttributes.includes(event.target.id)) {
      this.setState({
        unlockedAttributes: [...this.state.unlockedAttributes, event.target.id]
      })
    } else {
      this.setState({
        unlockedAttributes: this.state.unlockedAttributes.filter(
          attribute => attribute !== event.target.id
        )
      })
    }
  }

  addButtonsToInput = attribute => {
    const locked = this.state.unlockedAttributes.includes(attribute)
    return (
      <div style={{ float: 'right' }} onClick={this.handleLockAttribute}>
        <Button
          toggle
          active={locked}
          id={attribute}
          attached='right'
          icon={locked ? 'lock open' : 'lock'}
        />
      </div>
    )
  }

  render() {
    const divStyle = {
      width: '90%',
      margin: '10px auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }

    return (
      <Container>
        <h1>{this.state.edit ? 'Edit Character ' : 'Create Character'}</h1>

        {!this.props.user_id && (
          <Message negative>
            <Message.Header>Sign Up!</Message.Header>
            <p>
              You will not be able to edit this character once created unless
              you sign up (it only takes 10 seconds)
            </p>
          </Message>
        )}
        {!this.state.edit && (
          <Button
            fluid
            onClick={this.randomizeUnlockedAttributes}
            content='Randomize'
            icon='random'
            color='violet'
          />
        )}
        <hr />

        {this.state.sprite_data.length > 0 && (
          <div
            style={{
              margin: 'auto',
              height: GRID_SIZE * 8.5,
              width: GRID_SIZE * 8.5
            }}
          >
            <div
              style={generateCSS({
                cellColors: this.state.sprite_data.split(','),
                pixelSize: 8,
                cssFormat: false
              })}
            />
          </div>
        )}

        <Form onSubmit={this.handleSubmit}>
          <div style={divStyle}>
            <Input
              label='First Name'
              onChange={this.handleChange}
              name='first_name'
              value={this.state.first_name}
            />
            {this.addButtonsToInput('first_name')}
          </div>
          <div style={divStyle}>
            <Input
              label='Last Name'
              onChange={this.handleChange}
              name='last_name'
              value={this.state.last_name}
            />
            {this.addButtonsToInput('last_name')}
          </div>
          <div style={divStyle}>
            <Input
              label='Alias'
              onChange={this.handleChange}
              name='alias'
              value={this.state.alias}
            />
            {this.addButtonsToInput('alias')}
          </div>
          <div style={divStyle}>
            <Input
              label='Species'
              onChange={this.handleChange}
              name='species'
              value={this.state.species}
            />
            {this.addButtonsToInput('species')}
          </div>

          <div style={divStyle}>
            <Input
              label='Motto'
              onChange={this.handleChange}
              name='motto'
              value={this.state.motto}
            />
            {this.addButtonsToInput('motto')}
          </div>

          <div style={divStyle}>
            <Input
              label='Alignment'
              onChange={this.handleChange}
              name='alignment'
              value={this.state.alignment}
            />
            {this.addButtonsToInput('alignment')}
          </div>
          <div style={divStyle}>
            <Input
              label='Positive Traits'
              onChange={this.handleChange}
              name='traits_positive'
              value={this.state.traits_positive}
            />
            {this.addButtonsToInput('traits_positive')}
          </div>

          <div style={divStyle}>
            <Input
              label='Negative Traits'
              onChange={this.handleChange}
              name='traits_negative'
              value={this.state.traits_negative}
            />
            {this.addButtonsToInput('traits_negative')}
          </div>

          <div style={divStyle}>
            <Input
              label='Age'
              onChange={this.handleChange}
              name='age'
              value={this.state.age}
            />
            {this.addButtonsToInput('age')}
          </div>
          <div style={divStyle} />

          <div style={divStyle}>
            <Input
              label='Status'
              onChange={this.handleChange}
              name='status'
              value={this.state.status}
            />
            {this.addButtonsToInput('status')}
          </div>

          <div style={divStyle}>
            <Input
              label='Gender'
              onChange={this.handleChange}
              name='gender'
              value={this.state.gender}
            />

            {this.addButtonsToInput('gender')}
          </div>

          <div style={divStyle}>
            <Input
              label='Feats'
              onChange={this.handleChange}
              name='feats'
              value={this.state.feats}
            />
            {this.addButtonsToInput('feats')}
          </div>

          <div style={divStyle}>
            <Label size='large'>Bio</Label>
            <TextArea
              rows='5'
              label='Bio'
              onChange={this.handleChange}
              name='bio'
              value={this.state.bio}
            />
            {this.addButtonsToInput('bio')}
          </div>

          <hr />
          <Button color='green' fluid>
            {this.state.edit ? 'Update Character' : 'Create Character'}
          </Button>
        </Form>
      </Container>
    )
  }
}
export default CharacterCreateOrUpdate
