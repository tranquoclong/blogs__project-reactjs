import { AuthService } from "../../services/auth";
import { actGetMeAsync } from "../user/actions";

// action type
export const ACT_LOGIN = 'ACT_LOGIN';
export const ACT_SET_TOKEN = 'ACT_SET_TOKEN';
export const ACT_LOGOUT = 'ACT_LOGOUT';

export function actLogout() {
  return {
    type: ACT_LOGOUT
  }
}
export function actLogin(value) {
  return {
    type: ACT_LOGIN,
    payload: {
      isLogin: value
    }
  }
}

export function actSetToken(token) {
  return {
    type: ACT_SET_TOKEN,
    payload: {
      token
    }
  }
}

export function actLoginAsync({
  username,
  password
}) {
  return async dispatch => {
    try {
      const response = await AuthService.login({
        username,
        password
      })
      const data = response.data;
      const token = data.token;

      localStorage.setItem('access_token', token)

      dispatch(actSetToken( token ));
      dispatch(actGetMeAsync());

      return {
        ok: true
      }
    } catch(e) {
      return {
        ok: false,
      }
    }
  }
}