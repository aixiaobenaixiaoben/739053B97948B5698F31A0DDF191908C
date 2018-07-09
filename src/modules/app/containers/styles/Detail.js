/** @flow */
import {StyleSheet} from "react-native"


export default StyleSheet.create({
  view: {
    flex: 1,
  },
  viewDetail: {
    flex: 1,
  },
  viewBottom: {
    height: 50,
  },
  viewInfo: {
    flexDirection: 'row',
    height: 160,
    padding: 10,
    backgroundColor: 'slategrey',
  },
  viewCount: {
    height: 170,
    padding: 10,
  },
  viewMark: {
    height: 50,
    flexDirection: 'row',
  },
  viewSummary: {
    padding: 10,
    paddingBottom: 50,
  },
  titles: {
    flex: 1,
    height: 140,
  },
  image: {
    width: 100,
    height: 140,
  },
  textFirst: {
    flex: 2,
    fontSize: 20,
    color: 'white',
  },
  text: {
    flex: 1,
    lineHeight: 28,
    color: 'whitesmoke',
  },
  countSub: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countText: {
    lineHeight: 30,
    color: 'dimgrey',
  },
  markTouch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'whitesmoke',
  },
  markText: {
    color: 'gray',
    fontSize: 18,
    paddingLeft: 5,
  },
  textSummary: {
    fontSize: 16,
    lineHeight: 30,
  },
  buyTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
  },
  buyTouchText: {
    color: 'white',
    fontSize: 16,
  },
});

