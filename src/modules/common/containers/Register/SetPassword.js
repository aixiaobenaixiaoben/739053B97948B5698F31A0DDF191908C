/** @flow */
import React, {Component} from "react"
import {ScrollView, Text} from "react-native"
import style from "../styles/Register/Register"
import Button from "../../components/Button"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import * as actions from "../../actions/Register/SetPassword"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import type {Syusrinf} from "../../interface/Syusrinf"


class SetPassword extends Component<any, any> {

  state = {
    password1: '',
    password2: '',
    username: '',
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.version !== this.props.version) {
      this.next()
      return false
    }
    return true
  }

  submit = () => {
    const {username, password1, password2} = this.state
    const regName = /^[\u4E00-\u9FA5A-Za-z0-9]{1,16}$/
    if (!regName.test(username)) {
      Modal.alert('', '用户名格式不正确')
      return
    }
    const regularPassword = /^[A-Za-z0-9]{8,15}$/
    if (!regularPassword.test(password1)) {
      Modal.alert('', '密码格式不正确')
      return
    }
    if (password1 !== password2) {
      Modal.alert('', '两次输入登录密码不一致')
      return
    }
    let data: Syusrinf = {
      suimobile: this.props.navigation.getParam('mobile'),
      suipaswrd: password1,
      suiusrnam: username,
    }
    this.props.register(data)
  }

  backFunc = () => {
    this.props.navigation.navigate('RootTab')
  }

  next = () => {
    this.props.navigation.navigate('CommonRegisterResult', {
      success: true,
      title: '注册成功',
      description: '您已成功注册新账号',
      buttonText: '前往登录',
      backFunc: this.backFunc,
    })
  }

  render() {
    const {username, password1, password2} = this.state
    let canSubmit = username.length > 0 && password1.length > 0 && password2.length > 0

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} maxLength={16} clear placeholder="请输入用户名" autoCapitalize='none'
                     onChange={(username) => this.setState({username})}>
          </InputItem>
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
          温馨提示：{'\n\n'}登录密码支持8-15位数字、字母(区分大小写)的组合{'\n\n'}用户名支持1-16位中文、数字、字母(区分大小写)的组合
        </Text>
      </ScrollView>
    )
  }
}

SetPassword.propTypes = {
  version: PropTypes.number.isRequired,
  register: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    version: state.common.registerSetPassword.version,
  }),
  dispatch => ({
    register: (data: Syusrinf) => dispatch(actions.register(data)),
  })
)(SetPassword)
