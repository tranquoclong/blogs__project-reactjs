import { api } from '.';

export const AuthService = {
  login: ({
    username,
    password
  }) => api.call().post(`/jwt-auth/v1/token`, {
    username,
    password
  })
}