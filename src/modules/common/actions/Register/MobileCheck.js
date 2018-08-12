/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import type {Action, ActionAsync} from "../../Constants"
import {
  ACTION_REGISTER_MOBILE_CHECK_COUNT,
  ACTION_REGISTER_MOBILE_CHECK_RESET,
  ACTION_REGISTER_MOBILE_CHECK_SEND,
  ACTION_REGISTER_MOBILE_CHECK_SUC,
  DURATION_MOBILE_CODE_EXPIRED,
  URL_REGISTER_MOBILE_CHECK,
  URL_REGISTER_MOBILE_CHECK_SEND
} from "../../Constants"
import type {Syusrinf} from "../../interface/Syusrinf"
import type {Syvrymbl} from "../../interface/Syvrymbl"


export const mobileCheckSend = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('发送中', 0)

    Request.post(URL_REGISTER_MOBILE_CHECK_SEND, qs.stringify(data))
      .then(response => {
        const {RTNCOD, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_REGISTER_MOBILE_CHECK_SEND, payload: data})
          Toast.hide()

          let count = DURATION_MOBILE_CODE_EXPIRED
          let timer = setInterval(() => {
            dispatch({type: ACTION_REGISTER_MOBILE_CHECK_COUNT})
            count = count - 1
            if (count === 0) {
              clearInterval(timer)
            }
          }, 1000)

        } else {
          Modal.alert('', ERRMSG)
        }
      })
      .catch(error => {
        Modal.alert('', error.message)
      })
  }
}

export const mobileCheck = (data: Syvrymbl): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('验证中', 0)

    Request.post(URL_REGISTER_MOBILE_CHECK, qs.stringify(data))
      .then(response => {
        const {RTNCOD, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_REGISTER_MOBILE_CHECK_SUC})
          Toast.hide()
        } else {
          Modal.alert('', ERRMSG)
        }
      })
      .catch(error => {
        Modal.alert('', error.message)
      })
  }
}

export const mobileCheckReset = (): Action => {
  return {
    type: ACTION_REGISTER_MOBILE_CHECK_RESET,
  }
}
