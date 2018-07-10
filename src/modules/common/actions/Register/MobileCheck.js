/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import type {Action, ActionAsync} from "../../Constants"
import {
  ACTION_RESET_VERIFY_CODE,
  ACTION_SET_VERIFY_CODE,
  ACTION_VERIFY_CODE_SUC,
  URL_SEND_VERIFY_CODE,
  URL_VERIFY_CODE
} from "../../Constants"


export const sendVerifyCode = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('发送中', 0)

    Request.get(URL_SEND_VERIFY_CODE, {params: data})
      .then(response => {
        const { COD, DTA, MSG } = response.data
        if (COD === 'SUC') {
          dispatch({ type: ACTION_SET_VERIFY_CODE, payload: DTA })
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

export const verifyCode = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('验证中', 0)

    Request.get(URL_VERIFY_CODE, {params: data})
      .then(response => {
        const { COD, MSG } = response.data
        if (COD === 'SUC') {
          dispatch({ type: ACTION_VERIFY_CODE_SUC })
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

export const resetVerifyCode = (): Action => {
  return {
    type: ACTION_RESET_VERIFY_CODE,
  }
}
