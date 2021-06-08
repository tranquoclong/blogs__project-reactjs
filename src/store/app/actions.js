export const ACT_SET_LANG = 'ACT_SET_LANG';

export const actSetLang = (lang) => {
  return {
    type: ACT_SET_LANG,
    payload: {
      lang
    }
  }
}