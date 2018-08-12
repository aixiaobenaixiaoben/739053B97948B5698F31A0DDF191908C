/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_PASSWORD_MODIFY_RESET, ACTION_PASSWORD_MODIFY_SUC,} from "../../Constants"


type State = {
  isPasswordModifySuc: boolean,
}

const initialState: State = {
  isPasswordModifySuc: false,
}

export default handleActions(
  {
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
