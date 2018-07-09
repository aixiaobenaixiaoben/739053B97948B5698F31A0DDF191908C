/** @flow */
import {combineReducers} from "redux"

import list from "./List"
import detail from "./Detail"
import listItem from "./ListItem"
import progress from "./Progress"


export default combineReducers({
  list,
  detail,
  listItem,
  progress,
});