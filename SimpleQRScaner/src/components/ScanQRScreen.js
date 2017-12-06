import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { BarCodeScanner, Permissions } from "expo";

// Action
import { readCode } from "../actions/QRCodeAction";
// Connect
import { connect } from "react-redux";

class ScanQRScreen extends React.Component {
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

    this.props.handleUpdateResult(data, true);

    // Hide screen
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0, duration: 200 }
    ).start();
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
        <Animated.View style={[{ flex: fadeAnim }, styles.container ]}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{width: 200, height: 200, position: 'absolute' }}
          />
        </Animated.View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScanQRScreen;
