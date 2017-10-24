//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image } from 'react-native';

import Card from './Card.js'

const imgBookSo    = require('./images/icon-bookso.png');
const imgDanhSach  = require('./images/icon-danhsach.png');

class HomeScreen extends Component {
    static navigationOptions = {
        title             : 'Mobifone Service',
        headerStyle       : { backgroundColor: '#0084EB' },
        headerTintColor   : 'white',
        headerLeft        : (
            <Image style={{ width: 35, height: 30, marginLeft: 20 }}
                   source={require('./images/icon-home.png')}
            />
        )
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Tiện ích</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Card screenName='BookSo'   title='Đặt số thứ tự'    img={imgBookSo}    navigate={navigate} />
                    <Card screenName='DanhSach' title='Danh sách đặt số' img={imgDanhSach}  navigate={navigate} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        color: '#333',
        marginBottom: 10
    }
});

export default HomeScreen;
