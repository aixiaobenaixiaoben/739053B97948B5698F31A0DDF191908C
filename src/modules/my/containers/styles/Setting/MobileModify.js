/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_SYS, COLOR_WHITE_MORE_DARK, FONT_SIZE_16} from "../../../../../Style"

export default StyleSheet.create({
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  inputItem: {
    marginLeft: 20,
    paddingRight: 20,
  },
  extraButton: {
    backgroundColor: 'transparent',
    height: null,
  },
  extraButtonText: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_16,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 45,
  },
})