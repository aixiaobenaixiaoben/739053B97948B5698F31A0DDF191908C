/** @flow */
import React, {Component} from "react"
import {Image, StyleSheet, TouchableOpacity} from "react-native"
import PropTypes from "prop-types"

const style = StyleSheet.create({
  touch: {
    marginLeft: 20,
  },
  image: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
})

class HeaderBackImage extends Component<any, any> {

  render() {
    const {
      mode = 'LIGHT',
      handler = () => {
      },
    } = this.props

    let image = <Image style={style.image} source={require('../../../../assets/common/HeaderBackImage/back1.png')}/>
    if (mode === 'DARK') {
      image = <Image style={style.image} source={require('../../../../assets/common/HeaderBackImage/back2.png')}/>
    }

    return (
      <TouchableOpacity onPress={handler} style={style.touch}>
        {image}
      </TouchableOpacity>
    )
  }
}

HeaderBackImage.propTypes = {
  mode: PropTypes.string,
  handler: PropTypes.func.isRequired,
}

export default HeaderBackImage