/** @flow */
import {combineReducers} from "redux"
import mobileModify from "./Setting/MobileModify"
import profile from "./Profile"
import version from "./Setting/Version"
import feedback from "./Setting/Feedback"


export default combineReducers({
  mobileModify,
  profile,
  version,
  feedback,
})