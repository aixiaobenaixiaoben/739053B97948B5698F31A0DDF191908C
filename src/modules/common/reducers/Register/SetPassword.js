/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_REGISTER_RESET, ACTION_REGISTER_SUC} from "../../Constants"


type State = {
  isRegisterSuc: boolean,
}

const initialState: State = {
  isRegisterSuc: false,
}

export default handleActions(
  {
    [ACTION_REGISTER_SUC]: (state: State, action) => {
      return {
        ...state,
        isRegisterSuc: true,
      }
    },
    [ACTION_REGISTER_RESET]: (state: State, action) => {
      return {
        ...state,
        isRegisterSuc: false,
      }
    },
  },
  initialState)
