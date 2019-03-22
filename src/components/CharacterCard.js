import React, { Fragment } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import { titleCase } from '../lib/Helper'

const CharacterCard = props => {
  const { id, first_name, last_name, bio, gender, species, alias } = props

  const footer = (
    <Fragment>
      <Icon name='user outline' />
      {`${titleCase(species)} ${gender === 'male' ? '♂' : '♀'}`}
    </Fragment>
  )

  return (
    <Card href={`characters/${id}`}>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={`https://avatars.dicebear.com/v2/${gender}/${id}.svg`}
        />
        <Card.Header>{`${first_name} ${last_name}`}</Card.Header>
        <Card.Meta>{`AKA '${alias}'`}</Card.Meta>
        <Card.Description>{bio}</Card.Description>
      </Card.Content>

      <Card.Content extra>{footer}</Card.Content>
    </Card>
  )
}
export default CharacterCard
