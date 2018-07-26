/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


export const MovieDetailRoute = createStackNavigator(
  {
    MovieDetail: {
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
