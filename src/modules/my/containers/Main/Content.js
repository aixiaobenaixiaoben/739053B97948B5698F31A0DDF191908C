/** @flow */
import React, {Component} from "react"
import {Image, RefreshControl, ScrollView, Text, Vibration, View} from "react-native"
import {connect} from "react-redux"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import PropTypes from "prop-types"
import Sound from "react-native-sound"

import * as actions from "../../../common/actions/Login/Login"
import * as ftpActions from "../../../common/actions/FTP"
import style from "../styles/Main/Content"
import {ACTION_PROFILE_PATH_UPDATE} from "../../Constants"
import {COLOR_SYS} from "../../../../Style"
import * as profileActions from "../../actions/Profile/Profile"
import type {Syusrinf} from "../../../common/interface/Syusrinf"

const Item = List.Item


class Content extends Component<any, any> {

  state = {
    refreshing: false,
    refreshTitle: '',
  }
  scrollView

  shouldComponentUpdate(nextProps) {
    if (this.props.version !== nextProps.version) {
      this.scrollView.scrollTo({x: 0, y: -1, animated: true})
    }
    if (this.props.profile !== nextProps.profile && this.state.refreshing) {
      this.setState({refreshing: false})
      const source = require('../../../../../assets/common/ring/refresh.m4a')
      const sound = new Sound(source, () => sound.play(() => sound.release()))
      return false
    }
    return true
  }

  onRefresh = () => {
    Vibration.vibrate(100)
    this.setState({refreshing: true, refreshTitle: '松开刷新'})
  }

  onScrollBeginDrag = () => {
    this.setState({refreshTitle: '下拉刷新'})
  }

  onScrollEndDrag = () => {
    if (this.state.refreshing) {
      this.setState({refreshTitle: ''})
      this.props.requestProfile({suiseqcod: this.props.user.suiseqcod})
    }
  }

  onMomentumScrollEnd = (event) => {
    if (event.nativeEvent.contentOffset.y === -1) {
      const source = require('../../../../../assets/common/ring/onRefresh.m4a')
      const sound = new Sound(source, () => sound.play(() => sound.release()))
      this.scrollView.scrollTo({x: 0, y: -70, animated: true})
      this.setState({refreshing: true, refreshTitle: ''})
      this.props.requestProfile({suiseqcod: this.props.user.suiseqcod})
    }
  }

  logout = () => {
    Modal.alert('确认', '请确认是否退出当前登录帐号', [
      {text: '取消'},
      {text: '确定', onPress: this.props.logout},
    ])
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
    return <Image style={style.view1Image} source={require('../../../../../assets/my/profile/logo01.png')}/>
  }

  render() {
    let {suiusrnam, suimobile} = this.props.user
    const {refreshing, refreshTitle} = this.state
    let refreshControl = <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh}
                                         tintColor={COLOR_SYS} title={refreshTitle} titleColor={COLOR_SYS}/>

    return (
      <ScrollView ref={ref => this.scrollView = ref} style={style.scroll}
                  refreshControl={refreshControl} onMomentumScrollEnd={this.onMomentumScrollEnd}
                  onScrollBeginDrag={this.onScrollBeginDrag} onScrollEndDrag={this.onScrollEndDrag}>
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
                thumb={<Image style={style.view2Setting} source={require('../../../../../assets/my/main/set.png')}/>}>
            设置
          </Item>
          <Item style={style.listItem} arrow="horizontal" onClick={this.goToAbout}
                thumb={<Image style={style.view2Setting} source={require('../../../../../assets/my/main/info.png')}/>}>
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

Content.propTypes = {
  version: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  photoPath: PropTypes.string.isRequired,
  requestProfile: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    version: state.my.main.version,
    user: state.common.login.user,
    profile: state.my.profile.profile,
    photoPath: state.my.profile.photoPath,
  }),
  dispatch => ({
    requestProfile: (data: Syusrinf) => dispatch(profileActions.profile(data)),
    logout: () => dispatch(actions.logout()),
    download: (action: string, fileName: string) => dispatch(ftpActions.download(action, fileName)),
  })
)(Content)