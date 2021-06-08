import { api } from '.';

export const UserService = {
  getMeInfo() {
    return api.callWithAuth().post('/wp/v2/users/me')
  },
  changePassword({
    password,
    new_password,
    confirm_new_password
  }) {
    return api.callWithAuth().put('/wp/v2/users/password', {
      password,
      new_password,
      confirm_new_password
    })
  }
}