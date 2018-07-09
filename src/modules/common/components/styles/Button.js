/** @flow */
import {StyleSheet} from "react-native"
import {COLOR, COLOR_WHITE, FONT_SIZE_18} from "../../Constants"


export default StyleSheet.create({
  touch: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 4,
    backgroundColor: COLOR,
  },
  touchText: {
    color: COLOR_WHITE,
    fontSize: FONT_SIZE_18,
  },
  disable: {
    opacity: 0.6,
  }
});