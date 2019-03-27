import React, { Fragment } from 'react'
import { Card, Icon } from 'semantic-ui-react'
import { titleCase } from '../../lib/helper'
import { Link } from 'react-router-dom'
import { generateCSS } from '../../lib/helper'
import { GRID_SIZE } from '../../config/config'

const CharacterCard = props => {
  const {
    id,
    first_name,
    last_name,
    bio,
    gender,
    species,
    alias,
    sprite_data,
    user,
    created_at,
    footerPrimary
  } = props

  const footer = (
    <Fragment>
      {footerPrimary === 'user' ? (
        <Fragment>
          <Icon name='user outline' />
          <span style={{ color: '#54C8FF' }}>{user.username}</span>
        </Fragment>
      ) : (
        <Fragment>
          <Icon name='calendar plus outline' />
          {created_at.slice(0, 10)}
        </Fragment>
      )}

      <span style={{ float: 'right' }}>{`${titleCase(species)} ${
        gender === 'male' ? '♂' : '♀'
      }`}</span>
    </Fragment>
  )

  return (
    <Card as={Link} to={`characters/${id}`}>
      <Card.Content>
        <div
          style={{
            height: GRID_SIZE * 3.5,
            width: GRID_SIZE * 3.5,
            float: 'left'
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
        <Card.Description>{bio.slice(0, 132) + '...'}</Card.Description>
      </Card.Content>

      <Card.Content extra>{footer}</Card.Content>
    </Card>
  )
}
export default CharacterCard
