import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Utils, Params } from "../utils/Utils.js";

class CodeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>CodeScreen</Text>
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
  },
});

export default CodeScreen;
