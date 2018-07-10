/** @flow */
import {handleActions} from "redux-actions"

import {ACTION_LIST_ITEM_VISIT} from "../Constants"


type State = {
  visit: Array<string>,
}

const initialState: State = {
  visit: [],
};

export default handleActions(
  {
    [ACTION_LIST_ITEM_VISIT]: (state: State, action) => {

      const { id } = action;
      state.visit.push(id);
      return state;

    },
  },
  initialState);
