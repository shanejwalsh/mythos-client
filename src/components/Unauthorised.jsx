import React from 'react';

import {
  Button,
  Header,
  Icon,
  Segment,

} from "semantic-ui-react";

import { Link } from "react-router-dom";

export function Unauthorised() {


  return (
    <Segment inverted textAlign='center' placeholder>
      <Header icon>
        <Icon size='massive' name='user close' />
        You need to be logged in to view your account!
      </Header>
      <p>It only takes 2 minutes to sign up and get started!</p>
      <Button as={Link} to='/login' inverted>
        Login
      </Button>
      or
      <Button as={Link} to='/signup' primary>
        Signup
      </Button>
    </Segment>
  );

}