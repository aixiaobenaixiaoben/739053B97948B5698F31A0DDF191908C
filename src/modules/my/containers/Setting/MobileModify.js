/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import style from "../../../common/containers/styles/Register/Register"
import Button from "../../../common/components/Button"
import * as actions from "../../actions/Setting/MobileModify"
import type {Syusrinf} from "../../../common/interface/Syusrinf"
import type {Syvrymbl} from "../../../common/interface/Syvrymbl"


class MobileModify extends Component<any, any> {

  state = {
    mobile: '',
    code: '',
  }

  componentDidMount() {
    this.props.mobileModifyReset()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isMobileModifySuc) {
      this.next()
      this.props.mobileModifyReset()
      return false
    }
    return true
  }

  mobileModifySend = () => {
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
    this.props.mobileModifySend({suimobile: mobile})
  }

  mobileModify = () => {
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
    if (mobile !== this.props.mobile) {
      Modal.alert('', '验证码错误')
      return
    }
    this.props.mobileModify(this.props.user, {svmmobile: mobile, svmvrycod: code})
  }

  next = () => {
    this.props.navigation.navigate('MySettingResult', {
      routeTo: 'MySetting',
      isSuccess: true,
      title: '修改成功',
      description: '您已经成功修改手机号',
    })
  }

  render() {
    let {count} = this.props
    let disabled = count > 0
    let buttonText = disabled ? count + '秒后重新发送' : '发送验证码'

    return (
      <ScrollView keyboardShouldPersistTaps='handled'>

        <WhiteSpace size="lg"/>
        <List>
          <InputItem type='number' maxLength={11} clear placeholder="手机号"
                     value={this.state.mobile} onChange={(mobile) => this.setState({mobile})}>
            手机号
          </InputItem>
          <InputItem type='number' maxLength={6} clear placeholder="验证码" value={this.state.code}
                     onChange={(code) => this.setState({code})}
                     extra={<Button text={buttonText} style={style.sendButton} textStyle={style.sendButtonText}
                                    disabled={disabled} onPress={this.mobileModifySend}/>}>
            验证码
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Button text='提交' style={style.button} onPress={this.mobileModify}/>
      </ScrollView>
    )
  }
}

MobileModify.propTypes = {
  user: PropTypes.object.isRequired,
  isMobileModifySuc: PropTypes.bool.isRequired,
  mobile: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  mobileModifySend: PropTypes.func.isRequired,
  mobileModify: PropTypes.func.isRequired,
  mobileModifyReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
    isMobileModifySuc: state.my.mobileModify.isMobileModifySuc,
    mobile: state.my.mobileModify.mobile,
    count: state.my.mobileModify.count,
  }),
  dispatch => ({
    mobileModifySend: (data: Syusrinf) => dispatch(actions.mobileModifySend(data)),
    mobileModify: (syusrinf: Syusrinf, syvrymbl: Syvrymbl) => dispatch(actions.mobileModify(syusrinf, syvrymbl)),
    mobileModifyReset: () => dispatch(actions.mobileModifyReset()),
  })
)(MobileModify)
