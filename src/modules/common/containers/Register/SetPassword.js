/** @flow */
import React, {Component} from "react"
import {ScrollView, Text} from "react-native"
import style from "../styles/Register/Register"
import Button from "../../components/Button"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import * as actions from "../../actions/Register/SetPassword"
import {connect} from "react-redux"
import PropTypes from "prop-types"


class SetPassword extends Component<any, any> {

  state = {
    password1: '',
    password2: '',
    username: '',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isRegisterSuc) {
      this.props.registerReset()
      this.next()
      return false
    }
    return true
  }

  submit = () => {
    const {username, password1, password2} = this.state
    if (username.length === 0) {
      Modal.alert('', '请输入用户名')
      return
    }
    const regName = /^[\u4E00-\u9FA5A-Za-z0-9_]{2,16}$/
    if (!regName.test(username)) {
      Modal.alert('', '用户名格式不正确')
      return
    }
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
    this.props.register({
      mobile: this.props.navigation.getParam('mobile'),
      password: password1,
      username,
    })
  }

  next = () => {
    this.props.navigation.navigate('CommonRegisterResult', {
      routeTo: 'RootTab',
      isSuccess: true,
      title: '注册成功',
      description: '您已经完成注册,请前往登录'
    })
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>

        <WhiteSpace size="lg"/>
        <List>
          <InputItem maxLength={16} clear placeholder="请输入"
                     value={this.state.username} onChange={(username) => this.setState({username})}>
            用户名
          </InputItem>
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

        <Text style={style.text}>用户名组成: 2-16位中文、数字、大小写字母或下划线的组合</Text>
        <Text style={style.text}>密码组成: 8-15位数字、大小写字母或下划线的组合</Text>
        <Button text='提交' style={style.button} onPress={this.submit}/>
      </ScrollView>
    )
  }
}

SetPassword.propTypes = {
  isRegisterSuc: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  registerReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isRegisterSuc: state.common.registerSetPassword.isRegisterSuc,
  }),
  dispatch => ({
    register: (data) => dispatch(actions.register(data)),
    registerReset: () => dispatch(actions.registerReset()),
  })
)(SetPassword)
