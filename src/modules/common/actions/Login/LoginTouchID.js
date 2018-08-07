/** @flow */
import type {Action} from "../../Constants"
import {ACTION_TOUCH_ID_SUPPORTED,} from "../../Constants"


export const touchIDSupported = (touchIDType: string): Action => {
  return {
    type: ACTION_TOUCH_ID_SUPPORTED,
    payload: {touchIDType}
  }
}
