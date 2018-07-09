/** @flow */
import React, {Component} from "react"
import {Text, View} from "react-native"
import PropTypes from "prop-types"

import style from "./styles/Pagination"
import Button from "./Button"


class Pagination extends Component<any, any> {

  prev = () => {
    const { current = 1 } = this.props
    if (current === 1) return
    this.props.onPress(current - 1)
  }

  next = () => {
    const { current = 1, total = 1 } = this.props
    if (current === total) return
    this.props.onPress(current + 1)
  }

  first = () => {
    this.props.onPress(1)
  }

  last = () => {
    const { total = 1 } = this.props
    this.props.onPress(total)
  }

  render() {
    const { current = 1, total = 1 } = this.props
    const disablePrev = current === 1
    const disableNext = current === total
    return (
      <View style={style.container}>

        <View style={style.up}>
          <Text style={style.upText}>当前第 <Text style={style.upNumber}>{current}/{total}</Text> 页</Text>
        </View>

        <View style={style.down}>
          <View style={style.downLeft}>
            <Button onPress={this.prev} style={style.touch} textStyle={style.touchText} text='上一页' disabled={disablePrev}/>
            <Button onPress={this.first} style={[style.touch, style.touchFirst]} textStyle={style.touchText} text='首页'/>
          </View>
          <View style={style.downRight}>
            <Button onPress={this.last} style={[style.touch, style.touchLast]} textStyle={style.touchText} text='末页'/>
            <Button onPress={this.next} style={style.touch} textStyle={style.touchText} text='下一页' disabled={disableNext}/>
          </View>
        </View>
      </View>
    )
  }

}

Pagination.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Pagination;