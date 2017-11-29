import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';

import { Utils, Params } from "../utils/Utils.js";

const { width, height } = Dimensions.get('window');

class CodeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    }
  }

  static navigationOptions = {
    title: 'Mã giao dịch',
    headerStyle: { backgroundColor: '#303F9F'},
    headerTintColor: 'white'
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Params.SECONDARY_COLOR}
          barStyle="light-content"
        />
        <Image source={require('../public/images/bg.jpg')} style={styles.backgroundImage} />
        <View style={{flex: 0}}>
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
            <TouchableOpacity
              onPress={() => { navigate('MainScreen', {...this.props}) }}
            >
              <Text style={styles.btnText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </View>
    );
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
