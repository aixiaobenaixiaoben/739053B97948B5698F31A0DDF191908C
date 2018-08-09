/** @flow */
import {StyleSheet} from "react-native"
import {COLOR_SYS, COLOR_WHITE} from "../../../../Style"


export default StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: COLOR_WHITE,
  },
  up: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SYS,
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
    color: COLOR_SYS,
  },
  upNumber: {
    color: COLOR_SYS,
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
    borderColor: COLOR_SYS,
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
    color: COLOR_SYS,
  }
})