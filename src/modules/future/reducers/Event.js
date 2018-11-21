/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_EVENT_FETCH, ACTION_EVENT_FRESH} from "../Constants"

type State = {
  version: number,
  events: Array,
}

const initialState: State = {
  version: 0,
  events: [],
}

export default handleActions(
  {
    [ACTION_EVENT_FETCH]: (state: State, action) => {
      return {
        ...state,
        events: action.payload,
      }
    },
    [ACTION_EVENT_FRESH]: (state: State, action) => {
      return {
        ...state,
        version: Date.now(),
      }
    },
  },
  initialState)
