/** @flow */
import React, {Component} from "react"
import {Image, Text, TouchableOpacity, View} from "react-native"
import {connect} from "react-redux"
import {NavigationActions, StackActions} from "react-navigation"
import PropTypes from "prop-types"
import FontAwesome from "react-native-vector-icons/FontAwesome"

import style from "../styles/Login/LoginOption"
import Button from "../../components/Button"
import {COLOR_BLACK_08, COLOR_BLUE_SYS, COLOR_GRAY_LIGHT} from "../../Constants"


class LoginOption extends Component<any, any> {

  state = {
    color: COLOR_BLUE_SYS
  }

  jump = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MyLogin', params: {routeFrom: 'LoginOption'} })],
    })
    this.props.navigation.dispatch(resetAction)
  }

  loginWithFinger = () => {
    alert('指纹登录')
  }

  onPressIn = () => {
    this.setState({color: COLOR_BLACK_08})
  }

  onPressOut = () => {
    this.setState({color: COLOR_BLUE_SYS})
  }

  render() {
    const { loginID } = this.props

    return (
      <View style={style.view}>

        <View style={style.top}>
          <FontAwesome name='user-circle' size={60} color={COLOR_GRAY_LIGHT}/>
          <View style={style.info}>
            <Text style={style.infoText}>用户手机号</Text>
            <Text style={style.infoText2}>{loginID}</Text>
          </View>
        </View>

        <View style={style.middle}>
          <TouchableOpacity onPress={this.loginWithFinger}
                            onPressIn={this.onPressIn}
                            onPressOut={this.onPressOut}
                            activeOpacity={1}>
            <Image source = {require('../../../../../assets/7.png')}
                   style = {[style.touchID, {tintColor:`${this.state.color}`}]}/>
          </TouchableOpacity>

          <Button style={[style.button, style.button1]}
                  textStyle={style.buttonText}
                  text='点击进行指纹登录'
                  onPress={this.loginWithFinger} />
        </View>

        <View style={style.bottom}>
          <Button style={style.button} textStyle={style.buttonText} text='密码登录' onPress={this.jump} />
        </View>

      </View>
    )
  }
}

LoginOption.propTypes = {
  loginID: PropTypes.string.isRequired,
}

export default connect(
  state => ({
    loginID: state.common.login.loginID,
  })
)(LoginOption)