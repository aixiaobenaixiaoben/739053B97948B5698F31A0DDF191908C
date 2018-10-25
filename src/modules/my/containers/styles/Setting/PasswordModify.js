/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_FONT_GRAY_DARK, COLOR_WHITE_MORE_DARK, FONT_SIZE_14} from "../../../../../Style"

export default StyleSheet.create({
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  inputItem: {
    marginLeft: 20,
    paddingRight: 20,
  },
  forgetView: {
    height: 44,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  forgetViewText: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_14,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 45,
  },
  comment: {
    padding: 20,
    color: COLOR_FONT_GRAY_DARK,
    fontSize: FONT_SIZE_14,
  },
})