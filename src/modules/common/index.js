/** @flow */
import {NAME} from "./Constants"
import reducer from "./reducers"
import Start from "./containers/Start"
import Guide from "./containers/Guide"
import TabBarBadge from "./containers/TabBarBadge"
import Login from "./containers/Login/Login"
import LoginPassword from "./containers/Login/LoginPassword"
import LoginGesture from "./containers/Login/LoginGesture"
import LoginTouchID from "./containers/Login/LoginTouchID"
import {CommonRegisterRoute, CommonResetPasswordRoute} from "./Route"

export default {
  NAME,
  reducer,
  Start,
  Guide,
  TabBarBadge,
  Login,
  LoginPassword,
  LoginGesture,
  LoginTouchID,
  CommonRegisterRoute,
  CommonResetPasswordRoute,
}
