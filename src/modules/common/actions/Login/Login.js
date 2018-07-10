/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import Request from "axios/index"
import {ACTION_LOGIN, ACTION_LOGOUT, URL_LOGIN} from "../../Constants"


export type Action = {
  type: string,
}

export type ActionAsync = (dispatch: Function, getState: Function) => void

export const login = (data): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('登录中', 0)

    Request.get(URL_LOGIN, {params: data})
      .then(response => {
        const { COD, MSG } = response.data
        if (COD === 'SUC') {
          dispatch({ type: ACTION_LOGIN, payload: data })
          Toast.hide()
        } else {
          Modal.alert('', MSG)
        }
      })
      .catch(error => {
        Modal.alert('', error.message)
      })
  }
};

export const logout = (): Action => {
  return {
    type: ACTION_LOGOUT,
  }
};
