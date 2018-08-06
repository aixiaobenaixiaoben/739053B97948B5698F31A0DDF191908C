/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Button from "../../../common/components/Button"
import * as actions from "../../actions/Setting/PasswordModify"


class PasswordModifyCheck extends Component<any, any> {

  state = {
    password: '',
  }

  componentDidMount() {
    this.props.passwordModifyCheckReset()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isPasswordCheckSuc) {
      this.next()
      this.props.passwordModifyCheckReset()
      return false
    }
    return true
  }

  submit = () => {
    const {password} = this.state
    if (password.length === 0) {
      Modal.alert('', '请输入登录密码')
      return
    }
    if (password.length < 8) {
      Modal.alert('', '密码长度不能小于8位')
      return
    }
    const reg = /^[A-Za-z0-9_]{8,15}$/
    if (!reg.test(password)) {
      Modal.alert('', '密码格式不正确,必须为只包含数字、大小写字母或下划线的8-15位字符串')
      return
    }
    this.props.passwordModifyCheck({
      mobile: this.props.mobile,
      password: password,
    })
  }

  next = () => {
    this.props.navigation.navigate('MyPasswordModify')
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem type='password' maxLength={15} clear placeholder="请输入"
                     value={this.state.password} onChange={(password) => this.setState({password})}>
            登录密码
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Button text='下一步' style={{margin: 10}} onPress={this.submit}/>
      </ScrollView>
    )
  }
}

PasswordModifyCheck.propTypes = {
  isPasswordCheckSuc: PropTypes.bool.isRequired,
  mobile: PropTypes.string.isRequired,

  passwordModifyCheck: PropTypes.func.isRequired,
  passwordModifyCheckReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    mobile: state.common.login.mobile,
    isPasswordCheckSuc: state.my.passwordModify.isPasswordCheckSuc,
  }),
  dispatch => ({
    passwordModifyCheck: (data) => dispatch(actions.passwordModifyCheck(data)),
    passwordModifyCheckReset: () => dispatch(actions.passwordModifyCheckReset()),
  })
)(PasswordModifyCheck)
