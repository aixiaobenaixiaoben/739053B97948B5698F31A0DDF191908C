import {StyleSheet} from "react-native"
import {
  COLOR_FONT_BLACK,
  COLOR_FONT_GRAY_DARK,
  COLOR_WHITE,
  COLOR_WHITE_MORE_DARK,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_18
} from "../../../../../Style"

export default StyleSheet.create({
  outline: {
    flex: 1,
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  button: {
    height: 64,
    paddingBottom: 20,
    borderRadius: 0,
  },
  view: {
    backgroundColor: COLOR_WHITE,
    marginBottom: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  title: {
    fontSize: FONT_SIZE_18,
    color: COLOR_FONT_BLACK,
    fontWeight: 'bold',
  },
  date: {
    fontSize: FONT_SIZE_14,
    color: COLOR_FONT_GRAY_DARK,
    marginTop: 10,
  },
  mark: {
    fontSize: FONT_SIZE_16,
    color: COLOR_FONT_BLACK,
  },
  note: {
    fontSize: FONT_SIZE_16,
    color: COLOR_FONT_GRAY_DARK,
    marginTop: 10,
  },
})