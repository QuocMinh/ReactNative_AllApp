//import liraries
import React, { Component } from 'react';
import { 
    View, Text, StyleSheet,
    TouchableOpacity 
} from 'react-native';

// create a component
class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity onPress={() => {}}>
                <Text style={styles.btn}>{this.props.textButton}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        backgroundColor: '#00579c',
        padding: 20
    },
});

//make this component available to the app
export default Button;
