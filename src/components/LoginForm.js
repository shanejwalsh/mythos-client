import React, { Component } from 'react'
import {
  Button,
  Form,
  Header,
  Message,
  Segment,
  Container
} from 'semantic-ui-react'
import API from '../adapters/API'

class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value })

  handleSubmit = () => {
    const { login, history } = this.props
    const user = this.state

    API.login(user).then(data => {
      if (data.error) {
        alert('somthing went wrong')
      } else {
        login(data)
        history.push('/characters')
      }
    })
  }

  render() {
    const { username, password } = this.state

    return (
      <Container
        textAlign='center'
        style={{ height: '90%', maxWidth: '200px' }}
      >
        <Header as='h2' color='blue' textAlign='center'>
          Log-in to your account
        </Header>

        <Form onSubmit={this.handleSubmit} size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              value={username}
              onChange={this.handleChange}
              icon='at'
              iconPosition='left'
              placeholder='@Username'
              name='username'
            />
            <Form.Input
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
        <Message>
          New to us? <a href='#'>Sign Up</a>
        </Message>
      </Container>
    )
  }
}

export default LoginForm
