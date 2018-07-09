/** @flow */
import {handleActions} from "redux-actions"

import {DETAIL_CLEAR, DETAIL_REQUEST, DETAIL_WATCHED, DETAIL_WISH} from "../Constants"


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
    [DETAIL_CLEAR]: (state: State, action) => {

      return { ...state, movie: {} }

    },
    [DETAIL_REQUEST]: (state: State, action) => {

      const { movie } = action;
      return { ...state, movie }

    },
    [DETAIL_WATCHED]: (state: State, action) => {

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
    [DETAIL_WISH]: (state: State, action) => {

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
