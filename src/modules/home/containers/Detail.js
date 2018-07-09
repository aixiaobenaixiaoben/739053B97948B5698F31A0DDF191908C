/** @flow */
import React, {Component} from "react"
import {Button, Text, View} from "react-native"


class Detail extends Component<any, any> {

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This Is Detail Of Home</Text>
        <Button
          title='Go Back'
          onPress={() => this.props.navigation.pop()}
        />
      </View>
    );
  }
}

export default Detail;