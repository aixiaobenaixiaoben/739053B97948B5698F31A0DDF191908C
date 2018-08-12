/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {List, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"


const Item = List.Item

class Setting extends Component<any, any> {

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

  render() {
    const {isGestureEnabled, isTouchIDSupported, isTouchIDEnabled, touchIDType} = this.props
    let gesture = isGestureEnabled ? '已启用' : '未启用'
    let touchID = isTouchIDEnabled ? '已启用' : '未启用'
    let touchIDMethod = touchIDType === 'FaceID' ? '面容ID登录' : '指纹ID登录'
    return (
      <ScrollView>
        <WhiteSpace size="lg"/>
        <List>
          <Item arrow="horizontal" onClick={this.passwordModify}>
            修改登录密码
          </Item>
          {isTouchIDSupported &&
          <Item arrow="horizontal" onClick={this.touchIDModify} extra={touchID}>
            {touchIDMethod}
          </Item>
          }
          <Item arrow="horizontal" onClick={this.gestureModify} extra={gesture}>
            手势登录
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Setting.propTypes = {
  isGestureEnabled: PropTypes.bool.isRequired,
  isTouchIDSupported: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,
}

export default connect(
  state => ({
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
  })
)(Setting)
