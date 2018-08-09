/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_SYS, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  top: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  middle: {
    width: width,
    height: width * 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    marginTop: 20,
  },
  infoText: {
    fontSize: FONT_SIZE_16,
  },
  moreButton: {
    backgroundColor: 'transparent',
    height: null,
  },
  moreButtonText: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_16,
  },
})