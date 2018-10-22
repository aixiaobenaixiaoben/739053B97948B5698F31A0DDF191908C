/** @flow */
import {createStackNavigator} from "react-navigation"
import RegisterMobileCheck from "./containers/Register/MobileCheck"
import RegisterSetPassword from "./containers/Register/SetPassword"
import ResetPasswordMobileCheck from "./containers/ResetPassword/MobileCheck"
import ResetPasswordSetPassword from "./containers/ResetPassword/SetPassword"
import Result from "./containers/Result"
import HeaderBackImage from "./components/HeaderBackImage"
import React from "react"
import {COLOR_SYS, COLOR_WHITE} from "../../Style"


export const CommonRegisterRoute = createStackNavigator(
  {
    CommonRegisterMobileCheck: {
      screen: RegisterMobileCheck,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
        title: '手机注册',
      })
    },
    CommonRegisterSetPassword: {
      screen: RegisterSetPassword,
      navigationOptions: {
        title: '设置注册信息',
      }
    },
    CommonRegisterResult: {
      screen: Result,
      navigationOptions: {
        title: '注册结果',
      }
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: COLOR_WHITE,
      headerStyle: {
        backgroundColor: COLOR_SYS,
      },
      headerBackTitle: null,
      headerBackImage: <HeaderBackImage handler={() => navigation.pop()}/>,
    })
  }
)

export const CommonResetPasswordRoute = createStackNavigator(
  {
    CommonResetPasswordMobileCheck: {
      screen: ResetPasswordMobileCheck,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
      })
    },
    CommonResetPasswordSetPassword: {
      screen: ResetPasswordSetPassword,
    },
    CommonResetPasswordResult: {
      screen: Result,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      title: '重置登录密码',
      headerTintColor: COLOR_WHITE,
      headerStyle: {
        backgroundColor: COLOR_SYS,
      },
      headerBackTitle: null,
      headerBackImage: <HeaderBackImage handler={() => navigation.pop()}/>,
    })
  }
)
