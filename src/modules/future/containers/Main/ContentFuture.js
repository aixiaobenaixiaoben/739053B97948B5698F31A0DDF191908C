/** @flow */
import React, {Component} from "react"
import {Text} from "react-native"


class ContentFuture extends Component<any, any> {

  componentWillMount() {
    this.props.navigation.setParams({
      headerLeft: null,
      headerRight: null,
    })
  }

  render() {
    return (
      <Text>FUTURE</Text>
    )
  }
}

export default ContentFuture