import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { BarCodeScanner, Permissions } from "expo";

export default class ScanQRScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      hasRead: false,
      fadeAnim: new Animated.Value(0)
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    // Display screen
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 1, duration: 200 }
    ).start();
  }

  // ================================================================================================================
  // FUNCTIONS
  // ================================================================================================================

  _handleBarCodeRead = ({ type, data }) => {
    console.log(data);

    // this.props.updateResult && this.props.updateResult(data);

    // Hide screen
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 200 }
    ).start();
  }

  _renderBarCodeScanner() {
    if(!this.state.hasRead) {
      return (
        <Animated.View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      );
    } else {
      return (
        <View></View>
      );
    }
  }

  // ================================================================================================================
  // RENDER
  // ================================================================================================================

  render() {
    const { hasCameraPermission } = this.state;
    let {fadeAnim} = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Animated.View style={{ flex: fadeAnim }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
