/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, Text, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

import * as actions from "../../common/actions/Login/Login"
import style from "./styles/Main"
import {COLOR_GRAY} from "../../../Style"

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

  goToProfile = () => {
    this.props.navigation.navigate('MyProfile')
  }

  render() {
    let {suiusrnam, suimobile} = this.props.user

    return (
      <ScrollView>
        <WhiteSpace/>
        <List>
          <Item arrow="horizontal" onClick={this.goToProfile}
                thumb={<Image source={require('../../../../assets/touchid.png')} style={style.image}/>}
                extra={<View style={{height: 60}}/>}>
            <Text numberOfLines={1} style={style.textName}>{suiusrnam}</Text>
            <Text numberOfLines={1} style={style.textMobile}>{suimobile}</Text>
          </Item>
        </List>

        <WhiteSpace/>
        <List>
          <Item arrow="horizontal" onClick={this.goToSetting}
                thumb={<MaterialIcon name='settings' size={25} color={COLOR_GRAY} style={style.settingIcon}/>}>
            设置
          </Item>
        </List>

        <WhiteSpace/>
        <List>
          <Item onClick={this.logout}>
            <Text style={style.logout}>退出登录</Text>
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
  })
)(Main)