/** @flow */
import type {ActionAsync} from "../../common/Constants"
import {ACTION_EVENT_FETCH} from "../Constants"


export const fetch = (year: number, month: number): ActionAsync => {
  return (dispatch, getState) => {
    dispatch({type: ACTION_EVENT_FETCH})
  }
}