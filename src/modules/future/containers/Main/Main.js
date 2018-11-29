/** @flow */
import React, {Component} from "react"
import Content from "./Content"


class Main extends Component<any, any> {

  static navigationOptions = ({navigation}) => {
    const {headerTitle, headerLeft, headerRight} = navigation.state.params || {}
    return {
      headerLeft: headerLeft,
      headerTitle: headerTitle,
      headerRight: headerRight,
    }
  }

  render() {
    return <Content {...this.props}/>
  }
}

export default Main