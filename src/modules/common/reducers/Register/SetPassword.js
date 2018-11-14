/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_REGISTER_SUC} from "../../Constants"


type State = {
  version: number,
}

const initialState: State = {
  version: 0,
}

export default handleActions(
  {
    [ACTION_REGISTER_SUC]: (state: State, action) => {
      return {
        ...state,
        version: Date.now(),
      }
    },
  },
  initialState)
