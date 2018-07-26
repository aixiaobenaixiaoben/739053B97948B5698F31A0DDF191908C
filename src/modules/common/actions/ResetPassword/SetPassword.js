/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import type {Action, ActionAsync} from "../../Constants"
import {ACTION_RESET_PASSWORD_RESET, ACTION_RESET_PASSWORD_SUC, URL_RESET_PASSWORD} from "../../Constants"


export const resetPassword = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('重置密码', 0)

    Request.get(URL_RESET_PASSWORD, {params: data})
      .then(response => {
        const {COD, MSG} = response.data
        if (COD === 'SUC') {
          dispatch({type: ACTION_RESET_PASSWORD_SUC})
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

export const resetPasswordReset = (): Action => {
  return {
    type: ACTION_RESET_PASSWORD_RESET,
  }
}
