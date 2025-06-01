import React from 'react';

import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react';

import { Link } from "react-router-dom";

export function EmptyAccount() {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>
        Looks like you haven't created any characters yet!
      </h1>
      <Segment placeholder>
        <Grid columns={2} stackable textAlign="center">
          <Divider vertical>Or</Divider>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <Header icon>
                <Icon name="grid layout" />
                Clone one from the library
              </Header>
              <Button as={Link} to="/characters" primary>
                Take Me There!
              </Button>
            </Grid.Column>

            <Grid.Column>
              <Header icon>
                <Icon color="blue" name="add circle" />
                Create your own!
              </Header>
              <Button as={Link} to="/characters/new" secondary>
                Create
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
  // );
}
