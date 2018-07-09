/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"


class Main extends Component<any, any> {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is Life Main Page</Text>
        <Button
          title='Go To Detail'
          onPress={() => this.props.navigation.navigate('LifeDetail')}
        />
      </View>
    );
  }
}

export default Main;