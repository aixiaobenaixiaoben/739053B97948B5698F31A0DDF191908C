/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_REGISTER_MOBILE_CHECK_COUNT,
  ACTION_REGISTER_MOBILE_CHECK_RESET,
  ACTION_REGISTER_MOBILE_CHECK_SEND,
  ACTION_REGISTER_MOBILE_CHECK_SUC,
  DURATION_MOBILE_CODE_EXPIRED
} from "../../Constants"


type State = {
  isMobileCheckSuc: boolean,
  mobile: string,
  count: number,
}

const initialState: State = {
  isMobileCheckSuc: false,
  mobile: '',
  count: 0,
}

export default handleActions(
  {
    [ACTION_REGISTER_MOBILE_CHECK_SEND]: (state: State, action) => {
      return {
        ...state,
        isMobileCheckSuc: false,
        mobile: action.payload.suimobile,
        count: DURATION_MOBILE_CODE_EXPIRED,
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
        count: 0,
      }
    },
    [ACTION_REGISTER_MOBILE_CHECK_COUNT]: (state: State, action) => {
      let {count} = state
      return {
        ...state,
        count: count > 0 ? count - 1 : count,
      }
    },
  },
  initialState)
