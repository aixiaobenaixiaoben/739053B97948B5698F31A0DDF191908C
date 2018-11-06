/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import Button from "../../../common/components/Button"
import * as actions from "../../actions/Setting/PasswordModify"
import * as loginActions from "../../../common/actions/Login/Login"
import style from "../styles/Setting/PasswordModify"
import type {Syusrinf} from "../../../common/interface/Syusrinf"


class PasswordModify extends Component<any, any> {

  state = {
    password: '',
    password1: '',
    password2: '',
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.user.suipaswrd !== this.props.user.suipaswrd) {
      this.next()
      return false
    }
    return true
  }

  submit = () => {
    const {password, password1, password2} = this.state
    const regular = /^[A-Za-z0-9]{8,15}$/
    if (!regular.test(password)) {
      Modal.alert('', '原登录密码格式不正确')
      return
    }
    if (!regular.test(password1)) {
      Modal.alert('', '新登录密码格式不正确')
      return
    }
    if (password1 !== password2) {
      Modal.alert('', '确认密码和新登录密码不一致')
      return
    }
    this.props.passwordModify({
      ...this.props.user,
      suipaswrd: password,
      newpaswrd: password1
    })
  }

  goToResetPassword = () => {
    this.props.navigation.navigate('CommonResetPassword')
  }

  backFunc = () => {
    this.props.navigation.navigate('RootTab')
    this.props.logout()
  }

  next = () => {
    this.props.navigation.navigate('MySettingResult', {
      success: true,
      title: '修改成功',
      description: '您已成功修改登录密码，为保证账户安全，请重新登录。',
      buttonText: '前往登录',
      backFunc: this.backFunc,
      navigationTitle: '修改登录密码',
    })
  }

  render() {
    const {password, password1, password2} = this.state
    let canSubmit = password.length > 0 && password1.length > 0 && password2.length > 0

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} type='password' maxLength={15} clear placeholder="请输入原登录密码"
                     onChange={(password) => this.setState({password})}>
          </InputItem>
        </List>

        <View style={style.forgetView}>
          <TouchableOpacity onPress={this.goToResetPassword}>
            <Text style={style.forgetViewText}>忘记密码</Text>
          </TouchableOpacity>
        </View>

        <List>
          <InputItem style={style.inputItem} type='password' maxLength={15} clear placeholder="请输入新登录密码"
                     onChange={(password1) => this.setState({password1})}>
          </InputItem>
          <InputItem style={style.inputItem} type='password' maxLength={15} clear placeholder="请再次输入新登录密码"
                     onChange={(password2) => this.setState({password2})}>
          </InputItem>
        </List>

        <Button text='提交' style={style.button} onPress={this.submit} disabled={!canSubmit}/>

        <Text style={style.comment}>
          温馨提示：{'\n\n'}登录密码支持8-15位数字、字母(区分大小写)的组合
        </Text>
      </ScrollView>
    )
  }
}

PasswordModify.propTypes = {
  user: PropTypes.object.isRequired,
  passwordModify: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
  }),
  dispatch => ({
    passwordModify: (data: Syusrinf) => dispatch(actions.passwordModify(data)),
    logout: () => dispatch(loginActions.logout()),
  })
)(PasswordModify)
