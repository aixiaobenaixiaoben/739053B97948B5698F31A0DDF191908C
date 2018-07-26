/** @flow */
import type {Action} from "../../Constants"
import {
  ACTION_GESTURE_COUNT_DECREASE,
  ACTION_GESTURE_COUNT_RESET,
  ACTION_GESTURE_DISABLE,
  ACTION_GESTURE_ENABLE,
} from "../../Constants"


export const gestureEnable = (data): Action => {
  return {
    type: ACTION_GESTURE_ENABLE,
    payload: {
      password: data,
    }
  }
}

export const gestureDisable = (): Action => {
  return {
    type: ACTION_GESTURE_DISABLE,
  }
}

export const gestureCountReset = (): Action => {
  return {
    type: ACTION_GESTURE_COUNT_RESET,
  }
}

export const gestureCountDecrease = (): Action => {
  return {
    type: ACTION_GESTURE_COUNT_DECREASE,
  }
}
