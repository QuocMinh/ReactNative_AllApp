//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
class DanhSach extends Component {
    static navigationOptions = {
        title           : 'Danh sách book số',
        headerStyle     : { backgroundColor: '#0084EB' },
        headerTintColor : 'white'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>DanhSach</Text>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default DanhSach;
