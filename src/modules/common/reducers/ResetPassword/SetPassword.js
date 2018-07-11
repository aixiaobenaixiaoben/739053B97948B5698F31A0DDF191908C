/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_RESET_PASSWORD_RESET, ACTION_RESET_PASSWORD_SUC} from "../../Constants"


type State = {
  isResetPasswordSuc: boolean,
}

const initialState: State = {
  isResetPasswordSuc: false,
}

export default handleActions(
  {
    [ACTION_RESET_PASSWORD_SUC]: (state: State, action) => {
      return {
        ...state,
        isResetPasswordSuc: true,
      }
    },
    [ACTION_RESET_PASSWORD_RESET]: (state: State, action) => {
      return {
        ...state,
        isResetPasswordSuc: false,
      }
    },
  },
  initialState)
