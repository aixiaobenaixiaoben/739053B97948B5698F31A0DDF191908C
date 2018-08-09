/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_SYS, COLOR_SYS, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

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
    justifyContent: 'space-between',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  list: {
    width: width,
    paddingHorizontal: 20,
    marginTop: 1,
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
  },
  forgetButton: {
    backgroundColor: 'transparent',
    height: null,
    marginHorizontal: 12,
  },
  forgetButtonText: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_16,
  },
  agreement: {
    width: 240,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  agreementCheck: {
    paddingTop: 2,
  },
  agreementText: {
    color: COLOR_BLACK_SYS,
    fontSize: FONT_SIZE_16,
  },
  agreementButton: {
    backgroundColor: 'transparent',
    height: null,
  },
  agreementButtonText: {
    color: COLOR_SYS,
    fontSize: FONT_SIZE_16,
  }
})