/** @flow */
import React, {Component} from "react"
import {ImageBackground, Text, View} from "react-native"
import {NavigationActions, StackActions} from 'react-navigation'
import {Carousel} from "antd-mobile-rn"

import Button from "../components/Button"
import style from "./styles/Guide"


class Guide extends Component<any, any> {

  goHome = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'RootTab' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Carousel dotStyle={style.dotStyle}>

        <View style={style.container}>
          <ImageBackground source = {require('../../../../assets/1.png')} style = {style.imageBack}>
            <View style={style.bottomView}>
              <Text style={style.text}>向左滑动屏幕查看更多</Text>
              <Button text='跳过' onPress={this.goHome} style={style.button}/>
            </View>
          </ImageBackground>
        </View>

        <View style={style.container}>
          <ImageBackground source = {require('../../../../assets/2.png')} style = {style.imageBack}>
          </ImageBackground>
        </View>

        <View style={style.container}>
          <ImageBackground source = {require('../../../../assets/3.png')} style = {style.imageBack}>
            <View style={style.bottomView}>
              <Text> </Text>
              <Button text='立即体验' onPress={this.goHome} style={style.button}/>
              <Text> </Text>
            </View>
          </ImageBackground>
        </View>

      </Carousel>
    )
  }
}

export default Guide