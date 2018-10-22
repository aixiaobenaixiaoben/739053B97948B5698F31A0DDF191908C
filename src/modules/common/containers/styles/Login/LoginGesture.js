/** @flow */
import {Dimensions, Platform, StyleSheet} from "react-native"
import {
  COLOR_FONT_BLACK,
  COLOR_FONT_PINK,
  COLOR_WHITE,
  COLOR_WHITE_MORE_DARK,
  FONT_SIZE_14,
  FONT_SIZE_16
} from "../../../../../Style"

const {height} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 64,
    ...Platform.select({
      ios: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 32,
      },
      android: {
        borderRadius: 200,
      }
    })
  },
  mobile: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
    marginTop: 10,
  },
  message: {
    height: 20,
    color: COLOR_FONT_PINK,
    fontSize: FONT_SIZE_14,
    marginTop: height >= 800 ? 20 : 10,
  },
  view2: {
    marginTop: height >= 800 ? 20 : 0,
  },
  more: {
    fontSize: FONT_SIZE_14,
    marginTop: height >= 800 ? 20 : 0,
  },
  line: {
    // backgroundColor: COLOR_SYS,
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
  linedCenter: {
    // backgroundColor: COLOR_SYS,
  },
})