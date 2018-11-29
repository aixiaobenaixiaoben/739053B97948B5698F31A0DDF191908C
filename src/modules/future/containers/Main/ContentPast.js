/** @flow */
import React, {Component} from "react"
import {Text} from "react-native"


class ContentPast extends Component<any, any> {

  componentWillMount() {
    this.props.navigation.setParams({
      headerLeft: null,
      headerRight: null,
    })
  }

  render() {
    return (
      <Text>PAST</Text>
    )
  }
}

export default ContentPast