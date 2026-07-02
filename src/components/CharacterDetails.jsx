import { Container, Button, Icon } from "semantic-ui-react";
import { titleCase } from "../lib/helper";
import { Link } from "react-router-dom";
import { cloneCharacter } from "../api/API";

export function CharacterDetails(props) {
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
    species,
    traits_positive,
    traits_negative,
    user,
  } = props.character;

  async function handleClone() {
    const resp = await cloneCharacter(
      this.props.character.id,
      this.props.user_id,
    );

    if (resp.error) {
      return alert("Something went wrong during cloning");
    }
    alert("Character Cloned to your library!!");
  }

  return (
    <Container>
      <h1>
        {first_name} {last_name}
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
        <br />
        <b>Negative Traits: </b>
        {traits_negative}
        <br />
      </p>

      {props.user_id && props.username !== user.username && (
        <Button
          onClick={() => handleClone()}
          content="Clone To My Account"
          icon="copy"
          fluid
          color="violet"
        />
      )}

      {!props.user_id && (
        <Button
          content="Clone To My Account"
          icon="copy"
          fluid
          color="violet"
          label={{
            basic: true,
            color: "red",
            pointing: "left",
            content: "create an account / sign in to clone characters",
          }}
          disabled
        />
      )}

      {props.editable && (
        <div style={{ display: "flex", gap: "0.5em", marginTop: "1em" }}>
          <Button
            as={Link}
            to={`/characters/${id}/edit`}
            icon
            labelPosition="left"
            style={{ flex: 1 }}
          >
            <Icon name="edit outline" />
            Edit Character
          </Button>
          <Button
            negative
            icon
            labelPosition="left"
            onClick={props.onDeleteRequest}
            style={{ flex: 1 }}
          >
            <Icon name="trash alternate outline" />
            Delete
          </Button>
        </div>
      )}
    </Container>
  );
}
