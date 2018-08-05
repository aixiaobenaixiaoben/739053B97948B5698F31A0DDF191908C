/** @flow */
import {createStackNavigator} from "react-navigation"
import Setting from "./containers/Setting/Setting"
import PasswordModify from "./containers/Setting/PasswordModify"
import PasswordModifyCheck from "./containers/Setting/PasswordModifyCheck"
import Result from "../common/containers/Result"
import GestureModify from "./containers/Setting/GestureModify"
import GestureSetting from "./containers/Setting/GestureSetting"
import {COLOR_BLACK_SYS, COLOR_WHITE} from "../../Style"
import HeaderBackImage from "../common/components/HeaderBackImage"
import React from "react"


export const MySettingRoute = createStackNavigator(
  {
    MySetting: {
      screen: Setting,
      navigationOptions: {
        title: '设置',
      }
    },
    MyPasswordModifyCheck: {
      screen: PasswordModifyCheck,
      navigationOptions: {
        title: '校验原登录密码',
      }
    },
    MyPasswordModify: {
      screen: PasswordModify,
      navigationOptions: {
        title: '设置新登录密码',
      }
    },
    MyPasswordModifyResult: {
      screen: Result,
      navigationOptions: {
        title: '密码修改结果',
      }
    },
    MyGestureSetting: {
      screen: GestureSetting,
      navigationOptions: {
        title: '设置手势密码',
      }
    },
    MyGestureModify: {
      screen: GestureModify,
      navigationOptions: {
        title: '设置手势密码',
      }
    },
  },
  {
    navigationOptions: ({navigation}) => {
      return {
        headerStyle: {
          backgroundColor: COLOR_BLACK_SYS,
        },
        headerTintColor: COLOR_WHITE,
        headerBackTitle: null,
        headerBackImage: <HeaderBackImage handler={() => navigation.pop()}/>,
      }
    }
  }
)
