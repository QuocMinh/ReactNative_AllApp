import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ToastAndroid, Keyboard, ActivityIndicator, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils";
// Webservice config
import WSConfig from "../utils/WSConfig";
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
      toolSelected: sketchViewConstants.toolType.pen.id,
      onSaving: false,
      startDraw: false,
      onDraw: false
    };
    Keyboard.dismiss();
  }

  // ========================================================================================================================================
  // FUNCTION
  // ========================================================================================================================================

  onSketchSave(saveEvent) {
    if(this.state.onDraw) {
      this.setState({ onSaving: true });
      // Lay du lieu truyen vao tu MainScreen
      const transactionInfo = this.props.transactionInfo;
      // Create file name = isdn_chuky
      var fileName = transactionInfo.isdn + '_chuky.jpg';
      // Upload to server
      this.uploadSignature(Params.IMEI, transactionInfo.folder, fileName, saveEvent.imageBase64);
    } else {
      Alert.alert('Thông báo!', 'Vui lòng ký tên trước khi lưu.');
    }
  }

  uploadSignature(userName, path, fileName, base64Str) {
    var url = WSConfig.MAIN_URL + WSConfig.UPLOAD_FILE_URL;
    Utils.log('uploadSignature -> url', url);

    // Upload image to server
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/xml; charset=utf-8' },
      body: `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <uploadFile xmlns="WSGDV">
              <lat>string</lat>
              <lng>string</lng>
              <username>${userName}</username>
              <folder>${path}</folder>
              <filename>${fileName}</filename>
              <base64data>${base64Str}</base64data>
            </uploadFile>
          </soap:Body>
        </soap:Envelope>`
    }).then((resp) => {
      Utils.log('uploadSignature', resp);
      ToastAndroid.show('Lưu chữ ký thành công!', ToastAndroid.BOTTOM);
      this.setState({ onSaving: false });
    }).catch((err) => { 
      console.error(err);
      this.setState({ onSaving: false }); 
    });
  }

  setFlexForSketch() {
    return this.state.onSaving ? { flex: 0 } : { flex: 1 };
  }

  _renderProgressCreen() {
    if(this.state.onSaving) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator
            animating={true}
            color='#bc2b78'
            size="large"
            style={styles.activityIndicator} />
          <Text>Đang xử lý, vui lòng chờ trong giây lát.</Text>
        </View>
      );
    }
  }

  _renderDrawScreen() {
    if(this.state.startDraw) {
      return (
        <View>

          <TouchableWithoutFeedback onPressIn={() => {this.setState({ onDraw: true }) }} >
            <SketchView style={[{ width: Params.SCREEN_WIDTH }, { ...this.setFlexForSketch() }]} ref="sketchRef"
              selectedTool={this.state.toolSelected}
              onSaveSketch={this.onSketchSave.bind(this)}
              localSourceImagePath={this.props.localSourceImagePath} />
          </TouchableWithoutFeedback>

          {/* BUTTON */}
          <View style={{ flexDirection: 'row', backgroundColor: '#EEE' }}>
            <TouchableHighlight underlayColor={"#CCC"} style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }} onPress={() => { this.refs.sketchRef.clearSketch(); this.setState({ onDraw: false }) }}>
              <Text style={{ color: '#888', fontWeight: '600' }}>Ký lại</Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={"#CCC"} style={{ flex: 1, alignItems: 'center', paddingVertical: 20, borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#DDD' }} onPress={() => { this.refs.sketchRef.saveSketch() }}>
              <Text style={{ color: '#888', fontWeight: '600' }}>Lưu chữ ký</Text>
            </TouchableHighlight>
          </View>

        </View>
      );
    } else {
      return (
        <TouchableOpacity 
          onPress={() => this.setState({ startDraw: true })}
          onPressIn={() => this.setState({ startDraw: true })}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontSize: Params.SCREEN_WIDTH / 15, }}> Chạm để bắt đầu ký tên </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  // ========================================================================================================================================
  // RENDER
  // ========================================================================================================================================

  render() {
    return (
      <View style={styles.container}>
        {this._renderProgressCreen()}
        {this._renderDrawScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9C4',
    width: Params.SCREEN_WIDTH,
  },
});

export default Signature;
