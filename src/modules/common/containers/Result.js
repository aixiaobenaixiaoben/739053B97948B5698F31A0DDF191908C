/** @flow */
import React, {Component} from "react"
import {BackHandler, PanResponder, Text, View} from "react-native"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

import Button from "../components/Button"
import style from "./styles/Result"
import {COLOR_GREEN, COLOR_RED} from "../Constants"


class Result extends Component<any, any> {

  _panResponder: any

  constructor(props: any) {
    super(props)
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
    });
  }

  static navigationOptions = () => {
    return {
      headerLeft: null,
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    return true;
  }

  onPress = () => {
    const onPressFunc = this.props.navigation.getParam('onPressFunc')
    this.props.navigation.popToTop()
    if (onPressFunc !== undefined) {
      onPressFunc()
    }
  }

  render() {
    const { navigation } = this.props
    const isSuccess = navigation.getParam('isSuccess', true)
    const title = navigation.getParam('title', '验证成功')
    const description = navigation.getParam('description', '所提交内容已成功完成验证')

    const icon = isSuccess ? <SimpleLineIcons name='check' size={60} color={COLOR_GREEN}/> :
                          <SimpleLineIcons name='close' size={60} color={COLOR_RED}/>

    return (
      <View {...this._panResponder.panHandlers} style={style.view}>
        {icon}
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
        <Button text='完成' onPress={this.onPress} style={style.button}/>
      </View>
    )
  }
}

export default Result