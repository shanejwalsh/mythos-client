import React, { Component, Fragment } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import API from './adapters/API'
import About from './components/About'
import AllCharactersContainer from './containers/AllCharactersContainer'
import CharacterCreateOrUpdate from './components/CharacterCreateOrUpdate'
import LoginForm from './components/LoginForm'
import MyAccountContainer from './containers/MyAccountContainer'
import CharacterDetailsContainer from './containers/CharacterDetailsContainer'

class App extends Component {
  state = { username: '' }

  login = user => {
    localStorage.setItem('token', user.token)
    this.setState({ username: user.username })
  }

  logout = () => {
    localStorage.removeItem('token')
    this.setState({ username: '' })
  }

  componentDidMount() {
    API.validate().then(userData => {
      if (userData.error) {
        this.logout()
      } else {
        this.login(userData)
        this.props.history.push('/characters')
      }
    })
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
            component={CharacterCreateOrUpdate}
          />
          <Route
            exact
            path='/characters/:id/edit'
            component={routerProps => (
              <CharacterCreateOrUpdate {...routerProps} />
            )}
          />
          <Route
            path='/characters/:id'
            component={routerProps => {
              return (
                <CharacterDetailsContainer id={routerProps.match.params.id} />
              )
            }}
          />
          <Route
            path='/myaccount'
            component={routerProps => {
              return (
                <MyAccountContainer
                  {...routerProps}
                  username={this.state.username}
                />
              )
            }}
          />
          <Route
            path='/login'
            component={routerProps => (
              <LoginForm login={this.login} {...routerProps} />
            )}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
