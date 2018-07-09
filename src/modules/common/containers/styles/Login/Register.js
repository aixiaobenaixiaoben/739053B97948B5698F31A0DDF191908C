/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_08, COLOR_BLUE_SYS_08, COLOR_WHITE_DARK, FONT_SIZE_16} from "../../../Constants"

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
    backgroundColor: COLOR_BLUE_SYS_08,
    margin: 10,
  },
  sendButton: {
    backgroundColor: 'transparent',
    height: null,
    padding: 5,
    borderWidth: 1,
    borderColor: COLOR_BLACK_08,
  },
  sendButtonText: {
    color: COLOR_BLACK_08,
    fontSize: FONT_SIZE_16,
  }
})