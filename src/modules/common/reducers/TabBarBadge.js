/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_TAB_BAR_BADGE_CLEAR, ACTION_TAB_BAR_BADGE_SET} from "../Constants"


type State = {
  home: Object,
  movie: Object,
  music: Object,
  read: Object,
  my: Object,
  tabWillUpdate: string,
}

const initialState: State = {
  home: {
    hidden: true,
    content: ''
  },
  movie: {
    hidden: true,
    content: ''
  },
  music: {
    hidden: true,
    content: ''
  },
  read: {
    hidden: true,
    content: ''
  },
  my: {
    hidden: true,
    content: ''
  },
  tabWillUpdate: '',
}

export default handleActions(
  {
    [ACTION_TAB_BAR_BADGE_SET]: (state: State, action) => {
      const {tab, content} = action.payload
      return {
        ...state,
        [tab]: {
          hidden: false,
          content: content,
        },
        tabWillUpdate: tab,
      }

    },
    [ACTION_TAB_BAR_BADGE_CLEAR]: (state: State, action) => {
      const {tab} = action.payload
      return {
        ...state,
        [tab]: {
          hidden: true,
          content: ''
        },
        tabWillUpdate: tab,
      }
    },
  },
  initialState)
