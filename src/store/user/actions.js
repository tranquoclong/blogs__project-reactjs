import { UserService } from "../../services/user";
import { actSetToken } from "../auth/actions";

export const ACT_GET_ME = 'ACT_GET_ME';
export const ACT_CHANGE_PASSWORD = 'ACT_CHANGE_PASSWORD'

export function actGetMe(currentUser) {
  return {
    type: ACT_GET_ME,
    payload: {
      currentUser
    }
  }
}

export function actChangePassword({
  password,
  new_password,
  confirm_new_password
}) {
  return {
    type: ACT_CHANGE_PASSWORD,
    payload: {
      password,
      new_password,
      confirm_new_password
    }
  }
}

export function actGetMeAsync() {
  return async dispatch => {
    try {
      const response = await UserService.getMeInfo();

      dispatch(actGetMe(response.data));
    } catch (e) {
      dispatch(actSetToken(''));
      localStorage.removeItem('access_token', '');
    }
  }
}

export function actChangePasswordAsync({
  password,
  new_password,
  confirm_new_password
}) {
  return async dispatch => {
    try {
      const response = await UserService.changePassword({
        password,
        new_password,
        confirm_new_password
      })
      console.log("response", response)
      return {
        ok: true
      }
    } catch(err) {
      const errRes = err.response
      const mapError = {
        default: 'Có lỗi xảy ra, vui lòng thử lại sau!',
        rest_user_invalid_password: 'Mật khẩu cũ không đúng',
        rest_user_invalid_new_password: 'Mật khẩu mới không được trùng với mật khẩu cũ',
      }

      if (errRes.data && errRes.data.code && mapError[errRes.data.code]) {
        return {
          ok: false,
          message: mapError[errRes.data.code]
        }
      }

      return {
        ok: false,
        message: mapError.default
      }
    }
  }
}