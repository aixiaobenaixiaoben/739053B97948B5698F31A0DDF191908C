/** @flow */
import React, {Component} from "react"
import {Image, ScrollView} from "react-native"
import {List, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"

const Item = List.Item

class Profile extends Component<any, any> {

  render() {
    let {user: {suiusrnam}} = this.props

    return (
      <ScrollView>
        <WhiteSpace size="lg"/>
        <List>
          <Item arrow="horizontal" onClick={() => alert(1)}
                extra={<Image source={require('../../../../../assets/touchid.png')} style={{width: 60, height: 60}}/>}>
            头像
          </Item>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item arrow="horizontal" onClick={() => alert(1)} extra={suiusrnam}>
            用户名
          </Item>
          <Item arrow="horizontal" onClick={() => alert(1)} extra={suiusrnam}>
            性别
          </Item>
          <Item arrow="horizontal" onClick={() => alert(1)} extra={suiusrnam}>
            地区
          </Item>
          <Item arrow="horizontal" onClick={() => alert(1)} extra={suiusrnam}>
            签名
          </Item>
        </List>
      </ScrollView>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    user: state.common.login.user,
  })
)(Profile)
