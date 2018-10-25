/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


export const MemoryRoute = createStackNavigator(
  {
    MemoryDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
)
