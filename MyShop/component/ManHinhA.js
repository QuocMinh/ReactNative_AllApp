//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class ManHinhA extends Component {
    static navigationOptions = { title: 'Screen A' };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{flex: 1, backgroundColor: "blue"}}>
                <Text style={{fontSize: 100, color: "white"}}>A</Text>
                <Button
                    onPress={() => navigate('ManHinhB')}
                    title="Forward to Screen B"
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    
});

//make this component available to the app
export default ManHinhA;
