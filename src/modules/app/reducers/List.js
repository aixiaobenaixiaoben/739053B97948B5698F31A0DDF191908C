/** @flow */
import {handleActions} from "redux-actions"

import {LIST_REQUEST} from "../Constants"


type State = {
  movies: Object,
}

const initialState: State = {
  movies: {},
};

export default handleActions(
  {
    [LIST_REQUEST]: (state: State, action) => {

      const { movies } = action;
      return { ...state, movies }

    },
  },
  initialState);
