/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_02, COLOR_BLUE_SYS, COLOR_BLUE_SYS_08, COLOR_WHITE, FONT_SIZE_16} from "../../../Constants"

const { width } = Dimensions.get('window')

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
    justifyContent: 'space-between',
  },
  bottom: {
    flex: 1,
  },
  list: {
    width: width,
    paddingHorizontal: 20,
  },
  submitView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  forgetView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    width: width * 0.4,
    backgroundColor: COLOR_BLUE_SYS_08,
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