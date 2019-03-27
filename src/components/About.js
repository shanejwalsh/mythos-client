import React from 'react'
import { Segment, Image, Header, Reveal, Container } from 'semantic-ui-react'

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
              <Image size='large' src={require('../editor.png')} />
            </Reveal.Content>
            <Reveal.Content hidden>
              <Image
                style={{
                  margin: 'auto',
                  width: '50%'
                }}
                size='small'
                src={require('../icon3.png')}
              />
            </Reveal.Content>
          </Reveal>
        </Container>
        <h3>Hover / tap the avatar builder to see what you can create!</h3>
      </Segment>
    </Container>
  )
}
export default About
