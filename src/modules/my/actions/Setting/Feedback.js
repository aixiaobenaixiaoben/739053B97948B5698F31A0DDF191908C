/** @flow */
import {ACTION_FEEDBACK, ACTION_FEEDBACK_RESET, URL_FEEDBACK,} from "../../Constants"
import type {Action, ActionAsync} from "../../../common/Constants"
import type {Syfedbak} from "../../interface/Syfedbak"
import Request from "axios/index"
import qs from "qs"
import {Modal, Toast} from "antd-mobile-rn"


export const feedback = (data: Syfedbak): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('提交中', 0)

    Request.post(URL_FEEDBACK, qs.stringify(data)).then(response => {
      const {RTNCOD, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_FEEDBACK})
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const feedbackReset = (): Action => {
  return {
    type: ACTION_FEEDBACK_RESET,
  }
}


