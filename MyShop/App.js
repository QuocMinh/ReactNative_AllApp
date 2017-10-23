import React, { Component } from 'react';
import { StackNavigator }   from 'react-navigation';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import HomeScreen from './component/HomeScreen.js';
import ManHinhA from './component/ManHinhA.js';
import ManHinhB from './component/ManHinhB.js';
import ManHinhC from './component/ManHinhC.js';
import ListViewExam from './component/ListViewExam.js';
import Login from './component/Login.js';
import BookSo from './component/BookSo.js';

const App = StackNavigator({
  Home    : { screen: BookSo },
  ManHinhA: { screen: ManHinhA },
  ManHinhB: { screen: ManHinhB },
  ManHinhC: { screen: ManHinhC }
});

export default App;