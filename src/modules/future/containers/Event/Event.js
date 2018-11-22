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

  shouldComponentUpdate(nextProps) {
    if (this.props.version !== nextProps.version) {
      this.props.navigation.navigate('RootTab', {updateEventDate: DateUtils.localDateString(this.state.event.fetoccdat)})
      return false
    }
    return true
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
  version: PropTypes.number.isRequired,
  eventDel: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    version: state.future.event.version,
  }),
  dispatch => ({
    eventDel: (data: Fueventt) => dispatch(eventActions.del(data)),
  })
)(Event)