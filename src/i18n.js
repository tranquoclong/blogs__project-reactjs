import { i18n } from '@lingui/core';
import { en, vi, fr, zh } from 'make-plural/plurals'
import { messages as messagesVi } from './locales/vi/messages.js'
import { messages as messagesZh } from './locales/zh/messages.js'
import { messages as messagesEn } from './locales/en/messages.js'
import { messages as messagesFr } from './locales/fr/messages.js'

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
  fr: "Français",
  zh: "中国人"
};
export const defaultLocale = localStorage.getItem('lang') || 'vi';

i18n.loadLocaleData({
  en: { plurals: en },
  vi: { plurals: vi },
  fr: { plurals: fr },
  zh: { plurals: zh },
})

const hashMessagesByLocale = {
  vi: messagesVi,
  zh: messagesZh,
  en: messagesEn,
  fr: messagesFr,
}

/**
* We do a dynamic import of just the catalog that we need
* @param locale any locale string
*/
export async function dynamicActivate(locale) {
  i18n.load(locale, hashMessagesByLocale[locale])
  i18n.activate(locale)
}
