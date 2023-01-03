import { createI18n } from 'vue-i18n'
import viLocale from '@/lang/vi.js'
import enLocale from '@/lang/en.js'
import Cookies from 'js-cookie'

const messages = {
  en: { ...enLocale },
  vi: { ...viLocale },
}

export function getLanguage() {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) {
    return chooseLanguage
  } else return 'vi'
}

const i18n = createI18n({
  locale: getLanguage(),
  messages,
  globalInjection: true,
  fallbackLocale: 'vi',
  legacy: false
})

export default i18n
