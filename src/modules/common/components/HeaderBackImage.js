/** @flow */
import React, {Component} from "react"
import {StyleSheet, TouchableOpacity} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import PropTypes from "prop-types"

import {COLOR_BLUE_SYS, COLOR_WHITE} from "../../../Style"

class HeaderBackImage extends Component<any, any> {

  render() {
    const {
      color = COLOR_BLUE_SYS,
      name = 'ios-arrow-back',
      handler = () => {},
    } = this.props

    return (
      <TouchableOpacity onPress={handler} style={style.view}>
        <Ionicons name={name} size={36} color={color}/>
      </TouchableOpacity>
    )
  }
}

const style = StyleSheet.create({
  view: {
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

HeaderBackImage.propTypes = {
  color: PropTypes.string,
  name: PropTypes.string,
  handler: PropTypes.func.isRequired,
}

export default HeaderBackImage