/** @flow */
import type {ActionAsync} from "../../common/Constants"
import {ACTION_EVENT_FETCH, ACTION_EVENT_FRESH, URL_EVENT_ADD, URL_EVENT_DEL, URL_EVENT_LIST} from "../Constants"
import Request from "axios/index"
import {Modal, Toast} from "antd-mobile-rn/lib/index.native"
import qs from "qs"
import type {Fueventt} from "../interface/Fueventt"


export const fetch = (): ActionAsync => {
  return (dispatch) => {
    Request.post(URL_EVENT_LIST).then(response => {
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_EVENT_FETCH, payload: RTNDTA})
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const add = (data: Fueventt): ActionAsync => {
  return (dispatch) => {
    Toast.loading('提交中', 0)

    Request.post(URL_EVENT_ADD, qs.stringify(data)).then(response => {
      const {RTNCOD, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_EVENT_FRESH})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const del = (data: Fueventt): ActionAsync => {
  return (dispatch) => {
    Toast.loading('提交中', 0)

    Request.post(URL_EVENT_DEL, qs.stringify(data)).then(response => {
      const {RTNCOD, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_EVENT_FRESH})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}