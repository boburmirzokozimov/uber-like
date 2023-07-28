import './assets/css/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import VueGoogleMaps from '@fawmi/vue-google-maps'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBZqCKFJ4PrUzMwrdw2YHzMGAZl8E15iVA',
        libraries: 'places'
    },
})
app.mount('#app')
