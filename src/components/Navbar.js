import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  Button,
  Menu,
  Segment,
  Visibility,
  Responsive
} from 'semantic-ui-react'

class Navbar extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state
    const getWidth = () => {
      const isSSR = typeof window === 'undefined'
      return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
    }

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ height: '75px' }}
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
                <Menu.Item as={Link} to='/' active>
                  About
                </Menu.Item>
                <Menu.Item as={Link} to='/characters'>
                  Character Library
                </Menu.Item>
                <Menu.Item as={Link} to='/characters/new'>
                  Create Character
                </Menu.Item>
                <Menu.Item as={Link} to='/characters/new'>
                  My Account
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
          </Segment>
        </Visibility>
      </Responsive>
    )
  }
}
export default Navbar
