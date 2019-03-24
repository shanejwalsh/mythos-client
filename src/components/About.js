import React from 'react'
import { Segment, Header, Button, Icon } from 'semantic-ui-react'

const About = props => {
  return (
    <Segment
      textAlign='center'
      style={{ height: '100%', padding: '0 0' }}
      inverted
    >
      <Header
        content='Welcome to'
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0
        }}
        as='h3'
        inverted
      />
      <Header
        content='MYTHOS'
        style={{
          fontSize: '7em',
          fontWeight: 'bold',
          marginBottom: 0
        }}
        as='h1'
        inverted
        color='blue'
      />
      <Header
        as='h2'
        content='Create and manage a universe of characters'
        inverted
      />
      <Button primary size='huge'>
        Get Started
        <Icon name='right arrow' />
      </Button>
    </Segment>
  )
}
export default About
