import React, { Component } from 'react'
import {
  Button,
  Form,
  Header,
  Message,
  Segment,
  Container,
  Grid
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
    const user = {
      username: '@' + this.state.username,
      password: this.state.password
    }
    API.login(user).then(data => {
      if (data.error) {
        alert('somthing went wrong')
      } else {
        login(data)
        history.push('/myaccount')
      }
    })
  }

  render() {
    const { username, password } = this.state

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
                  placeholder='@Username'
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
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default LoginForm
