/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {
  COLOR_BLACK_SYS,
  COLOR_GRAY,
  COLOR_WHITE,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16
} from "../../../../../Style"

const {width} = Dimensions.get('window')

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  back: {
    position: 'absolute',
    height: 40,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  backText: {
    color: COLOR_GRAY,
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  content: {
    padding: 12,
    backgroundColor: COLOR_WHITE,
  },
  h1: {
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 40,
    fontSize: FONT_SIZE_16,
  },
  h2: {
    fontWeight: 'bold',
    lineHeight: 30,
    fontSize: FONT_SIZE_14,
  },
  h3: {
    lineHeight: 20,
    fontSize: FONT_SIZE_12,
    color: COLOR_BLACK_SYS,
  }
})