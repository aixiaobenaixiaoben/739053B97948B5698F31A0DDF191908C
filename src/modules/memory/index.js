/** @flow */
import MemoryMain from "./containers/Main/Main"
import reducer from "./reducers"
import {NAME} from "./Constants"
import {MemoryCreateRoute} from "./Route"

export default {NAME, reducer, MemoryMain, MemoryCreateRoute}