/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_PROFILE_INIT,
  ACTION_PROFILE_PATH_CLEAR,
  ACTION_PROFILE_PATH_UPDATE,
  ACTION_PROFILE_UPDATE
} from "../Constants"
import type {Syprofil} from "../interface/Syprofil"
import {FTP_CODE_SUC} from "../../common/Constants"


type State = {
  profile: Syprofil,
  photoPath: string,
}

const initialState: State = {
  profile: {},
  photoPath: '',
}

export default handleActions(
  {
    [ACTION_PROFILE_INIT]: (state: State, action) => {
      if (state.profile.spfseqcod === action.payload.suiseqcod) return {...state}
      return {
        ...state,
        profile: {},
        photoPath: '',
      }
    },
    [ACTION_PROFILE_UPDATE]: (state: State, action) => {
      return {
        ...state,
        profile: action.payload,
      }
    },
    [ACTION_PROFILE_PATH_UPDATE]: (state: State, action) => {
      const {CODE, INFO} = action.payload
      if (CODE !== FTP_CODE_SUC) return {...state}
      return {
        ...state,
        photoPath: INFO,
      }
    },
    [ACTION_PROFILE_PATH_CLEAR]: (state: State, action) => {
      return {
        ...state,
        photoPath: '',
      }
    },
  },
  initialState)
