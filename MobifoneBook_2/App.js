import React, { Component } from 'react';
import { StackNavigator }   from 'react-navigation';

import HomeScreen     from './component/HomeScreen.js';
import BookSo         from './component/BookSo.js';
import DanhSach       from './component/DanhSach.js';
import ServerConfig   from './component/ServerConfig.js';

const App = StackNavigator({
  Home          : { screen: HomeScreen },
  BookSo        : { screen: BookSo },
  DanhSach      : { screen: DanhSach },
  ServerConfig  : { screen: ServerConfig }
});

export default App;