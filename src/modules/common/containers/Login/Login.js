/** @flow */
import React, {Component} from "react"
import {ScrollView, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {InputItem, List, Modal} from "antd-mobile-rn"

import * as actions from "../../actions/Login/Login"
import {COLOR_GRAY_LIGHT} from "../../../../Style"
import style from "../styles/Login/Login"
import Button from "../../components/Button"
import type {Syusrinf} from "../../interface/Syusrinf"


class Login extends Component<any, any> {

  state = {
    mobile: '',
    password: '',
  }

  componentWillMount() {
    const routeFrom = this.props.navigation.getParam('routeFrom')
    if (routeFrom === undefined && this.props.user.suiseqcod.length > 0) {
      if (this.props.isTouchIDSupported && this.props.isTouchIDEnabled) {
        this.jumpTo('MyLoginTouchID')
      } else if (this.props.isGestureEnabled) {
        this.jumpTo('MyLoginGesture')
      } else {
        this.jumpTo('MyLoginPassword')
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLogin) {
      this.jumpTo('MyHome')
      return false
    }
    return true
  }

  jumpTo = (route) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: route})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  register = () => {
    this.props.navigation.navigate('CommonRegister')
  }

  resetPassword = () => {
    this.props.navigation.navigate('CommonResetPassword')
  }

  login = () => {
    const {mobile, password} = this.state
    if (mobile.length === 0 || password.length === 0) {
      Modal.alert('', '手机号或者密码不能为空')
      return
    }
    if (mobile.length !== 11) {
      Modal.alert('', '请输入11位手机号')
      return
    }
    if (password.length < 8) {
      Modal.alert('', '密码长度不能小于8位')
      return
    }
    const regular = /^[0-9]{11}$/
    if (!regular.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    const reg = /^[A-Za-z0-9_]{8,15}$/
    if (!reg.test(password)) {
      Modal.alert('', '密码格式不正确,必须为只包含数字、大小写字母或下划线的8-15位字符串')
      return
    }
    let data: Syusrinf = {
      suimobile: mobile,
      suipaswrd: password,
    }
    this.props.login(data)
  }

  render() {
    const routeFrom = this.props.navigation.getParam('routeFrom')

    return (
      <View style={style.rootView}>
        <ScrollView contentContainerStyle={style.view} keyboardShouldPersistTaps='handled'>

          <View style={style.top}>
            <FontAwesome name='user-circle' size={60} color={COLOR_GRAY_LIGHT}/>
          </View>

          <View style={style.middle}>
            <List style={style.list}>
              <InputItem type='number' maxLength={11} clear placeholder="手机号"
                         value={this.state.mobile} onChange={(mobile) => this.setState({mobile})}/>
              <InputItem type='password' maxLength={15} clear placeholder="请输入登录密码"
                         value={this.state.password} onChange={(password) => this.setState({password})}/>
            </List>

            <View style={style.submitView}>
              <Button text='注册' style={style.submitButton} onPress={this.register}/>
              <Button text='登录' style={style.submitButton} onPress={this.login}/>
            </View>

            <View style={style.forgetView}>
              <Button text='忘记密码' style={style.forgetButton} textStyle={style.forgetButtonText}
                      onPress={this.resetPassword}/>
              {routeFrom !== undefined &&
              <Button text='返回' style={style.forgetButton}
                      textStyle={style.forgetButtonText} onPress={() => this.jumpTo(routeFrom)}/>
              }
            </View>
          </View>

        </ScrollView>
      </View>
    )
  }
}

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isGestureEnabled: PropTypes.bool.isRequired,
  isTouchIDSupported: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
  }),
  dispatch => ({
    login: (data: Syusrinf) => dispatch(actions.login(data)),
  })
)(Login)