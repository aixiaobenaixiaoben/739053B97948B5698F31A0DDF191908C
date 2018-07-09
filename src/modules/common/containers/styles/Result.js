import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLUE_SYS_08, COLOR_GRAY, COLOR_WHITE, FONT_SIZE_14, FONT_SIZE_20} from "../../Constants"

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    paddingTop: 20,
  },
  title: {
    fontSize: FONT_SIZE_20,
    marginTop: 10,
  },
  description: {
    fontSize: FONT_SIZE_14,
    color: COLOR_GRAY,
    marginTop: 10,
  },
  button: {
    backgroundColor: COLOR_BLUE_SYS_08,
    width: width - 20,
    marginTop: 10,
  }
})