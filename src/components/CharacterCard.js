import React, { Fragment } from 'react'
import { Card, Icon } from 'semantic-ui-react'

const CharacterCard = props => {
  const { first_name, last_name, bio, gender, species, alias } = props

  const footer = (
    <Fragment>
      <Icon name='user outline' />
      {species}
    </Fragment>
  )

  return (
    <Card
      href='#'
      header={`${first_name} ${last_name} (${gender})`}
      meta={`AKA '${alias}'`}
      description={bio}
      extra={footer}
    />
  )
}
export default CharacterCard
