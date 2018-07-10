/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLUE_SYS, COLOR_WHITE_DARK, FONT_SIZE_16} from "../../../../../Style"

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLOR_WHITE_DARK,
  },
  list: {
    width: width,
    marginVertical: 10,
  },
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