/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import {Linking} from "react-native"
import React from "react"
import Request from "axios/index"
import type {ActionAsync} from "../../../common/Constants"
import {APP_VERSION} from "../../../common/Constants"
import type {Version} from "../../interface/Version"
import {ACTION_ABOUT_VERSION, URL_APP_VERSION} from "../../Constants"


export const linkingFunc = (url: string) => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url)
    }
  }).catch(err => Toast.fail(err, 1))
}

export const isVersionIncrease = (oldVersion: string = '', newVersion: string = ''): boolean => {
  const oldVersions = oldVersion.split('.')
  const newVersions = newVersion.split('.')
  return parseInt(oldVersions[0]) < parseInt(newVersions[0])
    || parseInt(oldVersions[1]) < parseInt(newVersions[1])
    || parseInt(oldVersions[2]) < parseInt(newVersions[2])
}

const message = (response: Version) => {
  return '新版本：' + response.newVersion
    + '\n更新说明：\n'
    + response.updateDescription.split('。').join('\n')
}

const forceUpdateIos = (response: Version) => {
  Modal.alert('更新提示', message(response), [
    {text: '更新', onPress: () => linkingFunc(response.updateUrl)}
  ])
}

const unForceUpdateIos = (response: Version) => {
  Modal.alert('更新提示', message(response), [
    {text: '暂不更新'},
    {text: '更新', onPress: () => linkingFunc(response.updateUrl)}
  ])
}

export const requestVersion = (): ActionAsync => {
  return (dispatch, getState) => {

    Request.post(URL_APP_VERSION).then(res => {

      const {RTNCOD, RTNDTA, ERRMSG} = res.data
      if (RTNCOD !== 'SUC') {
        Modal.alert('', ERRMSG)
        return
      }

      const {APP_NAME, APP_NEW_VERSION, APP_MIN_VERSION, APP_PRIVACY_URL, APP_RATE_URL, APP_UPDATE_URL, APP_UPDATE_DESCRIPTION} = RTNDTA
      let response: Version = {
        appName: APP_NAME,
        newVersion: APP_NEW_VERSION,
        minVersion: APP_MIN_VERSION,
        privacyUrl: APP_PRIVACY_URL,
        rateUrl: APP_RATE_URL,
        updateUrl: APP_UPDATE_URL,
        updateDescription: APP_UPDATE_DESCRIPTION,
      }
      let reducer: Version = getState().my.about.version

      if (isVersionIncrease(APP_VERSION, response.minVersion)) {
        forceUpdateIos(response)
      } else if (reducer.newVersion && reducer.newVersion.length === 0 && isVersionIncrease(APP_VERSION, response.newVersion)
        || isVersionIncrease(reducer.newVersion, response.newVersion)) {
        unForceUpdateIos(response)
      }

      dispatch({type: ACTION_ABOUT_VERSION, payload: response})

    }).catch(error => Modal.alert('', error.message))
  }
}
