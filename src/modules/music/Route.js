/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


export const MusicDetailRoute = createStackNavigator(
  {
    MusicDetail: {
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
