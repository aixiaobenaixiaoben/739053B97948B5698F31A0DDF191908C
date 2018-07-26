/** @flow */
import React, {Component} from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import PasswordGesture from 'react-native-gesture-password'
import {Toast} from "antd-mobile-rn"

import style from "../styles/Setting/GestureModify"
import * as actions from "../../../common/actions/Login/LoginGesture"
import {COLOR_RED} from "../../../../Style"


class GestureModify extends Component<any, any> {

  password = ''

  state = {
    modified: false,
    title: '绘制解锁图案',
    status: 'normal',
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.modified && nextProps.isGestureEnabled && nextProps.gesturePassword === this.password) {
      this.password = ''
      Toast.success('手势密码设置成功', 0)
      setTimeout(() => {
        Toast.hide()
        this.props.navigation.pop()
      }, 1000)
    }

    return true
  }

  onEnd = (password) => {
    if (this.password === '') {

      if (password.length < 4) {
        this.setState({
          title: '至少连接4个点，请重新绘制',
          status: 'wrong',
        })
        return
      }

      this.setState({
        title: '请再次绘制解锁图案',
      })
      this.password = password

    } else if (this.password.length > 0) {

      if (this.password === password) {
        this.gestureModifySuccess(this.password)

      } else {
        this.setState({
          title: '两次绘制图案不一致，请重新绘制',
          status: 'wrong',
        })
        this.password = ''
      }
    }
  }

  onReset = () => {
    if (this.password === '') {
      this.setState({
        title: '绘制解锁图案',
        status: 'normal',
      })
    }
  }

  gestureModifySuccess = (password) => {
    this.setState({modified: true})
    Toast.loading('修改中', 0)
    this.props.gestureEnable(password)
  }

  render() {
    const {title, status} = this.state
    const wrongStyle = status === 'wrong' ? {color: COLOR_RED} : {}

    return (
      <View style={style.view}>

        <View style={style.top}>
          <Text style={[style.title, wrongStyle]}>{title}</Text>
        </View>

        <View style={style.middle}>
          <PasswordGesture
            style={style.gesture}
            status={status}
            onEnd={(password) => this.onEnd(password)}
            onReset={this.onReset}
            interval={1000}
          />
        </View>

      </View>
    )
  }
}

GestureModify.propTypes = {
  isGestureEnabled: PropTypes.bool.isRequired,
  gesturePassword: PropTypes.string.isRequired,

  gestureEnable: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    gesturePassword: state.common.loginGesture.gesturePassword,
  }),
  dispatch => ({
    gestureEnable: (data) => dispatch(actions.gestureEnable(data)),
  })
)(GestureModify)