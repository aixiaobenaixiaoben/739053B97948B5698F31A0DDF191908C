/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_GESTURE_COUNT_DECREASE,
  ACTION_GESTURE_COUNT_RESET,
  ACTION_GESTURE_DISABLE,
  ACTION_GESTURE_ENABLE,
  ACTION_GESTURE_SWITCH,
} from "../../Constants"


type State = {
  count: number,
  gesturePassword: string,
  isGestureEnabled: boolean,
  gestures: Object,
}

const initialState: State = {
  count: 5,
  gesturePassword: '',
  isGestureEnabled: false,
  gestures: {},
}

export default handleActions(
  {
    [ACTION_GESTURE_ENABLE]: (state: State, action) => {
      const {password} = action.payload
      return {
        ...state,
        count: 5,
        gesturePassword: password,
        isGestureEnabled: true,
      }
    },
    [ACTION_GESTURE_DISABLE]: (state: State, action) => {
      return {
        ...state,
        isGestureEnabled: false,
      }
    },
    [ACTION_GESTURE_COUNT_RESET]: (state: State, action) => {
      return {
        ...state,
        count: 5,
      }
    },
    [ACTION_GESTURE_COUNT_DECREASE]: (state: State, action) => {
      return {
        ...state,
        count: state.count - 1,
      }
    },
    [ACTION_GESTURE_SWITCH]: (state: State, action) => {
      const {previousSequence, currentSequence} = action.payload
      const previousGesture = {
        count: state.count,
        gesturePassword: state.gesturePassword,
        isGestureEnabled: state.isGestureEnabled,
      }
      const gestures = state.gestures || {}
      const currentGesture = gestures[currentSequence] || {
        count: 5,
        gesturePassword: '',
        isGestureEnabled: false,
      }
      return {
        ...state,
        ...currentGesture,
        gestures: {...gestures, [previousSequence]: previousGesture},
      }
    },
  },
  initialState)
