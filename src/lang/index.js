import { createI18n } from 'vue-i18n'
import viLocale from '@/lang/vi.js'
import enLocale from '@/lang/en.js'
import Cookies from 'js-cookie'
import { LANGUAGE_DEFAULT } from '@/constants'

const messages = {
	en: { ...enLocale },
	vi: { ...viLocale },
}

export function getLanguage() {
	const chooseLanguage = Cookies.get('language')
	if (chooseLanguage) {
		return chooseLanguage
	} else return LANGUAGE_DEFAULT
}

const i18n = createI18n({
	locale: getLanguage(),
	messages,
	globalInjection: true,
	fallbackLocale: LANGUAGE_DEFAULT,
	legacy: false,
})

export default i18n
