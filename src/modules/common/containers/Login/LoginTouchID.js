/** @flow */
import React, {Component} from "react"
import {Image, Platform, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import {ActionSheet, Modal, Toast} from "antd-mobile-rn"
import TouchId from "react-native-touch-id"

import style from "../styles/Login/LoginTouchID"
import * as LoginActions from "../../actions/Login/Login"
import type {Syusrinf} from "../../interface/Syusrinf"


class LoginTouchID extends Component<any, any> {

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLogin) {
      this.jumpTo('MyHome')
      return false
    }
    return true
  }

  jumpTo = (route, routeFrom = undefined) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: route, params: {routeFrom: routeFrom}})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  showActionSheet = () => {
    let action = ['密码登录', '切换帐号', 'Cancel']
    if (this.props.isGestureEnabled) {
      action = ['手势登录', ...action]
    }
    ActionSheet.showActionSheetWithOptions(
      {
        options: action,
        cancelButtonIndex: action.length - 1,
      },
      (buttonIndex: any) => {
        if (action[buttonIndex] === '手势登录') {
          this.jumpTo('MyLoginGesture')
        } else if (action[buttonIndex] === '密码登录') {
          this.jumpTo('MyLoginPassword')
        } else if (action[buttonIndex] === '切换帐号') {
          this.jumpTo('MyLogin', 'MyLoginTouchID')
        }
      }
    )
  }

  touchIDCheck = () => {
    let touchID = this.props.touchIDType === 'FaceID' ? '面容ID' : '指纹ID'
    let config = {
      title: touchID + '验证',//android
      sensorDescription: touchID,//android
      cancelText: '取消',//android
      fallbackLabel: '',//ios only
    }

    TouchId.authenticate('通过指纹按键验证已有手机指纹', config)
      .then(() => {
        this.props.login(this.props.user)
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

  getPhoto = () => {
    //TODO
    const {photoPath = ''} = this.props
    if (photoPath && photoPath.length > 0) {
      return <Image style={style.image} source={{uri: photoPath}}/>
    }
    return <Image style={style.image} source={require('../../../../../assets/my/profile/logo01.png')}/>
  }

  render() {
    const mobile = this.props.user.suimobile
    const {touchIDType} = this.props
    let touchID = touchIDType === 'FaceID' ? '面容ID' : '指纹ID'

    return (
      <View style={style.view}>

        {this.getPhoto()}

        <Text style={style.mobile}>{mobile}</Text>

        <TouchableOpacity style={style.view2} onPress={this.touchIDCheck} activeOpacity={0.8}>
          <Image source={require('../../../../../assets/common/login/touchid.png')} style={style.view2TouchID}/>
          <Text style={style.view2Text}>点击进行{touchID}登录</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.showActionSheet}>
          <Text style={style.moreText}>更多</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

LoginTouchID.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isGestureEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
  }),
  dispatch => ({
    login: (data: Syusrinf) => dispatch(LoginActions.login(data)),
  })
)(LoginTouchID)