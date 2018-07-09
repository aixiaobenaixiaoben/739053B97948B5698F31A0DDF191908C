/** @flow */
import {createStackNavigator} from "react-navigation"
import Register from "./containers/Login/Register"
import {COLOR_BLACK_SYS, COLOR_WHITE} from "./Constants"
import SetPassword from "./containers/Login/SetPassword"
import Result from "./containers/Result"


export const CommonRegisterRoute = createStackNavigator(
  {
    CommonRegister: {
      screen: Register,
      navigationOptions: {
        title: '验证手机号',
      }
    },
    CommonSetPassword: {
      screen: SetPassword,
      navigationOptions: {
        title: '设置密码',
      }
    },
    CommonResult: {
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
);
