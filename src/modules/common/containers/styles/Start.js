/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_WHITE} from "../../../../Style"

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
  },
  imageBack: {
    width: width,
    height: width / 0.714,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    right: 10,
    bottom: 10,
    width: 100,
    borderRadius: 20,
    backgroundColor: COLOR_FONT_BLACK,
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
  },
  bottomImage: {
    width: 200,
    height: 50,
  }
})