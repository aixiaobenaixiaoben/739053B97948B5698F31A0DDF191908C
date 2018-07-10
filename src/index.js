/** @flow */
import React from 'react'
import {Provider} from 'react-redux'
import {PersistGate} from "redux-persist/integration/react"
import Request from "axios/index"

import createStore from './createStore'
import Root from "./Route"


Request.defaults.baseURL = 'http://localhost:3000'
Request.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.message.indexOf('Network Error') !== -1) {
      error.message = '网络错误'
    }
    return Promise.reject(error);
  }
)

const { store, persistor } = createStore();

const Main = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Root/>
      </PersistGate>
    </Provider>
  )
};

export default Main


