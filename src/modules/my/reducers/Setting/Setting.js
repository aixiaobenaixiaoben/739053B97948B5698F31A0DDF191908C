/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_CACHE_CLEAR, ACTION_CACHE_COUNT} from "../../../common/Constants"


type State = {
  cacheSize: number,
}

const initialState: State = {
  cacheSize: 0,
}

export default handleActions(
  {
    [ACTION_CACHE_COUNT]: (state: State, action) => {
      return {
        ...state,
        cacheSize: action.payload,
      }
    },
    [ACTION_CACHE_CLEAR]: (state: State, action) => {
      return {
        ...state,
        cacheSize: 0,
      }
    },
  },
  initialState)
