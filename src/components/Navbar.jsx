import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Menu } from "semantic-ui-react";
import { debounce } from "lodash";
import { NavbarIcon } from "./NavbarIcon";

import Icon from "../images/icon.png";

export function Navbar(props) {
  const [width, setWidth] = useState(window.innerWidth);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const isMobile = width <= 780;

  function handleItemClick(e, { name }) {
    setActiveItem(name);
    setIsExpanded(false);
  }

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);

      window.addEventListener("resize", debounce(handleWindowSizeChange, 100));
      return () => window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Menu
        style={{ borderRadius: 0, marginBottom: "2px" }}
        borderless
        inverted
      >
        <Container>
          <Menu.Item as={Link} to="/">
            <img alt="logo" style={{ paddingRight: "3px" }} src={Icon} />
          </Menu.Item>

          {!isMobile && (
            <>
              <Menu.Item
                name="about"
                active={activeItem === "about"}
                onClick={handleItemClick}
                as={Link}
                to="/"
              >
                About
              </Menu.Item>
              <Menu.Item
                name="char-lib"
                active={activeItem === "char-lib"}
                onClick={handleItemClick}
                as={Link}
                to="/characters"
              >
                Character Library
              </Menu.Item>
              <Menu.Item
                name="char-new"
                active={activeItem === "char-new"}
                onClick={handleItemClick}
                as={Link}
                to="/characters/new"
              >
                Create Character
              </Menu.Item>
              {props.username && (
                <Menu.Item
                  name="account"
                  active={activeItem === "account"}
                  onClick={handleItemClick}
                  as={Link}
                  to="/my-account"
                >
                  My Account
                </Menu.Item>
              )}
              {!props.username ? (
                <Menu.Item position="right">
                  <Button as={Link} to="/login" inverted>
                    Log in
                  </Button>
                  <Button
                    as={Link}
                    to="/signup"
                    inverted
                    primary
                    style={{ marginLeft: "0.5em" }}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              ) : (
                <Menu.Item position="right">
                  <Button onClick={props.logout} as={Link} to="/" inverted>
                    Log Out {props.username}
                  </Button>
                </Menu.Item>
              )}
            </>
          )}

          {isMobile && (
            <Menu.Item position="right">
              <NavbarIcon
                handleClick={() => setIsExpanded((prev) => !prev)}
                isExpanded={isExpanded}
              />
            </Menu.Item>
          )}
        </Container>
      </Menu>

      {isMobile && isExpanded && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <Menu vertical fluid inverted style={{ margin: 0, borderRadius: 0 }}>
            <Menu.Item
              name="about"
              active={activeItem === "about"}
              onClick={handleItemClick}
              as={Link}
              to="/"
            >
              About
            </Menu.Item>
            <Menu.Item
              name="char-lib"
              active={activeItem === "char-lib"}
              onClick={handleItemClick}
              as={Link}
              to="/characters"
            >
              Character Library
            </Menu.Item>
            <Menu.Item
              name="char-new"
              active={activeItem === "char-new"}
              onClick={handleItemClick}
              as={Link}
              to="/characters/new"
            >
              Create Character
            </Menu.Item>
            {props.username && (
              <Menu.Item
                name="account"
                active={activeItem === "account"}
                onClick={handleItemClick}
                as={Link}
                to="/my-account"
              >
                My Account
              </Menu.Item>
            )}
            <Menu.Item>
              {!props.username ? (
                <div>
                  <Button
                    as={Link}
                    to="/login"
                    inverted
                    fluid
                    style={{ marginBottom: "0.5em" }}
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
                  onClick={() => {
                    props.logout();
                    setIsExpanded(false);
                  }}
                  as={Link}
                  to={"/"}
                  inverted
                  fluid
                >
                  Log Out {props.username}
                </Button>
              )}
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
}
