import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Utils
import { Utils, Params } from "../utils/Utils.js";
const Log = Utils.log;
// Component
import RowInfo from "./RowInfo";

class CustomerInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      longitude: 'unknown',
      latitude: 'unknown',
    }

    // Lay toa do vi tri cua nguoi dung
    this.getUserLocation();
  }

  // ========================================================================================================================================
  // FUNCTION
  // ========================================================================================================================================

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      success => {
        this.setState({
          longitude: success.coords.longitude,
          latitude: success.coords.latitude
        });
      },
      error => { console.error(error); }
    );
  }

  // ========================================================================================================================================
  // RENDER
  // ========================================================================================================================================

  render() {
    Log('state: ', this.state);
    return (
      <View style={styles.container}>
        <RowInfo label='Họ tên:' value={this.props.customerInfo.hoten} />
        <RowInfo label='Số điện thoại:' value={this.props.customerInfo.isdn} />
        <RowInfo label='Ngày sinh:' value={this.props.customerInfo.ngaysinh} />
        <RowInfo label='Giới tính:' value={this.props.customerInfo.gioitinh} />
        <RowInfo label='Chứng minh nhân dân số:' value={this.props.customerInfo.cmnd} />
        <RowInfo label='Ngày cấp:' value={this.props.customerInfo.ngaycap} />
        <RowInfo label='Nơi cấp:' value={this.props.customerInfo.noicap} />
        <RowInfo label='Đối tượng:' value={this.props.customerInfo.doituong} />
        <RowInfo label='Địa chỉ:' value={this.props.customerInfo.diachi} />
        <RowInfo label='Email:' value={this.props.customerInfo.email} />
        <RowInfo label='Liên hệ:' value={this.props.customerInfo.lienhe} />
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
    width: Params.SCREEN_WIDTH
  },
});

export default CustomerInfo;
