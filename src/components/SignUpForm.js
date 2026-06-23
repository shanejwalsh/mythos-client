import React, { Component } from 'react';
import { Segment, Form, Image, Button, Container, Message } from 'semantic-ui-react';
import { signUp } from '../api/API';

const PUBLIC_PATH = process.env.PUBLIC_URL;

class SignUpForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    error: null,
    loading: false,
  };

  handleChange = (event) =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = () => {
    const { history } = this.props;
    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: 'Passwords do not match.' });
      return;
    }

    const user = {
      username: '@' + username,
      password,
    };

    this.setState({ loading: true, error: null });

    signUp(user)
      .then((data) => {
        if (data.error) {
          const message = data.details ? data.details.join(', ') : data.error;
          this.setState({ error: message, loading: false });
        } else {
          history.push('/login');
        }
      })
      .catch(() => {
        this.setState({
          error: 'Unable to reach the server. Please try again.',
          loading: false,
        });
      });
  };

  render() {
    const { username, password, confirmPassword, error, loading } = this.state;

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

          {error && <Message negative content={error} />}

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
              <Form.Input
                autoComplete="new-password"
                fluid
                value={confirmPassword}
                onChange={this.handleChange}
                icon="lock"
                iconPosition="left"
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                error={confirmPassword.length > 0 && password !== confirmPassword}
              />

              <Button
                type="submit"
                color="black"
                fluid
                size="large"
                loading={loading}
                disabled={loading}
              >
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
