/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_MOBILE_MODIFY_COUNT,
  ACTION_MOBILE_MODIFY_RESET,
  ACTION_MOBILE_MODIFY_SEND,
  ACTION_MOBILE_MODIFY_SUC,
} from "../../Constants"
import {DURATION_MOBILE_CODE_EXPIRED} from "../../../common/Constants"


type State = {
  isMobileModifySuc: boolean,
  mobile: string,
  count: number,
}

const initialState: State = {
  isMobileModifySuc: false,
  mobile: '',
  count: 0,
}

export default handleActions(
  {
    [ACTION_MOBILE_MODIFY_SEND]: (state: State, action) => {
      return {
        ...state,
        isMobileModifySuc: false,
        mobile: action.payload.suimobile,
        count: DURATION_MOBILE_CODE_EXPIRED,
      }
    },
    [ACTION_MOBILE_MODIFY_SUC]: (state: State, action) => {
      return {
        ...state,
        isMobileModifySuc: true,
      }
    },
    [ACTION_MOBILE_MODIFY_RESET]: (state: State, action) => {
      return {
        ...state,
        isMobileModifySuc: false,
        mobile: '',
        count: 0,
      }
    },
    [ACTION_MOBILE_MODIFY_COUNT]: (state: State, action) => {
      let {count} = state
      return {
        ...state,
        count: count > 0 ? count - 1 : count,
      }
    },
  },
  initialState)
