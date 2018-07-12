/** @flow */
import React, {Component} from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {InputItem, List} from "antd-mobile-rn"
import {COLOR_GRAY_LIGHT} from "../../../../Style"
import style from "../styles/Login/LoginPassword"
import Button from "../../components/Button"
import {Modal} from "antd-mobile-rn/lib/index.native"
import * as actions from "../../actions/Login/Login"


class LoginPassword extends Component<any, any> {

  state = {
    password: '',
  }

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
      actions: [NavigationActions.navigate({ routeName: route, params: {routeFrom: routeFrom} })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  resetPassword = () => {
    this.props.navigation.navigate('resetPassword')
  }

  login = () => {
    const { password } = this.state
    if (password.length === 0) {
      Modal.alert('', '请输入密码')
      return
    }
    if (password.length < 8) {
      Modal.alert('', '密码长度不能小于8位')
      return
    }
    this.props.login({
      mobile: this.props.mobile,
      password,
    })
  }

  showChoice = () => {
    this.jumpTo('MyLogin', 'MyLoginPassword')
  }

  render() {
    const { mobile } = this.props

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
        <List style={style.list}>
          <InputItem type='password' maxLength={15} clear placeholder="请输入登录密码"
                     value={this.state.password} onChange={(password) => this.setState({password})} />
        </List>

        <View style={style.submitView}>
          <Button text='登录' style={style.submitButton} onPress={this.login} />
        </View>

        <View style={style.forgetView}>
          <Button text='忘记密码' style={style.forgetButton} textStyle={style.forgetButtonText} onPress={this.resetPassword}/>
          <Button text='切换帐号' style={[style.forgetButton, style.forgetButtonRight]}
                  textStyle={style.forgetButtonText} onPress={this.showChoice} />
        </View>
      </View>

      <View style={style.bottom}>
      </View>

    </View>
    )
  }
}

LoginPassword.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  loginID: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    loginID: state.common.login.loginID,
    mobile: state.common.login.mobile,
  }),
  dispatch => ({
    login: (data) => dispatch(actions.login(data)),
  })
)(LoginPassword)