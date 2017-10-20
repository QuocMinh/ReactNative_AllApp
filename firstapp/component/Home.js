import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

var MENU = [
    {name: 'Tin tuc'},
    {name: 'Tin tuc'},
    {name: 'Tin tuc'}
]

class Home extends Component {
    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource = ds.cloneWithRows(MENU),
            hidden: true
        }

        this._pushView = this._pushView.bind(this);
        this.taoHang   = this.taoHang.bind(this);
    }

    taoHang(property) {
        return (
            <TouchableOpacity style={styles.hang} onPress={() => this._pushView(property.name)}>
                <View style={styles.title}>
                    <Text style={styles.text}>{property.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _pushView(menuName) {
        
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={this.state.hidden}/>
                <View style={styles.header}>
                    <Text style={styles.headerText}></Text>
                </View>
                <View style={styles.danhsach}>
                    <ListView dataSource={this.state.dataSource} renderRow ={this.taoHang} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400'
    },
    danhsach: {
        flex: 1,
        backgroundColor: 'white'
    },
    hang: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: 'green'
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: '300'
    }
  });

module.exports = Home;