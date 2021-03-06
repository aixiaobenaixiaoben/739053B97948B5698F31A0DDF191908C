/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import {InputItem, List, Modal} from "antd-mobile-rn"

import * as actions from "../../actions/Login/Login"
import style from "../styles/Login/Login"
import Button from "../../components/Button"
import type {Syusrinf} from "../../interface/Syusrinf"
import HeaderBackImage from "../../components/HeaderBackImage"


class Login extends Component<any, any> {

  state = {
    mobile: '',
    password: '',
  }

  headerLeft = () => {
    let routeFrom = this.props.navigation.getParam('routeFrom')
    return routeFrom ? <HeaderBackImage handler={() => this.jumpTo(routeFrom)}/> : null
  }

  static navigationOptions = ({navigation}) => {
    const {headerLeft} = navigation.state.params || {}
    return {
      headerLeft: headerLeft,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({headerLeft: this.headerLeft(),})

    const routeFrom = this.props.navigation.getParam('routeFrom')
    if (routeFrom === undefined && this.props.user.suiseqcod.length > 0) {
      if (this.props.isTouchIDEnabled) {
        this.jumpTo('MyLoginTouchID')
      } else if (this.props.isGestureEnabled) {
        this.jumpTo('MyLoginGesture')
      } else {
        this.jumpTo('MyLoginPassword')
      }
    }
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
    const routeFrom = this.props.navigation.getParam('routeFrom')
    if (!!routeFrom && this.props.user.suiseqcod.length === 0) {
      this.jumpTo('MyHome')
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLogin) {
      this.jumpTo('MyHome')
      return false
    }
    return true
  }

  jumpTo = (route) => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: route})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  register = () => {
    this.props.navigation.navigate('CommonRegister')
  }

  resetPassword = () => {
    this.props.navigation.navigate('CommonResetPassword')
  }

  login = () => {
    const {mobile, password} = this.state
    const regular = /^[0-9]{11}$/
    if (!regular.test(mobile)) {
      Modal.alert('', '手机号码格式不正确')
      return
    }
    const reg = /^[A-Za-z0-9]{8,15}$/
    if (!reg.test(password)) {
      Modal.alert('', '密码格式不正确,必须由数字和大小写字母组成，长度8-15位')
      return
    }
    let data: Syusrinf = {
      suimobile: mobile,
      suipaswrd: password,
    }
    this.props.login(data)
  }

  getPhoto = () => {
    const {photoPath} = this.props
    if (photoPath.length > 0) {
      return <Image style={style.view1Image} source={{uri: photoPath}}/>
    }
    return <Image style={style.view1Image} source={require('../../../../../assets/my/profile/logo01.png')}/>
  }

  render() {
    const {mobile, password} = this.state
    let canSubmit = mobile.length > 0 && password.length > 0

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.view}>
        <View style={style.view1}>
          {this.getPhoto()}
        </View>

        <List style={style.list}>
          <InputItem type='number-pad' maxLength={11} clear placeholder="手机号"
                     onChange={(mobile) => this.setState({mobile})}/>
          <InputItem type='password' maxLength={15} clear placeholder="请输入登录密码"
                     onChange={(password) => this.setState({password})}/>
        </List>

        <View style={style.view2}>
          <Button text='注册' style={style.view2Register} textStyle={style.view2RegisterText} onPress={this.register}/>
          <Button text='登录' style={style.view2Login} onPress={this.login} disabled={!canSubmit}/>
        </View>

        <View style={style.view3}>
          <Button text='忘记密码' style={style.view3Button} textStyle={style.view3ButtonText}
                  onPress={this.resetPassword}/>
        </View>
      </ScrollView>
    )
  }
}

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  isGestureEnabled: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  photoPath: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    photoPath: state.my.profile.photoPath,
  }),
  dispatch => ({
    login: (data: Syusrinf) => dispatch(actions.login(data)),
  })
)(Login)