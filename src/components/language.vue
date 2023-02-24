<template>
	<el-dropdown
		class="cursor-pointer flex w-24"
		trigger="click"
		placement="bottom-start"
	>
		<div class="img_lang flex items-center">
			<BaseButton
				class-extra="btn-menu-tab btn-menu-tab_language"
				class-custom=""
				:text="languageActive.name"
			>
			</BaseButton>
			<img class="image-language" :src="languageActive.icon" alt="" />
		</div>
		<template #dropdown>
			<el-dropdown-menu class="dropdown-language">
				<el-dropdown-item
					v-for="(language, index) in listLanguage"
					:key="index"
					:command="index"
				>
					<div
						class="select-language flex"
						@click="changeLanguage(language)"
					>
						<img :src="language.icon" alt="" />
						<div class="language-name pl-2.5">
							{{ language.name }}
						</div>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup>
	import i18n from '@/lang'
	import { useI18n } from 'vue-i18n'
	import appStore from '@/store/app'
	import Cookies from 'js-cookie'
	import { LST_LANGUAGE, LANGUAGE_DEFAULT } from '@/constants'
	import { getImg } from '@/utils/utils'
	import { getLanguage } from '@/utils/language'

	const { locale } = useI18n()
	// data
	const listLanguage = LST_LANGUAGE
	const languageActive = ref({
		id: 2,
		name: 'Vietnam',
		icon: getImg('vietnam.svg'),
	})
	// mounted
	onMounted(() => {
		const dataLanguage = getLanguage() || LANGUAGE_DEFAULT
		languageActive.value = listLanguage.find(
			(item) => item.lang === dataLanguage
		)
		if (!languageActive.value) {
			languageActive.value = listLanguage.find(
				(item) => item.lang === LANGUAGE_DEFAULT
			)
		}
		appStore().setLanguage(dataLanguage)
	})
	// methods
	const changeLanguage = (language) => {
		if (i18n.global.locale.value !== language.lang) {
			i18n.global.locale.value = language.lang
			languageActive.value = language
			appStore().setLanguage(language.lang)
			locale.value = language.lang
			Cookies.set('language', language.lang)
		}
	}
</script>
