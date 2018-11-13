/** @flow */
import {combineReducers} from "redux"
import main from "./Main"
import mobileModify from "./Setting/MobileModify"
import profile from "./Profile"
import about from "./About"
import feedback from "./Setting/Feedback"
import setting from "./Setting/Setting"
import autoLogin from "./Setting/AutoLogin"


export default combineReducers({
  main,
  mobileModify,
  profile,
  about,
  feedback,
  setting,
  autoLogin,
})