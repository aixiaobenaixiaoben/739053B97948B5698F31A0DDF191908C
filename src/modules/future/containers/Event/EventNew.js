/** @flow */
import React, {Component} from "react"
import {ScrollView, View} from "react-native"
import {DatePicker, InputItem, List, TextareaItem, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Event/EventNew"
import * as DateUtils from "../../../common/utils/DateUtils"
import {CALENDAR_RANGE} from "../../../common/Constants"
import Button from "../../../common/components/Button"
import type {Fueventt} from "../../interface/Fueventt"
import * as eventActions from "../../actions/Event"

let MINDATE = new Date()
MINDATE.setMonth(MINDATE.getMonth() - CALENDAR_RANGE)
MINDATE.setDate(1)

let MAXDATE = new Date()
MAXDATE.setMonth(MAXDATE.getMonth() + CALENDAR_RANGE + 1)
MAXDATE.setDate(0)

class EventNew extends Component<any, any> {

  state = {
    a: '',
    b: undefined,
    c: '',
  }

  headerRight = (canSubmit: boolean = false) => {
    return <Button style={style.headerButton} text='保存' onPress={this.save} disabled={!canSubmit}/>
  }

  static navigationOptions = ({navigation}) => {
    const {headerRight} = navigation.state.params || {}
    return {
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({headerRight: this.headerRight()})
  }

  componentDidMount() {
    let current = this.props.navigation.getParam('current')
    let date = new Date(current)
    date.setHours(date.getHours() - 8)
    this.setState({b: date})
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      const {a, b} = nextState
      const canSubmit = a.trim().length > 0 && b
      this.props.navigation.setParams({headerRight: this.headerRight(canSubmit)})
    }
    if (this.props.updateEvent !== nextProps.updateEvent) {
      this.props.navigation.pop()
    }
    return true
  }

  save = () => {
    const {a, b, c} = this.state
    const fueventt: Fueventt = {
      fetevttit: a,
      fetevtnot: c,
      fetoccdat: b.toJSON(),
      fetallday: '1',
    }
    this.props.eventAdd(fueventt)
  }

  format = (value: Date) => {
    return DateUtils.transDateString(DateUtils.localDateString(value.toJSON()))
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} maxLength={32} clear placeholder="标题" autoCapitalize='none'
                     onChange={a => this.setState({a})}>
          </InputItem>
        </List>

        <WhiteSpace size="lg"/>
        <List>
          <DatePicker mode="date" minDate={MINDATE} maxDate={MAXDATE} format={this.format}
                      value={this.state.b} onChange={b => this.setState({b})}>
            <List.Item style={style.listItem}>日期</List.Item>
          </DatePicker>
        </List>

        <WhiteSpace size="lg"/>
        <View style={style.textArea}>
          <TextareaItem rows={8} count={128} autoCapitalize='none' placeholder="备注"
                        onChange={c => this.setState({c})}/>
        </View>
      </ScrollView>
    )
  }
}

EventNew.propTypes = {
  updateEvent: PropTypes.object.isRequired,
  eventAdd: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    updateEvent: state.future.event.updateEvent,
  }),
  dispatch => ({
    eventAdd: (data: Fueventt) => dispatch(eventActions.add(data)),
  })
)(EventNew)