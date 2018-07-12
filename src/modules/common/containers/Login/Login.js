/** @flow */
import React, {Component} from "react"
import {View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {InputItem, List, Modal} from "antd-mobile-rn"

import * as actions from "../../actions/Login/Login"
import {COLOR_GRAY_LIGHT} from "../../../../Style"
import style from "../styles/Login/Login"
import Button from "../../components/Button"


class Login extends Component<any, any> {

  state = {
    mobile: '',
    password: '',
  }

  componentWillMount() {
    const routeFrom = this.props.navigation.getParam('routeFrom')
    if (routeFrom === undefined && this.props.loginID.length > 0) {
      this.jumpTo('MyLoginOption')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isLogin) {
      this.jumpTo('MyHome')
      return false
    }
    return true
  }

  jumpTo = (route) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  login = () => {
    const { mobile, password } = this.state
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
    this.props.login(this.state)
  }

  register = () => {
    this.props.navigation.navigate('register')
  }

  resetPassword = () => {
    this.props.navigation.navigate('resetPassword')
  }

  render() {
    const routeFrom = this.props.navigation.getParam('routeFrom')

    return (
    <View style={style.view}>

      <View style={style.top}>
        <FontAwesome name='user-circle' size={60} color={COLOR_GRAY_LIGHT}/>
      </View>

      <View style={style.middle}>
        <List style={style.list}>
          <InputItem type='number' maxLength={11} clear placeholder="手机号"
                     value={this.state.mobile} onChange={(mobile) => this.setState({mobile})}/>
          <InputItem type='password' maxLength={15} clear placeholder="请输入登录密码"
                     value={this.state.password} onChange={(password) => this.setState({password})} />
        </List>

        <View style={style.submitView}>
          <Button text='注册' style={style.submitButton} onPress={this.register}/>
          <Button text='登录' style={style.submitButton} onPress={this.login} />
        </View>

        <View style={style.forgetView}>
          <Button text='忘记密码' style={style.forgetButton} textStyle={style.forgetButtonText} onPress={this.resetPassword}/>
          {routeFrom !== undefined &&
          <Button text='返回指纹登录' style={[style.forgetButton, style.forgetButtonRight]}
                  textStyle={style.forgetButtonText} onPress={() => this.jumpTo('MyLoginOption')} />
          }
        </View>
      </View>

      <View style={style.bottom}>
      </View>

    </View>
    )
  }
}

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  loginID: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    loginID: state.common.login.loginID,
  }),
  dispatch => ({
    login: (data) => dispatch(actions.login(data)),
  })
)(Login)