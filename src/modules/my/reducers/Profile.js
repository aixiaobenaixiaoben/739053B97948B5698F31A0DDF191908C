/** @flow */
import {handleActions} from "redux-actions"
import {
  ACTION_PROFILE_PATH_CLEAR,
  ACTION_PROFILE_PATH_UPDATE,
  ACTION_PROFILE_PHOTO_UPLOADED,
  ACTION_PROFILE_SWITCH,
  ACTION_PROFILE_UPDATE
} from "../Constants"
import type {Syprofil} from "../interface/Syprofil"


type State = {
  profile: Syprofil,
  photoPath: string,
  photoRemoteID: string,
  profiles: Object,
}

const initialState: State = {
  profile: {},
  photoPath: '',
  photoRemoteID: '',
  profiles: {},
}

export default handleActions(
  {
    [ACTION_PROFILE_UPDATE]: (state: State, action) => {
      return {
        ...state,
        profile: action.payload,
      }
    },
    [ACTION_PROFILE_PATH_UPDATE]: (state: State, action) => {
      return {
        ...state,
        photoPath: action.payload,
      }
    },
    [ACTION_PROFILE_PHOTO_UPLOADED]: (state: State, action) => {
      return {
        ...state,
        photoRemoteID: action.payload,
      }
    },
    [ACTION_PROFILE_PATH_CLEAR]: (state: State, action) => {
      return {
        ...state,
        photoPath: '',
      }
    },
    [ACTION_PROFILE_SWITCH]: (state: State, action) => {
      const {previousSequence, currentSequence} = action.payload
      const previousProfile = {
        profile: state.profile,
        photoPath: state.photoPath,
      }
      const profiles = state.profiles || {}
      const currentProfile = profiles[currentSequence] || {
        profile: {},
        photoPath: '',
      }
      return {
        ...state,
        ...currentProfile,
        profiles: {...profiles, [previousSequence]: previousProfile},
      }
    },
  },
  initialState)
