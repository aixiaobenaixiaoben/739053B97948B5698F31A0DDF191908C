/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


export const ReadDetailRoute = createStackNavigator(
  {
    ReadDetail: {
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
