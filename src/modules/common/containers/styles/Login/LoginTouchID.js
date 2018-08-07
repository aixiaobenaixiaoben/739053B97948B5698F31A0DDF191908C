/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_BLUE_SYS, COLOR_WHITE, FONT_SIZE_16} from "../../../../../Style"

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
  button: {
    backgroundColor: 'transparent',
    height: null,
  },
  buttonText: {
    color: COLOR_BLUE_SYS,
    fontSize: FONT_SIZE_16,
  },
  touchID: {
    width: 60,
    height: 60,
    margin: 10,
  }
})