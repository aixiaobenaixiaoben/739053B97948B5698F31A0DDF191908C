/** @flow */
import React from 'react'
import {StatusBar} from "react-native"
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"
import Request from "axios/index"

import createStore from './createStore'
import Root from "./Route"


Request.defaults.baseURL = 'https://forfreedomandlove.com/snow/'

Request.interceptors.request.use(
  function (config) {
    config.url += '.action'
    return config
  }, function (error) {
    return Promise.reject(error)
  })

Request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.message.indexOf('Network Error') !== -1) {
      error.message = '网络错误'
    }
    return Promise.reject(error)
  }
)

const {store, persistor} = createStore()

const Main = () => {

  StatusBar.setBarStyle('light-content')

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root screenProps={{store}}/>
      </PersistGate>
    </Provider>
  )
}

export default Main


