/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_BLUE_SYS, COLOR_WHITE, FONT_SIZE_16, FONT_SIZE_18} from "../../../Constants"

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
  infoText2: {
    fontSize: FONT_SIZE_18,
  },
  button: {
    backgroundColor: null,
    width: 80,
  },
  buttonText: {
    color: COLOR_BLUE_SYS,
    fontSize: FONT_SIZE_16,
  },
  button1: {
    width: 140,
  },
  touchID: {
    width: 60,
    height: 60,
  }
})