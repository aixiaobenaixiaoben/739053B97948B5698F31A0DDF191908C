/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_MEMORY_MAIN_UPDATE} from "../Constants"

type State = {
  version: number,
}

const initialState: State = {
  version: 0,
}

export default handleActions(
  {
    [ACTION_MEMORY_MAIN_UPDATE]: (state: State, action) => {
      return {
        ...state,
        version: Date.now(),
      }
    },
  },
  initialState)
