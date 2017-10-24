import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Dimensions, AsyncStorage } from 'react-native';

import Item from './Item.js';

const { height, width } = Dimensions.get('window');

class DanhSach extends Component {
    static navigationOptions = {
        title           : 'Danh sách book số',
        headerStyle     : { backgroundColor: '#0084EB' },
        headerTintColor : 'white'
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            serverAddr: 'locahost',
            serverPort: '8080'
        }
    }

    fectchingData = async() => {
        await AsyncStorage.getItem("@Config:serverAddr").then(value => {
            if(value !== null) {
                const serverAddr = value;
                AsyncStorage.getItem("@Config:serverPort").then(value => {
                    if(value !== null) {
                        const serverPort = value;

                        this.setState({
                            serverAddr: serverAddr,
                            serverPort: serverPort
                        });

                        fetch("http://" + this.state.serverAddr + ":" + this.state.serverPort + "/datso/danhsach")
                        .then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(responseJson)
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });

                        console.log(this.state.serverAddr);
                        console.log(this.state.serverPort);
                    }
                })
            };
        });
        
    }

    componentDidMount() {
        this.fectchingData();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.number}>STT</Text>
                    <Text style={styles.phone}>Số điện thoại</Text>
                    <Text style={styles.date}>Ngày đặt</Text>
                </View>
                
                <Item number='1' phone='01239496986' date='28/10/1995' trangthai='1' />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(r) =>
                        <Item number={r.stt} phone={r.sdt} date={r.ngaybd} trangthai={r.trangthai} />
                    }
                />
            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    header: {
        backgroundColor: '#1E8BC3',
        width: width,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    number: {
        flex: 0.2,
        color: 'white'
    },
    phone: {
        flex: 0.4,
        color: 'white'
    },
    date: {
        flex: 0.4,
        color: 'white'
    }
});

export default DanhSach;
