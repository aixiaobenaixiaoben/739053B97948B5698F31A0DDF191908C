/** @flow */
import {StyleSheet} from "react-native"

export default StyleSheet.create({
  ListItem: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  video: {
    width: 70,
    height: 100,
  },
  detail: {
    flex: 1,
    height: 100,
    paddingLeft: 10,
  },
  buy: {
    justifyContent: 'center',
    width: 60,
    height: 100,
  },
  imageBack: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 100,
  },
  play: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    backgroundColor: 'white',
    opacity: 0.8,
    borderRadius: 12,
    paddingLeft: 4,
  },
  touch: {
    flex: 1,
  },
  textFirst: {
    flex: 3,
    lineHeight: 32,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    flex: 2,
    color: 'dimgrey',
  },
  buyTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    height: 40,
    borderRadius: 20,
  },
});

