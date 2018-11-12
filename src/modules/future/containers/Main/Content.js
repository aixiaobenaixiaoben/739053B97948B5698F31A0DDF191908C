/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"


class Content extends Component<any, any> {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is Future Main Page</Text>
        <Button
          title='Go To Detail'
          onPress={() => this.props.navigation.navigate('Future')}
        />
      </View>
    )
  }
}

export default Content