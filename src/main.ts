import './assets/styles/main.scss'
import MasonryWall from '@yeger/vue-masonry-wall'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(MasonryWall)

app.mount('#app')
