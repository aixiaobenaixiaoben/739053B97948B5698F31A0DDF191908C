/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLUE_SYS, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  top: {
    position: 'absolute',
    height: (height - width) * 0.5,
    width: width,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 2,
  },
  middle: {
    flex: 1,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: (height - width) * 0.3,
    width: width,
    alignItems: 'center',
    zIndex: 2,
  },
  gesture: {
    backgroundColor: 'white',
    top: 24,
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
    color: COLOR_BLUE_SYS,
    fontSize: FONT_SIZE_16,
  },
})