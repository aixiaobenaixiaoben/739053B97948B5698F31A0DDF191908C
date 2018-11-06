/** @flow */
import RNFetchBlob from "rn-fetch-blob"
import Request from "axios/index"
import type {ActionAsync} from "../Constants"
import {ACTION_CACHE_CLEAR, ACTION_CACHE_COUNT, URL_DOWNLOAD, URL_UPLOAD} from "../Constants"
import {ACTION_PROFILE_PATH_CLEAR} from "../../my/Constants"
import {Toast} from "antd-mobile-rn"


export const download = (action: string, fileName: string): ActionAsync => {
  return (dispatch, getState) => {

    let path = RNFetchBlob.fs.dirs.DocumentDir + '/cache/' + fileName

    RNFetchBlob.fs.exists(path).then((exist) => {
      if (exist) {
        dispatch({type: action, payload: path})

      } else {
        RNFetchBlob
          .config({path: path})
          .fetch('POST', Request.defaults.baseURL + URL_DOWNLOAD + '?remote=' + fileName)
          .then((response) => {
            if (response.respInfo.respType === 'blob') {
              dispatch({type: action, payload: response.path()})
            } else {
              Toast.fail('下载失败', 1, null, false)
            }
          })
      }
    })
  }
}

export const upload = (action: string, path: string, fileName = '.JPG', MIMEType = 'image/jpeg'): ActionAsync => {
  return (dispatch, getState) => {
    Toast.loading('上传中', 0)

    RNFetchBlob.fs.exists(path).then((exist) => {
      if (!exist) {
        Toast.fail('文件不存在', 1, null, false)

      } else {
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
              let toPath = RNFetchBlob.fs.dirs.DocumentDir + '/cache/' + RTNDTA
              RNFetchBlob.fs.mv(path, toPath)
              dispatch({type: action, payload: RTNDTA})
              Toast.hide()

            } else {
              Toast.fail(ERRMSG, 1, null, false)
            }
          })
          .catch((error) => {
            Toast.fail(error.message, 1, null, false)
          })
      }
    })
  }
}

export const cacheClear = (): ActionAsync => {
  return (dispatch, getState) => {

    Toast.loading('清理中', 0)
    let path = RNFetchBlob.fs.dirs.DocumentDir + '/cache/'

    RNFetchBlob.fs.unlink(path)
      .then(() => {
        dispatch({type: ACTION_CACHE_CLEAR})
        Toast.success('清理完成', 2, null, false)

        /** reDownload image */
        dispatch({type: ACTION_PROFILE_PATH_CLEAR})
      })
      .catch((error) => {
        Toast.fail(error.message, 1, null, false)
      })
  }
}

export const cacheCount = (): ActionAsync => {
  return (dispatch, getState) => {
    let path = RNFetchBlob.fs.dirs.DocumentDir + '/cache/'
    RNFetchBlob.fs.lstat(path).then((stats) => {
      let count = 0
      let len = stats.length
      for (let i = 0; i < len; i++) {
        count += parseInt(stats[i].size)
      }
      dispatch({type: ACTION_CACHE_COUNT, payload: count})
    })
  }
}

export const cacheSync = (action: string, fileName: string): ActionAsync => {
  return (dispatch, getState) => {
    let path = RNFetchBlob.fs.dirs.DocumentDir + '/cache/' + fileName
    RNFetchBlob.fs.exists(path).then((exist) => {
      if (!exist) {
        dispatch({type: action})
      }
    })
  }
}