/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import type {ActionAsync} from "../../../common/Constants"
import {ACTION_PROFILE_UPDATE, URL_PROFILE, URL_PROFILE_UPDATE} from "../../Constants"
import type {Syprofil} from "../../interface/Syprofil"
import type {Syusrinf} from "../../../common/interface/Syusrinf"


export const profile = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('加载中', 0)

    Request.post(URL_PROFILE, qs.stringify(data))
      .then(response => {
        const {RTNCOD, RTNDTA, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_PROFILE_UPDATE, payload: RTNDTA})
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

export const updateProfile = (data: Syprofil): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('更新中', 0)

    Request.post(URL_PROFILE_UPDATE, qs.stringify(data))
      .then(response => {
        const {RTNCOD, RTNDTA, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_PROFILE_UPDATE, payload: RTNDTA})
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
