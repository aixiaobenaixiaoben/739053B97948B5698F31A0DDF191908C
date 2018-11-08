/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {List, Switch, WhiteSpace} from "antd-mobile-rn"

import * as actions from "../../actions/Setting/AutoLogin"
import style from "../styles/Setting/GestureSetting"

const Item = List.Item

class AutoLoginSetting extends Component<any, any> {

  onSwitchChange = (checked) => {
    if (checked) {
      this.props.autoLoginEnabled()
    } else {
      this.props.autoLoginDisabled()
    }
  }

  render() {
    const {autoLogin} = this.props

    return (
      <ScrollView style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} extra={<Switch checked={autoLogin} onChange={this.onSwitchChange}/>}>
            APP启动后自动登录
          </Item>
        </List>
      </ScrollView>
    )
  }
}

AutoLoginSetting.propTypes = {
  autoLogin: PropTypes.bool.isRequired,
  autoLoginEnabled: PropTypes.func.isRequired,
  autoLoginDisabled: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    autoLogin: state.my.autoLogin.autoLogin,
  }),
  dispatch => ({
    autoLoginEnabled: () => dispatch(actions.autoLoginEnabled()),
    autoLoginDisabled: () => dispatch(actions.autoLoginDisabled()),
  })
)(AutoLoginSetting)