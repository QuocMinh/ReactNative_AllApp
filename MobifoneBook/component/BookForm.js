//import liraries
import React, { Component } from 'react';
import { 
    View, Text, StyleSheet, 
    TextInput, Picker, TouchableOpacity,  
    ScrollView,
    Alert
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

    booking() {
        var phone = this.state.sdt.trim();
        phone = phone.replace('(+84)', '0');
        phone = phone.replace('+84', '0');
        phone = phone.replace('0084', '0');
        phone = phone.replace(/ /g, '');

        var formData = new FormData();
        formData.append('sdt', this.state.sdt);
        formData.append('macv', this.state.macv);

        if (phone != '') {
            var firstNumber = phone.substring(0, 2);
            if ((firstNumber == '09' || firstNumber == '08') && phone.length == 10) {
                if (phone.match(/^\d{10}/)) {
                    fetch('http://10.151.122.84:8080/datso', {
                        method: 'POST',
                        body: formData
                    })
                    .then((response) => {
                        if(response._bodyText == 'OK!') {
                            Alert.alert('Đặt số thành công');
                        } else {
                            Alert.alert('Đã có lỗi xảy ra. Vui lòng thực hiện lại!');
                        }
                    })
                    .catch((err) => console.log(err))
                } else {
                    Alert.alert('Vui lòng kiểm tra lại số điện thoại');
                }
            } else if (firstNumber == '01' && phone.length == 11) {
                if (phone.match(/^\d{11}/)) {
                    fetch('http://10.151.122.84:8080/datso', {
                        method: 'POST',
                        body: formData
                    })
                    .then((response) => {
                        if(response._bodyText == 'OK!') {
                            Alert.alert('Đặt số thành công');
                        } else {
                            Alert.alert('Đã có lỗi xảy ra. Vui lòng thực hiện lại!');
                        }
                    })
                    .catch((err) => console.log(err))
                } else {
                    Alert.alert('Vui lòng kiểm tra lại số điện thoại');
                }
            } else {
                Alert.alert('Vui lòng kiểm tra lại số điện thoại');
            }
        }
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
                <TouchableOpacity onPress={this.booking.bind(this)}>
                    <Text style={styles.btnBook}>
                        Đặt số
                    </Text>
                </TouchableOpacity>                
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
