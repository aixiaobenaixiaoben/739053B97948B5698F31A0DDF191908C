/** @flow */
import {GUIDE_READ, GUIDE_RESET} from "../Constants"


export type Action = {
  type: string,
}

export const guideRead = (): Action => {
  return {
    type: GUIDE_READ,
  }
};

export const guideReset = (): Action => {
  return {
    type: GUIDE_RESET,
  }
};
