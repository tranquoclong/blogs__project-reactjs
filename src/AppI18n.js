import App from './App';
import { useEffect } from 'react';
import { dynamicActivate } from './i18n';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useSelector } from 'react-redux';

const I18nApp = () => {
  const lang = useSelector(state => state.App.lang);

  useEffect(() => {
    dynamicActivate(lang)
  }, [lang])

  return (
    <I18nProvider i18n={i18n}>
      <App  />
    </I18nProvider>
  )
}

export default I18nApp;