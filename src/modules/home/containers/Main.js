/** @flow */
import React, {Component} from "react"
import {Button, StatusBar, Text, View} from "react-native"


class Main extends Component<any, any> {

  componentWillMount() {
    StatusBar.setBarStyle('default')
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is Home Main Page</Text>
        <Button
          title='Go To Detail'
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}

export default Main