import { createApp } from 'vue'
import App from './App.vue'
import index from './router'
import ElementPlus from 'element-plus'
import i18n from './lang'
// store
import { createPinia } from 'pinia'
// header
import { createHead } from '@vueuse/head'
// register global component base
import GlobalComponents from './components/global-components'
// register Component
import { registerGlobalComponent } from '@/utils/import'
// import css
import './assets/styles/index.scss'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './router/auth-guard'
import directive from '@/directives'

import { registerSW } from 'virtual:pwa-register'
import './pwa/useServiceWorker'
// import { clearCache } from "@/services/cacheService"

if ('serviceWorker' in navigator) {
	registerSW()
}

const app = createApp(App)
directive(app)

app.use(createPinia())
// add lang
app.use(i18n)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}

app.use(index)

app.use(ElementPlus)
const head = createHead()
app.use(head)
app.use(GlobalComponents)
registerGlobalComponent(app)

app.mount('#app')
