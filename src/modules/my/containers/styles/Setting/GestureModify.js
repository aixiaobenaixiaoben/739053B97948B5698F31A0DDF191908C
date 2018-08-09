/** @flow */
import {StyleSheet} from "react-native"
import {
  COLOR_BLACK_SYS,
  COLOR_RED,
  COLOR_RED_02,
  COLOR_RED_04,
  COLOR_WHITE,
  FONT_SIZE_16
} from "../../../../../Style"

export default StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  title: {
    fontSize: FONT_SIZE_16,
    color: COLOR_BLACK_SYS,
  },
  circle: {
    backgroundColor: COLOR_RED_02,
    borderColor: COLOR_RED_04,
  },
  center: {
    backgroundColor: COLOR_RED,
  },
  line: {
    backgroundColor: COLOR_RED,
  },
  text: {
    color: COLOR_RED,
  }
})