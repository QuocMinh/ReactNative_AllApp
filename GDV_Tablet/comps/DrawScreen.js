import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// Library to draw
import SketchView from 'react-native-sketch-view';
// Utils
import { Utils, Params } from "../utils/Utils.js";

class DrawScreen extends Component {
    render() {
        console.log('DrawScreen => props', this.props);
        console.log('Source', this.props.navigation.state.params.img);
        return (
            <View style={styles.container}>
                <Image
                    source={require('/data/user/0/com.gdv_tablet/cache/sketch_-10383022331d900faa-602b-4fc3-89e1-25331ecf37b1.png')}
                />
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
    draw: {
        flex: 1,
        backgroundColor: 'white',
        width: Params.SCREEN_WIDTH
    }
});

export default DrawScreen;
