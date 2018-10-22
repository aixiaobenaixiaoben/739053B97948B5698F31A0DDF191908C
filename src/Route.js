/** @flow */
import React from "react"
import {createBottomTabNavigator, createStackNavigator} from "react-navigation"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

import {common, future, memory, my} from "./modules"
import {COLOR_GRAY, COLOR_SYS, COLOR_WHITE} from "./Style"

const TabBarBadge = common.TabBarBadge

const MemoryHomeStack = createStackNavigator(
  {
    MemoryHome: {
      screen: memory.MemoryMain,
      navigationOptions: {
        title: 'Memory',
        headerTintColor: COLOR_WHITE,
        headerStyle: {
          backgroundColor: COLOR_SYS,
        },
      }
    },
  },
)

const FutureHomeStack = createStackNavigator(
  {
    FutureHome: {
      screen: future.FutureMain,
      navigationOptions: {
        title: 'Future',
        headerTintColor: COLOR_WHITE,
        headerStyle: {
          backgroundColor: COLOR_SYS,
        },
      }
    },
  },
)

const MyHomeStack = createStackNavigator(
  {
    MyHome: {
      screen: my.MyMain,
      navigationOptions: {
        title: '帐号',
      }
    },
    MyLogin: {
      screen: common.Login,
      navigationOptions: {
        title: '登录',
      }
    },
    MyLoginPassword: {
      screen: common.LoginPassword,
      navigationOptions: {
        title: '密码登录'
      }
    },
    MyLoginGesture: {
      screen: common.LoginGesture,
      navigationOptions: {
        title: '手势登录',
      }
    },
    MyLoginTouchID: {
      screen: common.LoginTouchID,
      navigationOptions: {
        title: '登录',
      }
    },
  },
  {
    navigationOptions: {
      headerTintColor: COLOR_WHITE,
      headerStyle: {
        backgroundColor: COLOR_SYS,
      },
    }
  }
)


const RootTab = createBottomTabNavigator(
  {
    MemoryTab: {
      screen: MemoryHomeStack,
      navigationOptions: {
        title: '回忆',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <SimpleLineIcons name='note' size={25} color={tintColor}/>
          return (<TabBarBadge tab='home' icon={icon}/>)
        },
      }
    },
    FutureTab: {
      screen: FutureHomeStack,
      navigationOptions: {
        title: '未来',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <SimpleLineIcons name='calendar' size={25} color={tintColor}/>
          return (<TabBarBadge tab='movie' icon={icon}/>)
        }
      }
    },
    MyTab: {
      screen: MyHomeStack,
      navigationOptions: {
        title: '我的',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <MaterialIcon name={`account${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='my' icon={icon}/>)
        },
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLOR_SYS,
      inactiveTintColor: COLOR_GRAY,
    },
    lazy: true,
  }
)

export default createStackNavigator(
  {
    RootTab: RootTab,
    Start: common.Start,
    Guide: common.Guide,
    CommonRegister: common.CommonRegisterRoute,
    CommonResetPassword: common.CommonResetPasswordRoute,
    CommonLoginAgreement: common.CommonLoginAgreementRoute,
    Memory: memory.MemoryRoute,
    Future: future.FutureRoute,
    MySetting: my.MySettingRoute,
    MyProfile: my.MyProfileRoute,
  },
  {
    headerMode: 'none',
  }
)
