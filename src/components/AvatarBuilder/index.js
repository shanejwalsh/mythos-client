import React, { Component, Fragment } from 'react'
import AvatarCellGrid from './AvatarCellGrid'
import AvatarBuilderControls from './AvatarBuilderControls'
import AvatarBuilderHeader from './AvatarBuilderHeader'

class AvatarBuilder extends Component {
  state = {
    cellColors: [],
    selectedColor: '#f44336',
    displayExtraPicker: false,
    mode: 'brush',
    dropperActive: false,
    eraserActive: false,
    avatarCSS: {}
  }

  BASE_COLOR = () => '#585858'

  generateCSS = (pixelSize, reactFormat = true) => {
    let generatedBoxShadow = ''
    this.state.cellColors.forEach((color, i) => {
      if (color === this.BASE_COLOR()) return // ignore default cells
      const cellRow = Math.ceil((i + 1) / 16) * pixelSize
      let cellColumn = ((i + 1) % 16) * pixelSize
      if (cellColumn === 0) cellColumn = 16 * pixelSize
      generatedBoxShadow += `${cellColumn}px ${cellRow}px 0 0 ${color}, `
    })
    generatedBoxShadow = generatedBoxShadow.slice(0, -2) // remove trailing ', '
    //return CSS in a standard format
    if (reactFormat === false) {
      return `.my-avatar {
        height: ${pixelSize}px;
        width: ${pixelSize}px;
        box-shadow: ${generatedBoxShadow} ;
      }`
    }

    return {
      boxShadow: generatedBoxShadow,
      height: `${pixelSize}px`,
      width: `${pixelSize}px`
    }
  }

  componentDidMount = () =>
    this.setState({ cellColors: this.buildGrid(this.BASE_COLOR()) })

  buildGrid = color => new Array(256).fill(color)

  fillGrid = color => {
    if (color === 'default') color = this.BASE_COLOR()
    this.setState({ cellColors: this.buildGrid(color) })
  }

  clickCellHandler = id => {
    //handle dropper
    if (this.state.mode === 'dropper') {
      return this.setState({
        selectedColor: this.state.cellColors[id],
        mode: 'brush'
      })
    }
    //handle eraser action
    let newColorArray = this.state.cellColors
    if (this.state.mode === 'eraser') {
      newColorArray[id] = this.BASE_COLOR()
      return this.setState({ cellColors: newColorArray })
    }
    if (this.state.mode === 'exchange') {
      const oldColor = newColorArray[id]
      newColorArray = newColorArray.map(color =>
        color === oldColor ? this.state.selectedColor : color
      )
      return this.setState({ cellColors: newColorArray, mode: 'brush' })
    }
    //handle normal fill action
    newColorArray[id] = this.state.selectedColor
    this.setState({ cellColors: newColorArray })
  }

  setActiveColor = color => this.setState({ selectedColor: color.hex })

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
              handlePreview={() =>
                this.setState({ avatarCSS: this.generateCSS(10) })
              }
              generateCSS={this.generateCSS}
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
              handleColorChange={this.setActiveColor}
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
