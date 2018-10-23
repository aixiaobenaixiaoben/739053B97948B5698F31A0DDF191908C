/** @flow */
import React, {Component} from "react"
import {BackHandler, PanResponder, Text, View} from "react-native"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

import Button from "../components/Button"
import style from "./styles/Result"
import {COLOR_FONT_PINK, COLOR_GREEN} from "../../../Style"


class Result extends Component<any, any> {

  panResponder: {}

  constructor(props: any) {
    super(props)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => false,
    })
  }

  static navigationOptions = () => {
    return {
      headerLeft: null,
      gesturesEnabled: false,
    }
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', this.willFocus),
      this.props.navigation.addListener('willBlur', this.willBlur),
    ]
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove())
  }

  willFocus = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
  }

  willBlur = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
  }

  handleBackPress = () => {
    return true
  }

  backFunc = () => {
    const backFunc = this.props.navigation.getParam('backFunc', () => {
    })
    backFunc()
  }

  render() {
    const {
      success = true,
      title = '',
      description = '',
      buttonText = '确定',
    } = this.props.navigation.state.params

    let icon = <SimpleLineIcons name='check' size={60} color={COLOR_GREEN}/>
    if (!success) {
      icon = <SimpleLineIcons name='close' size={60} color={COLOR_FONT_PINK}/>
    }

    return (
      <View {...this.panResponder.panHandlers} style={style.outline}>
        <View style={style.view}>
          {icon}
        </View>
        <Text style={style.title}>{title}</Text>
        <Text style={style.description}>{description}</Text>
        <Button text={buttonText} onPress={this.backFunc} style={style.button}/>
      </View>
    )
  }
}

/** 以下为跳转到本结果页面时需要传递的路由参数及其默认值 */
/**
 success = true,
 title = '',
 description = '',
 buttonText = '确定',
 backFunc = () => {},
 */
export default Result