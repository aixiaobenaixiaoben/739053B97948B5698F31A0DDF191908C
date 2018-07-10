/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import type {Action, ActionAsync} from "../../Constants"
import {ACTION_REGISTER_RESET, ACTION_REGISTER_SUC, URL_REGISTER} from "../../Constants"


export const register = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('注册中', 0)

    Request.get(URL_REGISTER, {params: data})
      .then(response => {
        const { COD, MSG } = response.data
        if (COD === 'SUC') {
          dispatch({ type: ACTION_REGISTER_SUC })
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

export const registerReset = (): Action => {
  return {
    type: ACTION_REGISTER_RESET,
  }
}
