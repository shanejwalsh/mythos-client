import React from 'react'
import { Segment, Header, Button, Icon } from 'semantic-ui-react'

const About = () => {
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
        style={{
          fontSize: '7em',
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
