/** @flow */
import React, {Component} from "react"
import {View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {CalendarList, LocaleConfig} from "react-native-calendars"
import RNCalendarEvents from 'react-native-calendar-events'
import {Modal, Toast} from "antd-mobile-rn"
import * as eventActions from "../../actions/Event"
import Button from "../../../common/components/Button"
import {COLOR_FONT_BLACK, COLOR_SYS, COLOR_WHITE} from "../../../../Style"

LocaleConfig.locales['CH'] = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
}
LocaleConfig.defaultLocale = 'CH'

let DATE = new Date()
DATE.setHours(DATE.getHours() + 8)
const TODAY = DATE.toJSON().substr(0, 10)


class Content extends Component<any, any> {

  state = {
    current: TODAY,
    markDates: {},
  }

  componentDidMount() {
    if (!this.props.isLogin) {
      Toast.info('未登录时仅显示系统日历中的日程', 3, null, false)
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.version !== nextProps.version) {
      this.loadRemoteEventsOfMonth()
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      const {current} = this.state
      this.loadEventsOfMonth(parseInt(current.substr(0, 4)), parseInt(current.substr(5, 2)))
    }
    return true
  }

  onVisibleMonthsChange = (months) => {
    if (months.length === 1) {
      const {year, month, dateString} = months[0]
      this.loadEventsOfMonth(year, month)

      if (this.state.current === dateString) {
        return
      }
      if (month === new Date().getMonth() + 1) {
        this.setState({current: TODAY})
      } else {
        let date = new Date(dateString)
        date.setDate(1)
        this.setState({current: date.toJSON().substr(0, 10)})
      }
    }
  }

  onDayPress = (day) => {
    this.setState({current: day.dateString})
  }

  backToToday = () => {
    this.setState({current: TODAY})
  }

  loadEventsOfMonth = (year, month) => {
    if (!this.props.calendarAccessible) {
      this.setState({markDates: {}})
      if (this.props.isLogin) {
        this.props.eventFetch(year, month)
      }
      return
    }
    let startDate = new Date(year, month - 1, 1)
    let endDate = new Date(year, month, 1)
    RNCalendarEvents.fetchAllEvents(startDate, endDate).then(response => {

      let markDates = {}
      for (let event of response) {

        const {title, notes: note, occurrenceDate, calendar: {color}} = event
        let date = new Date(occurrenceDate)
        date.setHours(date.getHours() + 8)
        let dateString = date.toJSON().substr(0, 10)

        if (!markDates[dateString]) {
          markDates[dateString] = {marked: true, dotColor: COLOR_SYS, events: []}
        }
        markDates[dateString].events.push({title, note, color, date: dateString})
      }
      this.setState({markDates})

      if (this.props.isLogin) {
        this.props.eventFetch(year, month)
      }

    }).catch(error => Modal.alert('', error.message))
  }

  loadRemoteEventsOfMonth = () => {
  }

  render() {
    const {current, markDates} = this.state
    //TODO 显示日程
    return (
      <View>
        <CalendarList
          current={current}
          horizontal={true}
          pagingEnabled={true}
          monthFormat={'yyyy.MM'}
          onVisibleMonthsChange={this.onVisibleMonthsChange}
          onDayPress={this.onDayPress}
          markedDates={{
            ...markDates,
            [current]: {
              selected: true,
              selectedColor: current === TODAY ? COLOR_SYS : COLOR_FONT_BLACK,
              ...markDates[current] ? {marked: true, dotColor: COLOR_WHITE} : {},
            },
          }}
          theme={{
            monthTextColor: COLOR_SYS,
            textSectionTitleColor: COLOR_FONT_BLACK,
            todayTextColor: COLOR_SYS,
          }}
        />
        <Button text='今天' onPress={this.backToToday}/>
      </View>
    )
  }
}

Content.propTypes = {
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
)(Content)