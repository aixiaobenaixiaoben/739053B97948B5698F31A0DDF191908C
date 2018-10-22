/** @flow */
import React, {Component} from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Gesture, GesturePad} from "react-native-gesture-login"
import {Toast} from "antd-mobile-rn"

import style from "../styles/Setting/GestureModify"
import * as actions from "../../../common/actions/Login/LoginGesture"


class GestureModify extends Component<any, any> {

  state = {
    modified: false,
    password: '',
    title: '绘制解锁图案',
    isWrong: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.modified && nextProps.isGestureEnabled && nextProps.gesturePassword === this.state.password) {
      Toast.success('手势密码设置成功', 1, () => {
        this.props.navigation.navigate('MyGestureSetting')
      })
    }
    return true
  }

  onRelease = (password) => {
    if (this.state.password === '') {

      if (password.length < 4) {
        this.setState({
          title: '至少连接4个点，请重新绘制',
          isWrong: true,
        })
        return
      }

      this.setState({
        title: '请再次绘制解锁图案',
        password,
      })

    } else if (this.state.password.length > 0) {

      if (this.state.password === password) {
        this.gestureModifySuccess(this.state.password)

      } else {
        this.setState({
          title: '两次绘制图案不一致，请重新绘制',
          isWrong: true,
          password: '',
        })
      }
    }
  }

  onClear = () => {
    if (this.state.password === '') {
      this.setState({
        title: '绘制解锁图案',
        isWrong: false,
      })
    }
  }

  gestureModifySuccess = (password) => {
    this.setState({modified: true})
    Toast.loading('修改中', 0)
    this.props.gestureEnable(password)
  }

  render() {
    const {password, title, isWrong} = this.state

    let linedCircleStyle = isWrong ? style.linedCircleWrong : style.linedCircle
    let linedCenterStyle = isWrong ? style.linedCenterWrong : style.linedCenter
    let lineStyle = isWrong ? style.lineWrong : style.line

    return (
      <View style={style.view}>

        <View style={style.view1}>
          <GesturePad
            sequence={password}
            circleStyle={style.circle}
            linedCircleStyle={style.linedCircle}
            linedCenterStyle={style.linedCenter}
          />
        </View>

        <View style={style.view2}>
          <Text style={[style.title, isWrong && style.titleWrong]}>{title}</Text>
        </View>

        <View style={style.view3}>
          <Gesture
            clearTime={1500}
            lineStyle={lineStyle}
            circleStyle={style.circle}
            centerStyle={style.center}
            linedCircleStyle={linedCircleStyle}
            linedCenterStyle={linedCenterStyle}
            onRelease={this.onRelease}
            onClear={this.onClear}
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