/** @flow */
import {handleActions} from "redux-actions"

import {ACTION_DETAIL_CLEAR, ACTION_DETAIL_REQUEST, ACTION_DETAIL_WATCHED, ACTION_DETAIL_WISH} from "../Constants"


type State = {
  movie: Object,
  marks: Object,
}

const initialState: State = {
  movie: {},
  marks: {},
};

export default handleActions(
  {
    [ACTION_DETAIL_CLEAR]: (state: State, action) => {

      return { ...state, movie: {} }

    },
    [ACTION_DETAIL_REQUEST]: (state: State, action) => {

      const { movie } = action;
      return { ...state, movie }

    },
    [ACTION_DETAIL_WATCHED]: (state: State, action) => {

      const { id } = action;
      let mark = state.marks[id];

      if (mark === undefined) {
        mark = { watched: true, wish: false }
      } else {
        const { watched } = mark;
        mark = { ...mark, watched: !watched }
      }

      return {
        ...state,
        marks: { ...state.marks, [id]: mark }
      };

    },
    [ACTION_DETAIL_WISH]: (state: State, action) => {

      const { id } = action;
      let mark = state.marks[id];
      if (mark === undefined) {
        mark = { watched: false, wish: true }
      } else {
        const { wish } = mark;
        mark = { ...mark, wish: !wish }
      }

      return {
        ...state,
        marks: { ...state.marks, [id]: mark }
      };

    },
  },
  initialState);
