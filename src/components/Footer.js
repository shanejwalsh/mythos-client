import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Grid, List, Header } from 'semantic-ui-react';

const Footer = () => (
  <Segment inverted vertical style={{ padding: '3em 0em', marginTop: '4em' }}>
    <Container>
      <Grid inverted stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Header inverted as="h4">
              <span style={{ color: '#54C8FF' }}>MY</span>THOS
            </Header>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>
              Create and manage your own universe of characters.
            </p>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Explore" />
            <List inverted link>
              <List.Item as={Link} to="/">About</List.Item>
              <List.Item as={Link} to="/characters">Character Library</List.Item>
              <List.Item as={Link} to="/characters/new">Create Character</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as="h4" content="Account" />
            <List inverted link>
              <List.Item as={Link} to="/login">Log In</List.Item>
              <List.Item as={Link} to="/signup">Sign Up</List.Item>
              <List.Item as={Link} to="/my-account">My Account</List.Item>
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column textAlign="center">
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9em' }}>
              © {new Date().getFullYear()} Mythos. All rights reserved.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export default Footer;
