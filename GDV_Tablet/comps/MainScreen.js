import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Component
import CustomerInfo from "./CustomerInfo";
import Signature    from "./Signature";

class MainScreen extends Component {

  static navigationOptions = {
    title: 'Xác nhận thông tin khách hàng',
    headerStyle: { backgroundColor: '#303F9F' },
    headerTintColor: 'white'
  }

  render() {
    const navigate      = this.props.navigation.navigate;
    const customerInfo  = this.props.navigation.state.params.customerInfo;
    var transactionInfo = {
      code: customerInfo.code,
      folder: customerInfo.folder,
      isdn: customerInfo.isdn
    }

    return (
      <View style={styles.container}>
        <CustomerInfo style={styles.customerView} customerInfo={customerInfo}/>
        <Signature style={styles.signatureView} navigate={navigate} transactionInfo={transactionInfo}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  customerView: {
    flex: 1,
  },
  signatureView: {
    flex: 1
  }
});

export default MainScreen;
