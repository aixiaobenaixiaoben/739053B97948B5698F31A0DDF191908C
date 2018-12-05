/** @flow */
import {handleActions} from "redux-actions"
import type {Mememory} from "../interface/Mememory"
import {ACTION_MEMORY_FETCH, ACTION_MEMORY_UPDATE} from "../Constants"

type State = {
  memories: Mememory[],
  memoryLength: number,
  updateMemory: Mememory,
}

const initialState: State = {
  memories: [],
  memoryLength: 0,
  updateMemory: {},
}

export default handleActions(
  {
    [ACTION_MEMORY_FETCH]: (state: State, action) => {
      const {data, length} = action.payload
      return {
        ...state,
        memories: data,
        memoryLength: length,
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
