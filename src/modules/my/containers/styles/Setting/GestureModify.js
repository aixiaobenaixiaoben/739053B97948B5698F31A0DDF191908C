/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_06, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  top: {
    position: 'absolute',
    height: (height - width - 64) * 0.5,
    width: width,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
  },
  gesture: {
    backgroundColor: 'white',
    top: -36,
  },
  title: {
    fontSize: FONT_SIZE_16,
    color: COLOR_BLACK_06,
  }
})