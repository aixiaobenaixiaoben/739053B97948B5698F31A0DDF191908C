/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_08, COLOR_WHITE} from "../../Constants"

const { width, height } = Dimensions.get('window')

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
    backgroundColor: COLOR_BLACK_08,
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