/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import {InputItem, List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import style from "../styles/Setting/MobileModify"
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

  shouldComponentUpdate(nextProps) {
    if (nextProps.user.suimobile !== this.props.user.suimobile) {
      this.next()
      this.props.mobileModifyReset()
      return false
    }
    return true
  }

  mobileModifySend = () => {
    let {mobile} = this.state
    const regular = /^[0-9]{11}$/
    if (!regular.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    this.props.mobileModifySend({suimobile: mobile})
  }

  mobileModify = () => {
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
    this.props.mobileModify(this.props.user, {svmmobile: mobile, svmvrycod: code})
  }

  backFunc = () => {
    this.props.navigation.navigate('MySetting')
  }

  next = () => {
    this.props.navigation.navigate('MySettingResult', {
      success: true,
      title: '修改成功',
      description: '您已成功修改手机号码',
      buttonText: '完成',
      backFunc: this.backFunc,
      navigationTitle: '修改手机号码',
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
                              text={text} onPress={this.mobileModifySend}/>

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} type='number-pad' maxLength={11} clear placeholder="请输入本人手机号码"
                     onChange={(mobile) => this.setState({mobile})}>
          </InputItem>
          <InputItem style={style.inputItem} type='number-pad' maxLength={6} clear placeholder="请输入验证码"
                     onChange={(code) => this.setState({code})} extra={extraButton}>
          </InputItem>
        </List>
        <WhiteSpace size="lg"/>

        <Button text='提交' style={style.button} onPress={this.mobileModify} disabled={!canSubmit}/>
      </ScrollView>
    )
  }
}

MobileModify.propTypes = {
  user: PropTypes.object.isRequired,
  mobile: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  mobileModifySend: PropTypes.func.isRequired,
  mobileModify: PropTypes.func.isRequired,
  mobileModifyReset: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
    mobile: state.my.mobileModify.mobile,
    count: state.my.mobileModify.count,
  }),
  dispatch => ({
    mobileModifySend: (data: Syusrinf) => dispatch(actions.mobileModifySend(data)),
    mobileModify: (syusrinf: Syusrinf, syvrymbl: Syvrymbl) => dispatch(actions.mobileModify(syusrinf, syvrymbl)),
    mobileModifyReset: () => dispatch(actions.mobileModifyReset()),
  })
)(MobileModify)
