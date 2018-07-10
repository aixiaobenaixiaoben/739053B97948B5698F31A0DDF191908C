/** @flow */
import {createStackNavigator} from "react-navigation"
import RegisterMobileCheck from "./containers/Register/MobileCheck"
import {COLOR_BLACK_SYS, COLOR_WHITE} from "../../Style"
import RegisterSetPassword from "./containers/Register/SetPassword"
import Result from "./containers/Result"


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
);
