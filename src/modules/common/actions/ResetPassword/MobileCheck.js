/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import type {Action, ActionAsync} from "../../Constants"
import {
  ACTION_RESET_PASSWORD_MOBILE_CHECK_RESET,
  ACTION_RESET_PASSWORD_MOBILE_CHECK_SEND, ACTION_RESET_PASSWORD_MOBILE_CHECK_SUC,
  URL_RESET_PASSWORD_MOBILE_CHECK,
  URL_RESET_PASSWORD_MOBILE_CHECK_SEND
} from "../../Constants"


export const mobileCheckSend = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('发送中', 0)

    Request.get(URL_RESET_PASSWORD_MOBILE_CHECK_SEND, {params: data})
      .then(response => {
        const { COD, DTA, MSG } = response.data
        if (COD === 'SUC') {
          dispatch({ type: ACTION_RESET_PASSWORD_MOBILE_CHECK_SEND, payload: DTA })
          Toast.hide()
        } else {
          Modal.alert('', MSG)
        }
      })
      .catch(error => {
        Modal.alert('', error.message)
      })
  }
}

export const mobileCheck = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('验证中', 0)

    Request.get(URL_RESET_PASSWORD_MOBILE_CHECK, {params: data})
      .then(response => {
        const { COD, MSG } = response.data
        if (COD === 'SUC') {
          dispatch({ type: ACTION_RESET_PASSWORD_MOBILE_CHECK_SUC })
          Toast.hide()
        } else {
          Modal.alert('', MSG)
        }
      })
      .catch(error => {
        Modal.alert('', error.message)
      })
  }
}

export const mobileCheckReset = (): Action => {
  return {
    type: ACTION_RESET_PASSWORD_MOBILE_CHECK_RESET,
  }
}
