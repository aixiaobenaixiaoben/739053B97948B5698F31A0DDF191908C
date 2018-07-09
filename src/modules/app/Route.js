/** @flow */
import Detail from "./containers/Detail"
import {createStackNavigator} from "react-navigation"


const MovieStack = createStackNavigator(
  {
    AppDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
);

const MainStack = createStackNavigator(
  {
    Movie: MovieStack,
  },
  {
    headerMode: 'none',
  }
);

export default MainStack;