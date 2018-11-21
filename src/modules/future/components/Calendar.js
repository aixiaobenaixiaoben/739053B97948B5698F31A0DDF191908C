/** @flow */
import React, {Component} from "react"
import PropTypes from "prop-types"
import {CalendarList, LocaleConfig} from "react-native-calendars"
import {COLOR_FONT_BLACK, COLOR_SYS, COLOR_WHITE} from "../../../Style"
import {CALENDAR_RANGE} from "../../common/Constants"

LocaleConfig.locales['CH'] = {
  monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthNamesShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
}
LocaleConfig.defaultLocale = 'CH'


class Calendar extends Component<any, any> {

  onVisibleMonthsChange = (months) => {
    if (months.length === 1) {
      const {year, month, dateString} = months[0]
      this.props.onMonthChange(year, month, dateString)
    }
  }

  onDayPress = (day) => {
    this.props.onDateChange(day.dateString)
  }

  render() {
    const {current, markDates, todayFocus} = this.props
    return (
      <CalendarList
        current={current}
        horizontal={true}
        pagingEnabled={true}
        monthFormat={'yyyy.MM'}
        pastScrollRange={CALENDAR_RANGE}
        futureScrollRange={CALENDAR_RANGE}
        onVisibleMonthsChange={this.onVisibleMonthsChange}
        onDayPress={this.onDayPress}
        markedDates={{
          ...markDates,
          [current]: {
            selected: true,
            selectedColor: todayFocus ? COLOR_SYS : COLOR_FONT_BLACK,
            ...markDates[current] ? {marked: true, dotColor: COLOR_WHITE} : {},
          },
        }}
        theme={{
          monthTextColor: COLOR_SYS,
          textSectionTitleColor: COLOR_FONT_BLACK,
          todayTextColor: COLOR_SYS,
        }}
      />
    )
  }
}

Calendar.propTypes = {
  current: PropTypes.string.isRequired,
  markDates: PropTypes.object.isRequired,
  todayFocus: PropTypes.bool.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
}

export default Calendar