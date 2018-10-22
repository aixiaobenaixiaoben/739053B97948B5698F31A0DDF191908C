/** @flow */
import React, {Component} from "react"
import {Platform, ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {List, Switch, WhiteSpace} from "antd-mobile-rn"
import TouchId from "react-native-touch-id"
import {Modal, Toast} from "antd-mobile-rn/lib/index.native"

import * as actions from "../../../common/actions/Login/LoginTouchID"
import style from "../styles/Setting/GestureSetting"

const Item = List.Item

class TouchIDSetting extends Component<any, any> {

  onSwitchChange = (checked) => {
    if (checked) {
      this.checkTouchID()
    } else {
      this.props.touchIDDisabled()
    }
  }

  checkTouchID = () => {
    let touchID = this.props.touchIDType === 'FaceID' ? '面容ID' : '指纹ID'
    let config = {
      title: touchID + '验证',//android
      sensorDescription: touchID,//android
      cancelText: '取消',//android
      fallbackLabel: '',//ios only
    }

    TouchId.authenticate('通过指纹按键验证已有手机指纹', config)
      .then(() => {
        this.props.touchIDEnabled()
        Toast.success(touchID + '登录已启用.', 2)
      })
      .catch(error => {
        Platform.OS === 'ios' ? this.touchIDErrorIOS(error, touchID) : this.touchIDErrorAndroid(error, touchID)
      })
  }

  touchIDErrorIOS = (error, touchID) => {
    if (error.name === 'LAErrorUserCancel') {
      return
    }
    if (error.name === 'LAErrorTouchIDNotAvailable') {
      Modal.alert('提示', touchID + '未启用,请先到手机设置中开启.')
      return
    }
    if (error.name === 'RCTTouchIDNotSupported') {
      if (this.props.touchIDType === 'FaceID') {
        Modal.alert('提示', touchID + '未启用,请先到手机设置中开启.')
      } else {
        Modal.alert('提示', touchID + '未启用或者验证错误次数超限,请先到手机设置中开启.')
      }
      return
    }
    Toast.fail(touchID + '验证失败.', 2)
  }

  touchIDErrorAndroid = (error, touchID) => {
    if (error.details === 'cancelled') {
      return
    }
    if (error.details === 'Not supported') {
      Modal.alert('提示', touchID + '未启用,请先到手机设置中开启.')
      return
    }
    if (error.details === 'Too many attempts. Try again later.' || error.details === '尝试次数过多，请稍后重试。') {
      Modal.alert('提示', touchID + '尝试次数过多，请稍后重试。')
      return
    }
    if (error.details.indexOf('sensor disabled') !== -1 || error.details.indexOf('传感器已停用') !== -1) {
      Modal.alert('提示', touchID + '尝试次数过多。' + touchID + '传感器已停用。')
      return
    }
    if (error.details === 'failed') {
      Modal.alert('提示', touchID + '验证失败.')
    }
  }

  render() {
    const {isTouchIDEnabled, touchIDType} = this.props
    let touchMethod = touchIDType === 'FaceID' ? '面容ID登录' : '指纹ID登录'

    return (
      <ScrollView style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} extra={<Switch checked={isTouchIDEnabled} onChange={this.onSwitchChange}/>}>
            {touchMethod}
          </Item>
        </List>
      </ScrollView>
    )
  }
}

TouchIDSetting.propTypes = {
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.bool.isRequired]),
  touchIDEnabled: PropTypes.func.isRequired,
  touchIDDisabled: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
  }),
  dispatch => ({
    touchIDEnabled: () => dispatch(actions.touchIDEnabled()),
    touchIDDisabled: () => dispatch(actions.touchIDDisabled()),
  })
)(TouchIDSetting)