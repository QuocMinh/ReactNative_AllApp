//import liraries
import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, 
    TextInput, Picker, TouchableOpacity,  
    ScrollView
} from 'react-native';
const Item = Picker.Item;

// create a component
class BookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sdt : '',
            macv: 'cskh'
        }
    }

    updateSelectedValue = (selected) => {
        this.setState({
            selected: selected
        });
    }

    checkFormatFone() {
        
    }

    booking() {
        // do something
    }

    render() {
        return (
            <View style={styles.container}
                keyboardDismissMode='none'>
                <Text style={styles.title}>
                    Nhập số điện thoại
                </Text>
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='white'
                    placeholder="Số điện thoại"
                    placeholderTextColor='#d7d7d7'
                    keyboardType='phone-pad'
                    onChangeText={sdt => this.setState({sdt: sdt})}/>
                <Text style={styles.title}>
                    Chọn dịch vụ
                </Text>
                <View style={styles.selectListView}>
                    <Picker
                        style={styles.selectList}
                        prompt='Chọn dịch vụ'
                        selectedValue={this.state.macv}
                        onValueChange={selected => this.setState({macv: selected})}>
                        <Item label="Hỗ trợ khách hàng"  value="cskh" />
                        <Item label="Đăng ký dịch vụ"    value="dkdv" />
                        <Item label="Thanh toán hóa đơn" value="tthd" />
                    </Picker>
                </View>
                <TouchableOpacity onPress={this.booking}>
                    <Text style={styles.btnBook}>
                        Đặt số
                    </Text>
                </TouchableOpacity>                
                <View>
                    <Text>So dien thoai: {this.state.sdt}</Text>
                    <Text>Ma cv: {this.state.macv}</Text>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 45,
        marginBottom: 15,
        fontSize: 16,
        // color: '#0084EB',
        borderColor: '#0084EB',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 3
    },
    selectList: {
        color: '#333',
    },
    selectListView: {
        borderColor: '#0084EB',
        borderWidth: 1,
        height: 45,
        justifyContent: 'center',
        marginBottom: 15,
        borderRadius: 3
    },
    title: {
        marginBottom: 7,
        color: '#00579c'
    }, 
    btnBook: {
        backgroundColor: '#0084EB',
        textAlign: 'center',
        padding: 10,
        color: 'white',
        fontSize: 18,
        borderRadius: 3
    }
});

//make this component available to the app
export default BookForm;
