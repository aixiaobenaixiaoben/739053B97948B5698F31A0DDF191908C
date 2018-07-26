/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_GUIDE_READ, ACTION_GUIDE_RESET} from "../Constants"


type State = {
  guideRead: boolean,
}

const initialState: State = {
  guideRead: false,
}

export default handleActions(
  {
    [ACTION_GUIDE_READ]: (state: State, action) => {
      return {
        ...state,
        guideRead: true,
      }

    },
    [ACTION_GUIDE_RESET]: (state: State, action) => {
      return {
        ...state,
        guideRead: false,
      }

    },
  },
  initialState)
