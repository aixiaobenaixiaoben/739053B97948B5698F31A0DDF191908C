/** @flow */
import {NAME} from "./Constants"
import reducer from "./reducers"
import MyMain from "./containers/Main"
import {MyAboutRoute, MyProfileRoute, MySettingRoute} from "./Route"

export default {NAME, reducer, MyMain, MySettingRoute, MyProfileRoute, MyAboutRoute}