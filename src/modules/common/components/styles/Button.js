/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_SYS, COLOR_WHITE, FONT_SIZE_18} from "../../../../Style"


export default StyleSheet.create({
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 4,
    backgroundColor: COLOR_SYS,
  },
  touchText: {
    color: COLOR_WHITE,
    fontSize: FONT_SIZE_18,
  },
  disable: {
    opacity: 0.6,
  }
})