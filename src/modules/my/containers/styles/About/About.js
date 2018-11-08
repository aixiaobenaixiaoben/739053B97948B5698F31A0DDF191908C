/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_WHITE_MORE_DARK} from "../../../../../Style"


export default StyleSheet.create({
  scroll: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  view1: {
    alignItems: 'center',
    marginVertical: 30,
  },
  image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  listItem: {
    paddingLeft: 20,
    paddingRight: 5,
  },
})