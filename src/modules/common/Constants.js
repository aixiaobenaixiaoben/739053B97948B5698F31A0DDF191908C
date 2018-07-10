/** @flow */

/** name of this modules */
export const NAME = 'common';

/** action return type */
export type Action = {
  type: string,
  payload?: Object,
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

/** action type */
export const ACTION_GUIDE_READ = `${NAME}/ACTION_GUIDE_READ`;
export const ACTION_GUIDE_RESET = `${NAME}/ACTION_GUIDE_RESET`;
export const ACTION_TAB_BAR_BADGE_SET = `${NAME}/ACTION_TAB_BAR_BADGE_SET`;
export const ACTION_TAB_BAR_BADGE_CLEAR = `${NAME}/ACTION_TAB_BAR_BADGE_CLEAR`;
export const ACTION_LOGIN = `${NAME}/ACTION_LOGIN`;
export const ACTION_LOGOUT = `${NAME}/ACTION_LOGOUT`;
export const ACTION_SET_VERIFY_CODE = `${NAME}/ACTION_SET_VERIFY_CODE`;
export const ACTION_VERIFY_CODE_SUC = `${NAME}/ACTION_VERIFY_CODE_SUC`;
export const ACTION_RESET_VERIFY_CODE = `${NAME}/ACTION_RESET_VERIFY_CODE`;
export const ACTION_REGISTER_SUC = `${NAME}/ACTION_REGISTER`;
export const ACTION_REGISTER_RESET = `${NAME}/ACTION_REGISTER_RESET`;

/** URL type */
export const URL_LOGIN = '/login'
export const URL_SEND_VERIFY_CODE = '/sendVerifyCode'
export const URL_VERIFY_CODE = '/verifyCode'
export const URL_REGISTER = '/register'

