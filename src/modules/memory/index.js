/** @flow */
import MemoryMain from "./containers/Main/Main"
import reducer from "./reducers"
import {NAME} from "./Constants"
import {MemoryCreateRoute, MemoryRoute} from "./Route"

export default {NAME, reducer, MemoryMain, MemoryRoute, MemoryCreateRoute}