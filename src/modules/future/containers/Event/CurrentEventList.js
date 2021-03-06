/** @flow */
import React, {Component} from "react"
import {FlatList, Text, TouchableOpacity, View} from "react-native"
import PropTypes from "prop-types"
import {connect} from "react-redux"
import {SwipeAction} from "antd-mobile-rn"
import * as eventActions from "../../actions/Event"
import style from "../styles/Event/EventList"
import type {Fueventt} from "../../interface/Fueventt"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE} from "../../../../Style"

class CurrentEventList extends Component<any, any> {

  detail = (item) => {
    this.props.navigation.navigate('FutureEvent', {event: item})
  }

  remove = (fetseqcod) => {
    this.props.eventDel({fetseqcod})
  }

  keyExtractor = (item) => item.fetseqcod

  renderItem = ({item}) => {
    const {fetseqcod, fetevttit, color} = item
    let action = [{
      text: '详细信息',
      onPress: () => this.detail(item),
      style: {backgroundColor: COLOR_FONT_GRAY_DARK, color: COLOR_WHITE},
    }]
    if (fetseqcod.length === 24) {
      action.push({
        text: '删除',
        onPress: () => this.remove(fetseqcod),
        style: {backgroundColor: COLOR_SYS, color: COLOR_WHITE},
      })
    }
    return (
      <SwipeAction right={action} autoClose style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity style={style.listItem} onPress={() => this.detail(item)} activeOpacity={0.8}>
          <View style={{backgroundColor: color, width: 2}}/>
          <Text style={style.text} numberOfLines={1}>{fetevttit}</Text>
        </TouchableOpacity>
      </SwipeAction>
    )
  }

  render() {
    const {data} = this.props
    return (
      <FlatList
        style={style.list}
        data={data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }
}

CurrentEventList.propTypes = {
  data: PropTypes.array.isRequired,
  eventDel: PropTypes.func.isRequired,
}

export default connect(
  state => ({}),
  dispatch => ({
    eventDel: (data: Fueventt) => dispatch(eventActions.del(data)),
  })
)(CurrentEventList)
