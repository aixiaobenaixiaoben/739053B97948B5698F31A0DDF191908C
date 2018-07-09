/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


const MyStack = createStackNavigator(
  {
    MyDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
);

const MainStack = createStackNavigator(
  {
    My: MyStack,
  },
  {
    headerMode: 'none',
  }
);

export default MainStack;