import React, { Component } from 'react';
import { 
  View, Text, StyleSheet, StatusBar, Image, TextInput, Dimensions, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ToastAndroid, ActivityIndicator,
  NetInfo, Alert, BackHandler
} from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils.js";
// Webservices Config
import WSConfig from "../utils/WSConfig";
// Android Location Services Dialog Box
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

class CodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      inProgress: false,
      locationIsEnabled: false,
      internetIsConnected: false
    }

    // Lắng nghe sự kiện khi click nút Back trở về màn hình nhập MGD
    BackHandler.addEventListener('hardwareBackPress', () => {
      LocationServicesDialogBox.forceCloseDialog();
    });
  }

  static navigationOptions = {
    title: 'Mã giao dịch',
    headerStyle: { backgroundColor: '#303F9F'},
    headerTintColor: 'white'
  }

  async componentDidMount() {
    // Check internet connection
    await this.checkInternetConnected();
    // Check Location
    if(this.state.internetIsConnected) this.checkLocationIsEnabled();
  }

  // ========================================================================================================================================
  // FUNCTION
  // ========================================================================================================================================

  async checkLocationIsEnabled() {
    let that = this;
    await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "<h2>Vị trí của bạn ?</h2>Ứng dụng muốn thay đổi một số cài đặt của bạn:<br/><br/>Sử dụng GPS, Wi-Fi, và mạng di động cho vị trí", /* <a href='#'>Learn more</a> */
      ok: "ĐI ĐẾN CÀI ĐẶT",
      cancel: "KHÔNG CHO PHÉP",
      enableHighAccuracy: true,   // true  => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
      showDialog: true,           // false => Opens the Location access page directly
      openLocationServices: true  // false => Directly catch method is called if location services are turned off
    })
      .then(function (success) {

        console.log('Location', success);
        that.setState({ locationIsEnabled: true });

      }).catch((error) => { console.log('Location', error.message); this.setState({ locationIsEnabled: false }) });
  }

  async checkInternetConnected() {
    await NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ internetIsConnected: isConnected }); // Save internet status to state
      console.log('Internet: ', isConnected);
      if (!isConnected) Alert.alert('Lỗi mạng!', 'Bạn chưa kết nối mạng hoặc mạng đang có vấn đề.\nVui lòng thử lại sau.');
    });
  }

  _renderActivityIndicator() {
    if(this.state.inProgress) {
      return (
        <View>
          <ActivityIndicator
            animating={this.state.inProgress}
            color='#bc2b78'
            size="large"
            style={styles.activityIndicator} />
          <Text>Đang xử lý, vui lòng chờ trong giây lát.</Text>
        </View>
      );
    } else {
      return ( <Text style={{fontSize: 20, color: Params.SECONDARY_COLOR}}>Vui lòng nhập Mã giao dịch để bắt đầu.</Text> );
    }
  }

  async checkValidateCodeWithLocation() {
    // Check internet Connection
    await this.checkInternetConnected();
    // Check location Service
    await this.checkLocationIsEnabled();

    if(this.state.internetIsConnected) {
      if (this.state.locationIsEnabled) {
        if (this.state.inProgress === false) {
          this.setState({ inProgress: true }); // Update state:
          this.validateCode(); // Bắt đầu thực hiện
        } else { ToastAndroid.show('Đang xử lý, vui lòng chờ.', ToastAndroid.LONG); /* Show Toast thong bao cho nguoi dung */ }
      }
    }
  }

  async checkValidateCodeWithoutLocation() {
    // Check internet Connection
    await this.checkInternetConnected();

    if (this.state.internetIsConnected) {
      if (this.state.inProgress === false) {
        this.setState({ inProgress: true }); // Update state
        this.validateCode(); // Bắt đầu thực hiện
      } else {
        ToastAndroid.show('Đang xử lý, vui lòng chờ.', ToastAndroid.LONG); /* Show Toast thong bao cho nguoi dung */
      }
    }
  }

  checkValidateCodeWithoutLocation1() {
    // Check internet Connection
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected === false) {
        Alert.alert('Lỗi mạng!', 'Bạn chưa kết nối mạng hoặc mạng đang có vấn đề.\nVui lòng thử lại sau.');
      } else {
        if (this.state.inProgress === false) {
          this.setState({ inProgress: true }); // Update state
          this.validateCode();
        } else { ToastAndroid.show('Đang xử lý, vui lòng chờ.', ToastAndroid.LONG); /* Show Toast thong bao cho nguoi dung */ }
      }
    });
  }

  validateCode() {
    const navigate  = this.props.navigation.navigate,
          url       = WSConfig.MAIN_URL + WSConfig.GET_CODE_DATA_URL;

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
    }).then(resp => {
        let xmlResp  = resp._bodyText;               // Lay body text cua SOAP
        var respJson = Utils.respXml2Json(xmlResp);  // Convert xml string to Json
        
        navigate('MainScreen', { ...this.props, customerInfo: respJson });  // Redirect to MainScreen with some props
        this.setState({ inProgress: false, code: '' })                      // Update state
    }).catch(err => {
        console.error(err);
        this.setState({ inProgress: false }) // Update state:
    });
  }

  // ========================================================================================================================================
  // RENDER
  // ========================================================================================================================================

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

            <View style={styles.aIndView}>
              {this._renderActivityIndicator()}
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

              <TouchableOpacity onPress={() => this.checkValidateCodeWithoutLocation()} >
                <Text style={styles.btnText}>Xác nhận</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  logoView: { alignItems: 'center', },
  logoTitle: { fontSize: 18, color: Params.PRIMARY_COLOR },
  formView: { alignItems: 'center' },
  codeStyle: {
    width: Params.SCREEN_WIDTH / 1.5,
    paddingVertical: 13,
    backgroundColor: 'white',
    // Border styles
    borderStyle: 'solid',
    borderRadius: Params.SCREEN_WIDTH / 4,
    borderWidth: 1,
    borderColor: Params.PRIMARY_COLOR,
    // Text Styles
    fontSize: 25, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#303F9F',
  },
  btnText: { 
    backgroundColor: Params.PRIMARY_COLOR, 
    width: Params.SCREEN_WIDTH / 1.5, 
    marginTop: 20, 
    paddingVertical: 20, 
    borderRadius: Params.SCREEN_WIDTH / 4, 
    // Text style
    fontSize: 22, 
    fontWeight: 'bold', 
    color: 'white', 
    textAlign: 'center',
  },
  backgroundImage: { backgroundColor: '#ccc', flex: 1, resizeMode: 'cover', position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', },
  activityIndicator: { justifyContent: 'center', alignItems: 'center', },
  aIndView: { alignItems: 'center', height: 100, justifyContent: 'center' }
});

export default CodeScreen;
