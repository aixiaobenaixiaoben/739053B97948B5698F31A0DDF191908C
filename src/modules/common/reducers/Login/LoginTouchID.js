/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_TOUCH_ID_DISABLE, ACTION_TOUCH_ID_ENABLE, ACTION_TOUCH_ID_SUPPORTED,} from "../../Constants"


type State = {
  isTouchIDSupported: boolean,
  isTouchIDEnabled: boolean,
  touchIDType: string,
}

const initialState: State = {
  isTouchIDSupported: false,
  isTouchIDEnabled: true,
  touchIDType: '',
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
  },
  initialState)
