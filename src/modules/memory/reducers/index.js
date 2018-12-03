/** @flow */
import {combineReducers} from "redux"
import main from "./Main"
import memory from "./Memory"


export default combineReducers({
  main,
  memory,
})