/** @flow */
import React, {Component} from "react"
import {View} from "react-native"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {CalendarList, LocaleConfig} from "react-native-calendars"
import Button from "../../../common/components/Button"
import {COLOR_FONT_BLACK, COLOR_SYS} from "../../../../Style"

LocaleConfig.locales['CH'] = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
}
LocaleConfig.defaultLocale = 'CH'

const TODAY = new Date().toJSON().substr(0, 10)


class Content extends Component<any, any> {

  state = {
    current: TODAY,
  }

  onVisibleMonthsChange = (months) => {
    if (months.length === 1) {
      const {month, dateString} = months[0]
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

  render() {
    const {current} = this.state
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
            [current]: {selected: true, selectedColor: current === TODAY ? COLOR_SYS : COLOR_FONT_BLACK},
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
  calendarAccessible: PropTypes.bool.isRequired,
}

export default connect(
  state => ({
    calendarAccessible: state.future.calendar.accessible,
  })
)(Content)