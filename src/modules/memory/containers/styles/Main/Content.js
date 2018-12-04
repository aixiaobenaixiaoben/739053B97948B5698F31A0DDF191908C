import {StyleSheet} from "react-native"
import {
  COLOR_FONT_BLACK,
  COLOR_SYS,
  COLOR_WHITE,
  COLOR_WHITE_MORE_DARK,
  FONT_SIZE_14,
  FONT_SIZE_16
} from "../../../../../Style"

export default StyleSheet.create({
  headerButton: {
    marginHorizontal: 20,
  },
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  list: {
    marginTop: 1,
  },
  listItem: {
    flexDirection: 'row',
    height: 64,
    paddingHorizontal: 20,
    marginVertical: 1,
    backgroundColor: COLOR_WHITE,
  },
  date: {
    minWidth: 84,
    marginTop: 15,
    color: COLOR_SYS,
    fontSize: FONT_SIZE_14,
  },
  fill: {
    backgroundColor: COLOR_SYS,
    width: 2,
  },
  text: {
    marginLeft: 8,
    marginTop: 14,
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
  },
})