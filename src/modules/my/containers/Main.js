/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, Text, View} from "react-native"
import {NavigationActions, StackActions} from "react-navigation"
import {connect} from "react-redux"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

import * as actions from "../../common/actions/Login/Login"
import * as ftpActions from "../../common/actions/FTP"
import * as profileActions from "../../my/actions/Profile"
import style from "./styles/Main"
import {COLOR_GRAY, COLOR_GRAY_LIGHT} from "../../../Style"
import {ACTION_PROFILE_PATH_UPDATE} from "../Constants"
import type {Syusrinf} from "../../common/interface/Syusrinf"

const Item = List.Item


class Main extends Component<any, any> {

  componentWillMount() {
    if (!this.props.isLogin) {
      this.jumpToLogin()
    } else {
      this.props.requestProfile({suiseqcod: this.props.user.suiseqcod})
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

  getPhoto = () => {
    const {profile: {spfphotog = ''}, photoPath} = this.props
    if (spfphotog != null && spfphotog.length > 0 && photoPath.indexOf(spfphotog) === -1) {
      this.props.download(ACTION_PROFILE_PATH_UPDATE, spfphotog)
    }
    if (photoPath.length > 0) {
      return <Image source={{uri: photoPath}} style={style.image}/>
    }
    return <FontAwesome name='user-circle' size={50} color={COLOR_GRAY_LIGHT} style={[style.image, style.imageIcon]}/>
  }

  render() {
    let {suiusrnam, suimobile} = this.props.user

    return (
      <ScrollView>
        <WhiteSpace/>
        <List>
          <Item arrow="horizontal" onClick={this.goToProfile} thumb={this.getPhoto()}
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
  profile: PropTypes.object.isRequired,
  photoPath: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  requestProfile: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
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
  })
)(Main)