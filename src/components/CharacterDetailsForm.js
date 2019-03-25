import React, { Fragment } from "react"
import { Form, Button, Input, Container } from "semantic-ui-react"
import API from "../adapters/API"

export default class CharacterDetailsForm extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    alias: "",
    motto: "",
    species: "",
    bio: "",
    alignment: "",
    traits_positive: "",
    traits_negative: "",
    age: "",
    status: "",
    feats: "",
    edit: true
  }

  handleSubmit = () => {
    if (this.state.edit) {
      API.updateCharacter(this.props.match.params.id, this.state)
    } else {
      API.createCharacter(this.state)
      alert("char created BOIIIIIIII!")
    }
  }

  componentDidMount = () => {
    if (this.props.match.path.includes("edit")) {
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

  handleRandomAttribute = event => {
    API.generateAttribute(event.target.id).then(attribute =>
      this.setState({ ...attribute })
    )
  }

  addButtonsToInput = attribute => {
    return (
      <Fragment>
        <Button onClick={this.handleRandomAttribute} icon attached='right'>
          <i id={`${attribute}`} class='random icon' />
        </Button>
        <Button animate='fade' icon attached='right'>
          <Button.Content visable>
            <i class='lock open icon' />
          </Button.Content>
        </Button>
      </Fragment>
    )
  }

  render() {
    return (
      <Container>
        <h1>{this.state.edit ? "Edit Character " : "Create Character"}</h1>
        {!this.state.edit ? (
          <Button
            onClick={this.randomizeAll}
            content='Randomize'
            icon='random'
            color='violet'
          />
        ) : null}
        <hr />
        <Form class='ui form' onSubmit={this.handleSubmit}>
          <Input
            label='First Name'
            onChange={this.handleChange}
            name='first_name'
            value={this.state.first_name}
          />
          {this.addButtonsToInput("first_name")}

          <Input
            label='Last Name'
            onChange={this.handleChange}
            name='last_name'
            value={this.state.last_name}
          />
          {this.addButtonsToInput("last_name")}
          <Input
            label='Species'
            onChange={this.handleChange}
            name='species'
            value={this.state.species}
          />
          {this.addButtonsToInput("species")}
          <Input
            label='Alias'
            onChange={this.handleChange}
            name='alias'
            value={this.state.alias}
          />
          {this.addButtonsToInput("alias")}
          <Input
            label='Motto'
            onChange={this.handleChange}
            name='motto'
            value={this.state.motto}
          />
          {this.addButtonsToInput("motto")}
          <Input
            type='textarea'
            label='Bio'
            onChange={this.handleChange}
            name='bio'
            value={this.state.bio}
          />
          {this.addButtonsToInput("bio")}
          <Input
            label='Alignment'
            onChange={this.handleChange}
            name='alignment'
            value={this.state.alignment}
          />
          {this.addButtonsToInput("alignment")}
          <Input
            label='Positive Traits'
            onChange={this.handleChange}
            name='traits_positive'
            value={this.state.traits_positive}
          />
          {this.addButtonsToInput("traits_positive")}
          <Input
            label='Negative Traits'
            onChange={this.handleChange}
            name='traits_negative'
            value={this.state.traits_negative}
          />
          {this.addButtonsToInput("traits_negative")}
          <Input
            label='Age'
            onChange={this.handleChange}
            name='age'
            value={this.state.age}
          />
          {this.addButtonsToInput("age")}
          <Input
            label='Status'
            onChange={this.handleChange}
            name='status'
            value={this.state.status}
          />
          {this.addButtonsToInput("status")}
          <Input
            label='Gender'
            onChange={this.handleChange}
            name='gender'
            value={this.state.gender}
          />
          {this.addButtonsToInput("gender")}
          <Input
            label='Feats'
            onChange={this.handleChange}
            name='feats'
            value={this.state.feats}
          />
          {this.addButtonsToInput("feats")}
          <hr />
          <Button color='green' fluid>
            {this.state.edit ? "Update Character" : "Create Character"}
          </Button>
        </Form>
      </Container>
    )
  }
}
