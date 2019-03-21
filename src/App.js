import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import CharacterIndex from './components/CharacterIndex'
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Navbar} />
        <Route exact path='/characters' component={CharacterIndex} />
      </Router>
    )
  }
}

export default App
