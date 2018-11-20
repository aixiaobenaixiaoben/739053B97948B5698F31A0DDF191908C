/** @flow */
import React, {Component} from "react"
import {ScrollView} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import RNCalendarEvents from 'react-native-calendar-events'
import {Modal, Toast} from "antd-mobile-rn"
import * as eventActions from "../../actions/Event"
import Button from "../../../common/components/Button"
import {COLOR_SYS} from "../../../../Style"
import style from "../styles/Main/Main"
import Calendar from "../../components/Calendar"
import EventList from "../../components/EventList"
import * as DateUtils from "../../../common/utils/DateUtils"

const TODAY = DateUtils.localDateString()


class Main extends Component<any, any> {

  state = {
    current: TODAY,
    markDates: {},
  }

  static navigationOptions = ({navigation}) => {
    const backToToday = navigation.getParam('backToToday', () => {
    })
    return {
      headerLeft: <Button style={style.headerButton} text='今天' onPress={backToToday}/>,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({backToToday: this.backToToday})
  }

  componentDidMount() {
    if (!this.props.isLogin) {
      Toast.info('登录后显示你添加的日程', 3, null, false)
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.version !== nextProps.version) {
      this.refreshRemoteEvent()
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      const {current} = this.state
      this.requestEvents(parseInt(current.substr(0, 4)), parseInt(current.substr(5, 2)))
    }
    return true
  }

  backToToday = () => {
    this.onDateChange(TODAY)
  }

  onDateChange = (date) => {
    this.setState({current: date})
  }

  onMonthChange = (year, month, dateString) => {
    this.requestEvents(year, month)
    if (this.state.current === dateString) {
      return
    }
    if (month === new Date().getMonth() + 1) {
      this.onDateChange(TODAY)
    } else {
      let date = new Date(dateString)
      date.setDate(1)
      this.onDateChange(date.toJSON().substr(0, 10))
    }
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
        markDates[dateString].events.push({id, title, note, color, date: dateString})
      }
      this.refreshEvent(year, month, markDates)

    }).catch(error => Modal.alert('', error.message))
  }

  refreshEvent = (year, month, markDates) => {
    this.setState({markDates})
    if (this.props.isLogin) {
      this.props.eventFetch(year, month)
    }
  }

  refreshRemoteEvent = () => {
  }

  render() {
    const {current, markDates} = this.state
    return (
      <ScrollView style={style.scroll}>
        <Calendar current={current} markDates={markDates} todayFocus={current === TODAY}
                  onMonthChange={this.onMonthChange} onDateChange={this.onDateChange}/>
        <EventList {...this.props} data={markDates[current] && markDates[current].events || []}/>
      </ScrollView>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  calendarAccessible: PropTypes.bool.isRequired,
  eventFetch: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    calendarAccessible: state.future.calendar.accessible,
    version: state.future.event.version,
  }),
  dispatch => ({
    eventFetch: (year: number, month: number) => dispatch(eventActions.fetch(year, month)),
  })
)(Main)