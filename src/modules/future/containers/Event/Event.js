/** @flow */
import React, {Component} from "react"
import {ScrollView, Text, View} from "react-native"
import style from "../styles/Event/Event"
import * as DateUtils from "../../../common/utils/DateUtils"
import Button from "../../../common/components/Button"


class Event extends Component<any, any> {

  remove = () => {
    const event = this.props.navigation.getParam('event')
    const {id} = event
    //TODO
    console.log('remove:' + id)
  }

  dateString = (dateString: string): string => {
    let date = new Date(dateString)
    date.setHours(date.getHours() - 8)
    return DateUtils.transDateString(dateString) + ' ' + DateUtils.WEEK(date.getDay())
  }

  render() {
    const event = this.props.navigation.getParam('event')
    const {title, note, date} = event

    return (
      <View style={style.outline}>

        <ScrollView>
          <View style={style.view}>
            <Text style={style.title}>{title}</Text>
            <Text style={style.date}>{this.dateString(date)}</Text>
          </View>
          <View style={style.view}>
            <Text style={style.mark}>备注</Text>
            <Text style={style.note}>{note}</Text>
          </View>
        </ScrollView>

        <Button text='删除日程' onPress={this.remove} style={style.button}/>
      </View>
    )
  }
}

export default Event