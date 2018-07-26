/** @flow */
import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {persistReducer, persistStore} from "redux-persist"
import {AsyncStorage} from "react-native"

import {common, my} from './modules'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const middleware = applyMiddleware(thunk)

export default (data: Object = {}) => {
  const rootReducer = combineReducers({
    [common.NAME]: common.reducer,
    [my.NAME]: my.reducer,
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)
  let store = createStore(persistedReducer, data, middleware)
  let persistor = persistStore(store)
  return {store, persistor}
}