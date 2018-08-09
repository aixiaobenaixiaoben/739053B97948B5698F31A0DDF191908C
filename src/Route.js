/** @flow */
import React from "react"
import {createBottomTabNavigator, createStackNavigator} from "react-navigation"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

import {common, home, movie, music, my, read} from "./modules"
import {COLOR_GRAY, COLOR_SYS, COLOR_WHITE} from "./Style"

const TabBarBadge = common.TabBarBadge

const HomeHomeStack = createStackNavigator(
  {
    HomeHome: {
      screen: home.HomeMain,
      navigationOptions: {
        title: 'Home',
        headerTintColor: COLOR_WHITE,
        headerStyle: {
          backgroundColor: COLOR_SYS,
        },
      }
    },
  },
)

const MovieHomeStack = createStackNavigator(
  {
    MovieHome: {
      screen: movie.MovieMain,
      navigationOptions: {
        title: 'Movie',
        headerTintColor: COLOR_WHITE,
        headerStyle: {
          backgroundColor: COLOR_SYS,
        },
      }
    },
  },
)

const MusicHomeStack = createStackNavigator(
  {
    MusicHome: {
      screen: music.MusicMain,
      navigationOptions: {
        title: 'Music',
        headerTintColor: COLOR_WHITE,
        headerStyle: {
          backgroundColor: COLOR_SYS,
        },
      }
    },
  },
)

const ReadHomeStack = createStackNavigator(
  {
    ReadHome: {
      screen: read.ReadMain,
      navigationOptions: {
        title: 'Read',
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
    HomeTab: {
      screen: HomeHomeStack,
      navigationOptions: {
        title: '首页',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <MaterialIcon name={`home${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='home' icon={icon}/>)
        },
      }
    },
    MovieTab: {
      screen: MovieHomeStack,
      navigationOptions: {
        title: '电影',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <MaterialIcon name={'movie-roll'} size={25} color={tintColor}/>
          return (<TabBarBadge tab='movie' icon={icon}/>)
        }
      }
    },
    MusicTab: {
      screen: MusicHomeStack,
      navigationOptions: {
        title: '音乐',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <Ionicons name={`ios-musical-notes${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='music' icon={icon}/>)
        }
      }
    },
    ReadTab: {
      screen: ReadHomeStack,
      navigationOptions: {
        title: '文字',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <MaterialIcon name={'audiobook'} size={25} color={tintColor}/>
          return (<TabBarBadge tab='read' icon={icon}/>)
        },
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
    Home: home.HomeDetailRoute,
    Movie: movie.MovieDetailRoute,
    Music: music.MusicDetailRoute,
    Read: read.ReadDetailRoute,
    MySetting: my.MySettingRoute,
  },
  {
    headerMode: 'none',
  }
)
