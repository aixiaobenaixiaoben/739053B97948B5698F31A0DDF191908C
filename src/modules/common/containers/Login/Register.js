/** @flow */
import React, {Component} from "react"
import {StatusBar, TouchableOpacity, View} from "react-native"
import {COLOR_WHITE} from "../../Constants"
import {connect} from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import style from "../styles/Login/Register"
import Button from "../../components/Button"
import {InputItem, List} from "antd-mobile-rn"


class Register extends Component<any, any> {

  state = {
    mobile: '',
    code: '',
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft:
        <TouchableOpacity onPress={() => navigation.pop()} style={{paddingLeft: 9,paddingTop: 4,}}>
          <Ionicons name='ios-arrow-back' size={36} color={COLOR_WHITE}/>
        </TouchableOpacity>
    }
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content')
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('default')
  }

  onChangeMobile = (mobile) => {
    this.setState({mobile})
  }

  onChangeCode = (code) => {
    this.setState({code})
  }

  sendVerifyCode = () => {
    alert('发送验证码')
  }

  next = () => {
    this.props.navigation.navigate('CommonSetPassword', {
      backToLoginFunc: this.props.navigation.popToTop
    })
  }

  render() {
    return (
      <View style={style.view}>

        <List style={style.list}>
          <InputItem
            type='number'
            maxLength={11}
            clear
            value={this.state.mobile}
            onChange={this.onChangeMobile}
            placeholder="请输入本人手机号"
            style={{ borderBottomWidth: 1 }}
          >手机号
          </InputItem>
          <InputItem
            type='number'
            maxLength={8}
            clear
            value={this.state.code}
            onChange={this.onChangeCode}
            placeholder="请输入"
            extra={
              <Button
                text='发送验证码'
                onPress={this.sendVerifyCode}
                style={style.sendButton}
                textStyle={style.sendButtonText}
              />
            }
          >验证码
          </InputItem>
        </List>

        <Button
          text='下一步'
          onPress={this.next}
          style={style.button}
        />
      </View>
    )
  }
}

export default connect()(Register)