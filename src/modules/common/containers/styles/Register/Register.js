/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_BLUE_SYS, FONT_SIZE_16} from "../../../../../Style"

export default StyleSheet.create({
  button: {
    margin: 10,
  },
  sendButton: {
    backgroundColor: 'transparent',
    height: null,
  },
  sendButtonText: {
    color: COLOR_BLUE_SYS,
    fontSize: FONT_SIZE_16,
  }
})