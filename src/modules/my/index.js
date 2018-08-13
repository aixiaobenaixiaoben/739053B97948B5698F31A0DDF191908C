/** @flow */
import {NAME} from "./Constants"
import reducer from "./reducers"
import MyMain from "./containers/Main"
import {MySettingRoute, MyProfileRoute} from "./Route"

export default {NAME, reducer, MyMain, MySettingRoute, MyProfileRoute}