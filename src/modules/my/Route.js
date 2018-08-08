/** @flow */
import {createStackNavigator} from "react-navigation"
import Setting from "./containers/Setting/Setting"
import PasswordModify from "./containers/Setting/PasswordModify"
import PasswordModifyCheck from "./containers/Setting/PasswordModifyCheck"
import Result from "../common/containers/Result"
import GestureModify from "./containers/Setting/GestureModify"
import GestureSetting from "./containers/Setting/GestureSetting"
import HeaderBackImage from "../common/components/HeaderBackImage"
import React from "react"
import TouchIDSetting from "./containers/Setting/TouchIDSetting"


export const MySettingRoute = createStackNavigator(
  {
    MySetting: {
      screen: Setting,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
        title: '设置',
      })
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
    MyTouchIDSetting: {
      screen: TouchIDSetting,
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerBackTitle: null,
      headerBackImage: <HeaderBackImage handler={() => navigation.pop()}/>,
    })
  }
)
