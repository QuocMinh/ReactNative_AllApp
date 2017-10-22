//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

// create a component
class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home'
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <Text>This is Home Screen</Text>
                <Button
                    onPress={() => navigate('ManHinhA')}
                    title="Forward to Screen A"
                />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    
});

//make this component available to the app
export default HomeScreen;
