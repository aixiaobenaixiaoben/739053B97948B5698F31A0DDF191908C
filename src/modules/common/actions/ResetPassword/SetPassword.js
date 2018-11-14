/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import md5 from "crypto-js/md5"
import type {ActionAsync} from "../../Constants"
import {ACTION_LOGIN_UPDATE, ACTION_RESET_PASSWORD_SUC, URL_RESET_PASSWORD} from "../../Constants"
import type {Syusrinf} from "../../interface/Syusrinf"


export const resetPassword = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('重置密码', 0)
    let param: Syusrinf = {
      suiseqcod: data.suiseqcod,
      suipaswrd: md5(data.suipaswrd).toString().toUpperCase(),
      suiverson: data.suiverson,
    }

    Request.post(URL_RESET_PASSWORD, qs.stringify(param))
      .then(response => {
        const {RTNCOD, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_RESET_PASSWORD_SUC})
          dispatch({type: ACTION_LOGIN_UPDATE, payload: {suiseqcod: ''}})
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
