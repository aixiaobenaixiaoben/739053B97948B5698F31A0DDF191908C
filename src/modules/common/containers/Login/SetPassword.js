/** @flow */
import React, {Component} from "react"
import {View} from "react-native"
import style from "../styles/Login/Register"
import Button from "../../components/Button"
import {InputItem, List} from "antd-mobile-rn"


class SetPassword extends Component<any, any> {

  state = {
    password1: '',
    password2: '',
  }

  onChangePassword1 = (password1: string) => {
    this.setState({password1})
  }

  onChangePassword2 = (password2: string) => {
    this.setState({password2})
  }

  submit = () => {
    this.props.navigation.navigate('CommonResult', {
      onPressFunc: this.props.navigation.getParam('backToLoginFunc'),
      isSuccess: true,
      title: '注册成功',
      description: '您已经完成注册,请前往登录'
    })
  }

  render() {
    return (
      <View style={style.view}>

        <List style={style.list}>
          <InputItem
            type='password'
            maxLength={15}
            clear
            value={this.state.password1}
            onChange={this.onChangePassword1}
            placeholder="请输入"
            style={{ borderBottomWidth: 1 }}
          >密码
          </InputItem>
          <InputItem
            type='password'
            maxLength={15}
            clear
            value={this.state.password2}
            onChange={this.onChangePassword2}
            placeholder="请输入"
          >重复密码
          </InputItem>
        </List>

        <Button
          text='提交'
          onPress={this.submit}
          style={style.button}
        />
      </View>
    )
  }
}

export default SetPassword
