/** @flow */
import React, {Component} from "react"
import {Image, ScrollView, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/About/About"
import * as versionActions from "../../actions/About/About"
import {APP_VERSION} from "../../../common/Constants"
import {List, WhiteSpace} from "antd-mobile-rn"

const Item = List.Item

class About extends Component<any, any> {

  feedback = () => {
    this.props.navigation.navigate('MyFeedback')
  }

  update = () => {
    versionActions.linkingFunc(this.props.version.url)
  }

  rate = () => {
    alert('TODO')
  }

  privacy = () => {
    versionActions.linkingFunc(this.props.version.appName)
  }

  render() {
    const {newVersion} = this.props.version
    const isUpdate = versionActions.isVersionIncrease(APP_VERSION, newVersion)

    return (
      <ScrollView style={style.scroll}>
        <View style={style.view1}>
          <Image style={style.image} source={require('../../../../../assets/my/profile/logo01.png')}/>
        </View>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} extra={APP_VERSION}>
            当前版本
          </Item>
          {isUpdate &&
          <Item style={style.listItem} arrow="horizontal" onClick={this.update} extra={newVersion}>
            新版更新
          </Item>
          }
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <Item style={style.listItem} arrow="horizontal" onClick={this.feedback}>
            反馈与建议
          </Item>
          <Item style={style.listItem} arrow="horizontal" onClick={this.rate}>
            给软件评分
          </Item>
          <Item style={style.listItem} arrow="horizontal" onClick={this.privacy}>
            隐私政策
          </Item>
        </List>
      </ScrollView>
    )
  }
}

About.propTypes = {
  version: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    version: state.my.about.version,
  })
)(About)