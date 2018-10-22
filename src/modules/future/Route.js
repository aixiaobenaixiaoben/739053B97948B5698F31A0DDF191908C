/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


export const FutureRoute = createStackNavigator(
  {
    FutureDetail: {
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
