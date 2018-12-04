/** @flow */
import type {ActionAsync} from "../../common/Constants"
import Request from "axios/index"
import {Modal, Toast} from "antd-mobile-rn"
import qs from "qs"
import {
  ACTION_MEMORY_FETCH,
  ACTION_MEMORY_UPDATE,
  URL_MEMORY_ADD,
  URL_MEMORY_DEL,
  URL_MEMORY_LIST,
  URL_MEMORY_MOD
} from "../Constants"
import type {Mememory} from "../interface/Mememory"


export const fetch = (data: Mememory): ActionAsync => {
  return (dispatch) => {
    Toast.loading('加载中', 0)

    Request.post(URL_MEMORY_LIST, qs.stringify(data)).then(response => {
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_MEMORY_FETCH, payload: RTNDTA})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const add = (data: Mememory): ActionAsync => {
  return (dispatch) => {
    Toast.loading('提交中', 0)

    Request.post(URL_MEMORY_ADD, qs.stringify(data)).then(response => {
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_MEMORY_UPDATE, payload: RTNDTA})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const mod = (data: Mememory): ActionAsync => {
  return (dispatch) => {
    Toast.loading('提交中', 0)

    Request.post(URL_MEMORY_MOD, qs.stringify(data)).then(response => {
      const {RTNCOD, RTNDTA, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_MEMORY_UPDATE, payload: RTNDTA})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const del = (data: Mememory): ActionAsync => {
  return (dispatch) => {
    Toast.loading('提交中', 0)

    Request.post(URL_MEMORY_DEL, qs.stringify(data)).then(response => {
      const {RTNCOD, ERRMSG} = response.data
      if (RTNCOD === 'SUC') {
        dispatch({type: ACTION_MEMORY_UPDATE, payload: {}})
        Toast.hide()
      } else {
        Modal.alert('', ERRMSG)
      }
    }).catch(error => Modal.alert('', error.message))
  }
}

export const compare = (a: Mememory, b: Mememory) => {
  if (a.mmroccdat > b.mmroccdat) return -1
  if (a.mmroccdat < b.mmroccdat) return 1
  return 0
}