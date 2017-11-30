import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils";

class MyClass extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.label}>
          <Text style={{color: Params.PRIMARY_COLOR, fontWeight: 'bold', fontSize: 18}}>{this.props.label}</Text>
        </View>
        <View style={styles.info}>
          <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{this.props.value}</Text>
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
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: Params.SECONDARY_COLOR,
    paddingHorizontal: 25
  },
  label: {
    flex: 1
  },
  info: {
    flex: 1
  }
});

export default MyClass;
