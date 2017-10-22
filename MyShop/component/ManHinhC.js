//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class ManHinhC extends Component {
    render() {
        return (
            <View style={{flex: 1, backgroundColor: "red "}}>
                <Text style={{fontSize: 100, color: "white"}}>C</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    
});

//make this component available to the app
export default ManHinhC;
