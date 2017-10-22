//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class ManHinhB extends Component {
    static navigationOptions = { title: 'Screen B' };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, backgroundColor: "yellow" }}>
                <Text style={{ fontSize: 100, color: "white" }}>B</Text>
                <Button
                    onPress={() => navigate('ManHinhC')}
                    title="Forward to Screen C"
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    
});

//make this component available to the app
export default ManHinhB;
