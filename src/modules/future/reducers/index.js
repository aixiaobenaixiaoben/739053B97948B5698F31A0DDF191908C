/** @flow */
import {combineReducers} from "redux"
import main from "./Main"
import calendar from "./Calendar"
import event from "./Event"


export default combineReducers({
  main,
  calendar,
  event,
})