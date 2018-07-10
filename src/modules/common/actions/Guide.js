/** @flow */
import {ACTION_GUIDE_READ, ACTION_GUIDE_RESET} from "../Constants"


export type Action = {
  type: string,
}

export const guideRead = (): Action => {
  return {
    type: ACTION_GUIDE_READ,
  }
};

export const guideReset = (): Action => {
  return {
    type: ACTION_GUIDE_RESET,
  }
};
