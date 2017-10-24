import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';

import Item from './Item.js';

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
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(r) =>
                        <Item number={r.stt} phone={r.sdt} date={r.ngaybd} trangthai={r.trangthai} />
                    }
                />
            </View>
        );
    }

    componentDidMount() {
        // fetch("http://services.groupkt.com/state/get/IND/all")
        fetch("http://10.151.122.84:8080/datso/danhsach")
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
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

export default DanhSach;
