import React, { Component } from 'react'

class CharacterCard extends Component {
  render() {
    const { first_name, last_name, bio, gender } = this.props

    return (
      <div>
        <h3>
          {first_name} {last_name} ({gender})
        </h3>
        <p>{bio}</p>
        <hr />
      </div>
    )
  }
}

export default CharacterCard
