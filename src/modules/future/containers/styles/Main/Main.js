import {StyleSheet} from "react-native"
import {COLOR_FONT_GRAY_DARK, COLOR_SYS, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

export default StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outline: {
    flex: 1,
  },
  tail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tailText: {
    color: COLOR_FONT_GRAY_DARK,
    fontSize: FONT_SIZE_16,
  },
  tailButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
  },
  tailButtonText: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_16,
  },
})