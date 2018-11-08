import {StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE_MORE_DARK, FONT_SIZE_18} from "../../../../Style"

export default StyleSheet.create({
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  listItem: {
    paddingLeft: 20,
    paddingRight: 5,
  },
  view1Name: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_18,
  },
  view1Mobile: {
    color: COLOR_FONT_GRAY_DARK,
    marginTop: 5,
  },
  view1Image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    borderRadius: 32,
    marginVertical: 8,
    marginRight: 10,
  },
  view2Setting: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    tintColor: COLOR_FONT_BLACK,
    marginRight: 10,
  },
  view3Text: {
    textAlign: 'center',
    color: COLOR_SYS,
    fontSize: FONT_SIZE_18,
  },
})