import { StackNavigator, DrawerItems } from 'react-navigation';

import CodeScreen from './comps/CodeScreen';
import MainScreen from './comps/MainScreen';

const App = StackNavigator({
  Home        : { screen: CodeScreen },
  MainScreen  : { screen: MainScreen },
});

export default App;