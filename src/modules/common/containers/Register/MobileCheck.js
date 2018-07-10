/** @flow */
import React, {Component} from "react"
import {StatusBar, TouchableOpacity, View} from "react-native"
import {COLOR_WHITE} from "../../../../Style"
import {connect} from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import style from "../styles/Register/Register"
import Button from "../../components/Button"
import {InputItem, List, Modal} from "antd-mobile-rn"
import PropTypes from "prop-types"
import * as actions from "../../actions/Register/MobileCheck"


class MobileCheck extends Component<any, any> {

  timer: any
  state = {
    mobile: '',
    code: '',
    disabled: false,
    timerLeft: 0,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:
        <TouchableOpacity onPress={() => navigation.pop()} style={{paddingLeft: 9,paddingTop: 4,}}>
          <Ionicons name='ios-arrow-back' size={36} color={COLOR_WHITE}/>
        </TouchableOpacity>
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
    this.props.resetVerifyCode()
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('default')
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isVerifySuc) {
      this.next()
      this.props.resetVerifyCode()
      return false
    }
    return true
  }

  sendVerifyCode = () => {
    let { mobile } = this.state
    if (mobile.length !== 11) {
      Modal.alert('', '请输入11位手机号')
      return
    }
    this.props.sendVerifyCode({mobile})

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

  verifyCode = () => {
    let { mobile, code } = this.state
    if (mobile.length === 0 || code.length === 0) {
      Modal.alert('', '手机号或者验证码不能为空')
      return
    }
    if (mobile.length !== 11) {
      Modal.alert('', '请输入11位手机号')
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
    this.props.verifyCode({ mobile, code })
  }

  next = () => {
    this.props.navigation.navigate('CommonRegisterSetPassword', {
      backToLoginFunc: this.props.navigation.popToTop,
      mobile: this.props.mobile,
    })
  }

  render() {
    let { disabled, timerLeft } = this.state
    let buttonText = disabled ? timerLeft + '秒后重新发送' : '发送验证码'

    return (
      <View style={style.view}>

        <List style={style.list}>
          <InputItem type='number' maxLength={11} clear placeholder="请输入本人手机号" style={{ borderBottomWidth: 1 }}
                     value={this.state.mobile} onChange={(mobile) => this.setState({mobile})}>
            手机号
          </InputItem>
          <InputItem type='number' maxLength={6} clear placeholder="请输入" value={this.state.code}
                     onChange={(code) => this.setState({code})}
                     extra={ <Button text={buttonText} style={style.sendButton} textStyle={style.sendButtonText}
                                     disabled={disabled} onPress={this.sendVerifyCode}/> }>
            验证码
          </InputItem>
        </List>

        <Button text='下一步' style={style.button} onPress={this.verifyCode} />
      </View>
    )
  }
}

MobileCheck.propTypes = {
  isVerifySuc: PropTypes.bool.isRequired,
  mobile: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  sendVerifyCode: PropTypes.func.isRequired,
  verifyCode: PropTypes.func.isRequired,
  resetVerifyCode: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isVerifySuc: state.common.registerMobileCheck.isVerifySuc,
    mobile: state.common.registerMobileCheck.mobile,
    code: state.common.registerMobileCheck.code,
  }),
  dispatch => ({
    sendVerifyCode: (data) => dispatch(actions.sendVerifyCode(data)),
    verifyCode: (data) => dispatch(actions.verifyCode(data)),
    resetVerifyCode: () => dispatch(actions.resetVerifyCode()),
  })
)(MobileCheck)
