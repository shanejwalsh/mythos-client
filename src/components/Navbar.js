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
    this.setState({ activeItem: name, expanded: false });

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

    return (
      <div style={{ position: 'relative' }}>
        <Menu
          style={{ borderRadius: 0, marginBottom: '2px' }}
          borderless
          inverted
        >
          <Container>
            <Menu.Item as={Link} to="/">
              <img
                alt="logo"
                style={{ paddingRight: '3px' }}
                src={PUBLIC_PATH + '/icon.png'}
              />
            </Menu.Item>

            {!isMobile && (
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

            {isMobile && (
              <Menu.Item position="right">
                <NavbarIcon
                  handleClick={() =>
                    this.setState({ expanded: !this.state.expanded })
                  }
                  isExpanded={expanded}
                />
              </Menu.Item>
            )}
          </Container>
        </Menu>

        {isMobile && expanded && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 100,
            }}
          >
            <Menu vertical fluid inverted style={{ margin: 0, borderRadius: 0 }}>
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
              <Menu.Item>
                {!this.props.username ? (
                  <div>
                    <Button
                      as={Link}
                      to="/login"
                      inverted
                      fluid
                      style={{ marginBottom: '0.5em' }}
                      onClick={() => this.setState({ expanded: false })}
                    >
                      Log in
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      inverted
                      primary
                      fluid
                      onClick={() => this.setState({ expanded: false })}
                    >
                      Sign Up
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => { this.props.logout(); this.setState({ expanded: false }); }}
                    as={Link}
                    to="/"
                    inverted
                    fluid
                  >
                    Log Out {this.props.username}
                  </Button>
                )}
              </Menu.Item>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
