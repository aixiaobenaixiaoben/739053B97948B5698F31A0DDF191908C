/** @flow */
import axios from "axios/index"

import {ACTION_DETAIL_CLEAR, ACTION_DETAIL_REQUEST, ACTION_DETAIL_WATCHED, ACTION_DETAIL_WISH} from "../Constants"


export type Action = {
  type: string,
  id: string,
}

export type ActionAsync = (dispatch: Function) => void

export const requestMovie = (id: string): ActionAsync => {
  return (dispatch) => {

    dispatch({ type: ACTION_DETAIL_CLEAR });

    axios.get('http://api.douban.com/v2/movie/subject/' + id + '?apikey=0b2bdeda43b5688921839c8ecb20399b&city=上海')
      .then(response => {
        dispatch({
          type: ACTION_DETAIL_REQUEST,
          movie: response.data
        });
      })
      .catch(error => {
        alert(error.message);
      });
  };
};

export const toggleWatched = (id: string): Action => {
  return {
    type: ACTION_DETAIL_WATCHED,
    id: id,
  }
};

export const toggleWish = (id: string): Action => {
  return {
    type: ACTION_DETAIL_WISH,
    id: id,
  }
};