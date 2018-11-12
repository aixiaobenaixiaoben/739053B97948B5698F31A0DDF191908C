/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"


class Content extends Component<any, any> {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is Memory Main Page</Text>
        <Button
          title='Go To Detail'
          onPress={() => this.props.navigation.navigate('Memory')}
        />
      </View>
    )
  }
}

export default Content