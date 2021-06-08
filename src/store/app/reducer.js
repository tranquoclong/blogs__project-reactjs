import { ACT_SET_LANG } from './actions';
import { defaultLocale } from '../../i18n';

const initState = {
  lang: defaultLocale
}

export default function appReducer(state = initState, action) {
  if (action.type === ACT_SET_LANG) {
    localStorage.setItem('lang', action.payload.lang);
    return {
      ...state,
      lang: action.payload.lang
    }
  }
  return state
}