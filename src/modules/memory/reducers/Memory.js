/** @flow */
import {handleActions} from "redux-actions"
import type {Mememory} from "../interface/Mememory"
import {ACTION_MEMORY_FETCH, ACTION_MEMORY_UPDATE} from "../Constants"

type State = {
  memories: Mememory[],
  updateMemory: Mememory,
}

const initialState: State = {
  memories: [],
  updateMemory: {},
}

export default handleActions(
  {
    [ACTION_MEMORY_FETCH]: (state: State, action) => {
      return {
        ...state,
        memories: action.payload.data,
      }
    },
    [ACTION_MEMORY_UPDATE]: (state: State, action) => {
      return {
        ...state,
        updateMemory: action.payload,
      }
    },
  },
  initialState)
