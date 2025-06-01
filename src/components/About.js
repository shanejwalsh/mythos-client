import React from 'react';
import {
  Segment,
  Image,
  Header,
  Reveal,
  Container,
  Grid
} from 'semantic-ui-react';

// todo move to s3 and dont bundle with webpack

const PUBLIC_PATH = 'https://mythos-public-image-bucket.s3.eu-west-1.amazonaws.com';


const About = () => {
  return (
    <Container>
      <Segment style={{ paddingBottom: '60px' }} inverted textAlign='center'>
        <Header
          content='Welcome to'
          style={{
            fontSize: '2em',
            fontWeight: 'normal',
            marginBottom: 0
          }}
          as='h3'
          inverted
        />
        <Header
          style={{
            fontSize: '5em',
            fontWeight: 'bold',
            marginBottom: 0
          }}
          as='h1'
          inverted
        >
          <span style={{ color: '#54C8FF' }}>MY</span>
          THOS
        </Header>
        <Header
          as='h2'
          content='Create and manage your own universe of characters'
          inverted
        />
        <Container
          style={{
            margin: 'auto',
            width: '50%'
          }}
        >
          <Reveal animated='move'>
            <Reveal.Content visible>
              <Image size='large' src={PUBLIC_PATH + '/editor.png'} />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Image
                style={{
                  margin: 'auto',
                  width: '50%'
                }}
                size='small'
                src={PUBLIC_PATH + '/icon3.png'}
              />
            </Reveal.Content>
          </Reveal>
        </Container>
        <h3>Hover / tap the avatar builder to see what you can create!</h3>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Avatars can be exported as pure CSS to use in your own projects!
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                No images, imports or any fuss needed, copy the CSS, paste it
                and you're good to go!
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image
                bordered
                rounded
                size='large'
                src={PUBLIC_PATH + '/css.png'}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row />
        </Grid>
      </Segment>
      <Segment style={{ padding: '0em' }} vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Get Inspired
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                With 1000's of randomised character traits to build your fully
                customisable character!
              </p>
              <p style={{ fontSize: '1.33em' }}>
                All generated with a unique backstory, species, alias, traits
                and more.
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Image size='large' src={PUBLIC_PATH + '/random.png'} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment style={{ padding: '1em 0em' }} textAlign='center' vertical>
        <Grid celled='internally' columns='equal' stackable>
          <Grid.Row textAlign='center'>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Image size='large' src={PUBLIC_PATH + '/cards.png'} />
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                Curate Your Own Character Library
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Clone from the user generated public library or create your own.
                Keep track of all your characters adventures with your friends!
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};
export default About;
