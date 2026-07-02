import { Grid, Placeholder, Segment } from "semantic-ui-react";

const ROWS = 4;
const COLUMNS = 4;

export function PlaceholderGrid({ rowCount = ROWS, columnCount = COLUMNS }) {
  return Array.from({ length: rowCount }).map((_, i) => (
    <Grid key={i} columns={columnCount} stackable>
      {Array.from({ length: columnCount }).map((_, j) => (
        <Grid.Column key={j}>
          <Segment raised>
            <Placeholder>
              <Placeholder.Header floated="right" image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line length="medium" />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Grid.Column>
      ))}
    </Grid>
  ));
}
