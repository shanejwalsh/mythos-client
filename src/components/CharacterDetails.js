import React, { Component } from "react"
import { Container, Button } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { titleCase } from "../lib/Helper.js"

class CharacterDetails extends Component {
  render() {
    const {
      id,
      first_name,
      last_name,
      alias,
      motto,
      bio,
      alignment,
      age,
      status,
      gender,
      species,
      traits_positive,
      traits_negative
    } = this.props.character

    return (
      <Container>
        <Link to='/characters'>Back to all Characters</Link>
        <h1>
          {first_name} {last_name} ({gender})
        </h1>
        <p>
          <b>Also known as:</b> {alias} <br />
          <b>Motto:</b> {motto} <br />
          <b>Species: </b> {titleCase(species)} <br />
          <b>Age: </b> {age} <br />
          <b>Status: </b> {status} <br />
          <b>Alignment: </b> {titleCase(alignment)} <br />
          <br />
          <b>Bio: </b> {bio} <br />
          <br />
          <b>Positive Traits: </b>
          {traits_positive}
          {/* <ul>
            {traits_positive.split(',').map(trait => (
              <li>{trait}</li>
            ))}
          </ul> */}
          <br />
          <b>Negative Traits: </b>
          {traits_negative}
          <br />
        </p>
        <Button as={Link} onClick={() => console.log(id)}>
          Edit Character
        </Button>
      </Container>
    )
  }
}

export default CharacterDetails
