/** @flow */
import type {ActionAsync} from "../../common/Constants"
import {
  ACTION_EVENT_FETCH,
  ACTION_EVENT_UPDATE,
  URL_EVENT_ADD,
  URL_EVENT_DEL,
  URL_EVENT_LIST,
  URL_EVENT_MOD
} from "../Constants"
import Request from "axios/index"
import {Modal, Toast} from "antd-mobile-rn/lib/index.native"
import qs from "qs"
import type {Fueventt} from "../interface/Fueventt"


export const fetch = (): ActionAsync => {
  return (dispatch) => {
    Toast.loading('加载中', 0)

    Request.post(URL_EVENT_LIST).then(response => {
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_EVENT_FETCH, payload: RTNDTA})
        Toast.hide()
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
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_EVENT_UPDATE, payload: RTNDTA})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const mod = (data: Fueventt): ActionAsync => {
  return (dispatch) => {
    Toast.loading('提交中', 0)

    Request.post(URL_EVENT_MOD, qs.stringify(data)).then(response => {
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_EVENT_UPDATE, payload: RTNDTA})
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
        dispatch({type: ACTION_EVENT_UPDATE, payload: {}})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const compare = (a: Fueventt, b: Fueventt) => {
  if (a.fetoccdat < b.fetoccdat) return -1
  if (a.fetoccdat > b.fetoccdat) return 1
  return 0
}