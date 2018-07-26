/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import * as actions from "../../../common/actions/Login/LoginGesture"
import {List, Switch, WhiteSpace} from "antd-mobile-rn"

const Item = List.Item

class GestureSetting extends Component<any, any> {

  onSwitchChange = (checked) => {
    if (checked) {
      this.gestureModify()
    } else {
      this.props.gestureDisable()
    }
  }

  gestureModify = () => {
    this.props.navigation.navigate('MyGestureModify')
  }

  render() {
    const {isGestureEnabled} = this.props

    return (
      <ScrollView>
        <WhiteSpace size="lg"/>
        <List>
          <Item extra={<Switch checked={isGestureEnabled} onChange={this.onSwitchChange}/>}>
            使用手势密码登录
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        {isGestureEnabled &&
        <List>
          <Item arrow="horizontal" onClick={this.gestureModify}>
            修改手势密码
          </Item>
        </List>
        }
      </ScrollView>
    )
  }
}

GestureSetting.propTypes = {
  isGestureEnabled: PropTypes.bool.isRequired,
  gestureDisable: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isGestureEnabled: state.common.loginGesture.isGestureEnabled,
  }),
  dispatch => ({
    gestureDisable: () => dispatch(actions.gestureDisable()),
  })
)(GestureSetting)