import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Component
import ScanQRScreen from "./components/ScanQRScreen";
// Connect
import { connect } from "react-redux";
import { style } from 'expo/src/Font';

class MainApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeResult: 'unknown',
      qrCodeHasRead: true
    }
  }

  // ================================================================================================================
  // FUNCTIONS
  // ================================================================================================================

  updateResult(result, status) {
    this.setState({ 
      qrCodeResult: result ,
      qrCodeHasRead: status
    })
    console.log('updateResult', this.state);
  }

  // ================================================================================================================
  // RENDER
  // ================================================================================================================
  
  _renderQRScreen() {
    return (
      <ScanQRScreen handleUpdateResult={this.updateResult.bind(this)} />
    );
  }

  _renderMenu() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({qrCodeHasRead: false})}>
          <Text>QR CODE</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    // return <ScanQRScreen handleUpdateResult={this.updateResult.bind(this)} />
    // return (
    //   <View style={styles.container}>
    //     <TouchableOpacity onPress={() => this.setState({ qrCodeHasRead: false })}>
    //       <Text style={{flex: 0}}>QR CODE</Text>
    //     </TouchableOpacity>
    //     <ScanQRScreen handleUpdateResult={this.updateResult.bind(this)} />
    //   </View>
    // );
    if(this.state.qrCodeHasRead) {
      return this._renderMenu();
    } else {
      return <ScanQRScreen handleUpdateResult={this.updateResult.bind(this)} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
});

export default MainApp;
