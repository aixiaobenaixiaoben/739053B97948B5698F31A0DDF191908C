/** @flow */
import {handleActions} from "redux-actions"

import {ACTION_PROGRESS_DESTROY, ACTION_PROGRESS_WORKING} from "../Constants"


type State = {
  progress: number,
}

const initialState: State = {
  progress: 0,
};

export default handleActions(
  {
    [ACTION_PROGRESS_WORKING]: (state: State, action) => {

      const { progress } = state;
      return { progress: progress + 0.01 };

    },
    [ACTION_PROGRESS_DESTROY]: (state: State, action) => {

      return { progress: 0 };

    },
  },
  initialState);
