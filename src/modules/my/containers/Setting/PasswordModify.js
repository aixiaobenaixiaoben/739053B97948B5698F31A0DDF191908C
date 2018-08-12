/** @flow */
import React, {Component} from "react"
import {ScrollView, Text} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import Button from "../../../common/components/Button"
import * as actions from "../../actions/Setting/PasswordModify"
import style from "../../../common/containers/styles/Register/Register"
import type {Syusrinf} from "../../../common/interface/Syusrinf"


class PasswordModify extends Component<any, any> {

  state = {
    password: '',
    password1: '',
    password2: '',
  }

  componentDidMount() {
    this.props.passwordModifyReset()
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
    const {password, password1, password2} = this.state
    const reg = /^[A-Za-z0-9_]{8,15}$/

    if (password.length === 0) {
      Modal.alert('', '请输入原密码')
      return
    }
    if (password.length < 8) {
      Modal.alert('', '原密码长度不能小于8位')
      return
    }
    if (!reg.test(password)) {
      Modal.alert('', '原密码格式不正确,必须为只包含数字、大小写字母或下划线的8-15位字符串')
      return
    }

    if (password1.length === 0 || password2.length === 0) {
      Modal.alert('', '请输入新密码和确认密码')
      return
    }
    if (password1.length < 8 || password2.length < 8) {
      Modal.alert('', '密码长度不能小于8位')
      return
    }
    if (password1 !== password2) {
      Modal.alert('', '新密码和确认密码不一致')
      return
    }
    if (!reg.test(password1)) {
      Modal.alert('', '新密码格式不正确,必须为只包含数字、大小写字母或下划线的8-15位字符串')
      return
    }

    let user = this.props.user
    user.suipaswrd = password
    user.newpaswrd = password1
    this.props.passwordModify(user)
  }

  next = () => {
    this.props.navigation.navigate('MyPasswordModifyResult', {
      routeTo: 'MySetting',
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
          <InputItem type='password' maxLength={15} clear placeholder="请输入"
                     value={this.state.password} onChange={(password) => this.setState({password})}>
            原密码
          </InputItem>
          <InputItem type='password' maxLength={15} clear placeholder="请输入"
                     value={this.state.password1} onChange={(password1) => this.setState({password1})}>
            新密码
          </InputItem>
          <InputItem type='password' maxLength={15} clear placeholder="请再次输入新密码"
                     value={this.state.password2} onChange={(password2) => this.setState({password2})}>
            确认新密码
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Text style={style.text}>密码组成: 8-15位数字、大小写字母或下划线的组合</Text>
        <Button text='提交' style={{margin: 10}} onPress={this.submit}/>
      </ScrollView>
    )
  }
}

PasswordModify.propTypes = {
  isPasswordModifySuc: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,

  passwordModify: PropTypes.func.isRequired,
  passwordModifyReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
    isPasswordModifySuc: state.my.passwordModify.isPasswordModifySuc,
  }),
  dispatch => ({
    passwordModify: (data: Syusrinf) => dispatch(actions.passwordModify(data)),
    passwordModifyReset: () => dispatch(actions.passwordModifyReset()),
  })
)(PasswordModify)
