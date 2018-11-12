/** @flow */
import {Modal, Toast} from "antd-mobile-rn"
import {Linking, StyleSheet, Text, View} from "react-native"
import React from "react"
import Request from "axios/index"
import type {ActionAsync} from "../../../common/Constants"
import {APP_VERSION} from "../../../common/Constants"
import type {Version} from "../../interface/Version"
import {COLOR_FONT_BLACK, COLOR_SYS} from "../../../../Style"
import {ACTION_ABOUT_VERSION, URL_APP_VERSION} from "../../Constants"
import Button from "../../../common/components/Button"


const style = StyleSheet.create({
  view: {
    paddingTop: 2,
  },
  text: {
    color: COLOR_FONT_BLACK,
  },
  emptyView: {
    width: 500,
  },
})

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

const messageForIos = (response: Object, isForce = false) => {
  const {updateDescription = '', updateUrl} = response
  return (
    <View style={style.view}>
      <Text style={style.text}>
        {'新版本：' + response.newVersion + '\n更新说明：\n' + updateDescription.split('。').join('\n')}
      </Text>
      <View style={style.emptyView}/>
      {isForce && <Button text='更新' onPress={() => linkingFunc(updateUrl)}/>}
    </View>
  )
}

const forceUpdateIos = (response: Object) => {
  Modal.alert('更新提示', messageForIos(response, true), [])
}

const unForceUpdateIos = (response: Object) => {
  Modal.alert('更新提示', messageForIos(response), [
    {text: '暂不更新'},
    {text: '更新', onPress: () => linkingFunc(response.updateUrl), style: {color: COLOR_SYS}}
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
      } else if (reducer.newVersion.length === 0 && isVersionIncrease(APP_VERSION, response.newVersion)
        || isVersionIncrease(reducer.newVersion, response.newVersion)) {
        unForceUpdateIos(response)
      }

      dispatch({type: ACTION_ABOUT_VERSION, payload: response})

    }).catch(error => Modal.alert('', error.message))
  }
}
