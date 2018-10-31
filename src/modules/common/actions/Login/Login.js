/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import md5 from "crypto-js/md5"
import qs from "qs"
import type {ActionAsync} from "../../Constants"
import {ACTION_LOGIN, ACTION_LOGOUT, URL_LOGIN, URL_LOGOUT} from "../../Constants"
import type {Syusrinf} from "../../interface/Syusrinf"
import {ACTION_PROFILE_INIT} from "../../../my/Constants"


export const login = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('登录中', 0)
    let param: Syusrinf = {
      //TODO
      language: 'ZH-CN',
      suimobile: data.suimobile,
      suipaswrd: data.suipaswrd.length === 32 ? data.suipaswrd : md5(data.suipaswrd).toString().toUpperCase(),
    }

    Request.post(URL_LOGIN, qs.stringify(param))
      .then(response => {
        const {RTNCOD, RTNDTA, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          RTNDTA.suipaswrd = param.suipaswrd
          dispatch({type: ACTION_LOGIN, payload: RTNDTA})
          dispatch({type: ACTION_PROFILE_INIT, payload: RTNDTA.suiseqcod})
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

export const logout = (): ActionAsync => {
  return (dispatch, getState) => {
    dispatch({type: ACTION_LOGOUT})
    Request.post(URL_LOGOUT)
  }
}
