/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_02, COLOR_BLUE_SYS, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
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
  list: {
    width: width - 40,
    paddingBottom: 20,
  },
  submitView: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  forgetView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    width: width - 40,
  },
  forgetButton: {
    backgroundColor: 'transparent',
    height: null,
    paddingHorizontal: 12,
  },
  forgetButtonRight: {
    borderLeftWidth: 1,
    borderLeftColor: COLOR_BLACK_02,
  },
  forgetButtonText: {
    color: COLOR_BLUE_SYS,
    fontSize: FONT_SIZE_16,
  },
})