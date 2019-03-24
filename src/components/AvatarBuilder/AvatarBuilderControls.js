import React, { Component, Fragment } from 'react'
import { CirclePicker, SketchPicker } from 'react-color'
import { Button, Segment, Modal, Label, Header } from 'semantic-ui-react'

class AvatarBuilderControls extends Component {
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

  handleBrushClick = () => {
    this.props.toggleExtraPicker()
    this.props.setMode('brush')
  }

  render() {
    return (
      <Fragment>
        <Segment.Group>
          <Segment>
            {this.showRibbon()}
            <div
              style={{
                width: '100%',
                height: '25px',
                marginBottom: '5%',
                marginTop: '5%',
                backgroundColor: this.props.selectedColor
              }}
            />
          </Segment>
          <Segment textAlign='center'>
            <h5>Colors</h5>
            <CirclePicker
              color={this.props.selectedColor}
              colors={[
                '#f44336',
                '#e91e63',
                '#9c27b0',
                '#673ab7',
                '#3f51b5',
                '#2196f3',
                '#03a9f4',
                '#00bcd4',
                '#009688',
                '#4caf50',
                '#8bc34a',
                '#000000',
                '#ffeb3b',
                '#ffc107',
                '#ff9800',
                '#ff5722',
                '#795548',
                '#607d8b'
              ]}
              onChangeComplete={this.props.handleColorChange}
            />
          </Segment>
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
          <Segment textAlign='center'>
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
          </Segment>
          <Segment textAlign='center'>
            <Button
              onClick={() => this.props.fillGrid('default')}
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
                  Use this avatar in your own web projects (For programmers and
                  web tinkerers)
                </h3>
                <p>
                  Just copy the CSS below, include it in your web project and
                  giv a div element the class my-avatar, thats it! Logic and
                  design influenced by the amazing git project at &nbsp;
                  <a href='https://www.pixelartcss.com/'>
                    https://www.pixelartcss.com/
                  </a>
                  &nbsp; check out their fully featured editor for more
                  awesomeness (including animations!).
                </p>

                <code>{this.props.generateCSS(10, false)}</code>
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
                  Make sure to save to keep your changes before leaving the
                  avatar editing page.
                  <br />
                  <br />
                  <b>Please note</b> - any cells left the default color (or
                  cleared with the eraser) will be previewed and saved as
                  transparent.
                </p>
                <div style={this.props.avatarCSS} />
              </Modal.Content>
            </Modal>
          </Segment>
        </Segment.Group>
      </Fragment>
    )
  }
}

export default AvatarBuilderControls
