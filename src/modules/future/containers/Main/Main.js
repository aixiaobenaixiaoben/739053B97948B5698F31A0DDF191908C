/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import RNCalendarEvents from 'react-native-calendar-events'
import {Modal} from "antd-mobile-rn"
import * as eventActions from "../../actions/Event"
import Button from "../../../common/components/Button"
import {COLOR_SYS} from "../../../../Style"
import style from "../styles/Main/Main"
import Calendar from "../../components/Calendar"
import EventList from "../../components/EventList"
import * as DateUtils from "../../../common/utils/DateUtils"
import type {Fueventt} from "../../interface/Fueventt"

const TODAY = DateUtils.localDateString()


class Main extends Component<any, any> {

  state = {
    current: TODAY,
    markDates: {},
  }

  updateEventDate = ''

  static navigationOptions = ({navigation}) => {
    const backToToday = navigation.getParam('backToToday', () => {
    })
    const addEvent = navigation.getParam('addEvent', () => {
    })
    return {
      headerLeft: <Button style={style.headerButton} text='今天' onPress={backToToday}/>,
      headerRight: <Button style={style.headerButton} text='新建' onPress={addEvent}/>,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({backToToday: this.backToToday, addEvent: this.addEvent})
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', this.willFocus),
    ]
    if (!this.props.isLogin) {
      Modal.alert('', '登录后显示你添加的日程')
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove())
  }

  willFocus = (payload) => {
    let {params} = payload.action
    if (params && params.updateEventDate) {
      const updateEventDate = params.updateEventDate
      this.updateEventDate = updateEventDate
      const {current} = this.state
      this.onDateChange(updateEventDate)

      if (current.substr(0, 7) === updateEventDate.substr(0, 7)) {
        this.requestEvents(updateEventDate.substr(0, 4), updateEventDate.substr(5, 2))
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.refreshRemoteEvent(nextProps.events)
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      const {current} = this.state
      this.requestEvents(current.substr(0, 4), current.substr(5, 2))
    }
    return true
  }

  backToToday = () => {
    this.onDateChange(TODAY)
  }

  addEvent = () => {
    const {current} = this.state
    this.props.navigation.navigate('FutureCreate', {current})
  }

  onEventDelete = () => {
    const {current} = this.state
    this.requestEvents(current.substr(0, 4), current.substr(5, 2))
  }

  onDateChange = (date) => {
    this.setState({current: date})
  }

  onMonthChange = (year, month, dateString) => {
    this.requestEvents(year, month)
    if (this.state.current === dateString) {
      return
    }
    if (this.updateEventDate.length > 0) {
      this.onDateChange(this.updateEventDate)
      this.updateEventDate = ''
      return
    }
    if (TODAY === dateString) {
      this.onDateChange(TODAY)
      return
    }
    this.onDateChange(dateString.substr(0, 8) + '01')
  }

  requestEvents = (year, month) => {
    if (!this.props.calendarAccessible) {
      this.refreshEvent(year, month, {})
      return
    }
    let startDate = new Date(year, month - 1, 1)
    let endDate = new Date(year, month, 1)
    RNCalendarEvents.fetchAllEvents(startDate, endDate).then(response => {
      let markDates = {}
      for (let event of response) {
        const {id, title, notes: note, occurrenceDate, calendar: {color}} = event
        let dateString = DateUtils.localDateString(occurrenceDate)
        if (!markDates[dateString]) {
          markDates[dateString] = {marked: true, dotColor: COLOR_SYS, events: []}
        }
        const fueventt: Fueventt = {
          fetseqcod: id,
          fetevttit: title,
          fetevtnot: note,
          fetoccdat: occurrenceDate,
          color: color,
        }
        markDates[dateString].events.push(fueventt)
      }
      this.refreshEvent(year, month, markDates)

    }).catch(error => Modal.alert('', error.message))
  }

  refreshEvent = (year, month, markDates) => {
    this.setState({markDates})
    if (this.props.isLogin) {
      this.props.eventFetch()
    }
  }

  refreshRemoteEvent = (events: Fueventt[]) => {
    let {markDates} = this.state
    for (let event: Fueventt of events) {
      let dateString = DateUtils.localDateString(event.fetoccdat)
      if (!markDates[dateString]) {
        markDates[dateString] = {marked: true, dotColor: COLOR_SYS, events: []}
      }
      event.color = COLOR_SYS
      markDates[dateString].events.push(event)
    }
    this.setState({markDates})
  }

  render() {
    const {current, markDates} = this.state
    return (
      <ScrollView style={style.scroll}>
        <Calendar current={current} markDates={markDates} todayFocus={current === TODAY}
                  onMonthChange={this.onMonthChange} onDateChange={this.onDateChange}/>
        <EventList {...this.props}
                   data={markDates[current] && markDates[current].events || []}
                   onEventDelete={this.onEventDelete}/>
      </ScrollView>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  calendarAccessible: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  eventFetch: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    calendarAccessible: state.future.calendar.accessible,
    events: state.future.event.events,
  }),
  dispatch => ({
    eventFetch: () => dispatch(eventActions.fetch()),
  })
)(Main)