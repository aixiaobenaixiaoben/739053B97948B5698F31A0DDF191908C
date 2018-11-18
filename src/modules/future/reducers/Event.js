/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_EVENT_FETCH} from "../Constants"

type State = {
  version: number,
}

const initialState: State = {
  version: 0,
}

export default handleActions(
  {
    [ACTION_EVENT_FETCH]: (state: State, action) => {
      return {
        ...state,
        version: Date.now(),
      }
    },
  },
  initialState)
