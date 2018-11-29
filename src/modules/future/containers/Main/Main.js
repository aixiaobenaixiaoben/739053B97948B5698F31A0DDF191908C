/** @flow */
import React, {Component} from "react"
import {ScrollView, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import RNCalendarEvents from 'react-native-calendar-events'
import {Modal} from "antd-mobile-rn"
import AntDesign from "react-native-vector-icons/AntDesign"
import * as eventActions from "../../actions/Event"
import Button from "../../../common/components/Button"
import {COLOR_SYS, COLOR_WHITE} from "../../../../Style"
import style from "../styles/Main/Main"
import Calendar from "../../components/Calendar"
import EventList from "../Event/EventList"
import * as DateUtils from "../../../common/utils/DateUtils"
import type {Fueventt} from "../../interface/Fueventt"
import FutureChoice, {ModalFutureChoice} from "../../components/FutureChoice"

const TODAY = DateUtils.localDateString()


class Main extends Component<any, any> {

  state = {
    current: TODAY,
    markDates: {},
    modalVisible: false,
    modalChoice: ModalFutureChoice.CURRENT,
    modalPageY: 0,
  }

  updateEventDate = ''
  ref

  headerTitle = (visible: boolean, title: string) => {
    return (
      <View style={style.headerTitle}>
        <Button text={title} hitSlop={{right: 20}} onPress={() => this.setState({modalVisible: true})}/>
        <AntDesign name={visible ? 'caretup' : 'caretdown'} size={12} color={COLOR_WHITE}/>
      </View>
    )
  }

  headerLeft = () => {
    return <Button style={style.headerButton} text='今天' onPress={this.onDateChange}/>
  }

  headerRight = (isLogin: boolean) => {
    return isLogin ? <Button style={style.headerButton} text='新建' onPress={this.addEvent}/> : null
  }

  static navigationOptions = ({navigation}) => {
    const {headerTitle, headerLeft, headerRight} = navigation.state.params || {}
    return {
      headerLeft: headerLeft,
      headerTitle: headerTitle,
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerTitle: this.headerTitle(this.state.modalVisible, this.state.modalChoice),
      headerLeft: this.headerLeft(),
      headerRight: this.headerRight(this.props.isLogin),
    })
    if (!this.props.isLogin) {
      Modal.alert('', '登录后显示你添加的日程')
    }
  }

  componentDidMount() {
    setTimeout(() => this.ref.measure((frameX, frameY, width, height, pageX, pageY) => this.setState({modalPageY: pageY})), 1)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.modalVisible !== nextState.modalVisible) {
      this.props.navigation.setParams({headerTitle: this.headerTitle(nextState.modalVisible, nextState.modalChoice)})
    }
    if (this.props.events !== nextProps.events) {
      this.refreshRemoteEvent(nextProps.events)
    }
    if (this.props.updateEvent !== nextProps.updateEvent) {
      if (nextProps.updateEvent.fetoccdat) {
        this.eventUpdated(DateUtils.localDateString(nextProps.updateEvent.fetoccdat))
      } else {
        this.eventUpdated(this.state.current)
      }
    }
    if (this.props.isLogin !== nextProps.isLogin) {
      this.props.navigation.setParams({headerRight: this.headerRight(nextProps.isLogin)})
      const {current} = this.state
      this.requestEvents(current.substr(0, 4), current.substr(5, 2))
    }
    return true
  }

  onModalChoice = (choice: string) => {
    this.setState({modalVisible: false, modalChoice: choice})
  }

  eventUpdated = (updateEventDate) => {
    this.updateEventDate = updateEventDate
    const {current} = this.state
    this.onDateChange(updateEventDate)

    if (current.substr(0, 7) === updateEventDate.substr(0, 7)) {
      this.requestEvents(updateEventDate.substr(0, 4), updateEventDate.substr(5, 2))
    }
  }

  addEvent = () => {
    const {current} = this.state
    this.props.navigation.navigate('FutureCreate', {current})
  }

  onDateChange = (date = TODAY) => {
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
    const {current, markDates, modalVisible, modalChoice, modalPageY} = this.state
    return (
      <View ref={ref => this.ref = ref} style={style.outline}>
        <ScrollView style={style.scroll}>
          <FutureChoice modalPageY={modalPageY} modalVisible={modalVisible}
                        modalChoice={modalChoice} onModalChoice={this.onModalChoice}/>

          <Calendar current={current} markDates={markDates} todayFocus={current === TODAY}
                    onMonthChange={this.onMonthChange} onDateChange={this.onDateChange}/>

          <EventList {...this.props} data={markDates[current] && markDates[current].events || []}/>
        </ScrollView>
      </View>
    )
  }
}

Main.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  calendarAccessible: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
  updateEvent: PropTypes.object.isRequired,
  eventFetch: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    isLogin: state.common.login.isLogin,
    calendarAccessible: state.future.calendar.accessible,
    events: state.future.event.events,
    updateEvent: state.future.event.updateEvent,
  }),
  dispatch => ({
    eventFetch: () => dispatch(eventActions.fetch()),
  })
)(Main)