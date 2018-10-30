/** @flow */
import RNFetchBlob from "rn-fetch-blob"
import Request from "axios/index"
import type {ActionAsync} from "../Constants"
import {ACTION_CACHE_CLEAR, FTP_CODE_FAIL, FTP_CODE_SUC, URL_DOWNLOAD, URL_UPLOAD} from "../Constants"
import {ACTION_PROFILE_PATH_CLEAR} from "../../my/Constants"


export const download = (action: string, fileName: string): ActionAsync => {
  return (dispatch, getState) => {

    let path = RNFetchBlob.fs.dirs.DocumentDir + '/cache/' + fileName

    RNFetchBlob.fs.exists(path).then((exist) => {
      if (exist) {
        dispatch({type: action, payload: {CODE: FTP_CODE_SUC, INFO: path}})

      } else {
        RNFetchBlob
          .config({path: path})
          .fetch('POST', Request.defaults.baseURL + URL_DOWNLOAD + '?remote=' + fileName)
          .then((response) => {
            if (response.respInfo.respType === 'blob') {
              dispatch({type: action, payload: {CODE: FTP_CODE_SUC, INFO: response.path()}})
            } else {
              dispatch({type: action, payload: {CODE: FTP_CODE_FAIL}})
            }
          })
      }
    })
  }
}

export const upload = (action: string, path: string, MIMEType: string): ActionAsync => {
  return (dispatch, getState) => {

    RNFetchBlob.fs.exists(path).then((exist) => {
      if (!exist) {
        dispatch({type: action, payload: {CODE: FTP_CODE_FAIL, INFO: 'FILE NOT FOUND'}})

      } else {
        let fileName = path.substring(path.lastIndexOf('/') + 1)

        RNFetchBlob
          .fetch('POST', Request.defaults.baseURL + URL_UPLOAD, {'Content-Type': 'multipart/form-data'}, [{
            name: 'FILE',
            filename: fileName,//'.JPG'
            type: MIMEType,//'image/jpeg'
            data: RNFetchBlob.wrap(path)
          }])
          .then((response) => {
            const {RTNCOD, RTNDTA, ERRMSG} = JSON.parse(response.data)
            if (RTNCOD === 'SUC') {
              dispatch({type: action, payload: {CODE: FTP_CODE_SUC, INFO: RTNDTA}})

            } else {
              dispatch({type: action, payload: {CODE: FTP_CODE_FAIL, INFO: ERRMSG}})
            }
          })
          .catch((error) => {
            dispatch({type: action, payload: {CODE: FTP_CODE_FAIL, INFO: error.message}})
          })
      }
    })
  }
}

export const cacheClear = (): ActionAsync => {
  return (dispatch, getState) => {

    let path = RNFetchBlob.fs.dirs.DocumentDir + '/cache/'

    RNFetchBlob.fs.unlink(path)
      .then(() => {
        dispatch({type: ACTION_CACHE_CLEAR, payload: {CODE: FTP_CODE_SUC}})

        /** reDownload image */
        dispatch({type: ACTION_PROFILE_PATH_CLEAR})
      })
      .catch((error) => {
        dispatch({type: ACTION_CACHE_CLEAR, payload: {CODE: FTP_CODE_FAIL, INFO: error.message}})
      })
  }
}
