/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_PASSWORD_MODIFY_CHECK_RESET,
  ACTION_PASSWORD_MODIFY_CHECK_SUC,
  ACTION_PASSWORD_MODIFY_RESET,
  ACTION_PASSWORD_MODIFY_SUC,
} from "../../Constants"


type State = {
  isPasswordCheckSuc: boolean,
  isPasswordModifySuc: boolean,
}

const initialState: State = {
  isPasswordCheckSuc: false,
  isPasswordModifySuc: false,
}

export default handleActions(
  {
    [ACTION_PASSWORD_MODIFY_CHECK_SUC]: (state: State, action) => {
      return {
        ...state,
        isPasswordCheckSuc: true,
      }
    },
    [ACTION_PASSWORD_MODIFY_CHECK_RESET]: (state: State, action) => {
      return {
        ...state,
        isPasswordCheckSuc: false,
      }
    },
    [ACTION_PASSWORD_MODIFY_SUC]: (state: State, action) => {
      return {
        ...state,
        isPasswordModifySuc: true,
      }
    },
    [ACTION_PASSWORD_MODIFY_RESET]: (state: State, action) => {
      return {
        ...state,
        isPasswordModifySuc: false,
      }
    },
  },
  initialState)
