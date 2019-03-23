import React, { Component } from 'react'
import AvatarCellGrid from './AvatarCellGrid'
import { Container } from 'semantic-ui-react'
import AvatarBuilderControls from './AvatarBuilderControls'
import AvatarBuilderHeader from './AvatarBuilderHeader'

class AvatarBuilder extends Component {
  state = {
    cellColors: []
  }

  componentDidMount = () => this.setState({ cellColors: this.initializeGrid() })
  initializeGrid = () => new Array(256).fill('blue')

  render() {
    return (
      <Container>
        <AvatarBuilderHeader handleClick={this.props.setDisplayMode} />
        <div
          style={{ paddingTop: '1em' }}
          className='ui stackable two column grid'
        >
          <div className='seven wide column'>
            <AvatarBuilderControls />
          </div>
          <div className='nine wide column'>
            <AvatarCellGrid cells={this.state.cellColors} />
          </div>
        </div>
      </Container>
    )
  }
}

export default AvatarBuilder
