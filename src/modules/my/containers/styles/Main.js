import {StyleSheet} from "react-native"
import {COLOR_BLACK_SYS, COLOR_GRAY, COLOR_SYS, FONT_SIZE_16, FONT_SIZE_18} from "../../../../Style"

export default StyleSheet.create({
  image: {
    height: 60,
    width: 60,
    marginRight: 10,
  },
  textName: {
    fontSize: FONT_SIZE_18,
    color: COLOR_BLACK_SYS,
    marginVertical: 5,
  },
  textMobile: {
    fontSize: FONT_SIZE_16,
    color: COLOR_GRAY,
  },
  logout: {
    textAlign: 'center',
    color: COLOR_SYS,
    fontSize: FONT_SIZE_18,
  },
  settingIcon: {
    marginRight: 8,
  },
})