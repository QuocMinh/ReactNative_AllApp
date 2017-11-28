import { StackNavigator } from 'react-navigation';

import CodeScreen from './comps/CodeScreen.js';

const App = StackNavigator({
  Home: { screen: CodeScreen },
});

export default App;