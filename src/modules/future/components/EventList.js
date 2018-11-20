/** @flow */
import React, {Component} from "react"
import {FlatList, Text, TouchableOpacity, View} from "react-native"
import PropTypes from "prop-types"
import style from "./styles/EventList"
import {SwipeAction} from "antd-mobile-rn"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE} from "../../../Style"

class EventList extends Component<any, any> {

  detail = (item) => {
    this.props.navigation.navigate('FutureEvent', {event: item})
  }

  remove = (id) => {
    //TODO
    console.log('remove:' + id)
  }

  keyExtractor = (item) => item.id

  renderItem = ({item}) => {
    const {id, title, color} = item
    let action = [
      {
        text: '详细信息',
        onPress: () => this.detail(item),
        style: {backgroundColor: COLOR_FONT_GRAY_DARK, color: COLOR_WHITE},
      },
      {
        text: '删除',
        onPress: () => this.remove(id),
        style: {backgroundColor: COLOR_SYS, color: COLOR_WHITE},
      },
    ]
    return (
      <SwipeAction right={action} autoClose style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity style={style.listItem}
                          onPress={() => this.detail(item)} activeOpacity={0.8}>

          <View style={{backgroundColor: color, width: 2}}/>
          <Text style={style.text} numberOfLines={1}>{title}</Text>

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

EventList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default EventList

