import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, Dimensions, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ToastAndroid } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils.js";
// Webservices Config
import WSConfig from "../utils/WSConfig";

const { width, height } = Dimensions.get('window');

class CodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      inProgress: false
    }
  }

  static navigationOptions = {
    title: 'Mã giao dịch',
    headerStyle: { backgroundColor: '#303F9F'},
    headerTintColor: 'white'
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={Params.SECONDARY_COLOR}
            barStyle="light-content"
          />
          <Image source={require('../public/images/bg.jpg')} style={styles.backgroundImage} />
          <View style={{ flex: 0 }}>
            <View style={styles.logoView}>
              <Image source={require('../public/images/logo.png')} />
              <Text style={styles.logoTitle}>Đấu nối Giao dịch viên</Text>
            </View>
            <View style={styles.formView}>
              <TextInput
                style={styles.codeStyle}
                onChangeText={(value) => { this.setState({ code: value }) }}
                value={this.state.code}
                returnKeyLabel='go'
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder='Nhập mã giao dịch'
                placeholderTextColor='#ddd'
                autoFocus={true}
              />
              <TouchableOpacity onPress={() => this.checkValidateCode()} >
                <Text style={styles.btnText}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  checkValidateCode () {
    const { navigate } = this.props.navigation;
    let url = WSConfig.MAIN_URL + WSConfig.GET_CODE_DATA_URL;

    if(!this.state.inProgress) {

      // Show Toast thong bao cho nguoi dung 
      ToastAndroid.show('Đang xử lý, vui lòng chờ.', ToastAndroid.SHORT);
      // Update state:
      this.setState({ inProgress: true });

      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/xml; charset=utf-8' },
        body:
          `<?xml version="1.0" encoding="utf-8"?>
        <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
          <soap:Body>
            <getTransCode xmlns="WSGDV">
              <lat>string</lat>
              <lng>string</lng>
              <username>${Params.IMEI}</username>
              <code>${this.state.code}</code>
            </getTransCode>
          </soap:Body>
        </soap:Envelope>`
      })
        .then(resp => {
          // Lay body text cua SOAP
          let xmlResp = resp._bodyText;

          // Convert xml string to Json:
          var respJson = Utils.respXml2Json(xmlResp);

          // Redirect to MainScreen with some props
          navigate('MainScreen', { ...this.props, customerInfo: respJson });

          // Update state:
          this.setState({ inProgress: false, code: '' })
        })
        .catch(err => {
          console.error(err);
          // Update state:
          this.setState({ inProgress: false })
        })
    } else {
      // Show Toast thong bao cho nguoi dung 
      ToastAndroid.show('Đang xử lý, vui lòng chờ.', ToastAndroid.LONG);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  logoView: {
    alignItems: 'center',
    marginBottom: 40
  },
  logoTitle: {
    fontSize: 18,
    color: Params.PRIMARY_COLOR
  },
  formView: {
    alignItems: 'center'
  },
  codeStyle: {
    width: width / 2,
    fontSize: 25,
    color: '#303F9F',
    fontWeight: 'bold',
    textAlign: 'center',
    borderStyle: 'solid',
    borderRadius: width / 4,
    borderWidth: 1,
    borderColor: Params.PRIMARY_COLOR,
    paddingVertical: 13,
    backgroundColor: 'white'
  },
  btnText: {
    backgroundColor: Params.PRIMARY_COLOR,
    width: width / 2,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
    paddingVertical: 20,
    borderRadius: width / 4,
  },
  backgroundImage: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
});

export default CodeScreen;
