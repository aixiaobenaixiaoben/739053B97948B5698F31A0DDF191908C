/** @flow */
import {StyleSheet} from "react-native"
import {COLOR, COLOR_WHITE, COLOR_BLACK_02, COLOR_BLACK_06} from "../../Constants"


export default StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: COLOR_WHITE,
  },
  up: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_BLACK_02,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  down: {
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  upText: {
    color: COLOR_BLACK_06,
  },
  upNumber: {
    color: COLOR,
  },
  downLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  downRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touch: {
    borderWidth: 1,
    borderColor: COLOR,
    height: 24,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  touchFirst: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  touchLast: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  touchText: {
    color: COLOR,
  }
});