/** @flow */
import React, {Component} from "react"
import {ScrollView, View} from "react-native"
import {DatePicker, InputItem, List, TextareaItem, WhiteSpace} from "antd-mobile-rn"
import style from "../styles/Event/EventNew"
import * as DateUtils from "../../../common/utils/DateUtils"
import {CALENDAR_RANGE} from "../../../common/Constants"
import Button from "../../../common/components/Button"

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

  static navigationOptions = ({navigation}) => {
    const save = navigation.getParam('save', () => {
    })
    const canSubmit = navigation.getParam('canSubmit')
    return {
      headerRight: <Button style={style.headerButton} text='保存' onPress={save} disabled={!canSubmit}/>,
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({save: this.save})
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
      this.props.navigation.setParams({canSubmit: a.trim().length > 0 && b})
    }
    return true
  }

  save = () => {
    alert(1)
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

export default EventNew