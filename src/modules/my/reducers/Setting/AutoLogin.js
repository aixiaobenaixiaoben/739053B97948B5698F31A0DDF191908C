/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_AUTO_LOGIN_DISABLE,
  ACTION_AUTO_LOGIN_ENABLE,
  ACTION_AUTO_LOGIN_STUB,
  ACTION_AUTO_LOGIN_SWITCH
} from "../../Constants"


type State = {
  autoLogin: boolean,
  exitTime: number,
  autoLogins: Object,
}

const initialState: State = {
  autoLogin: false,
  exitTime: 0,
  autoLogins: {},
}

export default handleActions(
  {
    [ACTION_AUTO_LOGIN_ENABLE]: (state: State, action) => {
      return {
        ...state,
        autoLogin: true,
      }
    },
    [ACTION_AUTO_LOGIN_DISABLE]: (state: State, action) => {
      return {
        ...state,
        autoLogin: false,
      }
    },
    [ACTION_AUTO_LOGIN_STUB]: (state: State, action) => {
      return {
        ...state,
        exitTime: action.payload,
      }
    },
    [ACTION_AUTO_LOGIN_SWITCH]: (state: State, action) => {
      const {previousSequence, currentSequence} = action.payload
      const previousAuto = {
        autoLogin: state.autoLogin,
      }
      const autos = state.autoLogins || {}
      const currentAuto = autos[currentSequence] || {
        autoLogin: false,
      }
      return {
        ...state,
        ...currentAuto,
        autoLogins: {...autos, [previousSequence]: previousAuto},
      }
    },
  },
  initialState)
