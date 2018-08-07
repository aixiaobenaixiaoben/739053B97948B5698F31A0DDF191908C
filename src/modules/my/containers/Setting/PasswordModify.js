/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import Button from "../../../common/components/Button"
import * as actions from "../../actions/Setting/PasswordModify"


class PasswordModify extends Component<any, any> {

  state = {
    password1: '',
    password2: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isPasswordModifySuc) {
      this.props.passwordModifyReset()
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
    this.props.passwordModify({
      mobile: this.props.mobile,
      password: password1,
    })
  }

  next = () => {
    this.props.navigation.navigate('MyPasswordModifyResult', {
      isSuccess: true,
      title: '修改成功',
      description: '您已经成功修改登录密码',
    })
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem type='password' maxLength={15} clear placeholder="8-15位数字、字母或下划线组成"
                     value={this.state.password1} onChange={(password1) => this.setState({password1})}>
            登录密码
          </InputItem>
          <InputItem type='password' maxLength={15} clear placeholder="请再次输入登录密码"
                     value={this.state.password2} onChange={(password2) => this.setState({password2})}>
            确认密码
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Button text='提交' style={{margin: 10}} onPress={this.submit}/>
      </ScrollView>
    )
  }
}

PasswordModify.propTypes = {
  isPasswordModifySuc: PropTypes.bool.isRequired,
  mobile: PropTypes.string.isRequired,

  passwordModify: PropTypes.func.isRequired,
  passwordModifyReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    mobile: state.common.login.mobile,
    isPasswordModifySuc: state.my.passwordModify.isPasswordModifySuc,
  }),
  dispatch => ({
    passwordModify: (data) => dispatch(actions.passwordModify(data)),
    passwordModifyReset: () => dispatch(actions.passwordModifyReset()),
  })
)(PasswordModify)