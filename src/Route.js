/** @flow */
import React from "react"
import {createStackNavigator, createTabNavigator} from "react-navigation"
import AntDesign from "react-native-vector-icons/AntDesign"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

import {common, future, memory, my} from "./modules"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE} from "./Style"
import {ACTION_MY_MAIN_UPDATE} from "./modules/my/Constants"
import {ACTION_FUTURE_MAIN_UPDATE} from "./modules/future/Constants"

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
        title: '个人中心',
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


const RootTab = createTabNavigator(
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
      navigationOptions: ({screenProps}) => ({
        title: '未来',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <FontAwesome name='paper-plane' size={25} color={tintColor}/>
          return (<TabBarBadge tab='movie' icon={icon}/>)
        },
        tabBarOnPress: ({scene, jumpToIndex}) => {
          jumpToIndex(scene.index)
          if (scene.focused) {
            screenProps.store.dispatch({type: ACTION_FUTURE_MAIN_UPDATE})
          }
        }
      })
    },
    MyTab: {
      screen: MyHomeStack,
      navigationOptions: ({screenProps}) => ({
        title: '我的',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <AntDesign name='user' size={25} color={tintColor}/>
          return (<TabBarBadge tab='my' icon={icon}/>)
        },
        tabBarOnPress: ({scene, jumpToIndex}) => {
          jumpToIndex(scene.index)
          if (scene.focused) {
            screenProps.store.dispatch({type: ACTION_MY_MAIN_UPDATE})
          }
        }
      })
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLOR_SYS,
      inactiveTintColor: COLOR_FONT_GRAY_DARK,
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
    Memory: memory.MemoryRoute,
    Future: future.FutureRoute,
    FutureCreate: future.FutureCreateRoute,
    MySetting: my.MySettingRoute,
    MyProfile: my.MyProfileRoute,
    MyAbout: my.MyAboutRoute,
  },
  {
    headerMode: 'none',
  }
)
