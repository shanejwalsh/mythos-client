import React, { Fragment } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { titleCase } from '../lib/helper'
import { Link } from 'react-router-dom'
import { generateCSS } from '../lib/helper'
import { GRID_SIZE } from '../config/config'

const CharacterCard = props => {
  const {
    id,
    first_name,
    last_name,
    bio,
    gender,
    species,
    alias,
    sprite_data
  } = props

  const footer = (
    <Fragment>
      <Icon name='user outline' />
      {`${titleCase(species)} ${gender === 'male' ? '♂' : '♀'}`}
    </Fragment>
  )

  return (
    <Card as={Link} to={`characters/${id}`}>
      <Card.Content>
        <div
          style={{
            height: GRID_SIZE * 3.5,
            width: GRID_SIZE * 3.5,
            float: 'right'
          }}
        >
          <div
            style={generateCSS({
              cellColors: sprite_data.split(','),
              pixelSize: 3,
              cssFormat: false
            })}
          />
        </div>

        <Card.Header>{`${first_name} ${last_name}`}</Card.Header>
        <Card.Meta>{`AKA '${alias}'`}</Card.Meta>
        <Card.Description>{bio}</Card.Description>
      </Card.Content>

      <Card.Content extra>{footer}</Card.Content>
    </Card>
  )
}
export default CharacterCard
