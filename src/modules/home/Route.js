/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


export const HomeDetailRoute = createStackNavigator(
  {
    HomeDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  },
  {
    navigationOptions: {
      headerBackTitle: null,
    }
  }
)
