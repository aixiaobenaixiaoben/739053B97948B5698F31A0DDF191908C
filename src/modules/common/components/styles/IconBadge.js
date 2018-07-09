/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_RED, COLOR_WHITE, FONT_SIZE_14} from "../../Constants"


export default StyleSheet.create({
  icon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_RED,
    position:'absolute',
    top:2,
    right:0,

    minWidth:16,
    height:16,
    borderRadius:8,
  },
  badgeDot: {
    minWidth:12,
    height:12,
    borderRadius:6,
  },
  text: {
    color: COLOR_WHITE,
    fontSize: FONT_SIZE_14,
  }
});