/** @flow */
import {createStackNavigator} from "react-navigation"
import {COLOR_BLACK_SYS, COLOR_WHITE} from "../../Style"
import RegisterMobileCheck from "./containers/Register/MobileCheck"
import RegisterSetPassword from "./containers/Register/SetPassword"
import ResetPasswordMobileCheck from "./containers/ResetPassword/MobileCheck"
import ResetPasswordSetPassword from "./containers/ResetPassword/SetPassword"
import Result from "./containers/Result"
import LoginAgreement from "./containers/Login/LoginAgreement"


export const CommonRegisterRoute = createStackNavigator(
  {
    CommonRegisterMobileCheck: {
      screen: RegisterMobileCheck,
      navigationOptions: {
        title: '手机注册',
      }
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
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLOR_BLACK_SYS,
      },
      headerTintColor: COLOR_WHITE,
      headerBackTitle: null,
    }
  }
)

export const CommonResetPasswordRoute = createStackNavigator(
  {
    CommonResetPasswordMobileCheck: {
      screen: ResetPasswordMobileCheck,
    },
    CommonResetPasswordSetPassword: {
      screen: ResetPasswordSetPassword,
    },
    CommonResetPasswordResult: {
      screen: Result,
    },
  },
  {
    navigationOptions: {
      title: '重置登录密码',
      headerStyle: {
        backgroundColor: COLOR_BLACK_SYS,
      },
      headerTintColor: COLOR_WHITE,
      headerBackTitle: null,
    }
  }
)

export const CommonLoginAgreementRoute = createStackNavigator(
  {
    CommonLoginAgreementRoute: {
      screen: LoginAgreement,
      navigationOptions: {
        title: 'App服务协议',
      }
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: COLOR_BLACK_SYS,
      },
      headerTintColor: COLOR_WHITE,
      headerBackTitle: null,
    }
  }
)
