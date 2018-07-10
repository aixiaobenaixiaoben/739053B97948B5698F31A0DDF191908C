/** @flow */
import {ACTION_PROGRESS_DESTROY, ACTION_PROGRESS_WORKING} from "../Constants"

export type Action = {
  type: string,
}

export const progressing = (): Action => {
  return {
    type: ACTION_PROGRESS_WORKING,
  }
};

export const progressDestroy = (): Action => {
  return {
    type: ACTION_PROGRESS_DESTROY,
  }
};