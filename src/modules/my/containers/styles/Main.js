import {StyleSheet} from "react-native"
import {COLOR_WHITE} from "../../../../Style"

export default StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    marginHorizontal: 10,
  },
  headerLeftText: {
    color: COLOR_WHITE,
    fontSize: 18,
  },
  headerRight: {
    marginHorizontal: 10,
  },
  headerRightText: {
    color: COLOR_WHITE,
    fontSize: 14,
  },
})