/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_RESET_VERIFY_CODE, ACTION_SET_VERIFY_CODE, ACTION_VERIFY_CODE_SUC} from "../../Constants"


type State = {
  isVerifySuc: boolean,
  mobile: string,
  code: string,
}

const initialState: State = {
  isVerifySuc: false,
  mobile: '',
  code: '',
}

export default handleActions(
  {
    [ACTION_SET_VERIFY_CODE]: (state: State, action) => {
      const { mobile, code } = action.payload
      return {
        ...state,
        isVerifySuc: false,
        mobile,
        code
      }
    },
    [ACTION_VERIFY_CODE_SUC]: (state: State, action) => {
      return {
        ...state,
        isVerifySuc: true,
      }
    },
    [ACTION_RESET_VERIFY_CODE]: (state: State, action) => {
      return {
        ...state,
        isVerifySuc: false,
        mobile: '',
        code: '',
      }
    },
  },
  initialState)
