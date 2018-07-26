/** @flow */
import type {Action} from "../Constants"
import {ACTION_GUIDE_READ, ACTION_GUIDE_RESET} from "../Constants"


export const guideRead = (): Action => {
  return {
    type: ACTION_GUIDE_READ,
  }
}

export const guideReset = (): Action => {
  return {
    type: ACTION_GUIDE_RESET,
  }
}
