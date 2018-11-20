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

  dateString = (date: string): string => {
    const year = date.substr(0, 4)
    const month = date.substr(5, 2)
    const day = date.substr(8, 2)
    const week = DateUtils.WEEK(new Date(year, month - 1, day).getDay())
    return year + '年' + month + '月' + day + '日' + ' ' + week
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