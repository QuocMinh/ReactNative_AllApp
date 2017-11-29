import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils.js";

class Signature extends Component {
  save = () => {
    this.sketch.save().then(({ path }) => {
      Alert.alert('Image saved!', path);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
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
    width: Params.SCREEN_WIDTH
  },
});

export default Signature;
