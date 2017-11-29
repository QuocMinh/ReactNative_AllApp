import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils.js";

class CustomerInfo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CustomerInfo</Text>
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
    width: Params.SCREEN_WIDTH
  },
});

export default CustomerInfo;
