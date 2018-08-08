/** @flow */
import type {Action} from "../../Constants"
import {ACTION_TOUCH_ID_DISABLE, ACTION_TOUCH_ID_ENABLE, ACTION_TOUCH_ID_SUPPORTED,} from "../../Constants"


export const touchIDSupported = (touchIDType: string): Action => {
  return {
    type: ACTION_TOUCH_ID_SUPPORTED,
    payload: {touchIDType}
  }
}

export const touchIDEnabled = (): Action => {
  return {
    type: ACTION_TOUCH_ID_ENABLE,
  }
}

export const touchIDDisabled = (): Action => {
  return {
    type: ACTION_TOUCH_ID_DISABLE,
  }
}
