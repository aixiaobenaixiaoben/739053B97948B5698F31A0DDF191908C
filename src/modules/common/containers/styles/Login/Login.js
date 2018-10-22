/** @flow */
import {Dimensions, Platform, StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_WHITE, COLOR_WHITE_MORE_DARK, FONT_SIZE_16} from "../../../../../Style"

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    backgroundColor: COLOR_WHITE_MORE_DARK,
  },
  view1: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  view1Image: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        backgroundColor: COLOR_WHITE,
        borderRadius: 32,
      },
      android: {
        borderRadius: 200,
      }
    })
  },
  list: {
    marginHorizontal: 20,
    marginTop: 60,
  },
  view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
  },
  view2Button: {
    width: width * 0.5 - 40,
  },
  view3: {
    alignItems: 'center',
    marginTop: 30,
  },
  view3Button: {
    height: null,
    backgroundColor: 'transparent',
  },
  view3ButtonText: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
  },
})