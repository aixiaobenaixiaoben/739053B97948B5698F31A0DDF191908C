/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import md5 from "crypto-js/md5"
import {ACTION_PASSWORD_MODIFY_RESET, ACTION_PASSWORD_MODIFY_SUC, URL_PASSWORD_MODIFY,} from "../../Constants"
import type {Action, ActionAsync} from "../../../common/Constants"
import {ACTION_LOGIN_UPDATE} from "../../../common/Constants"
import type {Syusrinf} from "../../../common/interface/Syusrinf"


export const passwordModify = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('提交中', 0)
    let param: Syusrinf = {
      suiseqcod: data.suiseqcod,
      suipaswrd: data.suipaswrd,
      newpaswrd: md5(data.newpaswrd).toString().toUpperCase(),
      suiverson: data.suiverson,
    }

    Request.post(URL_PASSWORD_MODIFY, qs.stringify(param))
      .then(response => {
        const {RTNCOD, RTNDTA, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          RTNDTA.suipaswrd = param.newpaswrd
          dispatch({type: ACTION_PASSWORD_MODIFY_SUC})
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

export const passwordModifyReset = (): Action => {
  return {
    type: ACTION_PASSWORD_MODIFY_RESET,
  }
}


