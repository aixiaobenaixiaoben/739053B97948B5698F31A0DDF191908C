/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, View} from "react-native"
import style from "../styles/Event/Event"
import * as DateUtils from "../../../common/utils/DateUtils"
import Button from "../../../common/components/Button"
import type {Fueventt} from "../../interface/Fueventt"


class Event extends Component<any, any> {

  remove = () => {
    const event: Fueventt = this.props.navigation.getParam('event')
    //TODO
    console.log('remove:' + event.fetseqcod)
  }

  dateString = (dateString: string): string => {
    let date = new Date(dateString)
    return DateUtils.transDateString(DateUtils.localDateString(dateString)) + ' ' + DateUtils.WEEK(date.getDay())
  }

  render() {
    const event: Fueventt = this.props.navigation.getParam('event')
    const {fetevttit, fetevtnot, fetoccdat} = event

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

        <Button text='删除日程' onPress={this.remove} style={style.button}/>
      </View>
    )
  }
}

export default Event