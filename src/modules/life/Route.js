/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


const LifeStack = createStackNavigator(
  {
    LifeDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
);

const MainStack = createStackNavigator(
  {
    Life: LifeStack,
  },
  {
    headerMode: 'none',
  }
);

export default MainStack;