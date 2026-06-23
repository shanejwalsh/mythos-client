import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Menu } from 'semantic-ui-react';
import { debounce } from 'lodash';
import { NavbarIcon } from './NavbarIcon';

// Assets live in the client's public/ folder (served at the app root).
const PUBLIC_PATH = process.env.PUBLIC_URL;

class Navbar extends Component {
  state = { width: window.innerWidth, expanded: false };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, expanded: !this.state.expanded });

  componentDidMount = () =>
    window.addEventListener(
      'resize',
      debounce(this.handleWindowSizeChange, 100)
    );
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const isMobile = this.state.width <= 780;
    const { activeItem, expanded } = this.state;
    const showExpandedMenu = (isMobile && expanded) || !isMobile;

    return (
      <Menu
        style={{ borderRadius: 0, marginBottom: '2px' }}
        borderless
        inverted
        stackable
      >
        <Container>
          <Menu.Item as={Link} to="/">
            <img
              alt="logo"
              style={{ paddingRight: '3px' }}
              src={PUBLIC_PATH + '/icon.png'}
            />
            {isMobile && (
              <NavbarIcon
                handleClick={() =>
                  this.setState({ expanded: !this.state.expanded })
                }
                isExpanded={this.state.expanded}
              />
            )}
          </Menu.Item>

          {showExpandedMenu && (
            <Fragment>
              <Menu.Item
                name="about"
                active={activeItem === 'about'}
                onClick={this.handleItemClick}
                as={Link}
                to="/"
              >
                About
              </Menu.Item>
              <Menu.Item
                name="char-lib"
                active={activeItem === 'char-lib'}
                onClick={this.handleItemClick}
                as={Link}
                to="/characters"
              >
                Character Library
              </Menu.Item>
              <Menu.Item
                name="char-new"
                active={activeItem === 'char-new'}
                onClick={this.handleItemClick}
                as={Link}
                to="/characters/new"
              >
                Create Character
              </Menu.Item>
              {this.props.username && (
                <Menu.Item
                  name="account"
                  active={activeItem === 'account'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/my-account"
                >
                  My Account
                </Menu.Item>
              )}
              {!this.props.username ? (
                <Menu.Item position="right">
                  <Button as={Link} to="/login" inverted>
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    inverted
                    primary
                    style={{ marginLeft: '0.5em' }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              ) : (
                <Menu.Item position="right">
                  <Button onClick={this.props.logout} as={Link} to="/" inverted>
                    Log Out {this.props.username}
                  </Button>
                </Menu.Item>
              )}
            </Fragment>
          )}
        </Container>
      </Menu>
    );
  }
}

export default Navbar;
