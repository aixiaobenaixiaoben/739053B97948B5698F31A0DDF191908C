/** @flow */

/** version of the app */
export const APP_VERSION = '1.0.1'
/** name of the app */
export const APP_NAME = '回忆未来'

/** name of this modules */
export const NAME = 'common'

/** action return type */
export type Action = {
  type: string,
  payload?: Object,
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

/** action type */
export const ACTION_CACHE_CLEAR = `${NAME}/ACTION_CACHE_CLEAR`
export const ACTION_CACHE_COUNT = `${NAME}/ACTION_CACHE_COUNT`
export const ACTION_LOGIN = `${NAME}/ACTION_LOGIN`
export const ACTION_LOGOUT = `${NAME}/ACTION_LOGOUT`
export const ACTION_LOGIN_UPDATE = `${NAME}/ACTION_LOGIN_UPDATE`
export const ACTION_REGISTER_MOBILE_CHECK_SEND = `${NAME}/ACTION_REGISTER_MOBILE_CHECK_SEND`
export const ACTION_REGISTER_MOBILE_CHECK_SUC = `${NAME}/ACTION_REGISTER_MOBILE_CHECK_SUC`
export const ACTION_REGISTER_MOBILE_CHECK_RESET = `${NAME}/ACTION_REGISTER_MOBILE_CHECK_RESET`
export const ACTION_REGISTER_MOBILE_CHECK_COUNT = `${NAME}/ACTION_REGISTER_MOBILE_CHECK_COUNT`
export const ACTION_REGISTER_SUC = `${NAME}/ACTION_REGISTER`
export const ACTION_RESET_PASSWORD_MOBILE_CHECK_SEND = `${NAME}/ACTION_RESET_PASSWORD_MOBILE_CHECK_SEND`
export const ACTION_RESET_PASSWORD_MOBILE_CHECK_SUC = `${NAME}/ACTION_RESET_PASSWORD_MOBILE_CHECK_SUC`
export const ACTION_RESET_PASSWORD_MOBILE_CHECK_RESET = `${NAME}/ACTION_RESET_PASSWORD_MOBILE_CHECK_RESET`
export const ACTION_RESET_PASSWORD_MOBILE_CHECK_COUNT = `${NAME}/ACTION_RESET_PASSWORD_MOBILE_CHECK_COUNT`
export const ACTION_RESET_PASSWORD_SUC = `${NAME}/ACTION_RESET_PASSWORD_SUC`
export const ACTION_GESTURE_ENABLE = `${NAME}/ACTION_GESTURE_ENABLE`
export const ACTION_GESTURE_DISABLE = `${NAME}/ACTION_GESTURE_DISABLE`
export const ACTION_GESTURE_COUNT_RESET = `${NAME}/ACTION_GESTURE_COUNT_RESET`
export const ACTION_GESTURE_COUNT_DECREASE = `${NAME}/ACTION_GESTURE_COUNT_DECREASE`
export const ACTION_GESTURE_SWITCH = `${NAME}/ACTION_GESTURE_SWITCH`
export const ACTION_TOUCH_ID_SUPPORTED = `${NAME}/ACTION_TOUCH_ID_SUPPORTED`
export const ACTION_TOUCH_ID_ENABLE = `${NAME}/ACTION_TOUCH_ID_ENABLE`
export const ACTION_TOUCH_ID_DISABLE = `${NAME}/ACTION_TOUCH_ID_DISABLE`
export const ACTION_TOUCH_ID_SWITCH = `${NAME}/ACTION_TOUCH_ID_SWITCH`

/** URL type */
export const URL_DOWNLOAD = '/attachment/download.action'
export const URL_UPLOAD = '/attachment/upload.action'
export const URL_LOGIN = '/user/login'
export const URL_LOGOUT = '/user/logout'
export const URL_UPDATE_USER_INFO = '/user/updateUserInfo'
export const URL_REGISTER_MOBILE_CHECK_SEND = '/user/sendRegisterVerifyCode'
export const URL_REGISTER_MOBILE_CHECK = '/user/registerVerifyCode'
export const URL_REGISTER = '/user/register'
export const URL_RESET_PASSWORD_MOBILE_CHECK_SEND = '/user/sendResetVerifyCode'
export const URL_RESET_PASSWORD_MOBILE_CHECK = '/user/resetVerifyCode'
export const URL_RESET_PASSWORD = '/user/resetPassword'

/** 验证码失效时间(s) */
export const DURATION_MOBILE_CODE_EXPIRED = 60
/** 自动登录判断时间(ms) */
export const DURATION_AUTO_LOGIN = 600000
/** 日历前后可见范围(月) */
export const CALENDAR_RANGE = 120
