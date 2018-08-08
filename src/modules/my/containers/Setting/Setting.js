/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import Button from "../../../common/components/Button"
import * as actions from "../../../common/actions/Login/Login"


const Item = List.Item

class Setting extends Component<any, any> {

  passwordModify = () => {
    this.props.navigation.navigate('MyPasswordModifyCheck')
  }

  touchIDModify = () => {
    let title = this.props.touchIDType === 'FaceID' ? '设置面容ID登录' : '设置指纹ID登录'
    this.props.navigation.navigate('MyTouchIDSetting', {title})
  }

  gestureModify = () => {
    this.props.navigation.navigate('MyGestureSetting')
  }

  logout = () => {
    Modal.alert('确认', '请确认是否退出当前登录帐号', [
      {text: '取消'},
      {
        text: '确定', onPress: () => {
          this.props.navigation.pop()
          this.props.logout()
        }
      }
    ])
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
        <WhiteSpace size="lg"/>

        <Button text='安全退出' onPress={this.logout} style={{margin: 10}}/>
      </ScrollView>
    )
  }
}

Setting.propTypes = {
  isGestureEnabled: PropTypes.bool.isRequired,
  isTouchIDSupported: PropTypes.bool.isRequired,
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
    isTouchIDSupported: state.common.loginTouchID.isTouchIDSupported,
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
  })
)(Setting)
