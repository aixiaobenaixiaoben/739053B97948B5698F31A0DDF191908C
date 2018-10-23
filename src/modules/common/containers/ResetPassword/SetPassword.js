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


class SetPassword extends Component<any, any> {

  state = {
    password1: '',
    password2: '',
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isResetPasswordSuc) {
      this.props.resetPasswordReset()
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
  }

  next = () => {
    this.props.navigation.navigate('CommonResetPasswordResult', {
      success: true,
      title: '操作成功',
      description: '您已成功重置登录密码',
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
                     value={password1} onChange={(password1) => this.setState({password1})}>
          </InputItem>
          <InputItem style={style.inputItem} type='password' maxLength={15} clear placeholder="请再次输入登录密码"
                     value={password2} onChange={(password2) => this.setState({password2})}>
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Button text='提交' style={style.button} onPress={this.submit} disabled={!canSubmit}/>

        <Text style={style.comment}>
          温馨提示：{'\n'}登录密码支持8-15位数字、字母(区分大小写)的组合
        </Text>
      </ScrollView>
    )
  }
}

SetPassword.propTypes = {
  isResetPasswordSuc: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
  resetPasswordReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isResetPasswordSuc: state.common.resetPasswordSetPassword.isResetPasswordSuc,
  }),
  dispatch => ({
    resetPassword: (data) => dispatch(actions.resetPassword(data)),
    resetPasswordReset: () => dispatch(actions.resetPasswordReset()),
  })
)(SetPassword)
