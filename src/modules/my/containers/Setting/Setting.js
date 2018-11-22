/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Setting/Setting"
import * as ftpActions from "../../../common/actions/FTP"


const Item = List.Item

class Setting extends Component<any, any> {

  componentWillMount() {
    this.props.cacheCount()
  }

  mobileModify = () => {
    this.props.navigation.navigate('MyMobileModify')
  }

  autoLoginModify = () => {
    this.props.navigation.navigate('MyAutoLogin')
  }

  passwordModify = () => {
    this.props.navigation.navigate('MyPasswordModify')
  }

  touchIDModify = () => {
    let title = this.props.touchIDType === 'FaceID' ? '设置面容ID登录' : '设置指纹ID登录'
    this.props.navigation.navigate('MyTouchIDSetting', {title})
  }

  gestureModify = () => {
    this.props.navigation.navigate('MyGestureSetting')
  }

  cacheClear = () => {
    Modal.alert('确认', '确定清理缓存?', [
      {text: '取消'},
      {text: '确定', onPress: this.props.cacheClear},
    ])
  }

  render() {
    const {
      user: {suimobile},
      isGestureEnabled,
      isTouchIDSupported,
      isTouchIDEnabled,
      touchIDType,
      cacheSize,
      autoLogin,
    } = this.props
    let autoLoginText = autoLogin ? '已启用' : '未启用'
    let gesture = isGestureEnabled ? '已启用' : '未启用'
    let touchID = isTouchIDEnabled ? '已启用' : '未启用'
    let touchIDMethod = touchIDType === 'FaceID' ? '面容ID登录' : '指纹ID登录'
    const count = Math.round(cacheSize / (1024 * 1024) * 10) / 10 + ''
    const cache = count.indexOf('.') === -1 ? count + '.0M' : count + 'M'

    return (
      <ScrollView style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.mobileModify} extra={suimobile}>
            手机号
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.autoLoginModify} extra={autoLoginText}>
            自动登录
          </Item>
          <Item style={style.listItem} arrow="horizontal" onClick={this.passwordModify} extra='修改'>
            登录密码
          </Item>
          {isTouchIDSupported &&
          <Item style={style.listItem} arrow="horizontal" onClick={this.touchIDModify} extra={touchID}>
            {touchIDMethod}
          </Item>
          }
          <Item style={style.listItem} arrow="horizontal" onClick={this.gestureModify} extra={gesture}>
            手势登录
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} onClick={this.cacheClear} extra={cache}>
            清理缓存
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Setting.propTypes = {
  user: PropTypes.object.isRequired,
  isGestureEnabled: PropTypes.bool.isRequired,
  isTouchIDSupported: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,
  cacheSize: PropTypes.number.isRequired,
  cacheCount: PropTypes.func.isRequired,
  cacheClear: PropTypes.func.isRequired,
  autoLogin: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
    cacheSize: state.my.setting.cacheSize,
    autoLogin: state.my.autoLogin.autoLogin,
  }),
  dispatch => ({
    cacheCount: () => dispatch(ftpActions.cacheCount()),
    cacheClear: () => dispatch(ftpActions.cacheClear()),
  })
)(Setting)
