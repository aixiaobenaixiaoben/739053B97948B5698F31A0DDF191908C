/** @flow */
import {combineReducers} from "redux"
import calendar from "./Calendar"
import event from "./Event"


export default combineReducers({
  calendar,
  event,
})