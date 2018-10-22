/** @flow */
import React, {Component} from "react"
import {Text, TouchableOpacity, ViewPropTypes} from "react-native"
import PropTypes from "prop-types"

import defaultStyle from "./styles/Button"


class Button extends Component<any, any> {

  press = () => {
    this.props.onPress()
  }

  render() {

    const {
      disabled = false,
      executing = false,
      executingText = '执行中',
      text = 'Button',
      style = {},
      textStyle = {}
    } = this.props

    const title = executing ? executingText : text
    const disable = executing || disabled
    const disableStyle = disable ? defaultStyle.disable : {}

    return (
      <TouchableOpacity style={[defaultStyle.touch, style, disableStyle]}
                        onPress={this.press} activeOpacity={0.6} disabled={disable}>
        <Text style={[defaultStyle.touchText, textStyle]}>{title}</Text>
      </TouchableOpacity>
    )
  }

}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  executing: PropTypes.bool,
  executingText: PropTypes.string,
  style: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
}

export default Button