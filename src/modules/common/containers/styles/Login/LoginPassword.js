/** @flow */
import {Platform, StyleSheet} from "react-native"
import {COLOR_FONT_BLACK, COLOR_WHITE, COLOR_WHITE_MORE_DARK, FONT_SIZE_16} from "../../../../../Style"

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
  view2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2Text: {
    fontSize: FONT_SIZE_16,
  },
  list: {
    marginHorizontal: 20,
    marginTop: 80,
  },
  submitButton: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  view3Button: {
    height: null,
    backgroundColor: 'transparent',
    margin: 10,
  },
  view3ButtonText: {
    color: COLOR_FONT_BLACK,
    fontSize: FONT_SIZE_16,
  },
})