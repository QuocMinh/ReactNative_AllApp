import { StackNavigator, DrawerItems } from 'react-navigation';

import CodeScreen from './comps/CodeScreen';
import MainScreen from './comps/MainScreen';
import DrawScreen from './comps/DrawScreen';

const App = StackNavigator({
  Home: { screen: CodeScreen },
  MainScreen: { screen: MainScreen },
  DrawScreen: { screen: DrawScreen },
});

export default App;