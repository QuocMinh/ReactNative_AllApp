import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    Platform,
    StatusBar,
    Image
} from 'react-native';

class MainScreen extends Component {
    static navigationOptions = {
        title             : 'Mobifone Book',
        headerStyle       : { backgroundColor: '#0084EB', marginTop: (Platform.OS === 'android') ? StatusBar.currentHeight : 0 },
        headerTintColor   : 'white',
        headerLeft        : (
            <Image
                style={{ width: 35, height: 30, marginLeft: 20 }}
                source={require('./images/icon-home.png')}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <View style={styles.formContainer}></View>
                <View style={styles.helpdeskContainer}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    formContainer: {
        flex: 0.6,
        backgroundColor: "#ccc"
    },
    helpdeskContainer: {
        flex: 0.4,
        backgroundColor: "#ddd"
    }
});

export default MainScreen;
