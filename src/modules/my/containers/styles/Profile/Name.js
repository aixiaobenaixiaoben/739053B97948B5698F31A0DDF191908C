/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_FONT_GRAY_DARK, COLOR_WHITE_MORE_DARK, FONT_SIZE_14} from "../../../../../Style"

export default StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    height: null,
    marginRight: 20,
  },
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  inputItem: {
    marginLeft: 20,
    paddingRight: 20,
  },
  comment: {
    padding: 20,
    color: COLOR_FONT_GRAY_DARK,
    fontSize: FONT_SIZE_14,
  },
})