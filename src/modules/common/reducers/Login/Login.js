/** @flow */
import {handleActions} from "redux-actions"
import {ACTION_LOGIN, ACTION_LOGOUT} from "../../Constants"


type State = {
  isLogin: boolean,
  loginID: string,
  mobile: string,
  password: string,
}

const initialState: State = {
  isLogin: false,
  loginID: '',
  mobile: '',
  password: '',
};

export default handleActions(
  {
    [ACTION_LOGIN]: (state: State, action) => {
      const { mobile, password } = action.payload
      return {
        ...state,
        isLogin: true,
        loginID: '00000000000',
        mobile,
        password,
      };

    },
    [ACTION_LOGOUT]: (state: State, action) => {
      return {
        ...state,
        isLogin: false,
        loginID: '',
        mobile: '',
        password: '',
      };

    },
  },
  initialState);
