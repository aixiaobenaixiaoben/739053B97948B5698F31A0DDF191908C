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
    let gesture = this.props.isGestureEnabled ? '已启用' : '未启用'
    return (
      <ScrollView>
        <WhiteSpace size="lg"/>
        <List>
          <Item arrow="horizontal" onClick={this.passwordModify}>
            修改登录密码
          </Item>
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
  logout: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
  }),
  dispatch => ({
    logout: () => dispatch(actions.logout()),
  })
)(Setting)
