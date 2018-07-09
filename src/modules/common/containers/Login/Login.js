/** @flow */
import React, {Component} from "react"
import {View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {InputItem, List} from "antd-mobile-rn"

import * as actions from "../../actions/Login/Login"
import {COLOR_GRAY_LIGHT} from "../../Constants"
import style from "../styles/Login/Login"
import Button from "../../components/Button"


class Login extends Component<any, any> {

  state = {
    mobile: '',
    password: '',
  }

  onChangeMobile = (mobile) => {
    this.setState({mobile})
  }

  onChangePassword = (password) => {
    this.setState({password})
  }

  jumpTo = (route) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: route })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  login = () => {
    this.props.login()
  }

  render() {
    if (this.props.isLogin) {
      this.jumpTo('MyHome')
    }

    const routeFrom = this.props.navigation.getParam('routeFrom')

    return (
    <View style={style.view}>

      <View style={style.top}>
        <FontAwesome name='user-circle' size={60} color={COLOR_GRAY_LIGHT}/>
      </View>

      <View style={style.middle}>
        <List style={style.list}>
          <InputItem
            type='number'
            maxLength={11}
            clear
            value={this.state.mobile}
            onChange={this.onChangeMobile}
            placeholder="手机号"
          />
          <InputItem
            type='password'
            maxLength={15}
            clear
            value={this.state.password}
            onChange={this.onChangePassword}
            placeholder="请输入登录密码"
          />
        </List>

        <View style={style.submitView}>
          <Button
            text='注册'
            onPress={() => this.props.navigation.navigate('register')}
            style={style.submitButton}
          />
          <Button
            text='登录'
            onPress={this.login}
            style={style.submitButton}
          />
        </View>

        <View style={style.forgetView}>
          <Button
            style={style.forgetButton}
            textStyle={style.forgetButtonText}
            text='忘记密码'
            onPress={() => alert('忘记密码')}
          />
          {routeFrom !== undefined &&
          <Button
            style={[style.forgetButton, style.forgetButtonRight]}
            textStyle={style.forgetButtonText}
            text='返回指纹登录'
            onPress={() => this.jumpTo('MyLoginOption')}
          />}
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
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
  }),
  dispatch => ({
    login: () => dispatch(actions.login()),
  })
)(Login)