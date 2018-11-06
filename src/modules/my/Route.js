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
import Photo from "./containers/Profile/Photo"
import Name from "./containers/Profile/Name"
import Gender from "./containers/Profile/Gender"
import Version from "./containers/Setting/Version"
import Feedback from "./containers/Setting/Feedback"


export const MySettingRoute = createStackNavigator(
  {
    MySetting: {
      screen: Setting,
      navigationOptions: {
        title: '设置',
      }
    },
    MyMobileModify: {
      screen: MobileModify,
      navigationOptions: {
        title: '修改手机号码',
      }
    },
    MyPasswordModify: {
      screen: PasswordModify,
      navigationOptions: {
        title: '修改登录密码',
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
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('title'),
      })
    },
    MySettingResult: {
      screen: Result,
      navigationOptions: ({navigation}) => ({
        title: navigation.getParam('navigationTitle'),
      })
    },
    MyVersion: {
      screen: Version,
      navigationOptions: {
        title: '关于',
      }
    },
    MyFeedback: {
      screen: Feedback,
      navigationOptions: {
        title: '信息反馈',
      }
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: COLOR_WHITE,
      headerStyle: {
        backgroundColor: COLOR_SYS,
      },
      headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
    })
  }
)

export const MyProfileRoute = createStackNavigator(
  {
    MyProfile: {
      screen: Profile,
      navigationOptions: {
        title: '个人信息',
      }
    },
    MyProfilePhoto: {
      screen: Photo,
      navigationOptions: {
        title: '设置头像',
      }
    },
    MyProfileName: {
      screen: Name,
      navigationOptions: {
        title: '设置昵称',
      }
    },
    MyProfileGender: {
      screen: Gender,
      navigationOptions: {
        title: '设置性别',
      }
    },
  },
  {
    navigationOptions: ({navigation}) => ({
      headerTintColor: COLOR_WHITE,
      headerStyle: {
        backgroundColor: COLOR_SYS,
      },
      headerLeft: <HeaderBackImage handler={() => navigation.pop()}/>,
    })
  }
)
