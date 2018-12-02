/** @flow */
import React, {Component} from "react"
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native"
import PropTypes from "prop-types"
import {SwipeAction} from "antd-mobile-rn"
import style from "../styles/Main/ContentPast"
import type {Fueventt} from "../../interface/Fueventt"
import {connect} from "react-redux"
import * as eventActions from "../../actions/Event"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE} from "../../../../Style"
import * as DateUtils from "../../../common/utils/DateUtils"
import Button from "../../../common/components/Button"
import {CALENDAR_RANGE} from "../../../common/Constants"


class ContentFuture extends Component<any, any> {

  state = {
    year: new Date().getFullYear(),
    events: [],
  }

  headerLeft = (year) => {
    if (new Date().getFullYear() === year) {
      return null
    }
    return <Button style={style.headerButton} text='上一年' onPress={() => this.setState({year: year - 1})}/>
  }

  headerRight = (year) => {
    if (year - new Date().getFullYear() >= CALENDAR_RANGE / 12) {
      return null
    }
    return <Button style={style.headerButton} text='下一年' onPress={() => this.setState({year: year + 1})}/>
  }

  componentWillMount() {
    const {year} = this.state
    this.props.navigation.setParams({
      headerLeft: this.headerLeft(year),
      headerRight: this.headerRight(year),
    })
  }

  componentDidMount() {
    this.refreshEvent(this.props.isLogin)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.year !== nextState.year) {
      this.props.navigation.setParams({
        headerLeft: this.headerLeft(nextState.year),
        headerRight: this.headerRight(nextState.year),
      })
      this.refreshEvent(nextProps.isLogin)
    }
    if (this.props.events !== nextProps.events) {
      this.refreshRemoteEvent(nextProps.events)
    }
    if (this.props.updateEvent !== nextProps.updateEvent) {
      this.props.eventFetch()
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      this.refreshEvent(nextProps.isLogin)
    }
    return true
  }

  refreshEvent = (isLogin: boolean) => {
    this.setState({events: []})
    if (isLogin) {
      this.props.eventFetch()
    }
  }

  refreshRemoteEvent = (events: Fueventt[]) => {
    const {year} = this.state
    let start = new Date(year, 0, 1).toJSON()
    let end = new Date(year + 1, 0, 1).toJSON()
    let today = new Date()
    if (year === today.getFullYear()) {
      start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toJSON()
    }
    let eventList = []
    for (let event of events) {
      if (event.fetoccdat >= start && event.fetoccdat < end) {
        eventList.push(event)
      }
    }
    eventList.sort(eventActions.compare)
    this.setState({events: eventList})
  }

  detail = (item) => {
    this.props.navigation.navigate('FutureEvent', {event: item})
  }

  remove = (fetseqcod) => {
    this.props.eventDel({fetseqcod})
  }

  keyExtractor = (item) => item.fetseqcod

  renderItem = ({item}) => {
    const {fetseqcod, fetevttit, fetoccdat} = item
    const date = DateUtils.localDateString(fetoccdat).substring(5)
    let action = [
      {
        text: '详细信息',
        onPress: () => this.detail(item),
        style: {backgroundColor: COLOR_FONT_GRAY_DARK, color: COLOR_WHITE},
      },
      {
        text: '删除',
        onPress: () => this.remove(fetseqcod),
        style: {backgroundColor: COLOR_SYS, color: COLOR_WHITE},
      }
    ]
    return (
      <SwipeAction right={action} autoClose style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity style={style.listItem} onPress={() => this.detail(item)} activeOpacity={0.8}>
          <Text style={style.date}>{date}</Text>
          <View style={style.fill}/>
          <Text style={style.text} numberOfLines={1}>{fetevttit}</Text>
        </TouchableOpacity>
      </SwipeAction>
    )
  }

  render() {
    const {year, events} = this.state
    return (
      <ScrollView style={style.scroll}>
        <View style={style.title}>
          <Text style={style.titleText}>{year}年</Text>
        </View>

        <FlatList
          style={style.list}
          data={events}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </ScrollView>
    )
  }
}

ContentFuture.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  updateEvent: PropTypes.object.isRequired,
  eventFetch: PropTypes.func.isRequired,
  eventDel: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    events: state.future.event.events,
    updateEvent: state.future.event.updateEvent,
  }),
  dispatch => ({
    eventDel: (data: Fueventt) => dispatch(eventActions.del(data)),
    eventFetch: () => dispatch(eventActions.fetch()),
  })
)(ContentFuture)
