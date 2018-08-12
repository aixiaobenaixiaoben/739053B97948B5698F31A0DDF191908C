/** @flow */
import React, {Component} from "react"
import {Image, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import {ActionSheet, Modal} from "antd-mobile-rn"
import TouchId from "react-native-touch-id"

import style from "../styles/Login/LoginTouchID"
import * as LoginActions from "../../actions/Login/Login"
import {COLOR_SYS, COLOR_GRAY_LIGHT, COLOR_BLACK_SYS} from "../../../../Style"
import Button from "../../components/Button"
import type {Syusrinf} from "../../interface/Syusrinf"


class LoginTouchID extends Component<any, any> {

  state = {
    color: COLOR_SYS
  }

  componentDidMount() {
    this.touchIDCheck()
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isLogin) {
      this.jumpTo('MyHome')
      return false
    }
    return true
  }

  jumpTo = (route, routeFrom = undefined) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: route, params: {routeFrom: routeFrom}})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  showActionSheet = () => {
    let action = ['密码登录', '切换帐号', 'Cancel']
    if (this.props.isGestureEnabled) {
      action = ['手势登录', ...action]
    }
    ActionSheet.showActionSheetWithOptions(
      {
        options: action,
        cancelButtonIndex: action.length - 1,
      },
      (buttonIndex: any) => {
        if (action[buttonIndex] === '手势登录') {
          this.jumpTo('MyLoginGesture')
        } else if (action[buttonIndex] === '密码登录') {
          this.jumpTo('MyLoginPassword')
        } else if (action[buttonIndex] === '切换帐号') {
          this.jumpTo('MyLogin', 'MyLoginTouchID')
        }
      }
    )
  }

  touchIDCheck = () => {
    TouchId.authenticate('通过Home键验证已有手机指纹', {fallbackLabel: ''})
      .then(success => {
        this.props.login(this.props.user)
      })
      .catch(error => {
        if (error.name === 'RCTTouchIDNotSupported') {
          /** 错误次数太多指纹识别被系统锁定 */
          Modal.alert('', '指纹验证错误次数超限,请使用其它方式登录.')
        } else if (error.name === 'LAErrorAuthenticationFailed') {
          /** 连续3次错误 */
          Modal.alert('', '指纹验证失败')
        } else if (error.name === 'RCTTouchIDUnknownError') {
          /** 累计5次错误、指纹识别关闭 */
          Modal.alert('', '指纹验证错误次数超限,请使用其它方式登录.')
        }
      })
  }

  render() {
    const mobile = this.props.user.suimobile

    return (
      <View style={style.view}>

        <View style={style.top}>
          <FontAwesome name='user-circle' size={60} color={COLOR_GRAY_LIGHT}/>
          <View style={style.info}>
            <Text style={style.infoText}>用户手机号</Text>
            <Text style={style.infoText}>{mobile}</Text>
          </View>
        </View>

        <View style={style.middle}>
          <TouchableOpacity onPress={this.touchIDCheck}
                            onPressIn={() => this.setState({color: COLOR_BLACK_SYS})}
                            onPressOut={() => this.setState({color: COLOR_SYS})}
                            activeOpacity={1}>
            <Image source={require('../../../../../assets/touchid.png')}
                   style={[style.touchID, {tintColor: this.state.color}]}/>
          </TouchableOpacity>
          <Button text='点击进行指纹登录' style={style.button}
                  textStyle={style.buttonText} onPress={this.touchIDCheck}/>
        </View>

        <View style={style.bottom}>
          <Button text='更多' style={style.button} textStyle={style.buttonText} onPress={this.showActionSheet}/>
        </View>
      </View>
    )
  }
}

LoginTouchID.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isGestureEnabled: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
  }),
  dispatch => ({
    login: (data: Syusrinf) => dispatch(LoginActions.login(data)),
  })
)(LoginTouchID)