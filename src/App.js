import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import AllCharactersContainer from './containers/AllCharactersContainer';
import CharacterCreateOrUpdate from './components/CharacterCreateOrUpdate';
import LoginForm from './components/LoginForm';
import MyAccountContainer from './containers/MyAccountContainer';
import CharacterDetailsContainer from './containers/CharacterDetailsContainer';
import SignUpForm from './components/SignUpForm';
import { validate } from './api/API';

class App extends Component {
  state = { username: '', id: '' };

  setUser = (user) => {
    localStorage.setItem('token', user.token);
    this.setState({ username: user.username, id: user.id });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState({ username: '', id: '' });
  };
  componentDidMount() {
    validate().then(userData => {
      if (userData.error) {
        this.logout();
      } else {
        this.login(userData);
      }
    });
  }

  render() {
    return (
      <Fragment>
        <Navbar username={this.state.username} logout={this.logout} />
        <Switch>
          <Route exact path='/' component={About} />
          <Route exact path='/characters' component={AllCharactersContainer} />
          <Route
            exact
            path='/characters/new'
            component={routerProps => (
              <CharacterCreateOrUpdate
                user_id={this.state.id}
                {...routerProps}
              />
            )}
          />
          <Route
            exact
            path='/characters/:id/edit'
            component={routerProps => (
              <CharacterCreateOrUpdate
                edit={true}
                user_id={this.state.id}
                {...routerProps}
              />
            )}
          />
          <Route
            path='/characters/:id'
            component={routerProps => {
              return (
                <CharacterDetailsContainer
                  {...routerProps}
                  user_id={this.state.id}
                  username={this.state.username}
                  id={routerProps.match.params.id}
                />
              );
            }}
          />
          <Route
            path='/my-account'
            component={routerProps => {
              return (
                <MyAccountContainer
                  {...routerProps}
                  username={this.state.username}
                />
              );
            }}
          />
          <Route
            path='/login'
            component={routerProps => (
              <LoginForm setUser={this.setUser} {...routerProps} />
            )}
          />
          <Route
            path='/signup'
            component={routerProps => <SignUpForm {...routerProps} />}
          />
        </Switch>
      </Fragment>
    );
  }
}

export default withRouter(App);
