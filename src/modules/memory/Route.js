/** @flow */
import React from "react"
import {createStackNavigator} from "react-navigation"
import {COLOR_SYS, COLOR_WHITE} from "../../Style"
import MemoryNew from "./containers/Memory/MemoryNew"
import HeaderBackImage from "../common/components/HeaderBackImage"
import Memory from "./containers/Memory/Memory"
import MemoryMod from "./containers/Memory/MemoryMod"


export const MemoryRoute = createStackNavigator(
  {
    MemoryMemory: {
      screen: Memory,
      navigationOptions: {
        title: '回忆详情',
      }
    },
    MemoryMemoryMod: {
      screen: MemoryMod,
      navigationOptions: {
        title: '编辑回忆',
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

export const MemoryCreateRoute = createStackNavigator(
  {
    MemoryCreate: {
      screen: MemoryNew,
      navigationOptions: {
        title: '新建回忆',
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