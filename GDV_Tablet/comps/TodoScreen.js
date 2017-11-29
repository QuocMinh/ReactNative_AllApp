import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createStore } from "redux";
import { Provider } from "react-redux";

// App State
let appState = {
  data: [
    { title: 'Go to the Office', isFinised: true },
    { title: 'Prepare tasks for today', isFinised: false },
    { title: 'Team meeting', isFinised: false },
    { title: 'Commit task changed', isFinised: false },
  ]
}
// Action
const finishTask = (index) => {
  return {
    type: 'FINISH',
    adIndex: index
  }
}
const deleteTask = (index) => {
  return {
    type: 'DELETE',
    adIndex: index
  }
}
// Reducer
const taskListReducer = (state = appState, action) => {

  let newTaskList = state.data;

  switch (action.type) {
    
    case 'FINISH':
      newTaskList[action.index].isFinised = true;
      return { ...state, data: newTaskList };
  
    case 'DELETE':
      newTaskList = newTaskList.filter((item, i) => { i !== action.index; });
      return { ...state, data: newTaskList };

  }

  return state;
}
// Store
const store = createStore(taskListReducer, appState);

class TodoScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>TodoScreen</Text>
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

export default TodoScreen;
