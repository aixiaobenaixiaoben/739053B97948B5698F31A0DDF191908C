/** @flow */
import React, {Component} from "react"
import {ScrollView, Text} from "react-native"
import style from "../styles/Register/Register"
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isResetPasswordSuc) {
      this.props.resetPasswordReset()
      this.next()
      return false
    }
    return true
  }

  submit = () => {
    const {password1, password2} = this.state
    if (password1.length === 0 || password2.length === 0) {
      Modal.alert('', '请输入登录密码和确认密码')
      return
    }
    if (password1.length < 8 || password2.length < 8) {
      Modal.alert('', '密码长度不能小于8位')
      return
    }
    if (password1 !== password2) {
      Modal.alert('', '登录密码和确认密码不一致')
      return
    }
    const reg = /^[A-Za-z0-9_]{8,15}$/
    if (!reg.test(password1)) {
      Modal.alert('', '密码格式不正确,必须为只包含数字、大小写字母或下划线的8-15位字符串')
      return
    }

    let user: Syusrinf = this.props.navigation.getParam('user')
    user.suipaswrd = password1
    this.props.resetPassword(user)
  }

  next = () => {
    this.props.navigation.navigate('CommonResetPasswordResult', {
      routeTo: 'RootTab',
      isSuccess: true,
      title: '重置成功',
      description: '您已经成功重置登录密码'
    })
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>

        <WhiteSpace size="lg"/>
        <List>
          <InputItem type='password' maxLength={15} clear placeholder="请输入"
                     value={this.state.password1} onChange={(password1) => this.setState({password1})}>
            登录密码
          </InputItem>
          <InputItem type='password' maxLength={15} clear placeholder="请再次输入登录密码"
                     value={this.state.password2} onChange={(password2) => this.setState({password2})}>
            确认密码
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Text style={style.text}>密码组成: 8-15位数字、大小写字母或下划线的组合</Text>
        <Button text='提交' style={style.button} onPress={this.submit}/>
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
