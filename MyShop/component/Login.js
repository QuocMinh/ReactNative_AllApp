//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// create a component
class Login extends Component {
    static navigationOptions = {
        title: "Login"
    }

    constructor(props) {
        super(props);
        this.state = {
            so1: "",
            so2: "",
            result: "..."
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={styles.textInput}
                    onChangeText={so1 => this.setState({so1})}
                    value={this.state.so1}
                />
                <TextInput 
                    style={styles.textInput}
                    onChangeText={so2 => this.setState({so2})}
                    value={this.state.so2}
                />
                <TouchableOpacity style={styles.textButton}>
                    <Text style={styles.textButtonText}>Cong</Text>
                </TouchableOpacity>
                <View style={styles.result}>
                    <Text>{this.state.result}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'yellow',
        padding: 20
    },
    textInput: {
        width: 300,
        height: 40
    },
    textButton: {
        padding: 20,
        backgroundColor: "black",
        width: 300,
        alignItems: 'center'
    },
    textButtonText: {
        color: "white",
    },
    result: {
        padding: 20,
        backgroundColor: "white",
        width: 300,
        alignItems: 'center'
    }
});

//make this component available to the app
export default Login;
