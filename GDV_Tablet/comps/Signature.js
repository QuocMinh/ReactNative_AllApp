import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils.js";
// Library to draw
import SketchView from 'react-native-sketch-view';

const sketchViewConstants = SketchView.constants;

const tools = {};

tools[sketchViewConstants.toolType.pen.id] = {
  id: sketchViewConstants.toolType.pen.id,
  name: sketchViewConstants.toolType.pen.name,
  nextId: sketchViewConstants.toolType.eraser.id
};
tools[sketchViewConstants.toolType.eraser.id] = {
  id: sketchViewConstants.toolType.eraser.id,
  name: sketchViewConstants.toolType.eraser.name,
  nextId: sketchViewConstants.toolType.pen.id
};

class Signature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolSelected: sketchViewConstants.toolType.pen.id
    };
  }

  isEraserToolSelected() {
    console.log('isEraserToolSelected');
    return this.state.toolSelected === sketchViewConstants.toolType.eraser.id;
  }

  toolChangeClick() {
    this.setState({ toolSelected: tools[this.state.toolSelected].nextId });
  }

  getToolName() {
    return tools[this.state.toolSelected].name;
  }

  onSketchSave(saveEvent) {
    console.log('props', this.props);
    console.log('saveEvent', saveEvent);

    const { navigate } = this.props;

    navigate('DrawScreen', {img: saveEvent.localFilePath})

    this.props.onSave && this.props.onSave(saveEvent);
  }

  render() {
    console.log('Signature => props', this.props);
    return (
      <View style={styles.container}>
        <SketchView style={{ flex: 1, backgroundColor: 'white', width: Params.SCREEN_WIDTH }} ref="sketchRef"
          selectedTool={this.state.toolSelected}
          onSaveSketch={this.onSketchSave.bind(this)}
          localSourceImagePath={this.props.localSourceImagePath} />

        <View style={{ flexDirection: 'row', backgroundColor: '#EEE' }}>
          <TouchableHighlight underlayColor={"#CCC"} style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }} onPress={() => { this.refs.sketchRef.clearSketch() }}>
            <Text style={{ color: '#888', fontWeight: '600' }}>Ký lại</Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"#CCC"} style={{ flex: 1, alignItems: 'center', paddingVertical: 20, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#DDD' }} onPress={() => { this.refs.sketchRef.saveSketch() }}>
            <Text style={{ color: '#888', fontWeight: '600' }}>Lưu chữ ký</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    width: Params.SCREEN_WIDTH,
  },
});

export default Signature;
