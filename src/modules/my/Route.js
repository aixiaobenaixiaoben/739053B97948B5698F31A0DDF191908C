/** @flow */
import {createStackNavigator} from "react-navigation"
import Setting from "./containers/Setting/Setting"
import PasswordModify from "./containers/Setting/PasswordModify"
import Result from "../common/containers/Result"
import GestureModify from "./containers/Setting/GestureModify"
import GestureSetting from "./containers/Setting/GestureSetting"
import HeaderBackImage from "../common/components/HeaderBackImage"
import React from "react"
import TouchIDSetting from "./containers/Setting/TouchIDSetting"
import {COLOR_SYS, COLOR_WHITE} from "../../Style"
import MobileModify from "./containers/Setting/MobileModify"
import Profile from "./containers/Profile/Profile"


export const MySettingRoute = createStackNavigator(
  {
    MySetting: {
      screen: Setting,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
        title: '设置',
      })
    },
    MyMobileModify: {
      screen: MobileModify,
      navigationOptions: {
        title: '手机号修改',
      }
    },
    MyPasswordModify: {
      screen: PasswordModify,
      navigationOptions: {
        title: '密码修改',
      }
    },
    MyGestureSetting: {
      screen: GestureSetting,
      navigationOptions: {
        title: '手势密码设置',
      }
    },
    MyGestureModify: {
      screen: GestureModify,
      navigationOptions: {
        title: '手势密码设置',
      }
    },
    MyTouchIDSetting: {
      screen: TouchIDSetting,
      navigationOptions: ({navigation}) => {
        return {
          title: navigation.getParam('title'),
        }
      }
    },
    MySettingResult: {
      screen: Result,
      navigationOptions: {
        title: '操作结果',
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

export const MyProfileRoute = createStackNavigator(
  {
    MyProfile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
        title: '个人信息',
      })
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
