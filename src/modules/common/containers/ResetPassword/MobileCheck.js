/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import style from "../styles/ResetPassword/ResetPassword"
import Button from "../../components/Button"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import * as actions from "../../actions/ResetPassword/MobileCheck"
import type {Syusrinf} from "../../interface/Syusrinf"
import type {Syvrymbl} from "../../interface/Syvrymbl"


class MobileCheck extends Component<any, any> {

  state = {
    mobile: '',
    code: '',
  }

  componentDidMount() {
    this.props.mobileCheckReset()
  }

  shouldComponentUpdate(nextProps) {
    if (!!nextProps.user.suiseqcod) {
      this.next(nextProps)
      this.props.mobileCheckReset()
      return false
    }
    return true
  }

  mobileCheckSend = () => {
    let {mobile} = this.state
    const regular = /^[0-9]{11}$/
    if (!regular.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    if (this.props.isLogin && this.props.loginUser && this.props.loginUser.suimobile !== mobile) {
      Modal.alert('', '登录状态下只能重置当前账户的登录密码!')
      return
    }
    this.props.mobileCheckSend({suimobile: mobile})
  }

  mobileCheck = () => {
    let {mobile, code} = this.state
    const regularMobile = /^[0-9]{11}$/
    if (!regularMobile.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    const regularCode = /^[0-9]{6}$/
    if (!regularCode.test(code)) {
      Modal.alert('', '验证码格式不正确')
      return
    }
    if (mobile !== this.props.mobile) {
      Modal.alert('', '验证码错误')
      return
    }
    this.props.mobileCheck({svmmobile: mobile, svmvrycod: code})
  }

  next = (nextProps) => {
    this.props.navigation.navigate('CommonResetPasswordSetPassword', {
      user: nextProps.user,
    })
  }

  render() {
    const {mobile, code} = this.state
    let canSubmit = mobile.length > 0 && code.length > 0

    let {count} = this.props
    let executing = count > 0

    let text = count === -1 ? '发送验证码' : '重新发送'
    let executingText = count + 'S重新发送'
    let extraButton = <Button style={style.extraButton} textStyle={style.extraButtonText}
                              executing={executing} executingText={executingText}
                              text={text} onPress={this.mobileCheckSend}/>

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size='lg'/>
        <List>
          <InputItem style={style.inputItem} type='number-pad' maxLength={11} clear placeholder="请输入本人手机号码"
                     onChange={(mobile) => this.setState({mobile})}>
          </InputItem>
          <InputItem style={style.inputItem} type='number-pad' maxLength={6} clear placeholder="请输入验证码"
                     onChange={(code) => this.setState({code})} extra={extraButton}>
          </InputItem>
        </List>

        <Button text='下一步' style={style.button} onPress={this.mobileCheck} disabled={!canSubmit}/>
      </ScrollView>
    )
  }
}

MobileCheck.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  loginUser: PropTypes.object.isRequired,
  mobile: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  mobileCheckSend: PropTypes.func.isRequired,
  mobileCheck: PropTypes.func.isRequired,
  mobileCheckReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    loginUser: state.common.login.user,
    mobile: state.common.resetPasswordMobileCheck.mobile,
    user: state.common.resetPasswordMobileCheck.user,
    count: state.common.resetPasswordMobileCheck.count,
  }),
  dispatch => ({
    mobileCheckSend: (data: Syusrinf) => dispatch(actions.mobileCheckSend(data)),
    mobileCheck: (data: Syvrymbl) => dispatch(actions.mobileCheck(data)),
    mobileCheckReset: () => dispatch(actions.mobileCheckReset()),
  })
)(MobileCheck)
