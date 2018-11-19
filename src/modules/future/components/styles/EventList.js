import {StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_WHITE, FONT_SIZE_16} from "../../../../Style"

export default StyleSheet.create({
  list: {
    marginTop: 1,
  },
  listItem: {
    flexDirection: 'row',
    height: 44,
    paddingHorizontal: 20,
    marginVertical: 1,
    backgroundColor: COLOR_WHITE,
  },
  text: {
    marginLeft: 8,
    marginTop: 4,
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
  },
})