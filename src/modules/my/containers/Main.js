/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, Text, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"

import * as actions from "../../common/actions/Login/Login"
import * as ftpActions from "../../common/actions/FTP"
import * as aboutActions from "../actions/About/About"
import * as profileActions from "../actions/Profile/Profile"
import style from "./styles/Main"
import {ACTION_PROFILE_PATH_CLEAR, ACTION_PROFILE_PATH_UPDATE} from "../Constants"
import type {Syusrinf} from "../../common/interface/Syusrinf"

const Item = List.Item


class Main extends Component<any, any> {

  componentWillMount() {
    if (this.props.photoPath.length > 0) {
      this.props.cacheSync(ACTION_PROFILE_PATH_CLEAR, this.props.photoPath)
    }
    if (!this.props.isLogin) {
      this.jumpToLogin()
    } else {
      this.props.requestProfile({suiseqcod: this.props.user.suiseqcod})
    }
  }

  shouldComponentUpdate(nextProps) {
    if (!nextProps.isLogin) {
      if (this.props.navigation.isFocused()) {
        this.jumpToLogin()
      } else {
        this.props.navigation.navigate('RootTab')
      }
    }
    return true
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', this.willFocus),
    ]
    if (this.props.isLogin) {
      this.props.requestVersion()
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove())
  }

  willFocus = (payload) => {
    if (!this.props.isLogin && payload.action.type === 'Navigation/NAVIGATE') {
      this.jumpToLogin()
    }
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

  goToAbout = () => {
    this.props.navigation.navigate('MyAbout')
  }

  getPhoto = () => {
    const {profile: {spfphotog = ''}, photoPath} = this.props
    if (spfphotog != null && spfphotog.length > 0 && photoPath.indexOf(spfphotog) === -1) {
      this.props.download(ACTION_PROFILE_PATH_UPDATE, spfphotog)
    }
    if (photoPath.length > 0) {
      return <Image style={style.view1Image} source={{uri: photoPath}}/>
    }
    return <Image style={style.view1Image} source={require('../../../../assets/my/profile/logo01.png')}/>
  }

  render() {
    let {suiusrnam, suimobile} = this.props.user

    return (
      <ScrollView style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.goToProfile}
                thumb={this.getPhoto()} extra={<View style={{height: 66}}/>}>
            <Text numberOfLines={1} style={style.view1Name}>{suiusrnam}</Text>
            <Text numberOfLines={1} style={style.view1Mobile}>{suimobile}</Text>
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.goToSetting}
                thumb={<Image style={style.view2Setting} source={require('../../../../assets/my/main/set.png')}/>}>
            设置
          </Item>
          <Item style={style.listItem} arrow="horizontal" onClick={this.goToAbout}
                thumb={<Image style={style.view2Setting} source={require('../../../../assets/my/main/info.png')}/>}>
            关于
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} onClick={this.logout}>
            <Text style={style.view3Text}>退出登录</Text>
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  photoPath: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  requestProfile: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  cacheSync: PropTypes.func.isRequired,
  requestVersion: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    user: state.common.login.user,
    profile: state.my.profile.profile,
    photoPath: state.my.profile.photoPath,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
    requestProfile: (data: Syusrinf) => dispatch(profileActions.profile(data)),
    download: (action: string, fileName: string) => dispatch(ftpActions.download(action, fileName)),
    cacheSync: (action: string, fileName: string) => dispatch(ftpActions.cacheSync(action, fileName)),
    requestVersion: () => dispatch(aboutActions.requestVersion()),
  })
)(Main)