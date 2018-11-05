/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_WHITE_MORE_DARK, FONT_SIZE_16} from "../../../../../Style"


export default StyleSheet.create({
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  view1: {
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  versionText: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
    textAlign: 'center',
    marginTop: 10,
  },
  updateText: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
    marginTop: 40,
    marginHorizontal: 20,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 20,
  },
})