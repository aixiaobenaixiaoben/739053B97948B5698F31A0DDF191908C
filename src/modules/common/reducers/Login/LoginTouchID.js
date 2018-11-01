/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_TOUCH_ID_DISABLE,
  ACTION_TOUCH_ID_ENABLE,
  ACTION_TOUCH_ID_SUPPORTED,
  ACTION_TOUCH_ID_SWITCH,
} from "../../Constants"


type State = {
  isTouchIDSupported: boolean,
  isTouchIDEnabled: boolean,
  touchIDType: string,
  touchIDs: Object,
}

const initialState: State = {
  isTouchIDSupported: false,
  isTouchIDEnabled: false,
  touchIDType: '',
  touchIDs: {},
}

export default handleActions(
  {
    [ACTION_TOUCH_ID_SUPPORTED]: (state: State, action) => {
      const {touchIDType} = action.payload
      return {
        ...state,
        isTouchIDSupported: true,
        touchIDType,
      }
    },
    [ACTION_TOUCH_ID_ENABLE]: (state: State, action) => {
      return {
        ...state,
        isTouchIDEnabled: true,
      }
    },
    [ACTION_TOUCH_ID_DISABLE]: (state: State, action) => {
      return {
        ...state,
        isTouchIDEnabled: false,
      }
    },
    [ACTION_TOUCH_ID_SWITCH]: (state: State, action) => {
      const {previousSequence, currentSequence} = action.payload
      const previousTouch = {
        isTouchIDEnabled: state.isTouchIDEnabled,
      }
      const touchIDs = state.touchIDs || {}
      const currentTouch = touchIDs[currentSequence] || {
        isTouchIDEnabled: false,
      }
      return {
        ...state,
        ...currentTouch,
        touchIDs: {...touchIDs, [previousSequence]: previousTouch},
      }
    },
  },
  initialState)
