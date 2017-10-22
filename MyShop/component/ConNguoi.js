import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, TouchableOpacity 
} from 'react-native';

class ConNguoi extends Component {
    constructor(props) {
        super();
        this.state = {
            chieucao : 0
        }
    }
    clickMe() {
        this.setState({
            chieucao : this.state.chieucao + 100
        })
    }
    render() {
        return (
            <TouchableOpacity onPress={() => {this.clickMe()}}>
                <View style={ao.bao}>
                    <Text>Toi la {this.props.hoTen}</Text>
                    <Text>Chieu cao: {this.state.chieucao}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const ao = StyleSheet.create({
    bao : {
        width: 150,
        height: 100,
        backgroundColor: "yellow",
        margin: 20
    }
});

export default ConNguoi;
