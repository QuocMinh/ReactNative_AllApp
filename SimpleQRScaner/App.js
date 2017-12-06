import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainApp from "./src/MainApp";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

class App extends Component {
  render() {
    return (
      <MainApp />
    );
  }
}

export default App;
