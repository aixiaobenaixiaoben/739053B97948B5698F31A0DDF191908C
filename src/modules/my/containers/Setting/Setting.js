/** @flow */
import React, {Component} from "react"
import {ScrollView, TouchableOpacity} from "react-native"
import {List, Modal, WhiteSpace} from "antd-mobile-rn"
import Ionicons from "react-native-vector-icons/Ionicons"
import {connect} from "react-redux"
import PropTypes from "prop-types"

import style from "../styles/Setting/Setting"
import Button from "../../../common/components/Button"
import {COLOR_BLUE_SYS} from "../../../../Style"
import * as actions from "../../../common/actions/Login/Login"


const Item = List.Item

class Setting extends Component<any, any> {

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft:
        <TouchableOpacity onPress={() => navigation.pop()} style={style.headerLeft}>
          <Ionicons name='ios-arrow-back' size={36} color={COLOR_BLUE_SYS}/>
        </TouchableOpacity>
    }
  }

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

        <Button text='安全退出' onPress={this.logout} style={style.logoutButton}/>
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
