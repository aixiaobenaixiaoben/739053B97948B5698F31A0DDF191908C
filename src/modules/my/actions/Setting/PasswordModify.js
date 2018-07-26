/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import {
  ACTION_PASSWORD_MODIFY_CHECK_RESET,
  ACTION_PASSWORD_MODIFY_CHECK_SUC,
  ACTION_PASSWORD_MODIFY_RESET,
  ACTION_PASSWORD_MODIFY_SUC,
  URL_PASSWORD_MODIFY,
  URL_PASSWORD_MODIFY_CHECK,
} from "../../Constants"
import type {Action, ActionAsync} from "../../../common/Constants"


export const passwordModifyCheck = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('验证中', 0)

    Request.get(URL_PASSWORD_MODIFY_CHECK, {params: data})
      .then(response => {
        const {COD, MSG} = response.data
        if (COD === 'SUC') {
          dispatch({type: ACTION_PASSWORD_MODIFY_CHECK_SUC})
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

export const passwordModifyCheckReset = (): Action => {
  return {
    type: ACTION_PASSWORD_MODIFY_CHECK_RESET,
  }
}

export const passwordModify = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('提交中', 0)

    Request.get(URL_PASSWORD_MODIFY, {params: data})
      .then(response => {
        const {COD, MSG} = response.data
        if (COD === 'SUC') {
          dispatch({type: ACTION_PASSWORD_MODIFY_SUC})
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

export const passwordModifyReset = (): Action => {
  return {
    type: ACTION_PASSWORD_MODIFY_RESET,
  }
}


