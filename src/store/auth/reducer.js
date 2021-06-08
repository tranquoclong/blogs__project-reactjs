import { ACT_LOGIN, ACT_SET_TOKEN, ACT_LOGOUT } from './actions';
import { ACT_GET_ME } from '../user/actions';

const initAuthState = {
  token: '',
  currentUser: null
}

export default function reducer(state = initAuthState, action) {
  switch (action.type) {
    case ACT_LOGIN:
      return state;
    case ACT_GET_ME:
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    case ACT_SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      }
    case ACT_LOGOUT:
      localStorage.removeItem('access_token')
      return {
        ...state,
        token: '',
        currentUser: null
      }
    default:
      return state;
  }

  
}