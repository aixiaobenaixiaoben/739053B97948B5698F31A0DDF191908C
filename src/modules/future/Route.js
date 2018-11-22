/** @flow */
import React from "react"
import {createStackNavigator} from "react-navigation"
import HeaderBackImage from "../common/components/HeaderBackImage"
import Event from "./containers/Event/Event"
import {COLOR_SYS, COLOR_WHITE} from "../../Style"
import EventNew from "./containers/Event/EventNew"
import EventMod from "./containers/Event/EventMod"


export const FutureRoute = createStackNavigator(
  {
    FutureEvent: {
      screen: Event,
      navigationOptions: {
        title: '日程详情',
      }
    },
    FutureEventMod: {
      screen: EventMod,
      navigationOptions: {
        title: '编辑日程',
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

export const FutureCreateRoute = createStackNavigator(
  {
    FutureCreate: {
      screen: EventNew,
      navigationOptions: {
        title: '新建日程',
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