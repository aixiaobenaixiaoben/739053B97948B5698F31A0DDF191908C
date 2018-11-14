/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_RESET_PASSWORD_SUC} from "../../Constants"


type State = {
  version: number,
}

const initialState: State = {
  version: 0,
}

export default handleActions(
  {
    [ACTION_RESET_PASSWORD_SUC]: (state: State, action) => {
      return {
        ...state,
        version: Date.now(),
      }
    },
  },
  initialState)
