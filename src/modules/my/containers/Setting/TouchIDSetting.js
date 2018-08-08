/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {List, Switch, WhiteSpace} from "antd-mobile-rn"
import TouchId from "react-native-touch-id"
import {Modal, Toast} from "antd-mobile-rn/lib/index.native"

import * as actions from "../../../common/actions/Login/LoginTouchID"

const Item = List.Item

class TouchIDSetting extends Component<any, any> {

  touchID
  touchMethod

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title')
  })

  componentWillMount() {
    this.touchID = this.props.touchIDType === 'FaceID' ? '面容ID' : '指纹ID'
    this.touchMethod = this.touchID + '登录'
  }

  onSwitchChange = (checked) => {
    if (checked) {
      this.checkTouchID()
    } else {
      this.props.touchIDDisabled()
    }
  }

  checkTouchID = () => {
    TouchId.authenticate('通过Home键验证已有手机' + this.touchID, {fallbackLabel: ''})
      .then(success => {
        this.props.touchIDEnabled()
        Toast.info(this.touchMethod + '已启用.', 2)
      })
      .catch(error => {
        if (error.name === 'RCTTouchIDNotSupported') {
          /** 错误次数太多指纹识别被系统锁定 */
          Modal.alert('', this.touchID + '验证错误次数超限.')
        } else if (error.name === 'LAErrorAuthenticationFailed') {
          /** 连续3次错误 */
          Modal.alert('', this.touchID + '验证失败')
        } else if (error.name === 'RCTTouchIDUnknownError') {
          /** 累计5次错误、指纹识别关闭 */
          Modal.alert('', this.touchID + '验证错误次数超限.')
        }
      })
  }

  render() {
    const {isTouchIDEnabled} = this.props

    return (
      <ScrollView>
        <WhiteSpace size="lg"/>
        <List>
          <Item extra={<Switch checked={isTouchIDEnabled} onChange={this.onSwitchChange}/>}>
            {this.touchMethod}
          </Item>
        </List>
      </ScrollView>
    )
  }
}

TouchIDSetting.propTypes = {
  isTouchIDEnabled: PropTypes.bool.isRequired,
  touchIDType: PropTypes.string.isRequired,
  touchIDEnabled: PropTypes.func.isRequired,
  touchIDDisabled: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isTouchIDEnabled: state.common.loginTouchID.isTouchIDEnabled,
    touchIDType: state.common.loginTouchID.touchIDType,
  }),
  dispatch => ({
    touchIDEnabled: () => dispatch(actions.touchIDEnabled()),
    touchIDDisabled: () => dispatch(actions.touchIDDisabled()),
  })
)(TouchIDSetting)