/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_REGISTER_MOBILE_CHECK_RESET,
  ACTION_REGISTER_MOBILE_CHECK_SEND,
  ACTION_REGISTER_MOBILE_CHECK_SUC
} from "../../Constants"


type State = {
  isMobileCheckSuc: boolean,
  mobile: string,
  code: string,
}

const initialState: State = {
  isMobileCheckSuc: false,
  mobile: '',
  code: '',
}

export default handleActions(
  {
    [ACTION_REGISTER_MOBILE_CHECK_SEND]: (state: State, action) => {
      const {mobile, code} = action.payload
      return {
        ...state,
        isMobileCheckSuc: false,
        mobile,
        code
      }
    },
    [ACTION_REGISTER_MOBILE_CHECK_SUC]: (state: State, action) => {
      return {
        ...state,
        isMobileCheckSuc: true,
      }
    },
    [ACTION_REGISTER_MOBILE_CHECK_RESET]: (state: State, action) => {
      return {
        ...state,
        isMobileCheckSuc: false,
        mobile: '',
        code: '',
      }
    },
  },
  initialState)
