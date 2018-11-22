/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_EVENT_FETCH, ACTION_EVENT_UPDATE} from "../Constants"
import type {Fueventt} from "../interface/Fueventt"

type State = {
  events: Fueventt[],
  updateEvent: Fueventt,
}

const initialState: State = {
  events: [],
  updateEvent: {},
}

export default handleActions(
  {
    [ACTION_EVENT_FETCH]: (state: State, action) => {
      return {
        ...state,
        events: action.payload,
      }
    },
    [ACTION_EVENT_UPDATE]: (state: State, action) => {
      return {
        ...state,
        updateEvent: action.payload,
      }
    },
  },
  initialState)
