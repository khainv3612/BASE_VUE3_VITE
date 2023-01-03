<template>
  <el-dropdown class='cursor-pointer flex lang_div' trigger='click' placement='bottom-start'>
            <span class='img_lang flex'>
              <img class='image-language' :src='languageActive.icon' alt=''>
              <img class='image-dropdown pl-1' src='@/assets/images/icons/arrow_down.svg' alt=''>
            </span>
    <template #dropdown>
      <el-dropdown-menu class='dropdown-language'>
        <el-dropdown-item v-for='(language, index) in listLanguage' :key='index' :command='index'>
          <div class='select-language flex' @click='changeLanguage(language)'>
            <img :src='language.icon' alt=''>
            <div class='language-name pl-2.5'>{{ language.name }}</div>
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
import { LST_LANGUAGE } from '@/constants'
import { getImg } from '@/utils/utils'

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
  const dataLanguage = Cookies.get('language') || 'vi'
  languageActive.value = listLanguage.find(item => item.lang === dataLanguage)
  if (!languageActive.value) {
    languageActive.value = listLanguage.find(item => item.lang === 'vi')
  }
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
