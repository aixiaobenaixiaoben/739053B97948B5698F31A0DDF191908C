/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_FEEDBACK, ACTION_FEEDBACK_RESET, ACTION_FEEDBACK_UPDATE,} from "../../Constants"


type State = {
  isFeedbackSuc: boolean,
  photoRemoteID: string,
}

const initialState: State = {
  isFeedbackSuc: false,
  photoRemoteID: '',
}

export default handleActions(
  {
    [ACTION_FEEDBACK_UPDATE]: (state: State, action) => {
      let photoRemoteID = state.photoRemoteID
      if (photoRemoteID.length > 0) {
        photoRemoteID += ','
      }
      photoRemoteID += action.payload
      return {
        ...state,
        photoRemoteID,
      }
    },
    [ACTION_FEEDBACK]: (state: State, action) => {
      return {
        ...state,
        isFeedbackSuc: true,
      }
    },
    [ACTION_FEEDBACK_RESET]: (state: State, action) => {
      return {
        ...state,
        isFeedbackSuc: false,
        photoRemoteID: '',
      }
    },
  },
  initialState)
