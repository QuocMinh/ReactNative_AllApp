import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

// Component
import ScanQRScreen from "./components/ScanQRScreen";

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'unknown'
    }
  }

  // ================================================================================================================
  // FUNCTIONS
  // ================================================================================================================

  updateResult(value) {
    this.setState({ result: value });
    console.log(this.state);
  }

  // ================================================================================================================
  // RENDER
  // ================================================================================================================

  render() {
    return (
      <ScanQRScreen updateResult={this.updateResult} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default MainApp;
