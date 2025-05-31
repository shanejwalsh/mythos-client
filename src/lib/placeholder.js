import React from 'react';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';

export const PlaceholderGrid = () =>
  [1, 2, 3, 4].map(i => (
    <Grid key={i} columns={4} stackable>
      {[1, 2, 3, 4].map(i => (
        <Grid.Column key={i}>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header floated='right' image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line length='medium' />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      ))}
    </Grid>
  ));
