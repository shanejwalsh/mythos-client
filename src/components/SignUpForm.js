import React, { Component } from 'react';
import { Segment, Form, Image, Button, Container } from 'semantic-ui-react';
import { signUp } from '../api/API';
// import API from "../api/API";

const PUBLIC_PATH =
  'https://mythos-public-asset-bucket.s3.us-east-1.amazonaws.com';
class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
  };
  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    const { history } = this.props;
    const user = {
      username: '@' + this.state.username,
      password: this.state.password,
    };

    signUp(user).then((data) => {
      if (data.error) {
        alert('something went wrong');
      } else {
        alert('User added, sign in to get cracking!');
        history.push('/login');
      }
    });
  };

  render() {
    const { username, password } = this.state;

    return (
      <Container>
        <Segment inverted color="blue" textAlign="center" placeholder>
          <Image
            centered
            size="small"
            src={PUBLIC_PATH + '/icon2.png'}
            alt="skeleton"
          />
          <h1>Build Your Fantasy Universe</h1>
          <p>
            Sign up to save your characters to your own profile, edit them and
            keep track of thier adventures!
          </p>

          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                autoComplete="username"
                fluid
                value={username}
                onChange={this.handleChange}
                icon="at"
                iconPosition="left"
                placeholder="Username"
                name="username"
              />
              <Form.Input
                autoComplete="new-password"
                fluid
                value={password}
                onChange={this.handleChange}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                name="password"
              />

              <Button color="black" fluid size="large">
                Sign Up
              </Button>
            </Segment>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default SignUpForm;
