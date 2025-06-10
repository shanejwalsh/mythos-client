import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import AllCharactersContainer from './containers/AllCharactersContainer';
import CharacterCreateOrUpdate from './components/CharacterCreateOrUpdate';
import LoginForm from './components/LoginForm';
import { MyAccountContainer } from './containers/MyAccountContainer';
import CharacterDetailsContainer from './containers/CharacterDetailsContainer';
import SignUpForm from './components/SignUpForm';
import { validate } from './api/API';
import { Unauthorised } from './components/Unauthorised';

class App extends Component {
  state = { user: undefined, loading: true };

  setUser = ({ user }) => {
    const token = user.token || localStorage.getItem('token');
    localStorage.setItem('token', token);
    this.setState({ user });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ user: undefined });
    // this.props.history.push('/login');
  };

  componentDidMount() {
    validate().then((userData) => {
      if (userData.error) {
        this.logout();
      } else {
        this.setUser({ user: userData });
      }
    });

    this.setState({ loading: false });
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
                <MyAccountContainer {...routerProps} username={user.username} />
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
            component={(routerProps) => <SignUpForm {...routerProps} />}
          />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
