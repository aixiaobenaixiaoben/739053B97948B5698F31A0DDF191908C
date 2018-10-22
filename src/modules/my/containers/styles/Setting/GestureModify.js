/** @flow */
import {StyleSheet} from "react-native"
import {
  COLOR_FONT_BLACK,
  COLOR_FONT_PINK,
  COLOR_FONT_PINK_02,
  COLOR_WHITE_MORE_DARK,
  FONT_SIZE_14
} from "../../../../../Style"

export default StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  view1: {
    marginTop: 40,
  },
  view2: {
    marginTop: 20,
    height: 20,
  },
  view3: {
    marginTop: 30,
  },
  title: {
    fontSize: FONT_SIZE_14,
    color: COLOR_FONT_BLACK,
  },
  titleWrong: {
    color: COLOR_FONT_PINK,
  },
  line: {
    // backgroundColor: COLOR_SYS,
    height: 2,
  },
  lineWrong: {
    backgroundColor: COLOR_FONT_PINK,
    height: 2,
  },
  circle: {
    borderColor: 'transparent',
  },
  center: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  linedCircle: {
    // backgroundColor: COLOR_SYS_LIGHT,
  },
  linedCircleWrong: {
    backgroundColor: COLOR_FONT_PINK_02,
  },
  linedCenter: {
    // backgroundColor: COLOR_SYS,
  },
  linedCenterWrong: {
    backgroundColor: COLOR_FONT_PINK,
  },
})