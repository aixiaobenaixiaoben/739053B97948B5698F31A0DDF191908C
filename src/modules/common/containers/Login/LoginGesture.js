/** @flow */
import React, {Component} from "react"
import {Text, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import PasswordGesture from 'react-native-gesture-password'
import style from "../styles/Login/LoginGesture"
import {ActionSheet, Modal} from "antd-mobile-rn"
import * as LoginActions from "../../actions/Login/Login"
import * as actions from "../../actions/Login/LoginGesture"
import {COLOR_GRAY_LIGHT} from "../../../../Style"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Button from "../../components/Button"


class LoginGesture extends Component<any, any> {

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
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['密码登录', '切换帐号', 'Cancel'],
        cancelButtonIndex: 2,
      },
      (buttonIndex: any) => {
        if (buttonIndex === 0) {
          this.jumpTo('MyLoginPassword')
        } else if (buttonIndex === 1) {
          this.jumpTo('MyLogin', 'MyLoginGesture')
        }
      }
    )
  }

  onEnd = (password) => {
    if (password.length < 4) {
      Modal.alert('', '手势密码: 至少连接4个点.')
      return
    }
    if (password === this.props.gesturePassword) {

      this.props.login({
        mobile: this.props.mobile,
        password: this.props.password,
      })
      this.props.gestureCountReset()

    } else {

      const count = this.props.count - 1
      this.props.gestureCountDecrease()
      if (count === 0) {
        Modal.alert('', '手势密码错误:您手势密码输入错误次数已达上限.')
      } else if (count <= -1) {
        this.props.gestureDisable()
        Modal.alert('', '您手势密码输入错误次数超限.', [{text: '确定', onPress: () => this.jumpTo('MyLoginPassword')}])
      } else {
        Modal.alert('', `手势密码错误:您还可以尝试${count}次.`)
      }
    }
  }

  render() {
    const {mobile} = this.props

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
          <PasswordGesture
            style={style.gesture}
            onEnd={(password) => this.onEnd(password)}
            interval={1}
          />
        </View>

        <View style={style.bottom}>
          <Button text='更多' style={style.moreButton} textStyle={style.moreButtonText} onPress={this.showActionSheet}/>
        </View>
      </View>
    )
  }
}

LoginGesture.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  loginID: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  gesturePassword: PropTypes.string.isRequired,

  login: PropTypes.func.isRequired,
  gestureDisable: PropTypes.func.isRequired,
  gestureCountReset: PropTypes.func.isRequired,
  gestureCountDecrease: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    loginID: state.common.login.loginID,
    mobile: state.common.login.mobile,
    password: state.common.login.password,
    count: state.common.loginGesture.count,
    gesturePassword: state.common.loginGesture.gesturePassword,
  }),
  dispatch => ({
    login: (data) => dispatch(LoginActions.login(data)),
    gestureDisable: () => dispatch(actions.gestureDisable()),
    gestureCountReset: () => dispatch(actions.gestureCountReset()),
    gestureCountDecrease: () => dispatch(actions.gestureCountDecrease()),
  })
)(LoginGesture)