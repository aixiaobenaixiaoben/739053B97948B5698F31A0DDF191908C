/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Modal} from "antd-mobile-rn"
import style from "../styles/Event/Event"
import * as DateUtils from "../../../common/utils/DateUtils"
import Button from "../../../common/components/Button"
import type {Fueventt} from "../../interface/Fueventt"
import * as eventActions from "../../actions/Event"


class Event extends Component<any, any> {

  state = {
    event: this.props.navigation.getParam('event'),
  }

  headerRight = (canModEvent: boolean) => {
    return canModEvent ? <Button style={style.headerButton} text='编辑' onPress={this.modEvent}/> : null
  }

  static navigationOptions = ({navigation}) => {
    const {headerRight} = navigation.state.params || {}
    return {
      headerRight: headerRight,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      headerRight: this.headerRight(this.state.event.fetseqcod.length === 24),
    })
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.updateEvent !== nextProps.updateEvent) {
      if (nextProps.updateEvent.fetseqcod) {
        this.setState({event: nextProps.updateEvent})
      } else {
        this.props.navigation.pop()
      }
    }
    return true
  }

  modEvent = () => {
    this.props.navigation.navigate('FutureEventMod', {event: this.state.event})
  }

  remove = () => {
    Modal.alert('确认', '确定删除日程?', [
      {text: '取消'},
      {text: '确定', onPress: () => this.props.eventDel({fetseqcod: this.state.event.fetseqcod})},
    ])
  }

  dateString = (dateString: string): string => {
    let date = new Date(dateString)
    return DateUtils.transDateString(DateUtils.localDateString(dateString)) + ' ' + DateUtils.WEEK(date.getDay())
  }

  render() {
    const event: Fueventt = this.state.event
    const {fetseqcod, fetevttit, fetevtnot, fetoccdat} = event
    const canDelete = fetseqcod.length === 24

    return (
      <View style={style.outline}>

        <ScrollView>
          <View style={style.view}>
            <Text style={style.title}>{fetevttit}</Text>
            <Text style={style.date}>{this.dateString(fetoccdat)}</Text>
          </View>
          <View style={style.view}>
            <Text style={style.mark}>备注</Text>
            <Text style={style.note}>{fetevtnot}</Text>
          </View>
        </ScrollView>

        {canDelete &&
        <Button text='删除日程' onPress={this.remove} style={style.button}/>
        }
      </View>
    )
  }
}

Event.propTypes = {
  updateEvent: PropTypes.object.isRequired,
  eventDel: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    updateEvent: state.future.event.updateEvent,
  }),
  dispatch => ({
    eventDel: (data: Fueventt) => dispatch(eventActions.del(data)),
  })
)(Event)