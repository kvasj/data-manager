import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles.css'

import BaseButton from './components/UI/BaseButton.vue'
import BaseCard from './components/UI/BaseCard.vue'
import BaseControlBar from './components/UI/BaseControlBar.vue'
import BaseSearch from './components/UI/BaseSearch.vue'

const app = createApp(App);

app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)
app.component('BaseControlBar', BaseControlBar)
app.component('BaseSearch', BaseSearch)

app.use(store).use(router).mount('#app')
