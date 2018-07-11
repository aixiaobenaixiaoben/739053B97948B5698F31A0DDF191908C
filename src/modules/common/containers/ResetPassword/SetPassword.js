/** @flow */
import React, {Component} from "react"
import {View} from "react-native"
import style from "../styles/Register/Register"
import Button from "../../components/Button"
import {InputItem, List, Modal} from "antd-mobile-rn"
import * as actions from "../../actions/ResetPassword/SetPassword"
import {connect} from "react-redux"
import PropTypes from "prop-types"


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
    const { password1, password2 } = this.state
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
    this.props.resetPassword({
      mobile: this.props.navigation.getParam('mobile'),
      password: password1,
    })
  }

  next = () => {
    this.props.navigation.navigate('CommonResetPasswordResult', {
      onPressFunc: this.props.navigation.getParam('backToLoginFunc'),
      isSuccess: true,
      title: '重置成功',
      description: '您已经成功重置登录密码'
    })
  }

  render() {
    return (
      <View style={style.view}>

        <List style={style.list}>
          <InputItem type='password' maxLength={15} clear placeholder="请设置8-15位数字或者字母密码" style={{ borderBottomWidth: 1 }}
                     value={this.state.password1} onChange={(password1) => this.setState({password1})} >
            登录密码
          </InputItem>
          <InputItem type='password' maxLength={15} clear placeholder="请再次输入登录密码"
                     value={this.state.password2} onChange={(password2) => this.setState({password2})} >
            确认密码
          </InputItem>
        </List>

        <Button text='提交' style={style.button} onPress={this.submit} />
      </View>
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
