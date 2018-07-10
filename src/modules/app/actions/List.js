/** @flow */
import axios from "axios/index"

import {ACTION_LIST_REQUEST} from "../Constants"


export type ActionAsync = (dispatch: Function) => void

export const requestList = (): ActionAsync => {
  return (dispatch) => {

    axios.get('https://api.douban.com/v2/movie/in_theaters?apikey=0b2bdeda43b5688921839c8ecb20399b&city=上海')
      .then(response => {
        dispatch({
          type: ACTION_LIST_REQUEST,
          movies: response.data
        });
      })
      .catch(error => {
        alert(error.message);
      });
  };
};
