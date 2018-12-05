/** @flow */
import {NAME} from "./Constants"
import reducer from "./reducers"
import Login from "./containers/Login/Login"
import LoginPassword from "./containers/Login/LoginPassword"
import LoginGesture from "./containers/Login/LoginGesture"
import LoginTouchID from "./containers/Login/LoginTouchID"
import {CommonRegisterRoute, CommonResetPasswordRoute} from "./Route"

export default {
  NAME,
  reducer,
  Login,
  LoginPassword,
  LoginGesture,
  LoginTouchID,
  CommonRegisterRoute,
  CommonResetPasswordRoute,
}
