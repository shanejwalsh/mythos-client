import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import AllCharactersContainer from "./containers/AllCharactersContainer";
import CharacterCreateOrUpdate from "./components/CharacterCreateOrUpdate";
import LoginForm from "./components/LoginForm";
import { MyAccountContainer } from "./containers/MyAccountContainer";
import { CharacterDetailsContainer } from "./containers/CharacterDetailsContainer";
import { SignUpForm } from "./components/SignUpForm";
import { validate, logoutUser } from "./api/API";
import { Footer } from "./components/Footer";
import { Unauthorised } from "./components/Unauthorised";

class App extends Component {
  state = { user: undefined, loading: true };

  setUser = ({ user }) => {
    const token = user.token || localStorage.getItem("token");
    localStorage.setItem("token", token);
    if (user.refresh_token) {
      localStorage.setItem("refresh_token", user.refresh_token);
    }
    this.setState({ user });
  };

  logout = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) logoutUser(refreshToken);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    this.setState({ user: undefined });
    this.props.history.push("/login");
  };

  componentDidMount() {
    const checkToken = async () => {
      if (localStorage.getItem("token")) {
        const userData = await validate();
        if (userData.error) {
          localStorage.removeItem("token");
          this.setState({ user: undefined });
        } else {
          this.setUser({ user: userData });
        }
      }
      this.setState({ loading: false });
    };

    checkToken();
  }

  render() {
    const user = this.state.user || {};

    return (
      <>
        <Navbar username={user.username} logout={this.logout} />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/characters" component={AllCharactersContainer} />
          <Route
            exact
            path="/characters/new"
            component={(routerProps) => (
              <CharacterCreateOrUpdate user_id={user.id} {...routerProps} />
            )}
          />
          <Route
            exact
            path="/characters/:id/edit"
            component={(routerProps) => (
              <CharacterCreateOrUpdate
                edit={true}
                user_id={user.id}
                {...routerProps}
              />
            )}
          />
          <Route
            path="/characters/:id"
            component={(routerProps) => {
              return (
                <CharacterDetailsContainer
                  {...routerProps}
                  user_id={user.id}
                  username={user.username}
                  id={routerProps.match.params.id}
                />
              );
            }}
          />
          <Route
            path="/my-account"
            component={(routerProps) => {
              if (!user.username) {
                return <Unauthorised />;
              }
              return (
                <MyAccountContainer
                  {...routerProps}
                  username={user.username}
                  createdAt={user.createdAt}
                />
              );
            }}
          />
          <Route
            path="/login"
            component={(routerProps) => (
              <LoginForm setUser={this.setUser} {...routerProps} />
            )}
          />
          <Route
            path="/signup"
            component={(routerProps) => (
              <SignUpForm setUser={this.setUser} {...routerProps} />
            )}
          />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
