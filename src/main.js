import './assets/main.css'

import { createApp } from 'vue'
import QuizApp from './QuizApp.vue'
import router from './router'

const app = createApp(QuizApp)
app.use(router)
app.mount('#app')