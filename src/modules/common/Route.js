/** @flow */
import {createStackNavigator} from "react-navigation"
import RegisterMobileCheck from "./containers/Register/MobileCheck"
import RegisterSetPassword from "./containers/Register/SetPassword"
import ResetPasswordMobileCheck from "./containers/ResetPassword/MobileCheck"
import ResetPasswordSetPassword from "./containers/ResetPassword/SetPassword"
import Result from "./containers/Result"
import LoginAgreement from "./containers/Login/LoginAgreement"
import HeaderBackImage from "./components/HeaderBackImage"
import React from "react"


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
        title: '设置登录密码',
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
      headerBackTitle: null,
      headerBackImage: <HeaderBackImage handler={() => navigation.pop()}/>,
    })
  }
)

export const CommonLoginAgreementRoute = createStackNavigator(
  {
    CommonLoginAgreementRoute: {
      screen: LoginAgreement,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
        title: 'App服务协议',
      })
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
    }
  }
)
