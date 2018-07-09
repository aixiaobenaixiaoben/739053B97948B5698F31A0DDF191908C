/** @flow */
import {handleActions} from "redux-actions"
import {LOGIN, LOGOUT} from "../../Constants"


type State = {
  isLogin: boolean,
  loginID: string,
}

const initialState: State = {
  isLogin: false,
  loginID: '',
};

export default handleActions(
  {
    [LOGIN]: (state: State, action) => {
      return {
        ...state,
        isLogin: true,
        loginID: '000****0000',
      };

    },
    [LOGOUT]: (state: State, action) => {
      return {
        ...state,
        isLogin: false,
        // loginID: '',
      };

    },
  },
  initialState);
