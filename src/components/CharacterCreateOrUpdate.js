import React from 'react';
import {
  Form,
  Button,
  Input,
  Container,
  TextArea,
  Message
} from 'semantic-ui-react';
import { GRID_SIZE } from '../config/config';
import { generateCSS } from '../lib/helper';
import { createCharacter, generateAttribute, generateNewCharacter, getCharacterById, updateCharacter } from '../api/API';

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
  };
};

class CharacterCreateOrUpdate extends React.Component {
  state = {
    ...getInitialState(),
    loading: true,
    submitting: false,
    error: null,
  };

  validate = () => {
    const fields = [
      'first_name', 'last_name', 'alias', 'motto', 'species', 'bio',
      'alignment', 'traits_positive', 'traits_negative', 'age',
      'gender', 'status', 'feats'
    ];
    for (const field of fields) {
      if (String(this.state[field]).trim().length === 0) return false;
    }
    if (this.state.sprite_data.length === 0) return false;
    return true;
  };

  handleSubmit = () => {
    if (!this.validate()) {
      this.setState({ error: 'No fields can be left empty.' });
      return;
    }
    this.setState({ submitting: true, error: null });
    if (this.state.edit) {
      updateCharacter(this.state)
        .then(data => {
          this.setState({ submitting: false });
          if (data.error) {
            this.setState({ error: 'Something went wrong, character not updated.' });
          } else {
            this.props.history.push('/my-account');
          }
        })
        .catch(() => this.setState({ submitting: false, error: 'Network error. Please try again.' }));
    } else {
      createCharacter(this.state)
        .then(data => {
          this.setState({ submitting: false });
          if (data.error) {
            this.setState({ error: 'Something went wrong, character not created.' });
          } else {
            this.setState(getInitialState());
            this.props.history.push(`/characters/${data.id}`);
          }
        })
        .catch(() => this.setState({ submitting: false, error: 'Network error. Please try again.' }));
    }
  };

  componentDidMount = () => {
    if (this.props.user_id) {
      this.setState({ user_id: this.props.user_id });
    } else {
      this.setState({ user_id: 1 }); // If not signed in create as guest
    }

    if (this.props.match.path.includes('edit')) {
      getCharacterById(this.props.match.params.id).then(character =>
        this.setState({ ...character, edit: true, loading: false })
      );
    } else {
      Promise.all([
        new Promise(r => setTimeout(r, 3000)),
        generateNewCharacter()
      ]).then(([, character]) => {
        const updates = {};
        Object.keys(character).forEach(attribute => {
          if (this.state.unlockedAttributes.includes(attribute)) {
            updates[attribute] = character[attribute];
          }
        });
        this.setState({ ...updates, edit: false, loading: false });
      });
    }
  };

  randomizeUnlockedAttributes = () =>
    generateNewCharacter().then(character =>
      Object.keys(character).map(attribute =>
        this.state.unlockedAttributes.includes(attribute)
          ? this.setState({ [attribute]: character[attribute] })
          : null
      )
    );

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleRandomAttribute = event => {
    event.persist();
    generateAttribute(event.target.id).then(attribute =>
      this.setState({ ...attribute })
    );
  };

  handleLockAttribute = event => {
    event.persist();
    if (!this.state.unlockedAttributes.includes(event.target.id)) {
      this.setState({
        unlockedAttributes: [...this.state.unlockedAttributes, event.target.id]
      });
    } else {
      this.setState({
        unlockedAttributes: this.state.unlockedAttributes.filter(
          attribute => attribute !== event.target.id
        )
      });
    }
  };

  addButtonsToInput = attribute => {
    const locked = this.state.unlockedAttributes.includes(attribute);
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
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '120px' }}>
          <p style={{ fontSize: '1.2em', color: '#888' }}>Conjuring your character...</p>
        </div>
      );
    }

    const divStyle = {
      width: '90%',
      margin: '10px auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    };

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

        <Button
          fluid
          onClick={this.randomizeUnlockedAttributes}
          content='Randomize Unlocked Attributes'
          icon='random'
          color='violet'
        />

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
            <div className="ui labeled input" style={{ flex: 1, alignItems: 'flex-start' }}>
              <div className="ui label" style={{ paddingTop: '10px' }}>Bio</div>
              <TextArea
                rows='5'
                onChange={this.handleChange}
                name='bio'
                value={this.state.bio}
                style={{
                  borderRadius: '0 4px 4px 0',
                  border: '1px solid rgba(34,36,38,.15)',
                  width: '100%'
                }}
              />
            </div>
            {this.addButtonsToInput('bio')}
          </div>

          <hr />

          {this.state.error && (
            <Message negative content={this.state.error} />
          )}

          <Button
            color='green'
            fluid
            loading={this.state.submitting}
            disabled={this.state.submitting}
          >
            {this.state.edit ? 'Update Character' : 'Create Character'}
          </Button>
        </Form>
      </Container>
    );
  }
}
export default CharacterCreateOrUpdate;
