/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import qs from "qs"
import md5 from "crypto-js/md5"
import type {ActionAsync} from "../../Constants"
import {ACTION_REGISTER_SUC, URL_REGISTER} from "../../Constants"
import type {Syusrinf} from "../../interface/Syusrinf"


export const register = (data: Syusrinf): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('注册中', 0)
    data.suipaswrd = md5(data.suipaswrd).toString().toUpperCase()

    Request.post(URL_REGISTER, qs.stringify(data))
      .then(response => {
        const {RTNCOD, ERRMSG} = response.data
        if (RTNCOD === 'SUC') {
          dispatch({type: ACTION_REGISTER_SUC})
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
