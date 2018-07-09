/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


const HomeStack = createStackNavigator(
  {
    HomeDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
);

const MainStack = createStackNavigator(
  {
    Home: HomeStack,
  },
  {
    headerMode: 'none',
  }
);

export default MainStack;