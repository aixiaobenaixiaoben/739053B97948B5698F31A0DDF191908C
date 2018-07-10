/** @flow */
import type {Action} from "../Constants"
import {ACTION_TAB_BAR_BADGE_CLEAR, ACTION_TAB_BAR_BADGE_SET} from "../Constants"


export const setTabBarBadge = (tab: string, hidden: boolean, content: string): Action => {
  return {
    type: ACTION_TAB_BAR_BADGE_SET,
    payload: {
      tab: tab,
      content: content,
    }
  }
};

export const clearTabBarBadge = (tab: string): Action => {
  return {
    type: ACTION_TAB_BAR_BADGE_CLEAR,
    payload: {
      tab: tab,
    }
  }
};
