/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_APP_VERSION} from "../../Constants"
import type {Version} from "../../interface/Version"

type State = {
  version: Version,
}

const initialState: State = {
  version: {
    appName: '',
    newVersion: '',
    minVersion: '',
    url: '',
    updateDescription: '',
  },
}

export default handleActions(
  {
    [ACTION_APP_VERSION]: (state: State, action) => {
      return {
        ...state,
        version: action.payload,
      }
    },
  },
  initialState)
