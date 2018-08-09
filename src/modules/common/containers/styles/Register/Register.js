/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_GRAY, COLOR_SYS, FONT_SIZE_16} from "../../../../../Style"

export default StyleSheet.create({
  button: {
    margin: 10,
  },
  sendButton: {
    backgroundColor: 'transparent',
    height: null,
  },
  sendButtonText: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_16,
  },
  text: {
    marginHorizontal: 10,
    marginVertical: 4,
    fontSize: FONT_SIZE_16,
    color: COLOR_GRAY,
  }
})