import {StyleSheet} from "react-native"
import {COLOR_BLACK_SYS, COLOR_GRAY, COLOR_SYS, COLOR_WHITE, FONT_SIZE_16, FONT_SIZE_18} from "../../../../Style"

export default StyleSheet.create({
  profile: {
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 60,
    width: 60,
    margin: 10,
  },
  info: {
    flex: 1,
  },
  arrow: {
    paddingHorizontal: 12,
  },
  text1: {
    lineHeight: 30,
    fontSize: FONT_SIZE_18,
    color: COLOR_BLACK_SYS,
  },
  text2: {
    fontSize: FONT_SIZE_16,
    color: COLOR_GRAY,
  },
  logout: {
    textAlign: 'center',
    color: COLOR_SYS,
    fontSize: FONT_SIZE_18,
  },
  icon: {
    marginRight: 8,
  },
})