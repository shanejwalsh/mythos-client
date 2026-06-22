import React, { Fragment } from 'react'
import { Menu, Input, Dropdown } from 'semantic-ui-react'
import { titleCase } from '../../lib/helper'

const generateMenuFromOptions = options =>
  options.map((option, i) => ({
    key: i,
    text: titleCase(option),
    value: option.toLowerCase()
  }))

const CharactersMenuBar = props => {
  return (
    <Fragment>
      <Menu stackable>
        <Menu.Menu style={{ flex: 1, minWidth: 0 }}>
          <Menu.Item style={{ flex: 1, minWidth: 0, padding: '4px 8px' }}>
            <Dropdown
              fluid
              style={{ border: 0 }}
              closeOnBlur
              placeholder='All Species'
              multiple
              search
              selection
              onChange={props.handleSpeciesFilter}
              options={generateMenuFromOptions(props.speciesOptions)}
            />
          </Menu.Item>
          <Menu.Item style={{ flex: 1, minWidth: 0, padding: '4px 8px' }}>
            <Dropdown
              fluid
              style={{ border: 0 }}
              closeOnBlur
              placeholder='All Status'
              multiple
              search
              selection
              onChange={props.handleStatusFilter}
              options={generateMenuFromOptions(props.statusOptions)}
            />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <span style={{ float: 'right', margin: 'auto' }}>
            sort by: &nbsp;
            <Dropdown
              inline
              onChange={props.handleSortChange}
              options={generateMenuFromOptions(['date created', 'name'])}
              defaultValue={
                generateMenuFromOptions(['date created', 'name'])[0].value
              }
            />
          </span>
          <Menu.Item style={{ marginLeft: '5px' }}>
            <Input
              onChange={props.handleSearch}
              value={props.searchTerm}
              icon='search'
              placeholder='Search...'
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Fragment>
  )
}

export default CharactersMenuBar
