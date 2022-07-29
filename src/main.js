import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles.css'

import BaseButton from './components/BaseButton.vue'
import BaseCard from './components/BaseCard.vue'

const app = createApp(App);

app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)

app.use(store).use(router).mount('#app')
