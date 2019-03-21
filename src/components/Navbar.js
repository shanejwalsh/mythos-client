import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import {
  Icon,
  Container,
  Button,
  Menu,
  Segment,
  Visibility,
  Header
} from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  headerText = () => {
    return (
      <Container
        style={{
          padding: '2em 0em'
        }}
        text
      >
        <Header
          content='Welcome to'
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0
          }}
          as='h3'
          inverted
        />
        <Header
          content='MYTHOS'
          style={{
            fontSize: '7em',
            fontWeight: 'bold',
            marginBottom: 0
          }}
          as='h1'
          inverted
          color='blue'
        />
        <Header
          as='h2'
          content='Create and manage a universe of characters'
          inverted
        />
        <Button primary size='huge'>
          Get Started
          <Icon name='right arrow' />
        </Button>
      </Container>
    )
  }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state

    return (
      <Visibility
        once={false}
        onBottomPassed={this.showFixedMenu}
        onBottomPassedReverse={this.hideFixedMenu}
      >
        <Segment
          inverted
          textAlign='center'
          style={{ height: '100vh', padding: '1em 0em' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
              <Menu.Item active>
                <NavLink to='/' exact>
                  About
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to='/characters' exact>
                  Charcter Library
                </NavLink>
              </Menu.Item>
              <Menu.Item>
                <NavLink to='/account' exact>
                  My Account
                </NavLink>
              </Menu.Item>

              <Menu.Item position='right'>
                <Button inverted={!fixed}>Log in</Button>
                <Button
                  inverted={!fixed}
                  primary={fixed}
                  style={{ marginLeft: '0.5em' }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Container>
          </Menu>
          {this.headerText()}
        </Segment>
      </Visibility>
    )
  }
}
export default Navbar
