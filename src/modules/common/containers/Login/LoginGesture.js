/** @flow */
import React, {Component} from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import {Gesture} from "react-native-gesture-login"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {ActionSheet, Modal} from "antd-mobile-rn"

import style from "../styles/Login/LoginGesture"
import * as LoginActions from "../../actions/Login/Login"
import * as actions from "../../actions/Login/LoginGesture"
import {COLOR_GRAY_LIGHT} from "../../../../Style"
import Button from "../../components/Button"
import type {Syusrinf} from "../../interface/Syusrinf"


class LoginGesture extends Component<any, any> {

  shouldComponentUpdate(nextProps, nextState) {
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
    if (this.props.isTouchIDSupported && this.props.isTouchIDEnabled) {
      if (this.props.touchIDType === 'FaceID') {
        action = ['面容ID登录', ...action]
      } else {
        action = ['指纹登录', ...action]
      }
    }
    ActionSheet.showActionSheetWithOptions(
      {
        options: action,
        cancelButtonIndex: action.length - 1,
      },
      (buttonIndex: any) => {
        if (action[buttonIndex] === '面容ID登录' || action[buttonIndex] === '指纹登录') {
          this.jumpTo('MyLoginTouchID')
        } else if (action[buttonIndex] === '密码登录') {
          this.jumpTo('MyLoginPassword')
        } else if (action[buttonIndex] === '切换帐号') {
          this.jumpTo('MyLogin', 'MyLoginGesture')
        }
      }
    )
  }

  onRelease = (password) => {
    if (password.length < 4) {
      Modal.alert('', '手势密码: 至少连接4个点.')
      return
    }
    if (password === this.props.gesturePassword) {
      this.props.login(this.props.user)
      this.props.gestureCountReset()

    } else {

      const count = this.props.count - 1
      this.props.gestureCountDecrease()
      if (count === 0) {
        Modal.alert('', '手势密码错误:您手势密码输入错误次数已达上限.')
      } else if (count <= -1) {
        this.props.gestureDisable()
        Modal.alert('', '您手势密码输入错误次数超限.', [{text: '确定', onPress: () => this.jumpTo('MyLoginPassword')}])
      } else {
        Modal.alert('', `手势密码错误:您还可以尝试${count}次.`)
      }
    }
  }

  render() {
    const mobile = this.props.user.suimobile

    return (
      <View style={style.view}>

        <View style={style.top}>
          <FontAwesome name='user-circle' size={60} color={COLOR_GRAY_LIGHT}/>
          <View style={style.info}>
            <Text style={style.infoText}>用户手机号</Text>
            <Text style={style.infoText}>{mobile}</Text>
          </View>
        </View>

        <View style={style.middle}>
          <Gesture onRelease={this.onRelease}/>
        </View>

        <View style={style.bottom}>
          <Button text='更多' style={style.moreButton} textStyle={style.moreButtonText} onPress={this.showActionSheet}/>
        </View>
      </View>
    )
  }
}

LoginGesture.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  gesturePassword: PropTypes.string.isRequired,
  isTouchIDSupported: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,

  login: PropTypes.func.isRequired,
  gestureDisable: PropTypes.func.isRequired,
  gestureCountReset: PropTypes.func.isRequired,
  gestureCountDecrease: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    count: state.common.loginGesture.count,
    gesturePassword: state.common.loginGesture.gesturePassword,
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
  }),
  dispatch => ({
    login: (data: Syusrinf) => dispatch(LoginActions.login(data)),
    gestureDisable: () => dispatch(actions.gestureDisable()),
    gestureCountReset: () => dispatch(actions.gestureCountReset()),
    gestureCountDecrease: () => dispatch(actions.gestureCountDecrease()),
  })
)(LoginGesture)