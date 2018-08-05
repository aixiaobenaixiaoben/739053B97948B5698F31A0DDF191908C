/** @flow */
import React, {Component} from "react"
import {StatusBar, View} from "react-native"
import {connect} from "react-redux"
import style from "../styles/Register/Register"
import Button from "../../components/Button"
import {InputItem, List, Modal} from "antd-mobile-rn"
import PropTypes from "prop-types"
import * as actions from "../../actions/ResetPassword/MobileCheck"
import HeaderBackImage from "../../components/HeaderBackImage"


class MobileCheck extends Component<any, any> {

  timer: any
  state = {
    mobile: '',
    code: '',
    disabled: false,
    timerLeft: 0,
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
    this.props.mobileCheckReset()
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('default')
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isMobileCheckSuc) {
      this.next()
      this.props.mobileCheckReset()
      return false
    }
    return true
  }

  mobileCheckSend = () => {
    let {mobile} = this.state
    if (mobile.length !== 11) {
      Modal.alert('', '请输入11位手机号')
      return
    }
    const regular = /^[0-9]{11}$/
    if (!regular.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    this.props.mobileCheckSend({mobile})

    this.setState({disabled: true, timerLeft: 6})
    this.timer = setInterval(() => {
      let timerLeft = this.state.timerLeft - 1
      this.setState({timerLeft})
      if (timerLeft === -1) {
        this.setState({disabled: false})
        clearInterval(this.timer)
      }
    }, 1000)
  }

  mobileCheck = () => {
    let {mobile, code} = this.state
    if (mobile.length === 0 || code.length === 0) {
      Modal.alert('', '手机号或者验证码不能为空')
      return
    }
    if (mobile.length !== 11) {
      Modal.alert('', '请输入11位手机号')
      return
    }
    const regular = /^[0-9]{11}$/
    if (!regular.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    if (code.length !== 6) {
      Modal.alert('', '验证码长度必须为6位')
      return
    }
    if (mobile !== this.props.mobile || code !== this.props.code) {
      Modal.alert('', '验证码错误')
      return
    }
    this.props.mobileCheck({mobile, code})
  }

  next = () => {
    this.props.navigation.navigate('CommonResetPasswordSetPassword', {
      backToLoginFunc: this.props.navigation.popToTop,
      mobile: this.props.mobile,
    })
  }

  render() {
    let {disabled, timerLeft} = this.state
    let buttonText = disabled ? timerLeft + '秒后重新发送' : '发送验证码'

    return (
      <View style={style.view}>

        <List style={style.list}>
          <InputItem type='number' maxLength={11} clear placeholder="请输入本人手机号" style={{borderBottomWidth: 1}}
                     value={this.state.mobile} onChange={(mobile) => this.setState({mobile})}>
            手机号
          </InputItem>
          <InputItem type='number' maxLength={6} clear placeholder="请输入" value={this.state.code}
                     onChange={(code) => this.setState({code})}
                     extra={<Button text={buttonText} style={style.sendButton} textStyle={style.sendButtonText}
                                    disabled={disabled} onPress={this.mobileCheckSend}/>}>
            验证码
          </InputItem>
        </List>

        <Button text='下一步' style={style.button} onPress={this.mobileCheck}/>
      </View>
    )
  }
}

MobileCheck.propTypes = {
  isMobileCheckSuc: PropTypes.bool.isRequired,
  mobile: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  mobileCheckSend: PropTypes.func.isRequired,
  mobileCheck: PropTypes.func.isRequired,
  mobileCheckReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isMobileCheckSuc: state.common.resetPasswordMobileCheck.isMobileCheckSuc,
    mobile: state.common.resetPasswordMobileCheck.mobile,
    code: state.common.resetPasswordMobileCheck.code,
  }),
  dispatch => ({
    mobileCheckSend: (data) => dispatch(actions.mobileCheckSend(data)),
    mobileCheck: (data) => dispatch(actions.mobileCheck(data)),
    mobileCheckReset: () => dispatch(actions.mobileCheckReset()),
  })
)(MobileCheck)
