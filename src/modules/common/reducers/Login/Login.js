/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_LOGIN, ACTION_LOGIN_UPDATE, ACTION_LOGOUT} from "../../Constants"
import type {Syusrinf} from "../../interface/Syusrinf"


type State = {
  isLogin: boolean,
  user: Syusrinf,
  sequence: string,
}

const initialState: State = {
  isLogin: false,
  user: {
    suiseqcod: '',
  },
  sequence: '',
}

export default handleActions(
  {
    [ACTION_LOGIN]: (state: State, action) => {
      return {
        ...state,
        isLogin: true,
        user: action.payload,
        sequence: action.payload.suiseqcod,
      }
    },
    [ACTION_LOGOUT]: (state: State, action) => {
      return {
        ...state,
        isLogin: false,
      }
    },
    [ACTION_LOGIN_UPDATE]: (state: State, action) => {
      return {
        ...state,
        user: action.payload,
      }
    },
  },
  initialState)
