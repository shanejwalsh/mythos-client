import React, { Component, Fragment } from 'react'
import AvatarCellGrid from './AvatarCellGrid'
import AvatarBuilderControls from './AvatarBuilderControls'
import AvatarBuilderHeader from './AvatarBuilderHeader'
import { BASE_COLOR, GRID_SIZE } from '../../config/config'
import { generateCSS } from '../../lib/helper'
import API from '../../adapters/API'

class AvatarBuilder extends Component {
  state = {
    cellColors: [],
    selectedColor: '#f44336',
    displayExtraPicker: false,
    mode: 'brush',
    avatarCSS: {}
  }

  //Updates Character Sprite Data on Server
  updateCharacterSprite = () => {
    API.updateCharacter({
      id: this.props.characterId,
      sprite_data: this.state.cellColors.join(',')
    })
  }

  //Fill the grid with characters colors, if empty create blank grid
  componentDidMount = () => {
    if (this.props.sprite_data !== []) {
      this.setState({ cellColors: this.props.cellColors })
    } else {
      this.setState({ cellColors: this.buildGrid(BASE_COLOR) })
    }
  }

  //Build a grid of the correct size filled with a given color
  buildGrid = (color = BASE_COLOR) =>
    new Array(GRID_SIZE * GRID_SIZE).fill(color)

  //Fill the grid with a given color
  fillGrid = (color = BASE_COLOR) => {
    this.setState({ cellColors: this.buildGrid(color) })
  }

  //Change selected color to the clicked cell than go back to brush mode
  dropperHandler = id =>
    this.setState({
      selectedColor: this.state.cellColors[id],
      mode: 'brush'
    })

  //Set the color of clicked cell to base and update array
  eraserHandler = id => {
    const newColorArray = this.state.cellColors
    newColorArray[id] = BASE_COLOR
    this.setState({ cellColors: newColorArray })
  }

  //Swap all cells of the old color with the new color
  exchangeHandler = id => {
    let newColorArray = this.state.cellColors
    const oldColor = newColorArray[id]
    newColorArray = newColorArray.map(color =>
      color === oldColor ? this.state.selectedColor : color
    )
    this.setState({ cellColors: newColorArray, mode: 'brush' })
  }

  //Handle cell click depending on current mode
  clickCellHandler = id => {
    //handle dropper mode
    if (this.state.mode === 'dropper') return this.dropperHandler(id)
    //handle eraser mode
    if (this.state.mode === 'eraser') return this.eraserHandler(id)
    //handle exchange mode
    if (this.state.mode === 'exchange') return this.exchangeHandler(id)
    //handle normal fill action
    const newColorArray = this.state.cellColors
    newColorArray[id] = this.state.selectedColor
    this.setState({ cellColors: newColorArray })
  }

  render() {
    return (
      <Fragment>
        <AvatarBuilderHeader handleClick={this.props.setDisplayMode} />
        <div
          style={{ paddingTop: '1em' }}
          className='ui stackable two column grid'
        >
          <div className='five wide column'>
            <AvatarBuilderControls
              saveAvatar={this.updateCharacterSprite}
              handlePreview={() =>
                this.setState({
                  avatarCSS: generateCSS({
                    cellColors: this.state.cellColors,
                    pixelSize: 15,
                    cssFormat: false
                  })
                })
              }
              cellColors={this.state.cellColors}
              avatarCSS={this.state.avatarCSS}
              fillGrid={this.fillGrid}
              displayExtraPicker={this.state.displayExtraPicker}
              mode={this.state.mode}
              setMode={mode => this.setState({ mode })}
              toggleExtraPicker={() =>
                this.setState({
                  displayExtraPicker: !this.state.displayExtraPicker
                })
              }
              selectedColor={this.state.selectedColor}
              handleColorChange={color =>
                this.setState({ selectedColor: color.hex })
              }
            />
          </div>
          <div className='one wide column' />
          <div className='nine wide column'>
            <AvatarCellGrid
              handleCellClick={this.clickCellHandler}
              cells={this.state.cellColors}
            />
          </div>
          <div className='one wide column' />
        </div>
      </Fragment>
    )
  }
}

export default AvatarBuilder
