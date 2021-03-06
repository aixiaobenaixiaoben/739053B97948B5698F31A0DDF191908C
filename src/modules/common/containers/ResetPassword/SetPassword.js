/** @flow */
import React, {Component} from "react"
import {ScrollView, Text} from "react-native"
import style from "../styles/ResetPassword/ResetPassword"
import Button from "../../components/Button"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import * as actions from "../../actions/ResetPassword/SetPassword"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import type {Syusrinf} from "../../interface/Syusrinf"
import * as loginActions from "../../actions/Login/Login"


class SetPassword extends Component<any, any> {

  state = {
    password1: '',
    password2: '',
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.version !== this.props.version) {
      this.next()
      return false
    }
    return true
  }

  submit = () => {
    const {password1, password2} = this.state
    const reg = /^[A-Za-z0-9]{8,15}$/
    if (!reg.test(password1)) {
      Modal.alert('', '密码格式不正确')
      return
    }
    if (password1 !== password2) {
      Modal.alert('', '两次输入登录密码不一致')
      return
    }
    let user: Syusrinf = this.props.navigation.getParam('user')
    user.suipaswrd = password1
    this.props.resetPassword(user)
  }

  backFunc = () => {
    this.props.navigation.navigate('RootTab')
    if (this.props.isLogin) {
      this.props.logout()
    }
  }

  next = () => {
    let description = '您已成功重置登录密码'
    if (this.props.isLogin) {
      description += '，为保证账户安全，请重新登录。'
    }
    this.props.navigation.navigate('CommonResetPasswordResult', {
      success: true,
      title: '重置成功',
      description,
      buttonText: '前往登录',
      backFunc: this.backFunc,
    })
  }

  render() {
    const {password1, password2} = this.state
    let canSubmit = password1.length > 0 && password2.length > 0

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} type='password' maxLength={15} clear placeholder="请输入登录密码"
                     onChange={(password1) => this.setState({password1})}>
          </InputItem>
          <InputItem style={style.inputItem} type='password' maxLength={15} clear placeholder="请再次输入登录密码"
                     onChange={(password2) => this.setState({password2})}>
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Button text='提交' style={style.button} onPress={this.submit} disabled={!canSubmit}/>

        <Text style={style.comment}>
          温馨提示：{'\n\n'}登录密码支持8-15位数字、字母(区分大小写)的组合
        </Text>
      </ScrollView>
    )
  }
}

SetPassword.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  version: PropTypes.number.isRequired,
  resetPassword: PropTypes.func.isRequired,
  resetPasswordReset: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    version: state.common.resetPasswordSetPassword.version,
  }),
  dispatch => ({
    resetPassword: (data) => dispatch(actions.resetPassword(data)),
    logout: () => dispatch(loginActions.logout()),
  })
)(SetPassword)
