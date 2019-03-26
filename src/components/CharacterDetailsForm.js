import React, { Fragment } from "react"
import { Form, Button, Input, Container } from "semantic-ui-react"
import API from "../adapters/API"

export default class CharacterDetailsForm extends React.Component {
  state = {
    user_id: 1,
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
    gender: "",
    status: "",
    feats: "",
    edit: true,
    unlockedAttributes: [
      "first_name",
      "last_name",
      "alias",
      "motto",
      "species",
      "bio",
      "alignment",
      "traits_positive",
      "traits_negative",
      "age",
      "status",
      "feats",
      "gender"
    ]
  }

  handleSubmit = () => {
    if (this.state.edit) {
      API.updateCharacter(this.state)
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
      this.randomizeUnlockedAttributes()
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
    return (
      <Fragment>
        <Button attached='right'>
          <i
            id={`${attribute}`}
            className='random icon'
            onClick={this.handleRandomAttribute}
            icon='random'
          />
        </Button>

        <Button attached='right'>
          <i
            className={
              this.state.unlockedAttributes.includes(attribute)
                ? "lock open icon"
                : "lock closed icon"
            }
            id={`${attribute}`}
            onClick={this.handleLockAttribute}
            icon='lock'
          />
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
            onClick={this.randomizeUnlockedAttributes}
            content='Randomize'
            icon='random'
            color='violet'
          />
        ) : null}
        <hr />
        <Form onSubmit={this.handleSubmit}>
          <div>
            <Input
              label='First Name'
              onChange={this.handleChange}
              name='first_name'
              value={this.state.first_name}
            />
            {this.addButtonsToInput("first_name")}
          </div>
          <div>
            <Input
              label='Last Name'
              onChange={this.handleChange}
              name='last_name'
              value={this.state.last_name}
            />
            {this.addButtonsToInput("last_name")}
          </div>
          <div>
            <Input
              label='Species'
              onChange={this.handleChange}
              name='species'
              value={this.state.species}
            />
            {this.addButtonsToInput("species")}
          </div>
          <div>
            <Input
              label='Alias'
              onChange={this.handleChange}
              name='alias'
              value={this.state.alias}
            />
            {this.addButtonsToInput("alias")}
          </div>
          <div>
            <Input
              label='Motto'
              onChange={this.handleChange}
              name='motto'
              value={this.state.motto}
            />
            {this.addButtonsToInput("motto")}
          </div>
          <Input
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
