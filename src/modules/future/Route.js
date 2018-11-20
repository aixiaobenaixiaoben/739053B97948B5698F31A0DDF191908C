/** @flow */
import React from "react"
import {createStackNavigator} from "react-navigation"
import HeaderBackImage from "../common/components/HeaderBackImage"
import Event from "./containers/Event/Event"
import {COLOR_SYS, COLOR_WHITE} from "../../Style"


export const FutureRoute = createStackNavigator(
  {
    FutureEvent: {
      screen: Event,
      navigationOptions: {
        title: '日程详情',
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
