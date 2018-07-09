/** @flow */
import {LOGIN, LOGOUT, TAB_BAR_BADGE_CLEAR, TAB_BAR_BADGE_SET} from "../../Constants"
import {Toast} from "antd-mobile-rn"


export type Action = {
  type: string,
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

export const login = (): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('登录中...', 0)

    setTimeout(() => {
      dispatch({
        type: LOGIN,
      })
      Toast.hide()
    }, 3000)
  }
};

export const logout = (): Action => {
  return {
    type: LOGOUT,
  }
};
