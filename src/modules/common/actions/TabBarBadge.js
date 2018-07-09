/** @flow */
import {TAB_BAR_BADGE_CLEAR, TAB_BAR_BADGE_SET} from "../Constants"


export type Action = {
  type: string,
  payload: Object,
}

export const setTabBarBadge = (tab: string, hidden: boolean, content: string): Action => {
  return {
    type: TAB_BAR_BADGE_SET,
    payload: {
      tab: tab,
      content: content,
    }
  }
};

export const clearTabBarBadge = (tab: string): Action => {
  return {
    type: TAB_BAR_BADGE_CLEAR,
    payload: {
      tab: tab,
    }
  }
};
