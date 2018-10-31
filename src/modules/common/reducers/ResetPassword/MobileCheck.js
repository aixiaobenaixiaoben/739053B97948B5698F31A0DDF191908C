/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_RESET_PASSWORD_MOBILE_CHECK_COUNT,
  ACTION_RESET_PASSWORD_MOBILE_CHECK_RESET,
  ACTION_RESET_PASSWORD_MOBILE_CHECK_SEND,
  ACTION_RESET_PASSWORD_MOBILE_CHECK_SUC,
  DURATION_MOBILE_CODE_EXPIRED
} from "../../Constants"
import type {Syusrinf} from "../../interface/Syusrinf"


type State = {
  mobile: string,
  user: Syusrinf,
  count: number,
}

const initialState: State = {
  mobile: '',
  user: {},
  count: -1,
}

export default handleActions(
  {
    [ACTION_RESET_PASSWORD_MOBILE_CHECK_SEND]: (state: State, action) => {
      return {
        ...state,
        mobile: action.payload.suimobile,
        count: DURATION_MOBILE_CODE_EXPIRED,
      }
    },
    [ACTION_RESET_PASSWORD_MOBILE_CHECK_SUC]: (state: State, action) => {
      return {
        ...state,
        user: action.payload,
      }
    },
    [ACTION_RESET_PASSWORD_MOBILE_CHECK_RESET]: (state: State, action) => {
      return {
        ...state,
        user: {},
        mobile: '',
        count: -1,
      }
    },
    [ACTION_RESET_PASSWORD_MOBILE_CHECK_COUNT]: (state: State, action) => {
      let {count} = state
      return {
        ...state,
        count: count > 0 ? count - 1 : count,
      }
    },
  },
  initialState)
