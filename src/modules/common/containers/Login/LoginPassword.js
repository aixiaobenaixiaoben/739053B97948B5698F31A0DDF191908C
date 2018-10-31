/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, Text, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import {InputItem, List} from "antd-mobile-rn"
import style from "../styles/Login/LoginPassword"
import Button from "../../components/Button"
import {ActionSheet, Modal} from "antd-mobile-rn/lib/index.native"
import * as actions from "../../actions/Login/Login"
import type {Syusrinf} from "../../interface/Syusrinf"


class LoginPassword extends Component<any, any> {

  state = {
    password: '',
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', this.willFocus),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove())
  }

  willFocus = () => {
    if (this.props.user.suiseqcod.length === 0) {
      this.jumpTo('MyLogin')
    }
  }

  shouldComponentUpdate(nextProps) {
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

  resetPassword = () => {
    this.props.navigation.navigate('CommonResetPassword')
  }

  login = () => {
    const {password} = this.state
    const reg = /^[A-Za-z0-9]{8,15}$/
    if (!reg.test(password)) {
      Modal.alert('', '密码格式不正确,必须由数字和大小写字母组成，长度8-15位')
      return
    }
    this.props.login({
      suimobile: this.props.user.suimobile,
      suipaswrd: password,
    })
  }

  showChoice = () => {
    let action = ['切换帐号', 'Cancel']
    if (this.props.isGestureEnabled) {
      action = ['手势登录', ...action]
    }
    if (this.props.isTouchIDEnabled) {
      if (this.props.touchIDType === 'FaceID') {
        action = ['面容ID登录', ...action]
      } else {
        action = ['指纹ID登录', ...action]
      }
    }
    ActionSheet.showActionSheetWithOptions(
      {
        options: action,
        cancelButtonIndex: action.length - 1,
      },
      (buttonIndex: any) => {
        if (action[buttonIndex] === '面容ID登录' || action[buttonIndex] === '指纹ID登录') {
          this.jumpTo('MyLoginTouchID')
        } else if (action[buttonIndex] === '手势登录') {
          this.jumpTo('MyLoginGesture')
        } else if (action[buttonIndex] === '切换帐号') {
          this.jumpTo('MyLogin', 'MyLoginPassword')
        }
      }
    )
  }

  getPhoto = () => {
    const {photoPath} = this.props
    if (photoPath.length > 0) {
      return <Image style={style.view1Image} source={{uri: photoPath}}/>
    }
    return <Image style={style.view1Image} source={require('../../../../../assets/my/profile/logo01.png')}/>
  }

  render() {
    const mobile = this.props.user.suimobile
    const {password} = this.state

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.view}>
        <View style={style.view1}>
          {this.getPhoto()}
        </View>

        <View style={style.view2}>
          <Text style={style.view2Text}>{mobile}</Text>
        </View>

        <List style={style.list}>
          <InputItem type='password' maxLength={15} clear placeholder="请输入登录密码"
                     value={password} onChange={(password) => this.setState({password})}/>
        </List>

        <Button text='登录' onPress={this.login} style={style.submitButton}/>

        <View style={style.view3}>
          <Button text='忘记密码' style={style.view3Button} textStyle={style.view3ButtonText}
                  onPress={this.resetPassword}/>
          <Button text='更多' style={style.view3Button} textStyle={style.view3ButtonText}
                  onPress={this.showChoice}/>
        </View>
      </ScrollView>
    )
  }
}

LoginPassword.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isGestureEnabled: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,
  photoPath: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
    photoPath: state.my.profile.photoPath,
  }),
  dispatch => ({
    login: (data: Syusrinf) => dispatch(actions.login(data)),
  })
)(LoginPassword)