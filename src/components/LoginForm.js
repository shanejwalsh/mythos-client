import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  Header,
  Message,
  Segment,
  Container,
  Grid
} from 'semantic-ui-react';
import { loginUser } from '../api/API';
class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    const { setUser, history } = this.props;
    const user = {
      username: '@' + this.state.username,
      password: this.state.password
    };

    loginUser(user).then(userData => {
      if (userData.error) {
        alert('something went wrong');
      } else {

        console.log({ userData });
        setUser(userData);
        history.push('/my-account');
      }
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <Container
        textAlign='center'
        style={{ paddingTop: '20px', height: '90%' }}
      >
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              Log-in to your account
            </Header>

            <Form onSubmit={this.handleSubmit} size='large'>
              <Segment stacked>
                <Form.Input
                  autoComplete='username'
                  fluid
                  value={username}
                  onChange={this.handleChange}
                  icon='at'
                  iconPosition='left'
                  placeholder='e.g. my-username'
                  name='username'
                />
                <Form.Input
                  autoComplete='current-password'
                  fluid
                  value={password}
                  onChange={this.handleChange}
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  name='password'
                />

                <Button color='blue' fluid size='large'>
                  Login
                </Button>
              </Segment>
            </Form>
            <Segment basic>
              <Message color='blue' as={Link} to='/signup'>
                Not got an account? Take 20 seconds to Sign Up!
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default LoginForm;
