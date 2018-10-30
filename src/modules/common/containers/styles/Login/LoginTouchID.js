/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_SYS, COLOR_WHITE_MORE_DARK, FONT_SIZE_14, FONT_SIZE_16} from "../../../../../Style"

export default StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 24,
    borderRadius: 32,
  },
  mobile: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
    marginTop: 10,
  },
  view2: {
    marginVertical: 120,
    alignItems: 'center',
  },
  view2TouchID: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: COLOR_SYS,
    marginBottom: 10,
  },
  view2Text: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_14,
  },
  moreText: {
    fontSize: FONT_SIZE_14,
  },
})