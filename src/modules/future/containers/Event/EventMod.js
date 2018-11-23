/** @flow */
import React, {Component} from "react"
import {ScrollView, View} from "react-native"
import {DatePicker, InputItem, List, TextareaItem, WhiteSpace} from "antd-mobile-rn"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import style from "../styles/Event/EventMod"
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

class EventMod extends Component<any, any> {

  state = {
    a: '',
    b: undefined,
    c: '',
  }

  static navigationOptions = ({navigation}) => {
    const save = navigation.getParam('save', () => {
    })
    const canSubmit = navigation.getParam('canSubmit')
    return {
      headerRight: <Button style={style.headerButton} text='保存' onPress={save} disabled={!canSubmit}/>,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({save: this.save, canSubmit: true})
  }

  componentDidMount() {
    let event: Fueventt = this.props.navigation.getParam('event')
    const {fetevttit, fetoccdat, fetevtnot} = event
    this.setState({
      a: fetevttit,
      b: new Date(fetoccdat),
      c: fetevtnot,
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      const {a, b} = nextState
      this.props.navigation.setParams({canSubmit: a.trim().length > 0 && b})
    }
    if (this.props.updateEvent !== nextProps.updateEvent) {
      this.props.navigation.pop()
    }
    return true
  }

  save = () => {
    const {a, b, c} = this.state
    let event: Fueventt = this.props.navigation.getParam('event')
    const fueventt: Fueventt = {
      ...event,
      fetevttit: a,
      fetevtnot: c,
      fetoccdat: b.toJSON(),
    }
    this.props.eventMod(fueventt)
  }

  format = (value: Date) => {
    return DateUtils.transDateString(DateUtils.localDateString(value.toJSON()))
  }

  render() {
    let event: Fueventt = this.props.navigation.getParam('event')
    const {fetevttit, fetevtnot} = event

    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.scroll}>
        <WhiteSpace size="lg"/>
        <List>
          <InputItem style={style.inputItem} maxLength={32} clear placeholder="标题" autoCapitalize='none'
                     defaultValue={fetevttit} onChange={a => this.setState({a})}>
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
                        defaultValue={fetevtnot} onChange={c => this.setState({c})}/>
        </View>
      </ScrollView>
    )
  }
}

EventMod.propTypes = {
  updateEvent: PropTypes.object.isRequired,
  eventMod: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    updateEvent: state.future.event.updateEvent,
  }),
  dispatch => ({
    eventMod: (data: Fueventt) => dispatch(eventActions.mod(data)),
  })
)(EventMod)