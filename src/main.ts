import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import router from '@/router'

import '@/assets/main.css'

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)

app.mount('#app')
