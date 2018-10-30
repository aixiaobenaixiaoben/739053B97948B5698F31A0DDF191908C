import {Dimensions, StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_WHITE, COLOR_WHITE_MORE_DARK} from "../../../../../Style"

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  image: {
    width: width,
    height: width * 1,
    resizeMode: 'contain',
    backgroundColor: COLOR_WHITE,
    marginTop: 20,
  },
  button: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 0,
    backgroundColor: COLOR_WHITE,
  },
  buttonText: {
    color: COLOR_FONT_BLACK,
  },
})