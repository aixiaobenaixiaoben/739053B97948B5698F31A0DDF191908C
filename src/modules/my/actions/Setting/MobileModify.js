/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import type {Action, ActionAsync} from "../../../common/Constants"
import {ACTION_LOGIN_UPDATE, DURATION_MOBILE_CODE_EXPIRED} from "../../../common/Constants"
import {
  ACTION_MOBILE_MODIFY_COUNT,
  ACTION_MOBILE_MODIFY_RESET,
  ACTION_MOBILE_MODIFY_SEND,
  URL_MOBILE_MODIFY,
  URL_MOBILE_MODIFY_SEND
} from "../../Constants"
import type {Syusrinf} from "../../../common/interface/Syusrinf"
import type {Syvrymbl} from "../../../common/interface/Syvrymbl"


export const mobileModifySend = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('发送中', 0)

    Request.post(URL_MOBILE_MODIFY_SEND, qs.stringify(data))
      .then(response => {
        const {RTNCOD, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_MOBILE_MODIFY_SEND, payload: data})
          Toast.hide()

          let count = DURATION_MOBILE_CODE_EXPIRED
          let timer = setInterval(() => {
            dispatch({type: ACTION_MOBILE_MODIFY_COUNT})
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

export const mobileModify = (syusrinf: Syusrinf, syvrymbl: Syvrymbl): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('验证中', 0)
    let param = {
      suiverson: syusrinf.suiverson,
      suimobile: syvrymbl.svmmobile,
      svmmobile: syvrymbl.svmmobile,
      svmvrycod: syvrymbl.svmvrycod,
    }

    Request.post(URL_MOBILE_MODIFY, qs.stringify(param))
      .then(response => {
        const {RTNCOD, RTNDTA, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          RTNDTA.suipaswrd = syusrinf.suipaswrd
          dispatch({type: ACTION_LOGIN_UPDATE, payload: RTNDTA})
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

export const mobileModifyReset = (): Action => {
  return {
    type: ACTION_MOBILE_MODIFY_RESET,
  }
}
