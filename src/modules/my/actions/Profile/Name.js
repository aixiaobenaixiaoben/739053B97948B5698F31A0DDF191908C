/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import type {ActionAsync} from "../../../common/Constants"
import {ACTION_LOGIN_UPDATE, URL_UPDATE_USER_INFO} from "../../../common/Constants"
import type {Syusrinf} from "../../../common/interface/Syusrinf"


export const usernameModify = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {
    Toast.loading('更新中', 0)
    let user = getState().common.login.user
    let param: Syusrinf = {
      suiseqcod: user.suiseqcod,
      suiverson: user.suiverson,
      ...data,
    }
    Request.post(URL_UPDATE_USER_INFO, qs.stringify(param))
      .then(response => {
        const {RTNCOD, RTNDTA, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          RTNDTA.suipaswrd = user.suipaswrd
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