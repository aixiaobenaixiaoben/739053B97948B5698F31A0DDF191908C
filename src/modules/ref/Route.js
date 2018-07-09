/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


const RefStack = createStackNavigator(
  {
    RefDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
);

const MainStack = createStackNavigator(
  {
    Ref: RefStack,
  },
  {
    headerMode: 'none',
  }
);

export default MainStack;