//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView } from 'react-native';

// create a component
class ListViewExam extends Component {
    static navigationOptions = {
        title: "List view example"
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        }
    }

    render() {
        return (
            // <Text>HELLO</Text>
            <ListView 
                dataSource={this.state.dataSource}
                renderRow={(r) => 
                    <View style={styles.listView}>
                        <Text>{r.name}</Text>
                    </View>
                }
            />
        );
    }

    componentDidMount() {
        fetch("http://services.groupkt.com/state/get/IND/all")
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson.RestResponse.result)
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
}

// define your styles
const styles = StyleSheet.create({
    listView : {
        padding: 20,
        borderWidth: 1
    }
});

//make this component available to the app
export default ListViewExam;
