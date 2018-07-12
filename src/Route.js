/** @flow */
import React from "react"
import {createBottomTabNavigator, createStackNavigator} from "react-navigation"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

import {common, fin, home, life, my, ref} from "./modules"
import StartView from "./modules/common/containers/Start"
import GuideView from "./modules/common/containers/Guide"
import TabBarBadge from "./modules/common/containers/TabBarBadge"
import LoginView from "./modules/common/containers/Login/Login"
import LoginPasswordView from "./modules/common/containers/Login/LoginPassword"
import LoginOptionView from "./modules/common/containers/Login/LoginOption"
import {COLOR_BLUE_SYS, COLOR_GRAY} from "./Style"


const HomeHomeStack = createStackNavigator(
  {
    HomeHome: {
      screen: home.HomeMain,
      navigationOptions: {
        title: 'Home',
      }
    },
  },
);

const RefHomeStack = createStackNavigator(
  {
    RefHome: {
      screen: ref.RefMain,
      navigationOptions: {
        title: 'Ref',
      }
    },
  },
);

const FinHomeStack = createStackNavigator(
  {
    FinHome: {
      screen: fin.FinMain,
      navigationOptions: {
        title: 'Fin',
      }
    },
  },
);

const LifeHomeStack = createStackNavigator(
  {
    LifeHome: {
      screen: life.LifeMain,
      navigationOptions: {
        title: 'Life',
      }
    },
  },
);

const MyHomeStack = createStackNavigator(
  {
    MyHome: {
      screen: my.MyMain,
      navigationOptions: {
        title: 'My',
      }
    },
    MyLogin: {
      screen: LoginView,
      navigationOptions: {
        header: null
      }
    },
    MyLoginPassword: {
      screen: LoginPasswordView,
      navigationOptions: {
        header: null
      }
    },
    MyLoginOption: {
      screen: LoginOptionView,
      navigationOptions: {
        header: null
      },
    },
  },
);


const RootTab = createBottomTabNavigator(
  {
    HomeTab: {
      screen: HomeHomeStack,
      navigationOptions: {
        title: '首页',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <MaterialIcon name={`home${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='home' icon={icon} />)
        },
      }
    },
    RefTab: {
      screen: RefHomeStack,
      navigationOptions: {
        title: '参考',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <Ionicons name={`ios-list-box${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='ref' icon={icon} />)
        }
      }
    },
    FinTab: {
      screen: FinHomeStack,
      navigationOptions: {
        title: '理财',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <MaterialIcon name={`stop-circle${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='fin' icon={icon} />)
        }
      }
    },
    LifeTab: {
      screen: LifeHomeStack,
      navigationOptions: {
        title: '生活',
        tabBarIcon: ({focused, tintColor}) => {
          const icon = <Ionicons name={`ios-cafe${focused ? '' : '-outline'}`} size={25} color={tintColor}/>
          return (<TabBarBadge tab='life' icon={icon}/>)
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
      activeTintColor: COLOR_BLUE_SYS,
      inactiveTintColor: COLOR_GRAY,
    },
    lazy: true,
  }
);

export default createStackNavigator(
  {
    start: StartView,
    guide: GuideView,
    RootTab: RootTab,
    home: home.HomeRoute,
    ref: ref.RefRoute,
    fin: fin.FinRoute,
    life: life.LifeRoute,
    my: my.MyRoute,
    register: common.CommonRegisterRoute,
    resetPassword: common.CommonResetPasswordRoute,
  },
  {
    headerMode: 'none',
  }
);
