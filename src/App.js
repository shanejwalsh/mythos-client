import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import CharacterIndex from './components/CharacterIndex'
import Navbar from './components/Navbar/ResponsiveNavbar'
import CharacterDetailsContainer from './containers/CharacterDetailsContainer'
import CharacterDetailsForm from './components/CharacterDetailsForm'
import About from './components/About'

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={About} />
          <Route exact path='/characters' component={CharacterIndex} />
          <Route
            exact
            path='/characters/new'
            component={CharacterDetailsForm}
          />
          <Route
            exact
            path='/characters/:id/edit'
            component={routerProps => <CharacterDetailsForm {...routerProps} />}
          />
          <Route
            path='/characters/:id'
            component={routerProps => {
              return (
                <CharacterDetailsContainer id={routerProps.match.params.id} />
              )
            }}
          />
        </Switch>
      </Fragment>
    )
  }
}

export default App
