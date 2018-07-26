/** @flow */
import React, {Component} from "react"
import {StatusBar, Text, TouchableOpacity, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import {Modal} from "antd-mobile-rn"
import PropTypes from "prop-types"

import * as actions from "../../common/actions/Login/Login"
import style from "./styles/Main"


class Main extends Component<any, any> {

  static navigationOptions = ({navigation}) => {
    const logout = navigation.getParam('logout')
    return {
      title: '个人中心',
      headerLeft:
        <TouchableOpacity onPress={() => navigation.navigate('MySetting')} style={style.headerLeft}>
          <Text style={style.headerLeftText}>设置</Text>
        </TouchableOpacity>,
      headerRight:
        <TouchableOpacity onPress={logout} style={style.headerRight}>
          <Text style={style.headerRightText}>安全</Text>
          <Text style={style.headerRightText}>退出</Text>
        </TouchableOpacity>,
    }
  }

  componentWillMount() {
    if (!this.props.isLogin) {
      this.jumpToLogin()
    } else {
      this.props.navigation.setParams({logout: this.logout})
    }
    StatusBar.setBarStyle('default')
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!nextProps.isLogin) {
      this.jumpToLogin()
      return false
    }
    return true
  }

  logout = () => {
    Modal.alert('确认', '请确认是否退出当前登录帐号', [
      {text: '取消'},
      {text: '确定', onPress: this.props.logout},
    ])
  }

  jumpToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'MyLogin'})],
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <View style={style.view}>
        <Text>This Is My Main Page</Text>
      </View>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
  })
)(Main)