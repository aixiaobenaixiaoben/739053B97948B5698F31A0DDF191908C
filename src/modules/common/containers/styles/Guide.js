/** @flow */
import {Dimensions, StyleSheet} from "react-native"
import {COLOR_BLACK_06, COLOR_WHITE, FONT_SIZE_18} from "../../Constants"

const { width, height } = Dimensions.get('window')

export default StyleSheet.create({
  dotStyle: {
    bottom: 20,
  },
  container: {
    flexGrow: 1,
    height: height,
    width: width,
  },
  imageBack: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
    paddingHorizontal: 10,
  },
  button: {
    width: 100,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLOR_WHITE,
    backgroundColor: COLOR_BLACK_06,
    opacity: 0.8,
  },
  text:  {
    fontSize: FONT_SIZE_18,
    color: COLOR_WHITE,
  }
})