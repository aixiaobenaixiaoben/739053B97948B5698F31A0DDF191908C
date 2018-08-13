/** @flow */
import {combineReducers} from "redux"
import passwordModify from "./Setting/PasswordModify"
import mobileModify from "./Setting/MobileModify"


export default combineReducers({
  passwordModify,
  mobileModify,
})