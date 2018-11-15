/** @flow */
import type {Action} from "../../common/Constants"
import {ACTION_CALENDAR_ACCESS} from "../Constants"


export const access = (accessible: boolean): Action => {
  return {
    type: ACTION_CALENDAR_ACCESS,
    payload: accessible,
  }
}
