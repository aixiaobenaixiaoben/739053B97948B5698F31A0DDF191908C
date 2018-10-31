/** @flow */
import {combineReducers} from "redux"
import mobileModify from "./Setting/MobileModify"
import profile from "./Profile"


export default combineReducers({
  mobileModify,
  profile,
})