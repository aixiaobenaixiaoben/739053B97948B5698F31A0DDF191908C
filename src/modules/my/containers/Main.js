/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"

import * as actions from "../../common/actions/Login/Login"
import style from "./styles/Main"
import {COLOR_GRAY, COLOR_GRAY_LIGHT} from "../../../Style"

const Item = List.Item


class Main extends Component<any, any> {

  componentWillMount() {
    if (!this.props.isLogin) {
      this.jumpToLogin()
    }
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

  goToSetting = () => {
    this.props.navigation.navigate('MySetting')
  }

  render() {
    return (
      <ScrollView>
        <WhiteSpace/>
        <TouchableOpacity onPress={() => alert(3)} style={style.profile}>
          <Image source={require('../../../../assets/touchid.png')} style={style.image}/>
          <View style={style.info}>
            <Text numberOfLines={1} style={style.text1}>点点</Text>
            <Text numberOfLines={1} style={style.text2}>357620917@qq.com</Text>
          </View>
          <Ionicons name='ios-arrow-forward' size={25} color={COLOR_GRAY_LIGHT} style={style.arrow}/>
        </TouchableOpacity>

        <WhiteSpace/>
        <Item arrow="horizontal" onClick={this.goToSetting}
              thumb={<MaterialIcon name='settings' size={25} color={COLOR_GRAY} style={style.icon}/>}>
          设置
        </Item>

        <WhiteSpace/>
        <Item onClick={this.logout}>
          <Text style={style.logout}>退出登录</Text>
        </Item>

      </ScrollView>
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