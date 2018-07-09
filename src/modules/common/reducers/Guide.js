/** @flow */
import {handleActions} from "redux-actions"
import {GUIDE_READ, GUIDE_RESET} from "../Constants"


type State = {
  guideRead: boolean,
}

const initialState: State = {
  guideRead: false,
};

export default handleActions(
  {
    [GUIDE_READ]: (state: State, action) => {
      return {
        ...state,
        guideRead: true,
      };

    },
    [GUIDE_RESET]: (state: State, action) => {
      return {
        ...state,
        guideRead: false,
      };

    },
  },
  initialState);
