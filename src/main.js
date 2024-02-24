import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { regDirective } from '@Utils/directive'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
regDirective(app)
app.mount('#app')
