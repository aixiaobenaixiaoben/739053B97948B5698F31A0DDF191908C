/** @flow */
import {createStackNavigator} from "react-navigation"
import Detail from "./containers/Detail"


const FinStack = createStackNavigator(
  {
    FinDetail: {
      screen: Detail,
      navigationOptions: {
        title: 'Detail',
      }
    },
  }
);

const MainStack = createStackNavigator(
  {
    Fin: FinStack,
  },
  {
    headerMode: 'none',
  }
);

export default MainStack;