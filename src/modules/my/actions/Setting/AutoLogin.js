/** @flow */
import type {Action} from "../../../common/Constants"
import {ACTION_AUTO_LOGIN_DISABLE, ACTION_AUTO_LOGIN_ENABLE, ACTION_AUTO_LOGIN_STUB} from "../../Constants"


export const autoLoginEnabled = (): Action => {
  return {
    type: ACTION_AUTO_LOGIN_ENABLE,
  }
}

export const autoLoginDisabled = (): Action => {
  return {
    type: ACTION_AUTO_LOGIN_DISABLE,
  }
}

export const autoLoginStub = (time: number): Action => {
  return {
    type: ACTION_AUTO_LOGIN_STUB,
    payload: time,
  }
}
