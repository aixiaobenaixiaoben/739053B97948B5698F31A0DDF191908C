import {StyleSheet} from "react-native"
import {
  COLOR_FONT_BLACK,
  COLOR_FONT_GRAY_DARK,
  COLOR_WHITE_MORE_DARK,
  FONT_SIZE_14,
  FONT_SIZE_20
} from "../../../../Style"

export default StyleSheet.create({
  outline: {
    flex: 1,
    backgroundColor: COLOR_WHITE_MORE_DARK,
    paddingHorizontal: 20,
  },
  view: {
    marginTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZE_20,
    color: COLOR_FONT_BLACK,
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: FONT_SIZE_14,
    color: COLOR_FONT_GRAY_DARK,
    textAlign: 'center',
    marginTop: 10,
  },
  button: {
    marginTop: 40,
  }
})