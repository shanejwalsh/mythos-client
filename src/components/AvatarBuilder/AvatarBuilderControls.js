import React, { Component, Fragment } from 'react'
import { CirclePicker, SketchPicker } from 'react-color'
import { Button, Segment, Modal, Label, Header } from 'semantic-ui-react'
import { generateCSS } from '../../lib/helper'
import { BASE_COLOR_SET } from '../../config/config'

class AvatarBuilderControls extends Component {
  //Show the correct ribbon based on current brush mode
  showRibbon = () => {
    if (this.props.mode === 'dropper') {
      return (
        <Label as='a' color='orange' ribbon='right'>
          Dropper Active
        </Label>
      )
    } else if (this.props.mode === 'eraser') {
      return (
        <Label as='a' color='pink' ribbon='right'>
          Eraser Active
        </Label>
      )
    } else if (this.props.mode === 'exchange') {
      return (
        <Label as='a' color='red' ribbon='right'>
          Exchange Mode Active
        </Label>
      )
    } else {
      return (
        <Label as='a' color='teal' ribbon='right'>
          Brush Active
        </Label>
      )
    }
  }

  //Set mode to brush and show more colors
  handleBrushClick = () => {
    this.props.toggleExtraPicker()
    this.props.setMode('brush')
  }

  //Build the color preview div
  colorPreview = () => (
    <div
      style={{
        width: '100%',
        height: '25px',
        marginBottom: '5%',
        marginTop: '5%',
        backgroundColor: this.props.selectedColor
      }}
    />
  )
  //Build color segment of controls
  colorControls = () => (
    <Fragment>
      <h5>Colors</h5>
      <CirclePicker
        color={this.props.selectedColor}
        colors={BASE_COLOR_SET}
        onChangeComplete={this.props.handleColorChange}
      />
    </Fragment>
  )
  //Build extra color button and picker
  extraColorControls = () => (
    <Fragment>
      <Button
        content={
          this.props.displayExtraPicker ? 'Less Colors' : 'More Colors...'
        }
        onClick={this.handleBrushClick}
        attached='bottom'
      />
      {this.props.displayExtraPicker && (
        <SketchPicker
          color={this.props.selectedColor}
          onChangeComplete={this.props.handleColorChange}
        />
      )}
    </Fragment>
  )

  //Build modes segment of controls
  brushModes = () => (
    <Fragment>
      <h5>Modes</h5>
      <Button
        onClick={() => this.props.setMode('brush')}
        circular
        icon='paint brush'
      />
      <Button
        onClick={() => this.props.setMode('dropper')}
        circular
        icon='eye dropper'
      />
      <Button
        onClick={() => this.props.setMode('eraser')}
        circular
        icon='erase'
      />
      <Button
        onClick={() => this.props.setMode('exchange')}
        circular
        icon='exchange'
      />
    </Fragment>
  )

  //Build the main action buttons
  actionButtons = () => (
    <Fragment>
      <Button
        onClick={() => this.props.fillGrid()}
        content='Reset'
        icon='refresh'
      />
      <Modal
        trigger={<Button content='Generate CSS' icon='code' />}
        basic
        size='large'
        closeIcon
      >
        <Header icon='code' content='Your Avatar CSS!' />
        <Modal.Content>
          <h3>
            Use this avatar in your own web projects (For programmers and web
            tinkerers)
          </h3>
          <p>
            Just copy the CSS below, include it in your web project and giv a
            div element the class my-avatar, thats it! Logic and design
            influenced by the amazing git project at &nbsp;
            <a href='https://www.pixelartcss.com/'>
              https://www.pixelartcss.com/
            </a>
            &nbsp; check out their fully featured editor for more awesomeness
            (including animations!).
          </p>

          <code>
            {generateCSS({
              cellColors: this.props.cellColors,
              cssFormat: true
            })}
          </code>
        </Modal.Content>
      </Modal>
      <Modal
        trigger={<Button content='Get Grid' icon='table' />}
        basic
        size='large'
        closeIcon
      >
        <Header icon='table' content='Your Avatar Grid' />
        <Modal.Content>
          <h3>JUST FOR DEVS</h3>
          <p />
          <code>{this.props.cellColors.join(',')}</code>
        </Modal.Content>
      </Modal>

      <Modal
        trigger={
          <Button
            onClick={this.props.handlePreview}
            content='Preview'
            icon='eye'
            color='violet'
          />
        }
        basic
        size='large'
        closeIcon
      >
        <Header icon='id badge' content='Check Out Your Avatar!' />
        <Modal.Content>
          <p>
            Make sure to save to keep your changes before leaving the avatar
            editing page.
            <br />
            <br />
            <b>Please note</b> - any cells left the default color (or cleared
            with the eraser) will be previewed and saved as transparent.
          </p>
          <div style={this.props.avatarCSS} />
        </Modal.Content>
      </Modal>
    </Fragment>
  )
  render() {
    return (
      <Segment.Group>
        <Segment>
          {this.showRibbon()}
          {this.colorPreview()}
        </Segment>
        <Segment textAlign='center'>{this.colorControls()}</Segment>
        {this.extraColorControls()}
        <Segment textAlign='center'>{this.brushModes()}</Segment>
        <Segment textAlign='center'>{this.actionButtons()}</Segment>
      </Segment.Group>
    )
  }
}

export default AvatarBuilderControls
