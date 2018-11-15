/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_CALENDAR_ACCESS} from "../Constants"

type State = {
  accessible: boolean,
}

const initialState: State = {
  accessible: false,
}

export default handleActions(
  {
    [ACTION_CALENDAR_ACCESS]: (state: State, action) => {
      return {
        ...state,
        accessible: action.payload,
      }
    },
  },
  initialState)
